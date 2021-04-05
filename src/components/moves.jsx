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
    console.log(move);
    this.setState({ selectedMove: { ...move } });
  };

  changeModalState = (showMoves) => {
    this.setState({ showMoves });
  };

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }
  render() {
    return (
      <React.Fragment>
        <button className="btn btn-outline-light" onClick={() => this.changeModalState(true)}>
          <i className="game-icon game-icon-move icon-md" aria-hidden="true"></i> Moves Reference
        </button>
        {this.state.showMoves ? (
          <React.Fragment>
            <div id="moves" className="popup text-left" data-width="1000" data-height="600">
              <div className="overlay" onClick={() => this.changeModalState(false)}></div>
              <div className="card text-dark">
                <div className="card-header bg-dark text-light modesto" style={{ height: 60 + "px" }}>
                  <div className="row">
                    <div className="col-8">
                      <h6>
                        <i className="game-icon game-icon-crystal-ball icon-md" aria-hidden="true"></i> Moves Reference
                      </h6>
                    </div>
                    <div className="col text-right">
                      <button className="btn btn-sm btn-outline-light" onClick={() => this.changeModalState(false)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div id="moves-body" className="card-body">
                  <Tabs defaultActiveKey="move_type_Adventure" id="uncontrolled-tab-example">
                    {[...new Set(this.props.moves.map((m) => m.Type))].map((m) => (
                      <Tab eventKey={`move_type_${m}`} title={m}>
                        <div className="row">
                          <div className="col-4 moves-list">
                            <table className="table table-striped table-hover">
                              {/* <thead className="text-light bg-dark">
                                <th style={{ fontWeight: 100 }}>{thm}</th>
                              </thead> */}
                              <tbody>
                                {this.props.moves
                                  .filter((f) => f.Type == m)
                                  .map((m2) => (
                                    <tr onClick={() => this.handleMoveSelect(m2)}>
                                      <td className="move-button">{m2.Name}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="col-8">
                            <div className="move-display py-3 px-2">
                              {this.state.selectedMove ? (
                                <React.Fragment>
                                  <h6>{this.state.selectedMove.Name}</h6>
                                  <ReactMarkdown plugins={[gfm]}>{this.state.selectedMove.Text}</ReactMarkdown>
                                </React.Fragment>
                              ) : (
                                React.Fragment
                              )}
                            </div>
                          </div>
                        </div>
                      </Tab>
                    ))}
                  </Tabs>
                </div>
                <div className="card-footer bg-dark text-light" style={{ height: 110 + "px" }}>
                  <div className="col-12">
                    <div className="row">
                      <Roller selectedPlayer={this.props.selectedPlayer} footerDice={this.props.footerDice} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          React.Fragment
        )}
      </React.Fragment>
    );
  }
}

export default Moves;
