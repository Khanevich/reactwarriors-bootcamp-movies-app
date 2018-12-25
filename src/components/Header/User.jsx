import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
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

export default AppContextHOC(User);
