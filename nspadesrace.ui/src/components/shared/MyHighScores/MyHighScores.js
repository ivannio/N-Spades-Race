import React from "react";
import { Link } from 'react-router-dom';
import {
  Page,
  List,
  Row,
} from "react-onsenui";
import ParticlesBg from "particles-bg";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

class MyHighScores extends React.Component {
  render() {
    const { player, myHighScores } = this.props;    
    return (    
      <Page>
          { myHighScores !== null ? <List modifier="material" className="leaderboard-list">
              <div className="leaderboard-title">{player.userName}'s top scores</div>
              <div className="leaderboard-legend">
                <div className='score-rank-legend'>
                    Rank
                </div>
                <div className='score-player-legend'>
                    Time
                </div>
                <div className='score-time-legend'>
                    Date
                </div>
              </div>         
             { myHighScores.map((score, index) => <Row className="leaderboard-row">
                    <div className='score-rank'>
                        {index + 1}.
                    </div>
                    <div className='score-player'>
                    {score.time}
                    </div>
                    <div className='score-time'>
                    {score.dateRecorded}
                    </div>
                    </Row>)} 
             </List> : <>prolly need to log in homie</>
           }
             <ParticlesBg type="square" bg={true} num={1}></ParticlesBg>                  
        </Page> 
    );  }
}

export default MyHighScores;  
