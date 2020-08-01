import React from "react";
import { Link } from 'react-router-dom';
import { Page, Tabbar, Tab, BottomToolbar, Button, ToolbarButton, Icon } from "react-onsenui";
import Leaderboard from "../../shared/Leaderboard/Leaderboard";
import MyHighScores from "../../shared/MyHighScores/MyHighScores";
import './Scores.scss';

class Scores extends React.Component {
  state = {
    index: 0,
  }

  render() {
    const { authed, player, myHighScores, leaderboardScores } = this.props; 
    return (  
      <Page
      renderToolbar={() =>
        <BottomToolbar className="bottom-score-toolbar">
            <Link className="home-toolbar-button" to={"/"}>
              <ToolbarButton className="home-toolbar-button"><Icon size={29} icon='fa-home'></Icon></ToolbarButton>              
              
              </Link>
              { authed ? <><Link to={'/achievements'} className="custom-button button button--material" style={{ textDecoration: "none" }}>Achievements</Link> <Button modifier="material" onClick={this.props.logOutUser} className="custom-button">Logout</Button></> : <Link className="custom-button button button--material" to={"/sign-up"}>
            Login / Create Account
                </Link>} 
        </BottomToolbar>
      }>
        <Tabbar
          onPreChange = {({index}) => this.setState ({index})}
          index={this.state.index}
          position="top"
          swipeable={true}
          renderTabs={(activeIndex, tabbar) => [
            {
              content: <Leaderboard tabbar={tabbar} logOutUser={this.props.logOutUser} authed={authed} leaderboardScores={leaderboardScores} player={player} />,
              tab: <Tab label="Leaderboard" icon="fa-chess-king" />,
            },
            {
              content: <MyHighScores tabbar={tabbar} logOutUser={this.props.logOutUser} authed={authed} player={player} myHighScores={myHighScores} />,
              tab: <Tab label="My High Scores" icon="fa-stopwatch" />,
            },
          ]}/>                       
      </Page>
    );
  }
}

export default Scores;
