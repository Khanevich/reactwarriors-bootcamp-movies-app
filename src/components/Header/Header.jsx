import React from "react";
import Login from "./Login/Login";
import User from "./User";

const Header = props => {
  const { user, updateUser, updateSessionId, toggleModal, showModal } = props;
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link">Home</a>
          </li>
        </ul>
        {user ? (
          <User user={user} />
        ) : (
          <Login
            updateUser={updateUser}
            updateSessionId={updateSessionId}
            toggleModal={toggleModal}
            showModal={showModal}
          />
        )}
      </div>
    </nav>
  );
};

export default Header;