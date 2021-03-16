import React, { Component } from "react";
class OracleRoller extends Component {
  state = {
    outputValue: "",
  };

  handleOnRoll() {
    let rand = this.props.oracles.getRandomPromptFromOracleTable(
      this.props.tableName
    );
    this.setState({ outputValue: rand });
  }
  handleOnClick = (evt) => {
    evt.target.select();
    evt.target.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };

  render() {
    return (
      <React.Fragment>
        <div
          id={`${this.props.tableName}_result`}
          className="row oracle_result mt-2"
        >
          <div className="col-6">
            <button
              className="btn btn-dark btn-block"
              type="button"
              onClick={() => this.handleOnRoll()}
            >
              <i className="fas fa-dice-d20"></i> Roll {this.props.tableName}
            </button>
          </div>
          <div className="col-6">
            <textarea
              type="text"
              className="form-control"
              placeholder="Result (click to copy)"
              aria-label="Character Descriptor"
              aria-describedby="basic-addon2"
              value={this.state.outputValue}
              onFocus={(e) => this.handleOnClick(e)}
              title="Click to copy"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OracleRoller;
