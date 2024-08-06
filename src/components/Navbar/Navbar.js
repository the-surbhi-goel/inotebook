import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await localStorage.clear();
    navigate(PATH.login, { replace: true });
  };

  return (
    <nav className={`navbar fixed-top navbar-expand-lg navbar-light bg-light`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          iNoteBook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          {/* Right Navbar */}
          <div className="d-flex  justify-content-between">
            {localStorage.getItem("token") ? (
              <Link
                className="btn btn-primary mx-3"
                role="button"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link to={`/login`} className="btn btn-primary mx-3" role="button">
                  Login
                </Link>
                <NavLink to={`/signUp`} className="btn btn-primary">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
