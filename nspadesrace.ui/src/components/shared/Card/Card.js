import React from 'react';
import ReactCardFlip from 'react-card-flip';
import './Card.scss';

class Card extends React.Component {
    state = {
        isFlipped: false,
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({ isFlipped: !prevState.isFlipped}));
    }

    render() {
        const { isFlipped } = this.state;
        const { card } = this.props;
        return (<div className='card-flipper'>
            <ReactCardFlip isFlipped={isFlipped}>
                <img className="game-card-img" src="https://raw.githubusercontent.com/ivannio/N-Spades-Race/game-setup/nspadesrace.ui/src/assets/images/cards/back.jpeg" alt="card back" onClick={this.handleClick} ></img>
                <img className="game-card-img" src={`https://raw.githubusercontent.com/ivannio/N-Spades-Race/game-setup/nspadesrace.ui/src/assets/images/cards/${card.value}.jpeg`} alt="card front" onClick={this.handleClick} ></img>
            </ReactCardFlip>
        </div>
            
        );
    }
}

export default Card;