const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  packSize: {
    type: String,
    required: true,
  },
  MRP: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  category: {
    type: String, 
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
