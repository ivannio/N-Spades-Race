import React from 'react';
import { Link } from 'react-router-dom';
import { Page, Toolbar, Toast, Button, BackButton, ToolbarButton, Icon } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class TestOne extends React.Component {
    state = {
      isOpen: false,
    }
  
    handlePress = () => {
      this.setState({ isOpen: true })
      setTimeout(() => { 
          this.setState({ isOpen: false })
        }, 3000);
    }
  
    render() {
      const { isOpen } = this.state;
      const { url } = this.props.match;
  
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
          <Button className="onsen-button" onClick={this.handlePress}>test 1 Button</Button>
          <Link to={'/testtwo'}><Button className="onsen-button" >Link to page 2</Button></Link>  
      <Toast isOpen={isOpen}>this page is {url}</Toast>  
    </Page>
      );
    }
  }
  
  export default TestOne;