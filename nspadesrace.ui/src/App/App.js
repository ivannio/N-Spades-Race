import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import playerData from "../helpers/data/playerData";
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
    firebaseUser: {},
    player: {},
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ firebaseUser: user, authed: true });
        user.getIdToken().then((token) => {
          sessionStorage.setItem("token", token);
        });
        this.getPlayer(this.state.firebaseUser.uid)
      } else {
        this.setState({ authed: false, player: {}, firebaseUser: {} });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.firebaseUser !== prevState.firebaseUser) {
      if (this.state.firebaseUser.uid !== undefined) {
        this.getPlayer(this.state.firebaseUser.uid);
      }
    }
  }

  getPlayer = (uid) => {
    playerData
      .getPlayerByFirebaseUid(uid)
      .then((response) => this.setState({ player: response }))
      .catch((error) => console.error("error getting user", error));
  };

  logOutUser = () => {
    authData.logOut();
  }

  render() {
    const { authed, player } = this.state;

    return (
      <Router>
        <Switch>          
          <Route path="/" exact render={() => (
          <Home authed={authed} logOutUser={this.logOutUser} player={player} />
           )} />
          <Route path="/game" render={() => (
          <Game authed={authed} logOutUser={this.logOutUser} player={player}/>
           )} />
          <Route path="/sign-up">
            {authed ? (
              <Redirect to="/" logOutUser={this.logOutUser} player={player}/>
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
