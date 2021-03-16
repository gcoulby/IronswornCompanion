import React, { Component } from "react";
class UnselectedPlayer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Error</h1>
        <div className="alert alert-danger" role="alert">
          You must select a character from the players tab
        </div>
      </React.Fragment>
    );
  }
}

export default UnselectedPlayer;
