import API from "../services/api";

export const getBoardsByUserId = (userId) => API.get(`/boards/${userId}`);
export const addBoardForUser = (userId, data) =>
  API.post(`/boards/add/${userId}`, data);
export const updateBoard = (id, data) => API.put(`/boards/update/${id}`, data);
export const deleteBoard = (id) => API.delete(`/boards/delete/${id}`);
