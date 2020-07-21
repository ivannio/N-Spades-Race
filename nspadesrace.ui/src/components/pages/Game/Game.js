import React from "react";
import { Page } from "react-onsenui";
import playerData from "../../../helpers/data/playerData.js";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "./Game.scss";

class Game extends React.Component {
  state = {
    toastOpen: false,
    player: {},
    loading: false,
  };

  getPlayer = (uid) => {
    playerData.getPlayerByFirebaseUid(uid)
    .then((response) => this.setState({ player: response }))
    .catch((error) => console.error("error getting user", error))
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
   if (this.props.firebaseUid !== prevProps.firebaseUid) {
     this.getPlayer(this.props.firebaseUid)
   }
  }

  closeToast = () => {
    this.setState({ toastOpen: false });
  };

  render() {
    
    return (
      <Page>
            
      </Page>
    );
  }
}

export default Game;
