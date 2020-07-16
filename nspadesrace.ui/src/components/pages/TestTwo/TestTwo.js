import React from 'react';
import { Link } from 'react-router-dom';
import { Page, Toolbar, Button, BackButton, ToolbarButton, Icon, Input, Row, Col } from 'react-onsenui';
import playerData from '../../../helpers/data/playerData';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './TestTwo.scss';

class TestTwo extends React.Component {
    state = {
      isOpen: false,
      userName: '',
      email: '',
      passWord: '',
    }
  
    handleRegister = () => {
        const { email, passWord } = this.state;
        playerData.registerFirebaseUser(email, passWord)
        console.log(firebase.auth().currentUser)
    }
  
    render() {
      const { userName, email, passWord } = this.state;
  
      return(
        <Page> 
        <Toolbar>
        <div className="left">
        <BackButton>
            Back
        </BackButton>
      </div>
      <div className="center">
        Page 2
      </div>
      <div className="right">
        <ToolbarButton>
          <Icon icon="md-menu" />
        </ToolbarButton>
      </div>
          </Toolbar>
          <Col>
          <Row>     
          <Link to={'/testone'}><Button className="onsen-button" >Link to page 1</Button></Link>
          </Row>
          <Row>
          <Input
            className="user-input"
            type='text'
            value={userName} float
            onChange={(e) => { this.setState({ userName: e.target.value })} }
            modifier='material'
            placeholder='Username'/>
          </Row>
          <Row>
            <Input
            className="user-input"
            type='email'
            value={email} float
            onChange={(e) => { this.setState({ email: e.target.value })} }
            modifier='material'
            placeholder='Email'/> 
            </Row>
            <Row>
            <Input
            className="user-input"
            type='password'
            value={passWord} float
            onChange={(e) => { this.setState({ passWord: e.target.value })} }
            modifier='material'
            placeholder='Password'/>
            </Row>
            <Button className="onsen-button" onClick={this.handleRegister}>Register!</Button>
          </Col>                
    </Page>
      );
    }
  }
  
  export default TestTwo;