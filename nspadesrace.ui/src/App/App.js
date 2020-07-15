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

class App extends React.Component {

  render() {

    return(
      <Router>
        <p>Home page?</p>
        <Link to={'/testone'}>
        <Button>page 1</Button>
        </Link>
        <Switch>
        <Route path="/testone" exact component={TestOne}/>
        <Route path="/testtwo" exact component={TestTwo}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
