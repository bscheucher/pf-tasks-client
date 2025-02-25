import React, { useState, useEffect, useContext } from "react";
import {
  getBoardsByUserId,
  addBoardForUser,
  updateBoard,
  deleteBoard,
} from "../routes/boardRoutes";
import { AuthContext } from "../context/AuthContext";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/loading/LoadingIndicator";

function Dashboard() {
  const { userId } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add' or 'edit'
  const [currentBoard, setCurrentBoard] = useState(null);
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  console.log("boards in Dashboard", boards);
  console.log("boards in Dashboard === 0", boards.length === 0);
  console.log("isLoading in Dashboard", isLoading);

  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);
      try {
        const { data } = await getBoardsByUserId(userId);
        setBoards(data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      } finally {
        setIsLoading(false);
        console.log("finally in fetchBoards triggered")
      }
    };
    fetchBoards();
  }, [userId]);
  

  const handleBoardClick = (boardId) => {
    navigate(`/kanban/${boardId}`);
  };

  const openModal = (type, board = null) => {
    setModalType(type);
    setCurrentBoard(board);
    setBoardName(board ? board.name : "");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!boardName.trim()) return;

    try {
      if (modalType === "add") {
        const { data: newBoard } = await addBoardForUser(userId, {
          name: boardName,
        });
        setBoards((prevBoards) => [...prevBoards, newBoard]);
      } else if (modalType === "edit" && currentBoard) {
        await updateBoard(currentBoard.id, { name: boardName });
        setBoards((prevBoards) =>
          prevBoards.map((board) =>
            board.id === currentBoard.id ? { ...board, name: boardName } : board
          )
        );
      }
    } catch (error) {
      console.error("Error saving board:", error);
    }

    setShowModal(false);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId)
      );
    } catch (error) {
      console.error(`Error deleting board ID ${boardId}:`, error);
    }
  };

  return (
    <Container>
      <h2 className="my-4 text-center">Your Boards</h2>
      <Button onClick={() => openModal("add")} className="mb-3">
        + Add Board
      </Button>
      {isLoading ? (
        <LoadingIndicator />
      ) : boards.length === 0 ? (
        <p>No boards yet.</p>
      ) : (
        <Row>
          {boards.map((board) => (
            <Col key={board.id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{board.name}</Card.Title>
                  <Button
                    onClick={() => handleBoardClick(board.id)}
                    variant="primary"
                    className="me-2"
                    disabled={isLoading}
                  >
                    Open
                  </Button>
                  <Button
                    onClick={() => handleDeleteBoard(board.id)}
                    variant="danger"
                    className="me-2"
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => openModal("edit", board)}
                    variant="warning"
                    disabled={isLoading}
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add Board" : "Edit Board"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Board Name</Form.Label>
              <Form.Control
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;
