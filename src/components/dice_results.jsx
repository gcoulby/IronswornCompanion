import React, { Component } from "react";
import RollIcon from "./rollIcon";
class DiceResults extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div key="rollButtonRow" className="row">
          <div className="col">
            <button key="roll-btn" className="btn btn-block btn-dark" onClick={() => this.props.onRollClick()}>
              <RollIcon />
              Roll
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <table className="table">
            <tbody id="results">
              {this.props.results.map((result) => (
                <tr key={this.props.results.indexOf(result)}>
                  <td>
                    <h6>D{result.sides}</h6>
                  </td>
                  <td>
                    <h6>{result.value}</h6>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default DiceResults;
