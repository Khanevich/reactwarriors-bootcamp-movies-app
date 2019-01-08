import React from "react";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { inject, observer } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class User extends React.Component {
  render() {
    const { user, logOut } = this.props.userStore;
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
  }
}

export default User;
