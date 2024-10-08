import {
  getUsersDB,
  getUserByIdDB,
  createUserDB,
  updateUserDB,
  deleteUserDB,
  getUserByEmailDB,
  getUserByEmailAndPasswordDB,
  getUserNotesDB,
  getUserCategoriesDB,
} from "../repository/user.repository.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await getUsersDB();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await getUserByIdDB(id);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [result] = await createUserDB(name, email, password);
    res.status(200).json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    await updateUserDB(name, email, password, id);
    res.status(200).json({ id, name, email });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserDB(id);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const [rows] = await getUserByEmailDB(email);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const getUserByEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await getUserByEmailAndPasswordDB(email, password);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const getUserNotes = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await getUserNotesDB(userId);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const getUserCategories = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await getUserCategoriesDB(userId);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

