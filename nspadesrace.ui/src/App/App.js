import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import TestOne from '../components/pages/TestOne/TestOne';
import TestTwo from '../components/pages/TestTwo/TestTwo';
import './App.scss';
import { Button } from 'react-onsenui';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/firebaseConnection';

firebaseConnection.firebaseInit();

class App extends React.Component {
  state = {
    authed: false,
    firebaseUser: {},
    player: {},
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ firebaseUser: user, authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  render() {
    const { authed, firebaseUser, player } = this.state;

    return(
      <Router>
        <p>Home page?</p>
        <Link to={'/testone'}>
        <Button>page 1</Button>
        </Link>
        <Switch>
        <Route path="/testone" exact component={TestOne}/>
        <Route path="/testtwo" exact component={TestTwo} player={player} authed={authed} firebaseUser={firebaseUser}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
