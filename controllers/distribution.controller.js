/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import Distribution from "../models/Distribution.js";
import Laptop from "../models/Laptop.js";


async function executeWithRetry(operation, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const result = await operation(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      if (attempt === maxRetries) throw error;
      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, 100 * Math.pow(2, attempt))
      );
    } finally {
      session.endSession();
    }
  }
}

export const distributeLaptop = async (req, res, next) => {
  try {
    const result = await executeWithRetry(async (session) => {
      const {
        laptopId,
        recipientName,
        recipientEmail,
        recipientPhone,
        expectedReturnDate,
        notes,
      } = req.body;

      // 1. Verify and lock laptop
      const laptop = await Laptop.findById(laptopId)
        .session(session)
        .select("status")
        .lean();

      if (!laptop) throw new Error("Laptop not found");
      if (laptop.status !== "Available") {
        throw new Error(`Laptop is ${laptop.status}`);
      }

      // 2. Check for existing distribution
      const existingDist = await Distribution.findOne({
        laptopId,
        dateReturned: null,
      }).session(session);

      if (existingDist) {
        throw new Error("Laptop already distributed");
      }

      // 3. Create distribution and update laptop in single operation
      const [newDistribution] = await Distribution.create(
        [
          {
            laptopId,
            recipientName,
            recipientEmail,
            recipientPhone,
            expectedReturnDate,
            notes: notes || "",
          },
        ],
        { session }
      );

      await Laptop.findByIdAndUpdate(
        laptopId,
        { status: "Distributed" },
        { session }
      );

      return newDistribution;
    });

    return res.status(201).json({
      success: true,
      message: "✅ Laptop distributed successfully!",
      data: result,
    });
  } catch (err) {
    const statusCode = err.message.includes("not found")
      ? 404
      : err.message.includes("already")
      ? 409
      : 400;

    return res.status(statusCode).json({
      success: false,
      message: `❌ ${err.message}`,
      
    });
  
  }
};


// Special operation - Mark laptop as returned
export const markAsReturned = async (req, res, next) => {
  try {
    const result = await executeWithRetry(async (session) => {
      const { id } = req.params;
      const { notes } = req.body;

      // 1. Find and lock distribution
      const distribution = await Distribution.findById(id)
        .session(session)
        .select("laptopId dateReturned")
        .lean();

      if (!distribution) throw new Error("Distribution not found");
      if (distribution.dateReturned) throw new Error("Already returned");

      // 2. Update both records
      const updatedDist = await Distribution.findByIdAndUpdate(
        id,
        { dateReturned: new Date(), notes: notes || "" },
        { new: true, session }
      );

      await Laptop.findByIdAndUpdate(
        distribution.laptopId,
        { status: "Available" },
        { session }
      );

      return updatedDist;
    });

    return res.status(200).json({
      success: true,
      message: "✅ Laptop returned successfully!",
      data: result,
    });
  } catch (err) {
    const statusCode = err.message.includes("not found")
      ? 404
      : err.message.includes("Already")
      ? 409
      : 400;

    return res.status(statusCode).json({
      success: false,
      message: `❌ ${err.message}`,
    });
  
  }
};






// Read - Get all distributions
export const getAllDistributions = async (req, res, next) => {
  try {
    const distributions = await Distribution.find();

    return res.status(200).json({
      success: true,
      distribution: distributions,
    });
  } catch (err) {
    console.error(`❌ Error fetching distributions: ${err.message}`);
    next(err);
  }
};

// Read - Get single distribution by ID
export const getDistributionById = async (req, res, next) => {
  try {
    const distributionRecord = await Distribution.findById(req.params.id);

    if (!distributionRecord) {
      return res.status(404).json({
        success: false,
        message: "🚨 Distribution record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: distributionRecord,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "❌ Invalid distribution ID format.",
      });
    }
    console.error(`❌ Error fetching distribution: ${err.message}`);
    next(err);
  }
};

// Read - Get distributions by laptop ID
export const getDistributionsByLaptopId = async (req, res, next) => {
  try {
    const distributions = await Distribution
      .find({
        laptopId: req.params.laptopId,
      })
      .sort({ dateDistributed: -1 });

    if (!distributions.length) {
      return res.status(404).json({
        success: false,
        message: "No distributions found for this laptop.",
      });
    }

    return res.status(200).json({
      success: true,
      count: distributions.length,
      data: distributions,
    });
  } catch (err) {
    console.error(
      `❌ Error fetching distributions by laptop ID: ${err.message}`
    );
    next(err);
  }
};

// Update - Update distribution record
export const updateDistribution = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prevent certain fields from being updated
    const restrictedFields = ["laptopId", "dateDistributed"];
    for (const field of restrictedFields) {
      if (updateData[field]) {
        return res.status(400).json({
          success: false,
          message: `Cannot update ${field} field.`,
        });
      }
    }

    // If dateReturned is being set, update status to "Returned"
    if (updateData.dateReturned) {
      updateData.status = "Available";
    }

    const updatedDistribution = await Distribution.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedDistribution) {
      return res.status(404).json({
        success: false,
        message: "Distribution record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Distribution record updated successfully!",
      updateData: updatedDistribution,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: "❌ Validation failed",
        errors: messages,
      });
    }
    console.error(`❌ Error updating distribution: ${err.message}`);
    next(err);
  }
};

// Delete - Delete distribution record
export const deleteDistribution = async (req, res, next) => {
  try {
    const deletedDistribution = await Distribution.findByIdAndDelete(
      req.params.id
    );

    if (!deletedDistribution) {
      return res.status(404).json({
        success: false,
        message: "Distribution record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Distribution record deleted successfully!",
      deleted: deletedDistribution,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid distribution ID format.",
      });
    }
    console.error(`Error deleting distribution: ${err.message}`);
    next(err);
  }
};


