import React from "react";
import { Page, Col, Row } from "react-onsenui";
import getCards from "../../../helpers/data/getCards";
import Card from "../../shared/Card/Card";
import playerData from "../../../helpers/data/playerData.js";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "./Game.scss";

class Game extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    player: {},
    stack: [],
    nonMatches: [],
    selectedCard: {
      value: 'first',
    },
    matches: 0,
  };

  componentDidMount() {
    this.getPlayer(this.props.firebaseUid);
    this.getCards();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.firebaseUid !== prevProps.firebaseUid) {
      this.getPlayer(this.props.firebaseUid);
    }
  }

  getPlayer = (uid) => {
    playerData
      .getPlayerByFirebaseUid(uid)
      .then((response) => this.setState({ player: response }))
      .catch((error) => console.error("error getting user", error));
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

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
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

  finish = () => {
    this.stopTimer();
    if (this.props.authed) {
      const { timerTime } = this.state;
      let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
      let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
      let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
      const scoreToAdd = {
        playerId: this.state.player.id,
        time: `${minutes}:${seconds}:${centiseconds}`,
      }
      console.log(scoreToAdd);
    }
  }

  render() {
    const { timerTime, stack, selectedCard, matches, nonMatches } = this.state;
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
          <h1 className="time">
            {minutes} : {seconds} : {centiseconds}
          </h1>
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
        <Col className="bottom-column">
          <h1>Probably buttons</h1>
        </Col>
      </Page>
    );
  }
}

export default Game;
