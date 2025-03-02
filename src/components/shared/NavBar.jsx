import React, { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./navfoot.css";

function NavBar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {isLoggedIn && (
          <Navbar.Brand as={Link} to="/">
            My Kanban App
          </Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Nav Links */}
          <Nav className="me-auto d-flex align-items-center gap-3">
            {isLoggedIn && (
              <Nav.Link as={Link} to="/" className="mx-2">
                My Kanban Boards
              </Nav.Link>
            )}

            {isLoggedIn && (
              <Nav.Link as={Link} to="/user" className="mx-2">
                User
              </Nav.Link>
            )}
          </Nav>

          {/* Auth Buttons */}
          <div className="d-grid d-lg-flex align-items-center gap-2">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="btn btn-outline-danger w-100 w-lg-auto"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary w-100 w-lg-auto"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary w-100 w-lg-auto"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
