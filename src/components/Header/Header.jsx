import React from "react";
import User from "./User";

const Header = props => {
  const { user, toggleModal } = props;
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link">Home</a>
          </li>
        </ul>
        {user ? (
          <User />
        ) : (
          <button
            className="btn btn-success"
            type="button"
            onClick={toggleModal}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
