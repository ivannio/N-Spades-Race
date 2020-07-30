import React from "react";
import {
  Page,
  List,
} from "react-onsenui";
import ParticlesBg from "particles-bg";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

class MyHighScores extends React.Component {
  render() {
    const { player, authed, myHighScores } = this.props;   
    return (    
      <Page className="score-page">
          { authed && myHighScores !== null ? <List modifier="material" className="leaderboard-list">
              <div className="leaderboard-title">{player.userName}'s Top Scores</div>
              <div className="personal-score-legend">     
                <div className='score-player-legend'>
                    Time
                </div>
                <div className='score-time-legend'>
                    Date Achieved
                </div>
              </div>         
             { myHighScores.map((score, index) => <div className="personal-score-row">      
                    <div className="personal-score-container">
                    <div className="score-index"><div>{index + 1}.</div></div>
                    <div className="score-time">{score.time}</div>           
                    </div>
                    <div className='score-date'>
                    {score.dateRecorded.slice(5, 10).replace("-", " / ")}
                    </div>
                    </div>)} 
             </List> : <>prolly need to log in homie</>
           }
             <ParticlesBg type="square" bg={true} num={2}></ParticlesBg>                  
        </Page> 
    );  }
}

export default MyHighScores;  
