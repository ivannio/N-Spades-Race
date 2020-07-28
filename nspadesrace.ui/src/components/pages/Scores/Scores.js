import React from "react";
import { Page, Tabbar, Tab } from "react-onsenui";
import scoreData from '../../../helpers/data/scoreData';
import Leaderboard from "../../shared/Leaderboard/Leaderboard";
import MyHighScores from "../../shared/MyHighScores/MyHighScores";
import './Scores.scss';

class Scores extends React.Component {
  state = {
    leaderboardScores: null,  
  }
  
  componentDidMount() {
    this.getLeaderboard();
  }

  getLeaderboard = () => {
    scoreData.getLeaderboard()
    .then((response) => this.setState({ leaderboardScores: response }))
    .catch((error) => console.log("error getting leaderboard", error))
  };

  renderTabs = () => [
    {
      content: <Leaderboard leaderboardScores={this.state.leaderboardScores} />,
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
          renderTabs={this.renderTabs}
        />    }        
             
      </Page>
    );
  }
}

export default Scores;
