export const getNotesByUserIdAPI = (userId) => `notes/getByUserId/${userId}`;
export const getCategoriesByUserIdAPI = (userId) => `categories/getByUser/${userId}`;
export const updateNoteAPI = (noteId) => `notes/${noteId}`;
export const deleteNoteAPI = (noteId) => `notes/${noteId}`;
export const createNoteAPI = () => 'notes';

export const createCategoryAPI = () => 'categories';
export const updateCategoryAPI = (categoryId) => `categories/${categoryId}`;
export const deleteCategoryAPI = (categoryId) => `categories/${categoryId}`;