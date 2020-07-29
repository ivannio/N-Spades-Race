import React from "react";
import {
  Page,
  List,
} from "react-onsenui";
import ParticlesBg from "particles-bg";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

class MyHighScores extends React.Component {
  state = {
    scoresDateFormatted: null,
  }

  componentDidUpdate(prevProps) {
    if (this.props.myHighScores !== prevProps.myHighScores) {
      if (this.props.myHighScores !== null) {
        this.dateFormatter(this.props.myHighScores);
      }
    } 
  }

  componentDidMount() {
    const { myHighScores } = this.props;
      if (myHighScores !== null) {
      this.dateFormatter(myHighScores);
   }
  }

  dateFormatter = (scores) => {
    let scoresDateFormatted = [...scores];
    // eslint-disable-next-line array-callback-return
    scores.map((score, index) => {
      const rawDate = score.dateRecorded;
      let shortDate = rawDate.slice(5, 10).replace("-", "/");
      if (shortDate.charAt(0) === '0') {
        shortDate = shortDate.substr(1);
      }
      scoresDateFormatted[index].dateRecorded = shortDate;      
    })
    this.setState({ scoresDateFormatted });
  }

  render() {
    const { scoresDateFormatted } = this.state;
    const { player } = this.props; 
       
    return (    
      <Page className="score-page">
          { scoresDateFormatted !== null ? <List modifier="material" className="leaderboard-list">
              <div className="leaderboard-title">{player.userName}'s top scores</div>
              <div className="personal-score-legend">     
                <div className='score-player-legend'>
                    Time
                </div>
                <div className='score-time-legend'>
                    Date Achieved
                </div>
              </div>         
             { scoresDateFormatted.map((score, index) => <div className="personal-score-row">      
                    <div className="personal-score-container">
                    <div className="score-index"><div>{index + 1}.</div></div>
                    <div className="score-time">{score.time}</div>           
                    </div>
                    <div className='score-date'>
                    {score.dateRecorded}
                    </div>
                    </div>)} 
             </List> : <>prolly need to log in homie</>
           }
             <ParticlesBg type="square" bg={true} num={2}></ParticlesBg>                  
        </Page> 
    );  }
}

export default MyHighScores;  
