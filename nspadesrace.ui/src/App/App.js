import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import TestOne from "../components/pages/TestOne/TestOne";
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
    firebaseUser: {},
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ firebaseUser: user, authed: true });
      } else {
        this.setState({ authed: false, firebaseUser: {} });
      }
    });
  }

  logOutUser = () => {
    authData.logOut();
  }

  render() {
    const { authed, firebaseUser } = this.state;

    return (
      <Router>
        <Switch>          
          <Route path="/" exact render={() => (
          <Home authed={authed} logOutUser={this.logOutUser} />
           )} />
          <Route path="/testone" render={() => (
          <TestOne authed={authed} logOutUser={this.logOutUser} firebaseUser={firebaseUser} />
           )} />
          <Route path="/sign-up">
            {authed ? (
              <Redirect to="/" logOutUser={this.logOutUser} firebaseUser={firebaseUser}/>
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
