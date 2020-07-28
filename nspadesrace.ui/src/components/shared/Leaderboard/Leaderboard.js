import React from "react";
import {
  Page,
  List,
  Row,
} from "react-onsenui";
import ParticlesBg from "particles-bg";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

class Leaderboard extends React.Component {
    state = {
        loading: false,
    }    

  render() {
    const { leaderboardScores } = this.props;    
    return (    
      <Page>
          { leaderboardScores === null ? <></> :
          <List modifier="material" className="leaderboard-list">
              <div className="leaderboard-title">TOP 10 SCORES</div>
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
             { leaderboardScores.map((score, index) => <Row className="leaderboard-row">
                    <div className='score-rank'>
                        {index + 1}.
                    </div>
                    <div className='score-player'>
                    {score.playerName}
                    </div>
                    <div className='score-time'>
                    {score.time}
                    </div>
                    </Row>)} 
             </List> }
             <ParticlesBg type="square" bg={true} num={7}></ParticlesBg>                  
        </Page> 
    );  }
}

export default Leaderboard;
