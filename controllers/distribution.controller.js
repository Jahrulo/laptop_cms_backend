import distribution from "../models/Distribution.js";

// Create - Distribute a laptop (enhanced version)
export const distributeLaptop = async (req, res, next) => {
  try {
    const {
      laptopId,
      recipientName,
      recipientEmail,
      recipientPhone,
      dateDistributed,
      expectedReturnDate,
      dateReturned,
      notes,
    } = req.body;

    // Check if laptop is currently distributed to any recipient (not returned)
    const existingActiveDistribution = await distribution.findOne({
      laptopId,
      $or: [
        { dateReturned: { $exists: false } },
        { dateReturned: null },
        { status: "Distributed" },
      ],
    });

    if (existingActiveDistribution) {
      return res.status(400).json({
        success: false,
        message: "This laptop is currently distributed to another recipient.",
        data: {
          currentRecipient: existingActiveDistribution.recipientName,
          distributionDate: existingActiveDistribution.dateDistributed,
          currentStatus: existingActiveDistribution.status || "Distributed",
        },
      });
    }

    // Create new distribution record
    const newDistribution = await distribution.create({
      laptopId,
      recipientName,
      recipientEmail,
      recipientPhone,
      dateDistributed,
      expectedReturnDate: expectedReturnDate || null,
      dateReturned: dateReturned || null,
      notes: notes || "",
      status: dateReturned ? "Returned" : "Distributed",
    });

    return res.status(201).json({
      success: true,
      message: "✅ Laptop distributed successfully!",
      data: newDistribution,
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
    console.error(`❌ Error distributing laptop: ${err.message}`);
    next(err);
  }
};

// Read - Get all distributions
export const getAllDistributions = async (req, res, next) => {
  try {
    const distributions = await distribution.find();

    return res.status(200).json({
      success: true,
      data: distributions,
    });
  } catch (err) {
    console.error(`❌ Error fetching distributions: ${err.message}`);
    next(err);
  }
};

// Read - Get single distribution by ID
export const getDistributionById = async (req, res, next) => {
  try {
    const distributionRecord = await distribution.findById(req.params.id);

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
    const distributions = await distribution
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
      updateData.status = "Returned";
    }

    const updatedDistribution = await distribution.findByIdAndUpdate(
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
      data: updatedDistribution,
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
    const deletedDistribution = await distribution.findByIdAndDelete(
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
      data: deletedDistribution,
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

// Special operation - Mark laptop as returned
export const markAsReturned = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const updatedDistribution = await distribution.findByIdAndUpdate(
      id,
      {
        dateReturned: new Date(),
        status: "Returned",
        notes: notes || "",
      },
      { new: true }
    );

    if (!updatedDistribution) {
      return res.status(404).json({
        success: false,
        message: "Distribution record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Laptop marked as returned successfully!",
      data: updatedDistribution,
    });
  } catch (err) {
    console.error(`Error marking laptop as returned: ${err.message}`);
    next(err);
  }
};
