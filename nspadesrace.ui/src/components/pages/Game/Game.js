import React from "react";
import { Page, Col, Row } from "react-onsenui";
import getCards from '../../../helpers/data/getCards';
import Card from '../../shared/Card/Card';
import playerData from "../../../helpers/data/playerData.js";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "./Game.scss";

class Game extends React.Component {
  state = {
    toastOpen: false,
    player: {},
    loading: false,
    rowOne: [],
    rowTwo : [],
    rowThree: [],
    rowFour: [],
    rowFive: [],
    rowSix: [],
  };

  getPlayer = (uid) => {
    playerData.getPlayerByFirebaseUid(uid)
    .then((response) => this.setState({ player: response }))
    .catch((error) => console.error("error getting user", error))
  }

  getCards = () => {
    const cards = getCards.getCards();
    this.setState({ 
      rowOne: cards.rowOne,
      rowTwo : cards.rowTwo,
      rowThree: cards.rowThree,
      rowFour: cards.rowFour,
      rowFive: cards.rowFive,
      rowSix: cards.rowSix,
     });
  }

  componentDidMount() {
    this.getPlayer(this.props.firebaseUid);
    this.getCards();    
  }

  componentDidUpdate(prevProps, prevState) {
   if (this.props.firebaseUid !== prevProps.firebaseUid) {
     this.getPlayer(this.props.firebaseUid)
   }
  }

  closeToast = () => {
    this.setState({ toastOpen: false });
  };

  render() {
    const { rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix } = this.state;
    
    return (
      <Page>
        <Col className="time-column">
        <h1>TIME GOES HERE PLACEHOLDER</h1>
        </Col>
        <Col className='card-container'>
          <Row className="card-row">{ rowOne.map((card) => <Card key={card.id} card={card}></Card>)}</Row>
          <Row className="card-row">{ rowTwo.map((card) => <Card key={card.id} card={card}></Card>)}</Row>
          <Row className="card-row">{ rowThree.map((card) => <Card key={card.id} card={card}></Card>)}</Row>
          <Row className="card-row">{ rowFour.map((card) => <Card key={card.id} card={card}></Card>)}</Row>
          <Row className="card-row">{ rowFive.map((card) => <Card key={card.id} card={card}></Card>)}</Row>
          <Row className="card-row">{ rowSix.map((card) => <Card key={card.id} card={card}></Card>)}</Row>          
        </Col>
        <Col className='bottom-column'>
        <h1>Probably buttons</h1>
        </Col>        
      </Page>
    );
  }
}

export default Game;
