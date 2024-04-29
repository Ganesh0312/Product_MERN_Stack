const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CategoryModel = new mongoose.Schema({
  categoryId: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

CategoryModel.plugin(AutoIncrement, {
  inc_field: "categoryId",
  start_seq: 100,
});

module.exports = mongoose.model("Category", CategoryModel);
