const CategoryModel = require("../Models/CategoryModel");

const addCategoryController = async (req, res) => {
  try {
    const category = new CategoryModel(req.body);
    await category.save();
    res.status(201).send("Category Added Successfully");
  } catch (error) {
    res.status(400).send("Error", error);
  }
};

const getCategoryController = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send("Error", error);
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.status(200).send("Category updated successfully");
  } catch (error) {
    res.status(400).send("Error", error);
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.status(200).send("Category deleted successfully");
  } catch (error) {
    res.status(400).send("Error", error);
  }
};

module.exports = {
  addCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
