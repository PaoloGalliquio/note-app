import {
  getNotesDB,
  getNoteByIdDB,
  getNotesByUserIdDB,
  getNotesByCategoryIdDB,
  createNoteDB,
  updateNoteDB,
  deleteNoteDB,
} from "../repository/note.respository.js";

export const getNotes = async (req, res) => {
  try {
    const [rows] = await getNotesDB();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await getNoteByIdDB(id);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getNotesByUserId = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const [rows] = await getNotesByUserIdDB(userId);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const getNotesByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const [rows] = await getNotesByCategoryIdDB(categoryId);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const createNote = async (req, res) => {
  const { name, categoryId, userId } = req.body;
  try {
    const [result] = await createNoteDB(name, categoryId, userId);
    res.status(200).json({ message: "Note created successfully", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId, archived } = req.body;
  
  try {
    const [rows] = await updateNoteDB(name, categoryId, archived, id);

    if(rows.affectedRows === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    const [result] = await getNoteByIdDB(id);

    res.status(200).json({ message: "Note updated successfully", result: result[0] });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await deleteNoteDB(id);
    if(rows.affectedRows === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}