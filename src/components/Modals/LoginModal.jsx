import React from "react";
import LoginForm from "../Header/Login/LoginForm";
import { Modal, ModalBody } from "reactstrap";
const LoginModal = ({ showLoginModal, toggleModal }) => {
  return (
    <React.Fragment>
      <Modal isOpen={showLoginModal} toggle={toggleModal}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default LoginModal;
