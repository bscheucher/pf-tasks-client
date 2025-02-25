import API from "../services/api";

export const getTasksForColumn = (columnId) => API.get(`/tasks/${columnId}`);
export const addTaskToColumn = (columnId, data) =>
  API.post(`/tasks/add/${columnId}`, data);
export const updateTask = (id, data) => API.put(`/tasks/update/${id}`, data);
export const moveTask = (id, data) => API.put(`/tasks/move/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/delete/${id}`);
