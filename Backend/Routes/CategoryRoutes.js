const express = require("express");
const router = express.Router();
const {
  addCategoryController,
  getCategoryController,
  updateCategoryController,
} = require("../Controllers/CategoryController");

router.get("/get-category", getCategoryController);

router.post("/add-category", addCategoryController);

router.put("/update-category", updateCategoryController);

router.delete("/delete-category", updateCategoryController);

module.exports = router;
