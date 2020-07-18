import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import TestOne from '../components/pages/TestOne/TestOne';
import SignUp from '../components/pages/SignUp/SignUp';
import './App.scss';
import Home from '../components/pages/Home/Home';
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
        this.setState({ authed: false });
      }
    });
  }

  render() {
    const { authed, firebaseUser } = this.state;

    return(
      <Router>
        <Route path="/" component={Home}/>            
        <Switch>        
        <Route path="/testone" exact component={TestOne}/>
        <Route path="/sign-up" >
        { authed ? <Redirect to="/testone" /> : <SignUp authed={authed} firebaseUser={firebaseUser}></SignUp> }
        </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
