import React from 'react';
import { Link } from 'react-router-dom';
import { Page, Toolbar, Toast, Button, BackButton, ToolbarButton, Icon } from 'react-onsenui';
import playerData from '../../../helpers/data/playerData.js';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class TestOne extends React.Component {
    state = {
      isOpen: false,
      player: {},
    }
  
    handlePress = () => {      
      playerData.getPlayerById(1)
      .then((response) => this.setState({ player: response }))
      .catch((error) => console.error("error getting player", error))
      this.setState({ isOpen: true })
    }

    closeToast = () => {
        this.setState({ isOpen: false })
    }
  
    render() {
      const { isOpen } = this.state;
      const { player } = this.state;
  
      return(
        <Page> 
        <Toolbar>
        <div className="left">
        <BackButton>
            Back
        </BackButton>
      </div>
      <div className="center">
        Page 1
      </div>
      <div className="right">
        <ToolbarButton>
          <Icon icon="md-menu" />
        </ToolbarButton>
      </div>
          </Toolbar>
          <Button className="onsen-button" onClick={this.handlePress}>get user</Button>
          <Link to={'/testtwo'}><Button className="onsen-button">Link to page 2</Button></Link>
            <p>UserName: {player.userName}</p>
            <p>Player Since: {player.acctCreated}</p>

      <Toast onClick={this.closeToast} isOpen={isOpen}>tap to close</Toast>  
    </Page>
      );
    }
  }
  
  export default TestOne;