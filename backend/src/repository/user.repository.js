import { pool } from "../db.js";

export const getUsersDB = async () => {
  return await pool.query("SELECT * FROM user");
};

export const getUserByIdDB = async (id) => {
  return await pool.query("SELECT * FROM user WHERE id = ?", [id]);
};

export const createUserDB = async (name, email, password) => {
  return await pool.query("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
};

export const updateUserDB = async (name, email, password, id) => {
  return await pool.query("UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?", [
    name,
    email,
    password,
    id,
  ]);
};

export const deleteUserDB = async (id) => {
  return await pool.query("DELETE FROM user WHERE id = ?", [id]);
};

export const getUserByEmailDB = async (email) => {
  return await pool.query("SELECT * FROM user WHERE email = ?", [email]);
};

export const getUserByEmailAndPasswordDB = async (email, password) => {
  return await pool.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password]);
};

export const getUserNotesDB = async (userId) => {
  return await pool.query("SELECT * FROM notes WHERE userId = ?", [userId]);
};

export const getUserCategoriesDB = async (userId) => {
  return await pool.query("SELECT * FROM category WHERE userId = ?", [userId]);
};
