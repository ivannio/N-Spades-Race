import React from "react";
import { Link } from "react-router-dom";
import {
  Page,
  List,
  Col,
  ListItem,
  Button,
  Toolbar,
  BottomToolbar,
  ToolbarButton,
  ProgressCircular,
  Icon,
} from "react-onsenui";
import ReactCardFlip from "react-card-flip";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "./Achievements.scss";

class Achievements extends React.Component {
  state = {
    notAchieved: null,
    cardFlipped: false,
  };

  componentDidMount() {
    const { achievements, playerAchieved } = this.props;
    let achievedIds = [];
    playerAchieved.forEach((a) => {
      achievedIds.push(a.id);
    });
    const notAchieved = achievements.filter(
      (achievement) => !achievedIds.includes(achievement.id)
    );
    this.setState({ notAchieved });
  }

  handleClick = () => {    
    this.props.toggleGold();
  };

  render() {
    const { achievements, playerAchieved, gilded } = this.props;
    const { notAchieved } = this.state;
    return notAchieved === null ? (
      <Col className="loader-container">
        <ProgressCircular
          className="loading-circle"
          modifier="material"
          indeterminate
        />
      </Col>
    ) : (
      <Page
        renderToolbar={() => (
          <>
            <Toolbar modifier="material">
              <div className="center">
                <div className="achievements-header">Achievements</div>
              </div>
            </Toolbar>
            <BottomToolbar className="bottom-score-toolbar">
              <Link className="home-toolbar-button" to={"/"}>
                <ToolbarButton className="home-toolbar-button">
                  <Icon size={29} icon="fa-home"></Icon>
                </ToolbarButton>
              </Link>
              <Link
                to={"/scores"}
                className="custom-button button button--material"
                style={{ textDecoration: "none" }}
              >
                Scores
              </Link>
              <Button
                modifier="material"
                onClick={this.props.logOutUser}
                className="custom-button"
              >
                Logout
              </Button>
            </BottomToolbar>
          </>
        )}
      >
        <List modifier="material" className="achievements-list">
          {playerAchieved.map((achievement) => (
            <ListItem
              className="achievement-list-item"
              modifier="material"
              expandable
            >
              <div className="left">
                <Icon
                  className="achieved-icon"
                  size={40}
                  icon="fa-trophy"
                ></Icon>
              </div>
              <div className="center achieved-center">
                <div className="achieved-title">{achievement.title}</div>
                <div className="achieved-tag">achieved!</div>
              </div>

              <div className="expandable-content achievement-description">
                {achievement.description}
              </div>
            </ListItem>
          ))}
        </List>
        <List modifier="material" className="achievements-list">
          {notAchieved.map((achievement) => (
            <ListItem
              className="achievement-list-item"
              modifier="material"
              expandable
            >
              <div className="left">
                <Icon
                  className="not-achieved-icon"
                  size={40}
                  icon="fa-trophy"
                ></Icon>
              </div>
              <div className="center">{achievement.title}</div>
              <div className="expandable-content achievement-description">
                {achievement.description}
              </div>
            </ListItem>
          ))}
          {playerAchieved.length === achievements.length ? (
            <ListItem className="achievement-list-item" modifier="material">
              <div className="left">
                <Icon
                  className="unlocked-icon"
                  size={40}
                  icon="fa-lock-open"
                ></Icon>
              </div>
              <div className="center">Tap the card below to toggle gold cards!</div>
            </ListItem>
          ) : (
            <ListItem
              className="achievement-list-item"
              modifier="material"
              expandable
            >
              <div className="left">
                <Icon className="locked-icon" size={40} icon="fa-lock"></Icon>
              </div>
              <div className="center">???????</div>
              <div className="expandable-content achievement-description">
                Unlock all 3 achievements to earn a reward
              </div>
            </ListItem>
          )}
        </List>
        {playerAchieved.length === achievements.length ? (
          <Col className="home-header-column">
            <ReactCardFlip
              flipSpeedBackToFront={0.3}
              flipSpeedFrontToBack={0.3}
              isFlipped={gilded}
            >
              <div
                className="normal-reward-card"
                onClick={this.handleClick}
              ></div>
              <div
                className="gold-reward-card"
                onClick={this.handleClick}
              ></div>
            </ReactCardFlip>
          </Col>
        ) : (
          <Col className="home-header-column">
            <div className="normal-reward-card"></div>
          </Col>
        )}
      </Page>
    );
  }
}

export default Achievements;
