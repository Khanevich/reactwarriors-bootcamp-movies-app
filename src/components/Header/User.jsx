import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const User = props => {
  const { user, logOut } = props;

  return (
    <UncontrolledDropdown>
      <DropdownToggle nav>
        <img
          width="40"
          className="rounded-circle"
          src={`https://secure.gravatar.com/avatar/${
            user.avatar.gravatar.hash
          }.jpg?s=64"`}
          alt="avatar"
        />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={logOut}>Выйти</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

User.propTypes = {
  user: PropTypes.object
};

export default AppContextHOC(User);
