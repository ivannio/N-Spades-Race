import React from "react";
import { Link } from "react-router-dom";
import {
  Page,
  AlertDialog,
  AlertDialogButton,
  Button,
  Input,
  Row,
  Col,
} from "react-onsenui";
import playerData from "../../../helpers/data/playerData";
import "firebase/auth";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "./SignUp.scss";

class SignUp extends React.Component {
  state = {
    alertOpen: false,
    alertText: "",
    userName: "",
    email: "",
    passWord: "",
    confirmPassWord: "",
  };

  registerUser = () => {
    const { email, passWord, userName } = this.state;
    playerData.registerFirebaseAndDBUser(email, passWord, userName);
  };

  handleRegister = () => {
    const { passWord, confirmPassWord, email, userName } = this.state;
    if (passWord !== confirmPassWord) {
      this.setState({ alertText: "Password and confirmation password do not match", alertOpen: true })
    } else if ( userName === "" || email === "" || passWord === "" || confirmPassWord === "") {
      this.setState({ alertText: "One or more inputs have not been filled out", alertOpen: true })
    } else {
      this.registerUser();
    } 
  };

  alertClosed = () => this.setState({ alertOpen: false, passWord: '', confirmPassWord: '', });

  render() {
    const {
      alertOpen,
      alertText,
      userName,
      email,
      passWord,
      confirmPassWord,
    } = this.state;

    return (
      <Page>
        <Col className="sign-up-container">
          <Row className="user-input">
            <Input
              style={ { 'margin-left': 'auto', 'margin-right': 'auto' } }
              type="text"
              value={userName}
              float
              required
              onChange={(e) => {
                this.setState({ userName: e.target.value });
              }}
              modifier="material"
              placeholder="Username"
            />
          </Row>
          <Row className="user-input">
            <Input
            style={ { 'margin-left': 'auto', 'margin-right': 'auto' } }
              type="email"
              value={email}
              float
              required
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              modifier="material"
              placeholder="Email"
            />
          </Row>
          <Row className="user-input">
            <Input
            style={ { 'margin-left': 'auto', 'margin-right': 'auto' } }
              type="password"
              value={passWord}
              float
              required
              onChange={(e) => {
                this.setState({ passWord: e.target.value });
              }}
              modifier="material"
              placeholder="Password"
            />
          </Row>
          <Row className="user-input">
            <Input
            style={ { 'margin-left': 'auto', 'margin-right': 'auto' } }
              type="password"
              value={confirmPassWord}
              float
              required
              onChange={(e) => {
                this.setState({ confirmPassWord: e.target.value });
              }}
              modifier="material"
              placeholder="Confirm Password"
            />
          </Row>
          <Row className="user-input">
          <Button
            className="onsen-button register-button"
            onClick={this.handleRegister}
          >
            Register and Login
          </Button>
          </Row>
          
        </Col>
        <AlertDialog
          isOpen={alertOpen}
          onCancel={this.alertClosed}
          modifier="material"
          cancelable
        >
          <div className="alert-dialog-title">Error:</div>
          <div className="alert-dialog-content">
            {alertText}
          </div>
          <div className="alert-dialog-footer">
            <AlertDialogButton onClick={this.alertClosed} className="alert-dialog-button">
              OK
            </AlertDialogButton>
          </div>
        </AlertDialog>
      </Page>
    );
  }
}

export default SignUp;
