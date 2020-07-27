import React from "react";
import { Link } from 'react-router-dom';
import { Page, Tabbar, Tab, Fab, Icon } from "react-onsenui";
import SignIn from "../../shared/SignIn/SignIn";
import SignUp from "../../shared/SignUp/SignUp";
import './Scores.scss';


class Scores extends React.Component {

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
      <Page>        
        <Tabbar
          position="top"
          renderTabs={this.renderTabs}
        /><Link to={'/'}>
        <Fab className='home-fab' position='bottom right' modifier='mini'>
       <Icon icon='fa-home' className='fab-icon' />
     </Fab>
        </Link>
        <h5 className='home-fab-label'>Home</h5>        
      </Page>
    );
  }
}

export default Scores;
