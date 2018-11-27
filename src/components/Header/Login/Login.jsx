import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

const Login = props => {
  const { updateUser, updateSessionId, toggleModal, showModal } = props;
  return (
    <React.Fragment>
      <button className="btn btn-success" type="button" onClick={toggleModal}>
        Login
      </button>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalBody>
          <LoginForm
            updateUser={updateUser}
            updateSessionId={updateSessionId}
          />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Login;
