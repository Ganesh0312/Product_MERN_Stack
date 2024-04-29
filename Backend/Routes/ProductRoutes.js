const express = require("express");
const router = express.Router();
const {
  addProductController,
  getProductController,
  updateProductController,
  deleteProductController,
} = require("../Controllers/ProductController");

router.get("/get-product", getProductController);
router.post("/add-product", addProductController);
router.put("/update-product/:id", updateProductController);
router.delete("/delete-product/:id", deleteProductController);

module.exports = router;
