import React from "react";
import { Link } from 'react-router-dom';
import { Page, Tabbar, Tab, BottomToolbar, ToolbarButton, Button, Icon } from "react-onsenui";
import Leaderboard from "../../shared/Leaderboard/Leaderboard";
import MyHighScores from "../../shared/MyHighScores/MyHighScores";
import './Scores.scss';

class Scores extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.authed !== prevProps.authed) {
        if (!this.props.authed) {
          this.forceUpdate();
          console.log("uh forced update..?");
        }
      }
    }
  }
  render() {
    const { authed, player, myHighScores, leaderboardScores } = this.props;
    const renderTabs = () => [
      {
        content: <Leaderboard leaderboardScores={leaderboardScores} />,
        tab: <Tab label="Leaderboard" icon="fa-chess-king" />,
      },
      {
        content: <MyHighScores authed={authed} player={player} myHighScores={myHighScores} />,
        tab: <Tab label="My High Scores" icon="fa-stopwatch" />,
      },
    ];
    
    return (
      authed && myHighScores === null ? <></> :
      <Page>
          <Tabbar
          position="top"
          swipeable={true}
          renderTabs={renderTabs}/> 
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
