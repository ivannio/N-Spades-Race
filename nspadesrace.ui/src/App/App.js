import React from 'react';
import { Page, Toolbar, Toast, Button, BackButton, ToolbarButton, Icon } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.scss';

class App extends React.Component {
  state = {
    isOpen: false,
  }

  handlePress = () => {
    this.setState({ isOpen: true })
  }

  render() {
    const { isOpen } = this.state;

    return(
      <Page> 
      <Toolbar>
      <div className="left">
      <BackButton>
          Back
      </BackButton>
    </div>
    <div className="center">
      Title
    </div>
    <div className="right">
      <ToolbarButton>
        <Icon icon="md-menu" />
      </ToolbarButton>
    </div>
        </Toolbar>
        <Button className="onsen-button" onClick={this.handlePress}>Button</Button>  
      <Toast isOpen={isOpen} animationOptions={ {duration: 2.2, delay: 0.4, timing: 'ease-in'} }>You pressed the button.</Toast>  
  </Page>
    );
  }
}

export default App;
