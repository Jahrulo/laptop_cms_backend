import Laptop from "../models/Laptop.js";

export const createLaptop = async (req, res, next) => {
  try {
    const { brand, serialNumber, status, model, purchaseDate, notes } =
      req.body;

    // Validation check
    if (
      !brand ||
      !serialNumber ||
      !status ||
      !model ||
      !purchaseDate ||
      !notes
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // check if serial number already exists
    const existingSerialNumber = await Laptop.findOne({ serialNumber });
    if (existingSerialNumber) {
      return res
        .status(400)
        .json({
          success: false,
          message: "💡 Laptop with this serial number already exists!",
        });
    }

    // Create a new laptop entry
    const laptop = await Laptop.create({
      brand,
      serialNumber,
      status,
      model,
      purchaseDate,
      notes,
    });

    // Send a response with the created laptop
    return res.status(201).json({ success: true, data: laptop });
  } catch (err) {
    // Catch Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }
    console.error(`🚨 Error: ${err.message}`);
    // return res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    next(err.message);
  }
};

// Get all laptops
export const getLaptops = async (req, res, next) => {
  try {
    const laptops = await Laptop.find(); // Fetch all laptops from the database
    return res.status(200).json({ success: true, data: laptops });
  } catch (err) {
    console.error(`🚨 Error: ${err.message}`);
    next(err.message);
  }
};

// Update a laptop by ID
export const updateLaptop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the laptop and update it
    const laptop = await Laptop.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!laptop) {
      return res
        .status(404)
        .json({ success: false, message: "Laptop not found." });
    }

    return res.status(200).json({ success: true, data: laptop });
  } catch (err) {
    // Catch Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }
    console.error(`🚨 Error: ${err.message}`);
    next(err.message);
  }
};

// Delete a laptop by ID
export const deleteLaptop = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the laptop exists
    const laptop = await Laptop.findById(id);
    if (!laptop) {
      return res
        .status(404)
        .json({ success: false, message: "🚨 Oops, Laptop not found." });
    }

    // Delete the laptop
    await Laptop.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ success: true, message: "✅ Laptop deleted successfully." });
  } catch (err) {
    // Catch Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }
    console.error(`🚨 Error: ${err.message}`);
    next(err.message);
  }
};
