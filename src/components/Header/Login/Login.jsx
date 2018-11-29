import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

const Login = props => {
  const { toggleModal, showModal } = props;
  return (
    <React.Fragment>
      <button className="btn btn-success" type="button" onClick={toggleModal}>
        Login
      </button>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Login;
