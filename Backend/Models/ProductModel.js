const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
  },
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

ProductSchema.plugin(AutoIncrement, { inc_field: "productId", start_seq: 100 });

module.exports = mongoose.model("Product", ProductSchema);
