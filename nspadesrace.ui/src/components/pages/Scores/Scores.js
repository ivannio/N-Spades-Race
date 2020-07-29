import React from "react";
import { Link } from 'react-router-dom';
import { Page, Tabbar, Tab, BottomToolbar, ToolbarButton, Button, Icon } from "react-onsenui";
import Leaderboard from "../../shared/Leaderboard/Leaderboard";
import MyHighScores from "../../shared/MyHighScores/MyHighScores";
import './Scores.scss';

class Scores extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      
    }
  }

  renderTabs = () => [
    {
      content: <Leaderboard leaderboardScores={this.props.leaderboardScores} />,
      tab: <Tab label="Leaderboard" icon="fa-chess-king" />,
    },
    {
      content: <MyHighScores authed={this.props.authed} player={this.props.player} myHighScores={this.props.myHighScores} />,
      tab: <Tab label="My High Scores" icon="fa-stopwatch" />,
    },
  ];

  render() { 
    const { authed, myHighScores } = this.props;
    return (
      <Page>
        { authed && myHighScores === null ? <></> : <Tabbar
          position="top"
          swipeable={true}
          renderTabs={this.renderTabs}
        />    }
        <BottomToolbar className="bottom-score-toolbar" modifier="transparent">
        <Link className="home-toolbar-button" to={"/"}>
          <ToolbarButton className="home-toolbar-button"><Icon size={29} icon='fa-home'></Icon></ToolbarButton>              
          
          </Link>
          { authed ? <Button modifier="material" onClick={this.props.logOutUser} className="custom-button">Logout</Button> : <Link to={"/sign-up"}>
        <Button modifier="material" className="custom-button">Login / Create Account</Button>
            </Link>} 
    </BottomToolbar>        
      </Page>
    );
  }
}

export default Scores;
