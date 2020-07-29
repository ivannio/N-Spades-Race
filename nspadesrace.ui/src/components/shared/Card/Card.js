import React from "react";
import ReactCardFlip from "react-card-flip";
import "./Card.scss";

class Card extends React.Component {
  state = {
    isFlipped: false,
  };

    componentDidUpdate(prevProps, prevState) { 
         if (this.props.nonMatches !== prevProps.nonMatches) {
          if (this.props.card.id === this.props.nonMatches[0].id || this.props.card.id === this.props.nonMatches[1].id ) {
            setTimeout(
              () => {
                this.concealValue();
              }, 
              400
            );
          }
      } 
    }

  revealValue = () => {
    this.setState({ isFlipped: true });
  };

  concealValue = () => {
    this.setState({ isFlipped: false });
  };  

  handleClick = (e) => {
    e.preventDefault();
    this.revealValue();
     const { card, selectedCard } = this.props;
        if (selectedCard.value === 'first') {
            this.props.setSelectedCard(card);
            this.props.startTimer();   
        } else if (selectedCard.value === 'cleared') {
            this.props.setSelectedCard(card);
        } else if (selectedCard.value === card.value) {
            this.props.handleMatch(selectedCard, card)
        } else {
            this.props.handleNoMatch(selectedCard, card);
        }     
  };  

  render() {
    const { isFlipped } = this.state;
    const { card } = this.props;
    return (
      <ReactCardFlip flipSpeedBackToFront={0.3} flipSpeedFrontToBack={0.3} isFlipped={isFlipped}>
        <div
          className="game-card-img"
          onClick={this.handleClick}
          style={{
            backgroundImage:
              "url(https://raw.githubusercontent.com/ivannio/N-Spades-Race/game-setup/nspadesrace.ui/src/assets/images/cards/back.jpeg)",
          }}
        ></div>
        <div
          className="game-card-img"
          style={{
            backgroundImage: `url(https://raw.githubusercontent.com/ivannio/N-Spades-Race/game-setup/nspadesrace.ui/src/assets/images/cards/${card.value}.jpeg)`,
          }}
        ></div>
      </ReactCardFlip>
    );
  }
}

export default Card;
