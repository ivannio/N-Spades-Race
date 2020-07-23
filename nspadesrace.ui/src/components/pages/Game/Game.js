import React from "react";
import { Link } from 'react-router-dom';
import { Page, Col, Row, Button, Dialog, Toast, BottomToolbar, ProgressCircular, Icon } from "react-onsenui";
import getCards from "../../../helpers/data/getCards";
import Card from "../../shared/Card/Card";
import playerData from "../../../helpers/data/playerData.js";
import scoreData from '../../../helpers/data/scoreData.js';
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "./Game.scss";

class Game extends React.Component {
  state = {
    loading: true,
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    player: null,
    stack: [],
    nonMatches: [],
    selectedCard: {
      value: 'first',
    },
    matches: 0,
    highScore: null,
    toastOpen: false,
  };

  componentDidMount() {
    const { authed } = this.props;
    if (authed) {
      this.getPlayer(this.props.firebaseUid);
    };
    this.getCards();  
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      if (this.props.firebaseUid !== '') {
        this.getPlayer(this.props.firebaseUid);
      };   
    };
    if (this.state.player !== prevState.player) {
      this.getHighScore(this.state.player);
    }    
  }

  getPlayer = (uid) => {
    playerData
      .getPlayerByFirebaseUid(uid)
      .then((response) => this.setState({ player: response, loading: false }))
      .catch((error) => console.error("error getting user", error));
  };

  getHighScore = (player) => {
    scoreData.getHighestScoreByPlayerId(player.id)
    .then((response) => this.setState({ highScore: response }))
    .catch((error) => console.error("error getting high score", error));
  }  

  getCards = () => {
    const stack = getCards.getCards();
    this.setState({ stack });
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  setSelectedCard = (card) => {
    this.setState({ selectedCard: card });
  }

  clearSelectedCard = () => {
    this.setState({
      selectedCard: {
        value: "cleared",
      },
    });
  }

  handleNoMatch = (cardOne, cardTwo) => {
    this.clearSelectedCard();
    this.setState({ nonMatches: [cardOne, cardTwo]});
  }

  handleMatch = (cardOne, cardTwo) => {
    let { matches } = this.state;
    matches++;
    this.setState({ matches });
    if (matches === 18) {
      this.finish();
    }
    this.clearSelectedCard();
  }

  addScore = (score) => {
    scoreData.addScore(score)
    .then((response) => console.log("added score:", response))
    .catch((error) => console.error("error adding score to db:", error))
  }  

  newHighScore = (score) => {
    this.setState({ toastOpen: true, highScore: score  })
  }

  finish = () => {
    this.stopTimer();
    if (this.props.authed) {
      const { timerTime, highScore } = this.state;
      let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
      let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
      let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
      const scoreToAdd = {
        playerId: this.state.player.id,
        raw: timerTime,
        time: `${minutes}:${seconds}:${centiseconds}`,
      }
      this.addScore(scoreToAdd); 
      if (highScore.raw > scoreToAdd.raw) { 
        this.newHighScore(scoreToAdd);
      }
      console.log(scoreToAdd);
    }
  }

  openRules = () => {
    // console.log();
  }

  render() {
    const { timerOn, timerTime, stack, selectedCard, matches, nonMatches, toastOpen, player, highestScore, loading } = this.state;
    const { authed } = this.props;
    const rowOne = stack.slice(0, 6);
    const rowTwo = stack.slice(6, 12);
    const rowThree = stack.slice(12, 18);
    const rowFour = stack.slice(18, 24);
    const rowFive = stack.slice(24, 30);
    const rowSix = stack.slice(30, 36);
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);

    return (
      <Page>
        <Col className="time-column">
          <div className="time">
            {minutes}:{seconds}:{centiseconds}
          </div>
        </Col>
        <Row className="card-row">
          {rowOne.map((card) => (
            <Card
              nonMatches={nonMatches}
              matches={matches}
              handleMatch={this.handleMatch}
              handleNoMatch={this.handleNoMatch}
              clearSelectedCard={this.clearSelectedCard}
              startTimer={this.startTimer}
              setSelectedCard={this.setSelectedCard}
              selectedCard={selectedCard}
              key={card.id}
              card={card}
            ></Card>
          ))}
        </Row>
        <Row className="card-row">
          {rowTwo.map((card) => (
            <Card
            nonMatches={nonMatches}
            matches={matches}
            handleMatch={this.handleMatch}
            handleNoMatch={this.handleNoMatch}
            clearSelectedCard={this.clearSelectedCard}
            startTimer={this.startTimer}
            setSelectedCard={this.setSelectedCard}
            selectedCard={selectedCard}
            key={card.id}
            card={card}
            ></Card>
          ))}
        </Row>
        <Row className="card-row">
          {rowThree.map((card) => (
            <Card
            nonMatches={nonMatches}
            matches={matches}
            handleMatch={this.handleMatch}
            handleNoMatch={this.handleNoMatch}
            clearSelectedCard={this.clearSelectedCard}
            startTimer={this.startTimer}
            setSelectedCard={this.setSelectedCard}
            selectedCard={selectedCard}
            key={card.id}
            card={card}
            ></Card>
          ))}
        </Row>
        <Row className="card-row">
          {rowFour.map((card) => (
            <Card
            nonMatches={nonMatches}
            matches={matches}
            handleMatch={this.handleMatch}
            handleNoMatch={this.handleNoMatch}
            clearSelectedCard={this.clearSelectedCard}
            startTimer={this.startTimer}
            setSelectedCard={this.setSelectedCard}
            selectedCard={selectedCard}
            key={card.id}
            card={card}
            ></Card>
          ))}
        </Row>
        <Row className="card-row">
          {rowFive.map((card) => (
            <Card
            nonMatches={nonMatches}
            matches={matches}
            handleMatch={this.handleMatch}
            handleNoMatch={this.handleNoMatch}
            clearSelectedCard={this.clearSelectedCard}
            startTimer={this.startTimer}
            setSelectedCard={this.setSelectedCard}
            selectedCard={selectedCard}
            key={card.id}
            card={card}
            ></Card>
          ))}
        </Row>
        <Row className="card-row">
          {rowSix.map((card) => (
            <Card
            nonMatches={nonMatches}
            matches={matches}
            handleMatch={this.handleMatch}
            handleNoMatch={this.handleNoMatch}
            clearSelectedCard={this.clearSelectedCard}
            startTimer={this.startTimer}
            setSelectedCard={this.setSelectedCard}
            selectedCard={selectedCard}
            key={card.id}
            card={card}
            ></Card>
          ))}
        </Row>
        <BottomToolbar className='game-bar'>
          { loading ? <ProgressCircular indeterminate /> : <><div className="game-bar-left">
          { player !== null ? <div className="icon-auth-container"><Icon className="logged-in" size={30} icon='fa-check-circle'></Icon>logged in as: <b>{player.userName}</b></div> : <div className="icon-auth-container"><Icon className="logged-out" size={30} icon='fa-times-circle'></Icon>Logged out</div>}
          </div> 
          <div className="game-bar-right">
            { timerOn ? <Button modifier="material" className="reset-button">
              Reset
            </Button> : <><Button onClick={this.openRules} modifier='material' className="custom-button">
              How To Play
            </Button>
            <Link className="custom-button" to={"/sign-up"}>
              <Button className="custom-button">Login / Create Account</Button>
            </Link></>}          
          </div></> }     
        </BottomToolbar>
        <Toast modifier='material' isOpen={toastOpen}></Toast> 
      </Page>
    );
  }
}

export default Game;
