import React from "react";
import { Page, Tabbar, Tab } from "react-onsenui";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "onsenui/css/ionicons/css/ionicons.css";

class SignInSignUp extends React.Component {

  renderTabs = () => [
    {
      content: <SignIn />,
      tab: <Tab label="Log-in" icon="ion-ios-log-in" />,
    },
    {
      content: <SignUp />,
      tab: <Tab label="Create new account" icon="ion-md-person-add" />,
    },
  ];

  render() {
    return (
      <Page>
        <Tabbar
          position="top"
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}

export default SignInSignUp;
