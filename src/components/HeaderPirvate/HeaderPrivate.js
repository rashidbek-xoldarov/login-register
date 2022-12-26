import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { TokenContext } from "../../context/token-context";

const HeaderPrivate = () => {
  const { me } = useContext(AuthContext);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  return (
    <header className="py-3 shadow bg-gradient">
      <div className="container mx-auto">
        <div className="d-flex align-items-center justify-content-between">
          <ul className="nav">
            <li className="nav-item fs-4">
              <Link to="/" className="text-decoration-none text-black">
                Home
              </Link>
            </li>
            <li className="nav-item ms-3 fs-4">
              <Link to="/posts" className="text-decoration-none text-black">
                Posts
              </Link>
            </li>
          </ul>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {me.firstname.charAt(0).toUpperCase() +
                me.lastname.charAt(0).toUpperCase()}
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setToken("");
                    navigate("/");
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPrivate;
