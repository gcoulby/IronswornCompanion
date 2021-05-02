import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Roller from "./roller";
import RollIcon from "./rollIcon";
class Moves extends Component {
  state = {
    showMoves: false,
    selectedMove: null,
  };

  handleMoveSelect = (move) => {
    this.setState({ selectedMove: { ...move } });
  };

  handleAskOracleRoll(min) {
    let rn = this.diceRoller.roll([100], true, false)[0].value;
    let ans = rn >= min ? "Yes" : "No";

    this.setState({ outputValue: ans });
  }

  changeModalState = (showMoves) => {
    this.setState({ showMoves });
  };

  componentDidUpdate(prevProps, prevState) {
    this.props.onComponentUpdate(prevProps, prevState);
    let el = document.getElementById("move-preview");
    let tables = el.getElementsByTagName("table");
    if (tables.length > 0) {
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        table.classList.add("table");
        table.classList.add("table-striped");
        table.classList.add("move-table");
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <h1>Moves</h1>

        <div className="row moves-roller">
          <div className="col">
            {/* <Tabs defaultActiveKey="move_type_Adventure" id="uncontrolled-tab-example"> */}
            {/* //{" "} */}
            {/* <Tab eventKey={`move_type_${m}`} title={m}> */}
            <div className="row">
              <div className="col-12 col-lg-4 moves-list">
                <table className="table table-striped table-hover">
                  {[...new Set(this.props.moves.map((m) => m.Type))].map((m) => (
                    <React.Fragment>
                      <thead className="text-light bg-dark">
                        <th style={{ fontWeight: 100 }}>{m}</th>
                      </thead>
                      <tbody>
                        {this.props.moves
                          .filter((f) => f.Type == m)
                          .map((m2) => (
                            <tr onClick={() => this.handleMoveSelect(m2)}>
                              <td className="move-button">{m2.Name}</td>
                            </tr>
                          ))}
                      </tbody>
                    </React.Fragment>
                  ))}
                </table>
              </div>
              <div className="col-12 col-lg-8">
                <hr className="d-xs-block d-lg-none" />
                <div className="row">
                  <div className="col">
                    <div id="move-preview" className="move-display py-3 px-2">
                      {this.state.selectedMove ? (
                        <React.Fragment>
                          <h6>{this.state.selectedMove.Name}</h6>
                          <ReactMarkdown id="" plugins={[gfm]}>
                            {this.state.selectedMove.Text}
                          </ReactMarkdown>
                        </React.Fragment>
                      ) : (
                        React.Fragment
                      )}
                    </div>
                  </div>
                </div>
                <hr className="d-xs-block d-lg-none" />
                <div className="row mb-5 d-xs-block d-lg-none">
                  <div className="col mb-4">
                    <Roller
                      light={true}
                      selectedPlayer={this.props.selectedPlayer}
                      footerDice={this.props.footerDice}
                      burnMomentum={this.props.burnMomentum}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* </Tab> */}
            {/* </Tabs> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Moves;
