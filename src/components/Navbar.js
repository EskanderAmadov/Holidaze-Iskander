import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-beige-light px-4 py-4">
      <NavLink className="navbar-brand" to="/">Holidaze</NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-orange-light-100 fw-bold" : ""}`
              }
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/venues"
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-orange-light-100 fw-bold" : ""}`
              }
            >
              Book now
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-orange-light-100 fw-bold" : ""}`
              }
            >
              About
            </NavLink>
          </li>

          {user ? (
            <li className="nav-item dropdown">
              <button
                className="btn nav-link dropdown-toggle d-flex align-items-center"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-2"></i>
                {user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <NavLink className="dropdown-item d-flex align-items-center" to="/profile">
                    <i className="bi bi-person me-2"></i> My profile
                  </NavLink>
                </li>

                {user.venueManager && (
                  <li>
                    <NavLink className="dropdown-item d-flex align-items-center" to="/admin">
                      <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </NavLink>
                  </li>
                )}

                <li><hr className="dropdown-divider" /></li>

                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="dropdown-item d-flex align-items-center text-danger"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Log out
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${isActive ? "text-orange-light fw-bold" : ""}`
                }
                to="/login"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i> Log in
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
