import React from "react";
import { Link } from 'react-router-dom';
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
      <Page
        > <ParticlesBg type="polygon" bg={true} num={1}></ParticlesBg>
          { authed ? <List modifier="material" className="leaderboard-list">
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
             </List> : <List modifier="material" className="leaderboard-list-not-authed"><div className="leaderboard-title-not-authed"><Link to={"/sign-up"} className="scores-sign-up-link">Login</Link> or <Link to={"/sign-up"} className="scores-sign-up-link">create an account</Link> to save your best times</div></List>
           }                           
        </Page> 
    );  }
}

export default MyHighScores;  
