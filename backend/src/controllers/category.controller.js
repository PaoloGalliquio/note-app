import {
  getCategoryByIdDB,
  getCategoriesByUserIdDB,
  createCategoryDB,
  updateCategoryDB,
  deleteCategoryDB,
} from "../repository/category.repository.js";

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await getCategoryByIdDB(id);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const getCategoriesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await getCategoriesByUserIdDB(userId);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const createCategory = async (req, res) => {
  const { name, icon, userId } = req.body;
  try {
    const [result] = await createCategoryDB(name, icon, userId);
    res.status(200).json({ id: result.insertId, name });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  try {
    await updateCategoryDB(name, icon, id);
    res.status(200).json({ id, name });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCategoryDB(id);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}