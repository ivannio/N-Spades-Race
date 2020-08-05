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
import ParticlesBg from "particles-bg";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "./Achievements.scss";

class Achievements extends React.Component {
  state = {
    notAchieved: null,
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

  render() {
    const { playerAchieved } = this.props;
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
        </List>
      </Page>
    );
  }
}

export default Achievements;
