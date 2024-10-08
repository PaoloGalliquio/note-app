import { Router } from "express";
import {
  getCategoryById,
  getCategoriesByUserId,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";

const router = Router();

router.get("/categories/:id", getCategoryById);
router.get("/categories/getByUser/:userId", getCategoriesByUserId);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;