import { DragDropContext } from "@hello-pangea/dnd";
import useKanbanBoard from "../hooks/useKanbanBoard";
import Column from "./Column";
import "./KanbanBoard.css";
import ColumnModal from "./ColumnModal"; 
import TaskModal from "./TaskModal"; 
import LoadingIndicator from "../components/loading/LoadingIndicator";

const KanbanBoard = () => {
  const {
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
  } = useKanbanBoard();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kanban Board</h2>
      <button className="btn btn-success mb-3" onClick={openAddColumnModal}>
        Add Column
      </button>

      {/* Column Modal */}
      <ColumnModal
        isOpen={columnModalOpen}
        onClose={() => setColumnModalOpen(false)}
        onSubmit={handleColumnModalSubmit}
        title={modalColumnData.title}
      />

      {/* Task Modal */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSubmit={handleTaskModalSubmit}
        title={modalTaskData.title}
        description={modalTaskData.description}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row justify-content-center">
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                openUpdateColumnModal={openUpdateColumnModal}
                handleDeleteColumn={handleDeleteColumn}
                openAddTaskModal={openAddTaskModal}
                openUpdateTaskModal={openUpdateTaskModal}
                handleDeleteTask={handleDeleteTask}
              />
            ))
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
