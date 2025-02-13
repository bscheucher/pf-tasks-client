import API from "../services/api";

export const getColumnsForBoard = (boardId) => API.get(`/columns/${boardId}`);
export const addColumnToBoard = (boardId, data) =>
  API.post(`/columns/${boardId}`, data);
export const updateColumn = (id, data) => API.put(`/columns/update${id}`, data);
export const deleteColumn = (id) => API.delete(`/columns/delete/${id}`);
