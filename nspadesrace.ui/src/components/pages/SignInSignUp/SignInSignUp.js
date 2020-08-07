import React from "react";
import { Link } from 'react-router-dom';
import { Page, Tabbar, Tab, BottomToolbar, ToolbarButton, Icon } from "react-onsenui";
import SignIn from "../../shared/SignIn/SignIn";
import SignUp from "../../shared/SignUp/SignUp";
import './SignInSignUp.scss';


class SignInSignUp extends React.Component {

  renderTabs = () => [
    {
      content: <SignIn />,
      tab: <Tab label="Log-in" icon="fa-sign-in-alt" />,
    },
    {
      content: <SignUp />,
      tab: <Tab label="Create new account" icon="fa-user-plus" />,
    },
  ];

  render() {
    return (
      <Page
      renderToolbar={() =>
        <BottomToolbar className="bottom-score-toolbar">
            <Link className="home-toolbar-button" to={"/"}>
              <ToolbarButton className="home-toolbar-button"><Icon size={29} icon='fa-home'></Icon></ToolbarButton>           
              </Link>   
        </BottomToolbar>
      }>        
        <Tabbar
          modifier="material"     
          position="top"
          swipeable
          renderTabs={this.renderTabs}
        />       
      </Page>
    );
  }
}

export default SignInSignUp;
