import { Router } from "express";
import {
  getNotes,
  getNoteById,
  getNotesByUserId,
  getNotesByCategoryId,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/note.controller.js";

const router = Router();

router.get("/notes", getNotes);
router.get("/notes/:id", getNoteById);
router.get("/notes/getByUserId/:userId", getNotesByUserId);
router.get("/notes/category/:categoryId", getNotesByCategoryId);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

export default router;