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
import achievementData from "../../../helpers/data/achievementData.js";
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
    toastOpen: false,
    toastText: "",
    rulesOpen: false,
    gameFinished: false,
  };

  // G A M E  S E T U P

  componentDidMount() { 
    this.getCards();
    this.setState({ loading: false });
  } 

  getCards = () => {
    const stack = getCards.getCards();
    this.setState({ stack });
  };

  // G A M E  F U N C T I O N A L I T Y

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

  // P O S T - G A M E  F U N C T I O N A L I T Y  /  U P D A T E S

  finish = () => {
    this.stopTimer();
    this.setState({ gameFinished: true });
    const { timerTime } = this.state;
    const centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    const formattedTime = `${minutes}:${seconds}:${centiseconds}`;
    if (this.props.authed) {
      const highScore = this.props.myHighScores[0];
      const scoreToAdd = {
        playerId: this.props.player.id,
        raw: timerTime,
        time: formattedTime,
      };
      this.addScore(scoreToAdd);
      if (highScore === undefined) {
        this.firstWin(scoreToAdd.time);
      } else if (highScore.raw > scoreToAdd.raw) {
        this.newHighScore(scoreToAdd.time);
      } else {
        this.authWin(scoreToAdd.time);
      }
    } else this.noAuthWin(formattedTime);
  };

  addScore = (score) => {
    scoreData
      .addScore(score)
      .then(() => this.props.updateAppHighScores())
      .then(() => {
        if (this.props.playerAchieved.length !== 3) {
          this.checkAchievements();
        }
      })
      .catch((error) => console.error("error adding score to db:", error));
  };

  addPlayerAchieved = (achievementId) => {
    const achievementToAdd = {
      playerId: this.props.player.id,
      achievementId,
    };
    achievementData
      .addPlayerAchieved(achievementToAdd)
      .then(() => this.props.updatePlayerAchieved())
      .catch((error) =>
        console.error("error adding achieved achievement for player", error)
      );
  };

  getAndCheckConsistentlyQuickResults = () => {
    achievementData
      .checkConsistentlyQuick(this.props.player.id)
      .then((response) => this.checkCQResults(response))
      .catch((error) =>
        console.error("error getting results for achievement", error)
      );
  };

  checkCQResults = (count) => {
    console.log("checked cq", count);
    if (count.count > 4) {
      this.addPlayerAchieved(2);
      this.toaster("Achievement Unlocked! Finish in under 1:30 5 times");
    }
  };

  getAndCheckDoubleDigitsResults = () => {
    achievementData
      .checkDoubleDigits(this.props.player.id)
      .then((response) => this.checkDDResults(response))
      .catch((error) =>
        console.error("error getting results for achievement", error)
      );
  };

  checkDDResults = (count) => {
    console.log("checked dd", count);
    if (count.count > 9) {
      this.addPlayerAchieved(3);
      this.toaster("Achievement Unlocked! Finish 10 times");
    }
  };

  getAndCheckLeaderboardMaterialResults = () => {
    achievementData
      .checkLeaderboardMaterial(this.props.player.id)
      .then((response) => this.checkLMResults(response))
      .catch((error) =>
        console.error("error getting results for achievement", error)
      );
  };

  checkLMResults = (count) => {
    console.log("checked lm", count.count);
    if (count.count > 0) {
      this.addPlayerAchieved(4);
      this.toaster("Achievement Unlocked! Finish in under 45 seconds");
    }
  };

  checkAchievements = () => {
    const { playerAchieved } = this.props;
    let achievedIds = [];
    playerAchieved.forEach((a) => {
      achievedIds.push(a.id);
    });
    if (!achievedIds.includes(2)) {
      this.getAndCheckConsistentlyQuickResults();
    }
    if (!achievedIds.includes(3)) {
      this.getAndCheckDoubleDigitsResults();
    }
    if (!achievedIds.includes(4)) {
      this.getAndCheckLeaderboardMaterialResults();
    }
  };

  // P A G E  F U N C T I O N A L I T Y  /  U T I L I T Y

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

  toaster = (text) => {
    this.setState({ toastText: text, toastOpen: true });
    setTimeout(() => {
      this.closeToast();
    }, 6000);
  };

  closeToast = () => {
    this.setState({ toastOpen: false, toastText: "" });
  };

  firstWin = (time) => {
    this.toaster(
      `Finished in ${time}! Your first score has been saved. Visit your high scores page to see your 10 best and try to keep replacing them!`
    );
  };

  newHighScore = (time) => {
    this.toaster(`Nice job! ${time} is your new fastest time!`);
  };

  authWin = (time) => {
    this.toaster(`Finished in ${time}!`);
  };

  noAuthWin = (time) => {
    this.toaster(
      `Finished in ${time}! Login or create an account to save your next time!`
    );
  };

  openRules = () => {
    this.setState({ rulesOpen: true });
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
    const { authed, player, gilded } = this.props;
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
        {toastOpen ? (
          <Toast isOpen={true}>
            <div className="toast-text">{toastText}</div>
          </Toast>
        ) : (
          <></>
        )}
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
                  gilded={gilded}
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
                  gilded={gilded}
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
                  gilded={gilded}
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
                  gilded={gilded}
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
                  gilded={gilded}
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
                  gilded={gilded}
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
                logged in as
                <div className="player-username">{player.userName}</div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="game-bar-right">
            {timerOn ? (
              <Button
                onClick={this.resetGame}
                modifier="material"
                className="reset-button"
              >
                Reset
              </Button>
            ) : gameFinished ? (
              <>
                <Button
                  onClick={this.resetGame}
                  modifier="material"
                  className="primary-button"
                >
                  Play Again
                </Button>
                <Link
                  className="button--material button custom-button"
                  style={{ textDecoration: "none" }}
                  to={"/scores"}
                >
                  High Scores
                </Link>
              </>
            ) : (
              <>
                <Button
                  onClick={this.openRules}
                  modifier="material"
                  className="custom-button"
                >
                  How To Play
                </Button>
                <Link
                  className="button--material button custom-button"
                  style={{ textDecoration: "none" }}
                  to={"/"}
                >
                  Home
                </Link>
              </>
            )}
          </div>
        </BottomToolbar>
        {rulesOpen ? (
          <AlertDialog
            modifier="material"
            isOpen={true}
            onCancel={this.closeRules}
            cancelable
          >
            <div className="alert-dialog-title">How To Play</div>
            <div className="alert-dialog-content">
              <p>Tap a card to flip it over and reveal the face value</p>
              <p>Time will start as soon as the first card's face is shown</p>
              <p>
                Tap to flip another card; If it matches the first, both cards
                will remain flipped
              </p>
              <p>If the cards do not match, both cards will flip back over</p>
              <p>Find all of the matches as fast as possible!</p>
            </div>
            <div className="alert-dialog-footer">
              <AlertDialogButton
                modifier="material"
                onClick={this.closeRules}
                className="alert-dialog-button"
              >
                got it!
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
