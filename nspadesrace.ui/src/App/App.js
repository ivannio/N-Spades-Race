import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import authData from '../helpers/data/authData';
import playerData from "../helpers/data/playerData";
import scoreData from '../helpers/data/scoreData';
import achievementData from '../helpers/data/achievementData';
import Home from "../components/pages/Home/Home";
import SignInSignUp from "../components/pages/SignInSignUp/SignInSignUp";
import Game from "../components/pages/Game/Game";
import Scores from "../components/pages/Scores/Scores";
import Achievements from '../components/pages/Achievements/Achievements';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConnection from "../helpers/firebaseConnection";

firebaseConnection.firebaseInit();

class App extends React.Component {
  state = {
    authed: false,
    firebaseUser: null,
    player: null,
    myHighScores: null,
    leaderboardScores: null,
    achievements: null,
    playerAchieved: null,
    gilded: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {  
        user.getIdToken().then((token) => {
          sessionStorage.setItem("token", token);
          this.setState({ firebaseUser: user, authed: true });          
        });         
      } else {
        this.setState({ authed: false, player: null, firebaseUser: null, myHighScores: null, playerAchieved: null, gilded: false });
      }
    });
    this.getLeaderboard();
    this.getAchievements();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.firebaseUser !== prevState.firebaseUser && this.state.firebaseUser !== null) {
        this.getPlayer(this.state.firebaseUser.uid);   
      };
      if (this.state.player === 'tryagain' && prevState.player === null) {
        this.getPlayer(this.state.firebaseUser.uid);
      }
    if (this.state.player !== prevState.player && this.state.player !== null) {
      const playerId = this.state.player.id;
      this.getPlayerHighScores(playerId);
      this.getPlayerAchieved(playerId);
      };
    }

  getLeaderboard = () => {
    scoreData.getLeaderboard()
    .then((response) => this.setState({ leaderboardScores: response }))
    .catch((error) => console.log("error getting leaderboard", error))
  };

  getAchievements = () => {
    achievementData.getAchievements()
    .then((response) => this.setState({ achievements: response }))
    .catch((error) => console.error("error getting achievements", error))
  }

  getPlayer = (uid) => {
    playerData
      .getPlayerByFirebaseUid(uid)
      .then((response) => this.setState({ player: response }))
      .catch((error) => this.setState({ player: 'tryagain' }));
  };

  getPlayerHighScores = (playerId) => {  
    scoreData.getHighScoresByPlayerId(playerId)
  .then((response) => this.setState({ myHighScores: response }))
  .catch((error) => console.log("error getting leaderboard", error))      
  };

  getPlayerAchieved = (playerId) => {
    achievementData.getAchievedByPlayerId(playerId)
    .then((response) => this.setState({ playerAchieved: response }))
    .catch((error) => console.error("error getting player achieved achievements", error))
  };

  updatePlayerAchieved = () => {
    this.getPlayerAchieved(this.state.player.id);
  };

  updateAppHighScores = () => {
    this.getPlayerHighScores(this.state.player.id);
    this.getLeaderboard();
 }; 

  logOutUser = () => {
    authData.logOut();
  };

  toggleGold = () => {
    this.setState(prevState => ({ gilded: !prevState.gilded }));
  }

  render() {
    const { authed, player, leaderboardScores, myHighScores, achievements, playerAchieved, gilded } = this.state;
    return (  
      <Router>
        <Switch>          
          <Route path="/" exact render={() => (
          <Home authed={authed} logOutUser={this.logOutUser} myHighScores={myHighScores} player={player} gilded={gilded} />
           )} />
          <Route path="/game" render={() => (
          <Game authed={authed} logOutUser={this.logOutUser} player={player} updateAppHighScores={this.updateAppHighScores} gilded={gilded} myHighScores={myHighScores} playerAchieved={playerAchieved} updatePlayerAchieved={this.updatePlayerAchieved}/>
           )} />
           <Route path="/scores" render={() => (
          <Scores authed={authed} player={player} logOutUser={this.logOutUser} leaderboardScores={leaderboardScores} myHighScores={myHighScores}/>
           )} />
           <Route path="/achievements">
           {!authed ? (
              <Redirect to="/" authed={authed} logOutUser={this.logOutUser} player={player}/>
            ) : (
              <Achievements authed={authed} player={player} logOutUser={this.logOutUser} achievements={achievements} playerAchieved={playerAchieved} gilded={gilded} toggleGold={this.toggleGold} />
            )}
           </Route>     
          <Route path="/sign-up">
            {authed ? (
              <Redirect to="/" authed={authed} logOutUser={this.logOutUser} player={player} gilded={gilded} myHighScores={myHighScores}/>
            ) : (
              <SignInSignUp></SignInSignUp>
            )}
          </Route>
        </Switch>   
      </Router>
    );
  }
};

export default App;
