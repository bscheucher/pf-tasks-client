import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "react-bootstrap";

const Column = ({
  column,
  openUpdateColumnModal,
  handleDeleteColumn,
  openAddTaskModal,
  openUpdateTaskModal,
  handleDeleteTask,
}) => {
  const [hoveredTask, setHoveredTask] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (taskId, event) => {
    setHoveredTask(taskId);
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 30, // Position tooltip above the task
      left: rect.left + window.scrollX + rect.width / 2, // Center tooltip horizontally
    });
  };

  const handleMouseLeave = () => {
    setHoveredTask(null);
  };

  return (
    <div className="col-md-3">
      <Droppable droppableId={column.id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="card shadow-sm kanban-column"
          >
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{column.title}</h5>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => openUpdateColumnModal(column.id, column.title)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteColumn(column.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="card-body">
              {(column.tasks || []).map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="card mb-2 p-2 shadow-sm kanban-task"
                      onMouseEnter={(event) => handleMouseEnter(task.id, event)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {task.title}
                      <div>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() =>
                            openUpdateTaskModal(
                              task.id,
                              task.title,
                              task.description,
                              column.id
                            )
                          }
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteTask(task.id, column.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
            <Button onClick={() => openAddTaskModal(column.id)}>
              Add Task
            </Button>
          </div>
        )}
      </Droppable>

      {/* Tooltip (Positioned Absolutely) */}
      {hoveredTask && (
        <div
          className="task-tooltip"
          style={{
            position: "absolute",
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: "translateX(-50%)",
            backgroundColor: "black",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          {column.tasks.find((t) => t.id === hoveredTask)?.description}
        </div>
      )}
    </div>
  );
};

export default Column;
