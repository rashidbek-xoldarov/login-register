import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header className="shadow">
      <div className="d-flex align-items-center justify-content-between container mx-auto py-3 ">
        <Link className="text-decoration-none fs-3 text-dark" to="/">
          Website
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link className="btn btn-success" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-outline-success ms-3" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
