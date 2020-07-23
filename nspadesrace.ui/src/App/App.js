import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Game from "../components/pages/Game/Game";
import SignInSignUp from "../components/pages/SignInSignUp/SignInSignUp";
import "./App.scss";
import Home from "../components/pages/Home/Home";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConnection from "../helpers/firebaseConnection";
import authData from '../helpers/data/authData';

firebaseConnection.firebaseInit();

class App extends React.Component {
  state = {
    authed: false,
    firebaseUid: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ firebaseUid: user.uid, authed: true });
        user.getIdToken().then((token) => {
          sessionStorage.setItem("token", token);
        });
      } else {
        this.setState({ authed: false, firebaseUid: '' });
      }
    });
  }

  logOutUser = () => {
    authData.logOut();
  }

  render() {
    const { authed, firebaseUid } = this.state;

    return (
      <Router>
        <Switch>          
          <Route path="/" exact render={() => (
          <Home authed={authed} logOutUser={this.logOutUser} />
           )} />
          <Route path="/game" render={() => (
          <Game authed={authed} logOutUser={this.logOutUser} firebaseUid={firebaseUid} />
           )} />
          <Route path="/sign-up">
            {authed ? (
              <Redirect to="/" logOutUser={this.logOutUser} firebaseUid={firebaseUid}/>
            ) : (
              <SignInSignUp authed={authed}></SignInSignUp>
            )}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
