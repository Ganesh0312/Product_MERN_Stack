const express = require("express");
const router = express.Router();
const {
  addCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../Controllers/CategoryController");

router.get("/get-category", getCategoryController);

router.post("/add-category", addCategoryController);

router.put("/update-category/:id", updateCategoryController);

router.delete("/delete-category/:id", deleteCategoryController);

module.exports = router;
