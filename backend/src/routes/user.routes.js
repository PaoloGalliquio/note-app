import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByEmailAndPassword,
  getUserNotes,
  getUserCategories
} from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/users/getUserByEmail/:email", getUserByEmail);
router.get("/users/getNotesByUser/:userId", getUserNotes);
router.get("/users/getCategoriesByUser/:userId", getUserCategories);
router.post("/users/login", getUserByEmailAndPassword);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;