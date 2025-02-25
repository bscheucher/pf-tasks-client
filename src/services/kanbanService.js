import {
  getColumnsForBoard,
  addColumnToBoard,
  updateColumn,
  deleteColumn,
} from "../routes/columnRoutes";
import {
  addTaskToColumn,
  getTasksForColumn,
  updateTask,
  moveTask,
  deleteTask,
} from "../routes/taskRoutes";

export const fetchColumnsWithTasks = async (boardId) => {
  const { data: columns } = await getColumnsForBoard(boardId);
  const columnsWithTasks = await Promise.all(
    columns.map(async (column) => {
      const { data: tasks } = await getTasksForColumn(column.id);
      return { ...column, tasks: tasks || [] };
    })
  );
  return columnsWithTasks;
};

export const createColumn = async (boardId, title, position) => {
  const { data } = await addColumnToBoard(boardId, {
    title,
    position,
  });
  return { ...data, tasks: [] };
};

export const updateColumnTitle = async (columnId, title, position) => {
  await updateColumn(columnId, { title, position });
};

export const removeColumn = async (columnId) => {
  await deleteColumn(columnId);
};

export const createTask = async (columnId, title, description, position) => {
  const { data } = await addTaskToColumn(columnId, {
    title,
    description,
    position,
  });
  return data;
};

export const modifyTask = async (
  taskId,
  title,
  description,
  position,
  columnId
) => {
  const { data } = await updateTask(taskId, {
    title,
    description,
    position,
    columnId,
  });
  return data;
};

export const removeTask = async (taskId) => {
  await deleteTask(taskId);
};

export const moveTaskToColumn = async (taskId, columnId, position) => {
  await moveTask(taskId, { columnId, position });
};
