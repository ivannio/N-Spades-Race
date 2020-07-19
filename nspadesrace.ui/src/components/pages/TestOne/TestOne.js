import React from 'react';
import { Link } from 'react-router-dom';
import { Page, Toast, Button, Toolbar, ToolbarButton } from 'react-onsenui';
import playerData from '../../../helpers/data/playerData.js';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './TestOne.scss';

class TestOne extends React.Component {
    state = {
      toastOpen: false,
      player: {},
    }
  
    handlePress = () => {
      const { uid } = this.props.firebaseUser;
      playerData.getPlayerByFirebaseUid(uid)
      .then((response) => this.setState({ player: response }))
      .catch((error) => console.error("error getting player", error));
      this.setState({ toastOpen: true });
    }

    closeToast = () => {
        this.setState({ toastOpen: false })
    }
  
    render() {
      const { toastOpen } = this.state;
      const { player } = this.state;
      const { authed } = this.props;
  
      return(
      <Page
      renderToolbar={() => (
        <Toolbar modifier="transparent">
          <div className="right">
            <ToolbarButton>
            { authed ? <Button onClick={this.props.logOutUser}>Logout</Button> : <Link to={'/sign-up'} ><Button >Login</Button></Link> }
              </ToolbarButton>
          </div>
        </Toolbar>
      )}>   
        <Toast animation='default' animationOptions={ {duration: 1, delay: 0.4, timing: 'ease-in'} } onClick={this.closeToast} isOpen={toastOpen}>Tap to dismiss</Toast>     
          <Button onClick={this.handlePress}>get user</Button>
          <Link to={'/sign-up'}><Button>Sign Up</Button></Link>
            <p>UserName: {player.userName}</p>
            <p>Player Since: {player.acctCreated}</p>   
    </Page>
      );
    }
  }
  
  export default TestOne;