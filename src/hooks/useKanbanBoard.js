import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchColumnsWithTasks,
  createColumn,
  updateColumnTitle,
  removeColumn,
  createTask,
  modifyTask,
  removeTask,
  moveTaskToColumn,
} from "../services/kanbanService";

const useKanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const { boardId } = useParams();

  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [modalColumnId, setModalColumnId] = useState(null);
  const [modalTaskId, setModalTaskId] = useState(null);
  const [modalTaskData, setModalTaskData] = useState({
    title: "",
    description: "",
  });
  const [modalColumnData, setModalColumnData] = useState({ title: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadColumns = async () => {
      setIsLoading(true);
      try {
        const data = await fetchColumnsWithTasks(boardId);
        setColumns(
          data.map((column) => ({
            ...column,
            tasks: Array.isArray(column.tasks) ? column.tasks : [],
          }))
        );
      } catch (error) {
        console.error("Error fetching columns or tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadColumns();
  }, [boardId]);

  const openAddColumnModal = () => {
    setModalColumnData({ title: "" });
    setColumnModalOpen(true);
  };

  const openUpdateColumnModal = (columnId, title) => {
    setModalColumnId(columnId);
    setModalColumnData({ title: title });
    setColumnModalOpen(true);
  };

  const openAddTaskModal = (columnId) => {
    setModalColumnId(columnId);
    setModalTaskData({ title: "", description: "" });
    setTaskModalOpen(true);
  };

  const openUpdateTaskModal = (taskId, title, description, columnId) => {
    setModalTaskId(taskId);
    setModalColumnId(columnId);
    setModalTaskData({ title: title, description: description });
    setTaskModalOpen(true);
  };

  const handleColumnModalSubmit = async (title) => {
    if (modalColumnId) {
      // Update Column
      try {
        await updateColumnTitle(
          modalColumnId,
          title,
          columns.find((c) => c.id === modalColumnId).position
        );
        setColumns((prev) =>
          prev.map((col) =>
            col.id === modalColumnId ? { ...col, title } : col
          )
        );
      } catch (error) {
        console.error("Error updating column:", error);
      }
    } else {
      // Add Column
      try {
        const newColumn = await createColumn(boardId, title, columns.length);
        setColumns([...columns, newColumn]);
      } catch (error) {
        console.error("Error adding column:", error);
      }
    }
    setColumnModalOpen(false);
    setModalColumnId(null);
  };

  const handleTaskModalSubmit = async (title, description) => {
    if (modalTaskId) {
      // Update Task
      try {
        const updatedTask = await modifyTask(
          modalTaskId,
          title,
          description,
          columns
            .find((c) => c.id === modalColumnId)
            .tasks.find((t) => t.id === modalTaskId).position,
          modalColumnId
        );
        setColumns((prev) =>
          prev.map((col) =>
            col.id === modalColumnId
              ? {
                  ...col,
                  tasks: col.tasks.map((task) =>
                    task.id === modalTaskId ? updatedTask : task
                  ),
                }
              : col
          )
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      // Add Task
      try {
        const newTask = await createTask(
          modalColumnId,
          title,
          description,
          columns.find((col) => col.id === modalColumnId)?.tasks.length || 0
        );
        setColumns((prev) =>
          prev.map((col) =>
            col.id === modalColumnId
              ? { ...col, tasks: [...col.tasks, newTask] }
              : col
          )
        );
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
    setTaskModalOpen(false);
    setModalTaskId(null);
  };

  const handleDeleteColumn = async (columnId) => {
    if (!window.confirm("Are you sure you want to delete this column?")) return;
    try {
      await removeColumn(columnId);
      setColumns(columns.filter((col) => col.id !== columnId));
    } catch (error) {
      console.error("Error deleting column:", error);
    }
  };

  const handleDeleteTask = async (id, columnId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await removeTask(id);
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? { ...col, tasks: col.tasks.filter((task) => task.id !== id) }
            : col
        )
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const sourceColumnId = parseInt(result.source.droppableId, 10);
    const destinationColumnId = parseInt(result.destination.droppableId, 10);
    const taskId = parseInt(result.draggableId, 10);
    const sourceColumn = columns.find((col) => col.id === sourceColumnId);
    const destinationColumn = columns.find(
      (col) => col.id === destinationColumnId
    );
    if (!sourceColumn || !destinationColumn) return;

    if (sourceColumnId === destinationColumnId) {
      const reorderedTasks = [...sourceColumn.tasks];
      const [movedTask] = reorderedTasks.splice(result.source.index, 1);
      reorderedTasks.splice(result.destination.index, 0, movedTask);
      setColumns((prev) =>
        prev.map((col) =>
          col.id === sourceColumnId ? { ...col, tasks: reorderedTasks } : col
        )
      );
    } else {
      const newSourceTasks = sourceColumn.tasks.filter((t) => t.id !== taskId);
      const newDestinationTasks = [...destinationColumn.tasks];
      newDestinationTasks.splice(
        result.destination.index,
        0,
        sourceColumn.tasks.find((t) => t.id === taskId)
      );
      setColumns((prev) =>
        prev.map((col) =>
          col.id === sourceColumnId
            ? { ...col, tasks: newSourceTasks }
            : col.id === destinationColumnId
            ? { ...col, tasks: newDestinationTasks }
            : col
        )
      );
    }
    try {
      await moveTaskToColumn(
        taskId,
        destinationColumnId,
        result.destination.index
      );
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  return {
    columns,
    openAddColumnModal,
    openUpdateColumnModal,
    handleDeleteColumn,
    openAddTaskModal,
    openUpdateTaskModal,
    handleDeleteTask,
    handleDragEnd,
    columnModalOpen,
    taskModalOpen,
    handleColumnModalSubmit,
    handleTaskModalSubmit,
    modalTaskData,
    modalColumnData,
    setColumnModalOpen,
    setTaskModalOpen,
    isLoading,
  };
};

export default useKanbanBoard;
