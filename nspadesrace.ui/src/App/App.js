import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import TestOne from '../components/pages/TestOne/TestOne';
import SignUp from '../components/pages/SignUp/SignUp';
import playerData from '../helpers/data/playerData';
import './App.scss';
import { Page, Button } from 'react-onsenui';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/firebaseConnection';

firebaseConnection.firebaseInit();

class App extends React.Component {
  state = {
    authed: false,
    firebaseUser: {},
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ firebaseUser: user, authed: true });
      } else {
        this.setState({ authed: false, fireBaseUser: {} });
      }
    });
  }

  // getDBUser = (uid) => {
  //   playerData.getPlayerByFirebaseUid(uid)
  //   .then((response) => this.setState({ player: response }))
  //   .catch((error) => console.error('error getting DB userObj', error));
  // }

  render() {
    const { authed, firebaseUser } = this.state;

    return(
      <Router>
        <Page>
        <p>Home page?</p>
        <Link to={'/testone'}>
        <Button>page 1</Button>
        </Link>
        </Page>    
        <Switch>
        <Route path="/testone" exact component={TestOne}/>
        <Route path="/sign-up" render={() => <SignUp authed={authed} firebaseUser={firebaseUser}></SignUp>}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
