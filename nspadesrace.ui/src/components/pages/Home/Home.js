import React from "react";
import { Link } from "react-router-dom";
import { Page, Button } from "react-onsenui";

class Home extends React.Component {
  render() {
    return (
      <Page>
        <p>Home page?</p>
            <Link to={"/testone"}>
          <Button>page 1</Button>
        </Link>
      </Page>
    );
  }
}

export default Home;
