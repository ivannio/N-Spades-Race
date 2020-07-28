import React from "react";
import { Link } from "react-router-dom";
import { Page, Button, Col, Row, Fab, Icon } from "react-onsenui";
import ParticlesBg from "particles-bg";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "./Home.scss";

class Home extends React.Component {
  render() {
    const { authed, player } = this.props;
    return (
      authed && player === null ? <></> :
      <Page>
        <Col className="home-header-column">
          <h1 className="home-header">N-Mark Spades Race</h1>
        </Col>
        <Col className="home-buttons-column">
          <Row className="home-row">
            <Link className="custom-button" to={"/game"}>
              <Button className="custom-button">
                {authed ? "Play" : "Play Logged Out"}
              </Button>
            </Link>
          </Row>
          { authed ? <Row className="home-row">
            <Link className="custom-button" to={"/scores"}>
              <Button className="custom-button">View High Scores</Button>
            </Link>
          </Row> : <><div className="or">or</div>
          <Row className="home-row">
            <Link className="custom-button" to={"/sign-up"}>
              <Button className="custom-button">Login / Create Account</Button>
            </Link>
          </Row>
          <Row className="home-row">
            <Link className="custom-button" to={"/scores"}>
              <Button className="custom-button">View High Scores</Button>
            </Link>
          </Row></>
          }      
        </Col>
        { authed ? <>
        <h5 className='logout-fab-label'>Logout</h5>
        <Fab onClick={this.props.logOutUser} className='logout-fab' modifier='mini' position='top right'>
        <Icon  icon='fa-sign-out-alt' className='logout-fab-icon' />
     </Fab></> : '' }
        <ParticlesBg color="#E9C46A" num={25} type="cobweb" bg={true} />
      </Page>
    );
  }
}

export default Home;
