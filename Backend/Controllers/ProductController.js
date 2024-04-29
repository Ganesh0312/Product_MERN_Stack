const ProductModel = require("../Models/ProductModel");
const CategoryModel = require("../Models/CategoryModel");

const addProductController = async (req, res) => {
  try {
    const { productName, packSize, MRP, status, categoryId, image } = req.body;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    const product = new ProductModel({
      productName,
      packSize,
      MRP,
      status,
      category: category.name,
      image,
    });
    await product.save();
    res.status(201).send("massage", "Product Added Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send("Error", error);
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, ...updateData } = req.body;

    if (categoryId) {
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        return res.status(404).send("Category not found");
      }
      updateData.category = category.name;
    }

    const product = await ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send("Product updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(400).send("Error", error);
  }
};

module.exports = {
  addProductController,
  getProductController,
  updateProductController,
  deleteProductController,
};
