import React from 'react';
import ReactCardFlip from 'react-card-flip';

class Card extends React.Component {
    state = {
        isFlipped: false,
    }

    handlePress = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({ isFlipped: !prevState.isFlipped}));
    }

    render() {
        return (
            <ReactCardFlip>
                <img className="game-card" src="" alt="card back" onClick={this.handlepress} ></img>
                <img className="game-card" src="" alt="card front" onClick={this.handlepress} ></img>
            </ReactCardFlip>
        );
    }
}

export default Card;