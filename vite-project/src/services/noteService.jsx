import api from "../api/axios"
export const getNotes = async () => {
  const response = await api.get("/notes")
  return response.data.notes || response.data;
}
export const createNote = async (noteData) => {
  const response = await api.post("/notes", noteData);
  return response.data;
}
export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  //                               ↑ Template literal — dynamic URL
  return response.data;
}