// ColumnModal.js
import React, { useState } from "react";
import Modal from "./Modal";

const ColumnModal = ({ isOpen, onClose, onSubmit, title: initialTitle = "" }) => {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Column Details">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="columnTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="columnTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ColumnModal;