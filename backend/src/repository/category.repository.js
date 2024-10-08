import { pool } from "../db.js";

export const getCategoryByIdDB = async (id) => {
  return await pool.query("SELECT * FROM category WHERE id = ?", [id]);
};

export const getCategoriesByUserIdDB = async (userId) => {
  return await pool.query(
    "SELECT c.id, c.name, c.icon, c.userId, c.id AS value, COUNT(n.id) AS count FROM category c LEFT JOIN note n ON c.id = n.categoryId AND n.archived = 0 WHERE c.userId = ? GROUP BY c.id",
    [userId]
  );
};

export const createCategoryDB = async (name, icon, userId) => {
  return await pool.query("INSERT INTO category (name, icon, userId) VALUES (?, ?, ?)", [name, icon, userId]);
};

export const updateCategoryDB = async (name, icon, id) => {
  return await pool.query("UPDATE category SET name = ?, icon = ? WHERE id = ?", [name, icon, id]);
};

export const deleteCategoryDB = async (id) => {
  return await pool.query("DELETE FROM category WHERE id = ?", [id]);
};
