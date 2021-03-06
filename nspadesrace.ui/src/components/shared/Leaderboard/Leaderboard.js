import React from "react";
import {
  Page,
  List,
} from "react-onsenui";
import ParticlesBg from 'particles-bg';
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

class Leaderboard extends React.Component {

  render() {
    const { leaderboardScores, player } = this.props;    
    return (    
      <Page
      > 
      <ParticlesBg type="square" bg={true} num={3}></ParticlesBg>       
          { leaderboardScores === null ? <></> :
          <List modifier="material" className="leaderboard-list">
              <div className="leaderboard-title">Top 10 Scores</div>
              <div className="leaderboard-legend">
                <div className='score-rank-legend'>
                    Rank
                </div>
                <div className='score-player-legend'>
                    Player
                </div>
                <div className='score-time-legend'>
                    Time
                </div>
              </div>         
             { leaderboardScores.map((score, index) => <div className="leaderboard-row">
                    <div className='score-index'>
                        {index + 1}.
                    </div>
                    { player !== null && score.playerName === player.userName ? <div className='hey-thats-me'>
                    {score.playerName}
                    </div> : <div className='score-player'>
                    {score.playerName}
                    </div> }
                    
                    <div className='score-time'>
                    {score.time}
                    </div>
                    </div>)} 
             </List>}                                
        </Page> 
    );  }
}

export default Leaderboard;
