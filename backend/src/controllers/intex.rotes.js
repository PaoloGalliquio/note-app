import { pool } from "../db.js";

export const index = (req, res) => {
  res.json({ message: "Welcome to my API" });
}

export const ping = async (req, res) => {
  const [result] = await pool.query('SELECT "pong" AS result');
  res.json(result[0]);
}