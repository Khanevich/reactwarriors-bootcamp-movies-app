import React from "react";
import User from "./User";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject(({ userStore }) => ({
  isAuth: userStore.isAuth
}))
@observer
class Header extends React.Component {
  render() {
    const { toggleModal, isAuth } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {isAuth ? (
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
  }
}

export default Header;
