import React from "react";
import { Link, useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import "./Navbar.css";
import useUser from "../hooks/useUser";

function Navbar() {
  const { currentUser, setCurrentUser } = useUser();
  // console.log(currentUser.username);

  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("Token");
    setCurrentUser(null);
    history.push("/login");
  };
  const noAuthLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link login" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link register" to="/register">
          Register
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <div className="d-flex username">
        <IconButton style={{ color: "white" }}>
          <PermIdentityIcon />
        </IconButton>
        <li className="nav-item">
          <p style={{ color: "whitesmoke", paddingRight: "10px" }}>
            {currentUser && currentUser.username}
          </p>
        </li>
        <li className="nav-item">
          <i
            style={{ color: "white" }}
            className="sign-out icon"
            onClick={logout}
          ></i>
        </li>
      </div>
    </>
  );

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#222831" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/login">
            MyBlog
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/post"
                >
                  Post
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {currentUser ? authLinks : noAuthLinks}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
