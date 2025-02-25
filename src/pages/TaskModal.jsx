// TaskModal.js
import React, { useState } from "react";
import Modal from "./Modal";

const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  title: initialTitle = "",
  description: initialDescription = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, description);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="taskDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default TaskModal;