import React from "react";
import LoginForm from "../Header/Login/LoginForm";
import { Modal, ModalBody } from "reactstrap";
export default class LoginModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { showLoginModal, toggleModal } = this.props;
    return (
      <div>
        <Modal isOpen={showLoginModal} toggle={toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
