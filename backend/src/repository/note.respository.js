import { pool } from "../db.js";

export const getNotesDB = async () => {
  return await pool.query("SELECT * FROM note");
};

export const getNoteByIdDB = async (id) => {
  return await pool.query("SELECT * FROM note WHERE id = ?", [id]);
};

export const getNotesByUserIdDB = async (userId) => {
  return await pool.query("SELECT * FROM note WHERE userId = ?", [userId]);
};

export const getNotesByCategoryIdDB = async (categoryId) => {
  return await pool.query("SELECT * FROM note WHERE categoryId = ?", [categoryId]);
};

export const createNoteDB = async (name, categoryId, userId) => {
  return await pool.query("INSERT INTO note (name, categoryId, userId) VALUES (?, ?, ?)", [name, categoryId, userId]);
};

export const updateNoteDB = async (name, categoryId, archived, id) => {
  return await pool.query("UPDATE note SET name = ?, categoryId = ?, archived = ? WHERE id = ?", [
    name,
    categoryId,
    archived,
    id,
  ]);
};

export const deleteNoteDB = async (id) => {
  return await pool.query("DELETE FROM note WHERE id = ?", [id]);
};
