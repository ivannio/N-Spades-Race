import React from "react";
import {
  Page,
  AlertDialog,
  AlertDialogButton,
  Button,
  Input,
  Row,
  Col,
} from "react-onsenui";
import firebase from "firebase/app";
import "firebase/auth";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

class SignIn extends React.Component {
  state = {
    alertOpen: false,
    alertText: "",
    email: "",
    passWord: "",
  };

  handleLogin = () => {
    const { email, passWord } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, passWord)
      .then((cred) => {
        cred.user.getIdToken().then((token) => {
          sessionStorage.setItem("token", token);
        });
      })
      .catch((error) =>
        this.setState({ alertText: error.message, alertOpen: true })
      );
  };

  alertClosed = () =>
    this.setState({ alertOpen: false, passWord: "", email: "" });

  render() {
    const { alertOpen, alertText, email, passWord } = this.state;

    return (
      <Page>
        <Col className="header-column">
        <h1 className="auth-header">
              Login
            </h1>
          </Col>    
        <Col className="auth-column">
        
          <Row className="auth-row">
            <Input
              style={{ "margin-left": "auto", "margin-right": "auto" }}
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
          <Row className="auth-row">
            <Input
              style={{ "margin-left": "auto", "margin-right": "auto" }}
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
          <Row className="auth-row">
            <Button
              className="onsen-button custom-button"
              onClick={this.handleLogin}
            >
              Login
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
          <div className="alert-dialog-content">{alertText}</div>
          <div className="alert-dialog-footer">
            <AlertDialogButton
              onClick={this.alertClosed}
              className="alert-dialog-button"
            >
              OK
            </AlertDialogButton>
          </div>
        </AlertDialog>
      </Page>
    );
  }
}

export default SignIn;
