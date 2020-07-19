import React from "react";
import { Link } from "react-router-dom";
import { Page, Button, Toolbar, ToolbarButton } from "react-onsenui";
import "onsenui/css/onsenui.css";
import "onsenui/css/dark-onsen-css-components.css";

class Home extends React.Component {
  render() {
    const { authed } = this.props
    return (
      <Page
        renderToolbar={() => (
          <Toolbar modifier="transparent">
            <div className="right">
              <ToolbarButton>
                { authed ? <Button onClick={this.props.logOutUser}>Logout</Button> : <Link to={'/sign-up'} ><Button >Login</Button></Link> }       
                </ToolbarButton>
            </div>
          </Toolbar>
        )}
      >
        <p>{ authed ? "We logged tf in" : "You needa login" }</p>
        <Link to={"/testone"}>
          <Button>page 1</Button>
        </Link>
      </Page>
    );
  }
}

export default Home;
