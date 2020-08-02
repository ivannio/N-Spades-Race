import React from "react";
import { Link } from "react-router-dom";
import { Page, List, Button, BottomToolbar, ToolbarButton, Icon } from "react-onsenui";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

class Achievements extends React.Component {
  render() {
    const { authed, player } = this.props;
    return (
      <Page
        renderToolbar={() => (
          <BottomToolbar className="bottom-score-toolbar">
            <Link className="home-toolbar-button" to={"/"}>
              <ToolbarButton className="home-toolbar-button">
                <Icon size={29} icon="fa-home"></Icon>
              </ToolbarButton>
            </Link>
               <Button
                  modifier="material"
                  onClick={this.props.logOutUser}
                  className="custom-button"
                >
                  Logout
                </Button> 
          </BottomToolbar>
        )}
      >
        <List modifier="material" className="leaderboard-list">
          <div className="leaderboard-title">Achievements</div>
        </List>
      </Page>
    );
  }
}

export default Achievements;
