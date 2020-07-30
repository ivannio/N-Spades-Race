import React from "react";
import { Link } from "react-router-dom";
import {
  Page,
  Col,
  Row,
  Button,
  AlertDialog,
  AlertDialogButton,
  ProgressCircular,
  Toast,
  BottomToolbar,
  Icon,
} from "react-onsenui";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import ParticlesBg from "particles-bg";
import getCards from "../../../helpers/data/getCards";
import Card from "../../shared/Card/Card";
import scoreData from "../../../helpers/data/scoreData.js";
import "./Game.scss";

class Game extends React.Component {
  state = {
    loading: true,
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    stack: [],
    nonMatches: [],
    selectedCard: {
      value: "first",
    },
    matches: 0,
    highScore: null,
    toastOpen: false,
    toastText: "",
    rulesOpen: false,
    gameFinished: false,
  };

  componentDidMount() {
    const { authed, player } = this.props;
    if (authed) {
      this.getHighScore(player);
    }
    this.getCards();
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.player !== prevProps.player) {
      if (this.props.player.id !== undefined)
        this.getHighScore(this.props.player);
    }
  }

  getHighScore = (player) => {
    scoreData
      .getHighestScoreByPlayerId(player.id)
      .then((response) => this.setState({ highScore: response }))
      .catch((error) => console.error("error getting high score", error));
  };

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
  };

  clearSelectedCard = () => {
    this.setState({
      selectedCard: {
        value: "cleared",
      },
    });
  };

  handleNoMatch = (cardOne, cardTwo) => {
    this.clearSelectedCard();
    this.setState({ nonMatches: [cardOne, cardTwo] });
  };

  handleMatch = (cardOne, cardTwo) => {
    let { matches } = this.state;
    matches++;
    this.setState({ matches });
    if (matches === 18) {
      this.finish();
    }
    this.clearSelectedCard();
  };

  addScore = (score) => {
    scoreData
      .addScore(score)
      .then(() => this.props.updateAppHighScores())
      .catch((error) => console.error("error adding score to db:", error));
  };

  newHighScore = (score) => {
    this.setState({ highScore: score });
    this.toaster("Nice! You just got a new high score!");
  };

  firstWin = (score) => {
    this.setState({ highScore: score });
    this.toaster("Congrats! you won your first game!");
  };

  noAuthWin = (time) => {
    this.toaster(`You finished in ${time}! Login or create an account to save your next score!`);
  }

  closeToast = () => {
    this.setState({ toastOpen: false, toastText: "" });
  };

  toaster = (text) => {
    this.setState({ toastText: text, toastOpen: true });
    setTimeout(() => {
      this.closeToast();
    }, 4000);
  };

  finish = () => {
    this.stopTimer();
    this.setState({ gameFinished: true });
    const { timerTime } = this.state;
    const centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2); 
    const formattedTime = `${minutes}:${seconds}:${centiseconds}`; 
    if (this.props.authed) {
      const { highScore } = this.state; 
      const scoreToAdd = {
        playerId: this.props.player.id,
        raw: timerTime,
        time: formattedTime,
      };
      this.addScore(scoreToAdd);
      if (highScore === null) {
        this.firstWin(scoreToAdd);
      } else if (highScore.raw > scoreToAdd.raw) {
        this.newHighScore(scoreToAdd);
      } 
    } else this.noAuthWin(formattedTime);
  };

  openRules = () => {
    this.setState({ rulesOpen: true });
  };

  resetGame = () => {
    this.stopTimer();
    this.setState({
      gameFinished: false,
      loading: true,
      timerStart: 0,
      timerTime: 0,
      stack: [],
      selectedCard: {
        value: "first",
      },
      matches: 0,
    });
    setTimeout(() => {
      this.getCards();
      this.setState({ loading: false });
    }, 1000);
  };

  closeRules = () => {
    this.setState({ rulesOpen: false });
  };

  render() {
    const {
      loading,
      timerOn,
      timerTime,
      stack,
      selectedCard,
      matches,
      nonMatches,
      toastOpen,
      toastText,
      rulesOpen,
      gameFinished,
    } = this.state;
    const { authed, player } = this.props;
    const rowOne = stack.slice(0, 6);
    const rowTwo = stack.slice(6, 12);
    const rowThree = stack.slice(12, 18);
    const rowFour = stack.slice(18, 24);
    const rowFive = stack.slice(24, 30);
    const rowSix = stack.slice(30, 36);
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);

    return authed && player === null ? (
      <></>
    ) : (
      <Page>
        { toastOpen ? <Toast isOpen={true}><div className="toast-text">
            {toastText}
    </div></Toast> : <></> }
        <Col className="time-column">
          <div className="time">
            {minutes}:{seconds}:{centiseconds}
          </div>
        </Col>
        {loading ? (
          <Col className="loader-container">
            <ProgressCircular
              className="loading-circle"
              modifier="material"
              indeterminate
            />
          </Col>
        ) : (
          <>
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
          </>
        )}

        <BottomToolbar modifier="material" className="game-bar">
          {authed ? (
            <div className="game-bar-left">
              <div className="icon-auth-container">
                <Icon
                  className="logged-in"
                  size={30}
                  icon="fa-check-circle"
                ></Icon>
                logged in as<div className="player-username">{player.userName}</div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="game-bar-right">
            {timerOn || gameFinished ? (
              <Button
                onClick={this.resetGame}
                modifier="material"
                className="reset-button"
              >
                Reset
              </Button>
            ) : (
              <>
                <Button
                  onClick={this.openRules}
                  modifier="material"
                  className="custom-button"
                >
                  How To Play
                </Button>
                {authed ? (
                  <Link className="custom-button" to={"/"}>
                    <Button className="custom-button" modifier="material">
                      Home
                    </Button>
                  </Link>
                ) : (
                  <Link className="custom-button" to={"/sign-up"}>
                    <Button className="custom-button" modifier="material">
                      Login / Create Account
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </BottomToolbar>
        {rulesOpen ? (
          <AlertDialog isOpen={true} onCancel={this.closeRules} cancelable>
            <div className="alert-dialog-title">How To Play</div>
            <div className="alert-dialog-content">
              -Tap a card to flip it over and reveal the face value.
              <br />
              -Time starts as soon as the first card's face is shown.
              <br />
              -Flip over another card. If it is a match, the cards will remain
              flipped.
              <br />
              -If the cards do not match, thy will flip back over.
              <br />
              -Try to remember which cards are where, and match them all as fast
              as possible to win!
            </div>
            <div className="alert-dialog-footer">
              <AlertDialogButton
                onClick={this.closeRules}
                className="alert-dialog-button"
              >
                OK!
              </AlertDialogButton>
            </div>
          </AlertDialog>
        ) : (
          <></>
        )}

        {gameFinished ? <ParticlesBg type="lines" bg={true} /> : <></>}
      </Page>
    );
  }
}

export default Game;
