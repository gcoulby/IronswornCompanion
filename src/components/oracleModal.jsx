import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RollIcon from "./rollIcon";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class OracleModal extends Component {
  state = {
    showOracles: false,
    outputValue: "",
    result: "",
  };

  handleOnRoll(tbl) {
    let rand = this.props.oracles.getRandomPromptFromOracleTable(tbl);
    this.setState({ outputValue: rand });
  }
  handleOnClick = (evt) => {
    evt.target.select();
    evt.target.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };

  changeModalState = (showOracles) => {
    this.setState({ showOracles });
  };

  componentDidUpdate(prevProps, prevState) {
    this.props.onComponentUpdate(prevProps, prevState);
  }

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-outline-light" onClick={() => this.changeModalState(true)}>
          <i className="game-icon game-icon-crystal-ball icon-md" aria-hidden="true"></i> Oracles
        </button>
        {this.state.showOracles ? (
          <React.Fragment>
            <div id="oracle" className="popup text-left" data-width="1000" data-height="600">
              <div className="overlay" onClick={() => this.changeModalState(false)}></div>
              <div className="card text-dark">
                <div className="card-header bg-dark text-light modesto" style={{ height: 60 + "px" }}>
                  <div className="row">
                    <div className="col-8">
                      <h6>
                        <i className="game-icon game-icon-crystal-ball icon-md" aria-hidden="true"></i> Oracles (Click
                        the textbox at the bottom to copy)
                      </h6>
                    </div>
                    <div className="col text-right">
                      <button className="btn btn-sm btn-outline-light" onClick={() => this.changeModalState(false)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div id="oracle-body" className="card-body">
                  <Tabs defaultActiveKey="oracle_source_Ironsworn" id="uncontrolled-tab-example">
                    {this.props.oracles.getOracleTableSources().map((src) => (
                      <Tab eventKey={`oracle_source_${src}`} title={src}>
                        <React.Fragment>
                          <div className="row">
                            {this.props.oracles.getOracleTableThemes(src).map((thm) => (
                              <div className="col-6">
                                <table className="table table-striped">
                                  <thead className="text-light bg-dark">
                                    <th style={{ fontWeight: 100 }}>{thm}</th>
                                  </thead>
                                  <tbody>
                                    {this.props.oracles.getOracleTableNames(src, thm).map((tbl) => (
                                      <tr>
                                        <td>
                                          <button
                                            className="btn btn-outline-dark roll-button"
                                            onClick={() => this.handleOnRoll(tbl)}
                                          >
                                            <RollIcon />
                                          </button>{" "}
                                          {tbl}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              // <ul className="oracle-roller-themes">
                              //   <li key={`oracle-roller-theme-${thm}`}>
                              //     {thm}
                              //     <ul className="oracle-roller-tables">
                              //       {this.props.oracles.getOracleTableNames(src, thm).map((tbl) => (
                              //         <li key={`oracle-roller-table-${tbl}`}>{tbl}</li>
                              //       ))}
                              //     </ul>
                              //   </li>
                              // </ul>
                            ))}
                          </div>

                          {this.props.oracles.tables.map((t) => {
                            if (t.source == src) {
                              return <React.Fragment></React.Fragment>;
                            }
                          })}
                        </React.Fragment>
                      </Tab>
                    ))}
                  </Tabs>
                </div>
                <div className="card-footer" style={{ height: 100 + "px" }}>
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
            </div>
          </React.Fragment>
        ) : (
          React.Fragment
        )}
      </React.Fragment>

      // <React.Fragment key={UniqueKeyGenerator.generate()}>
      //   <div id={`${this.props.tableName}_result`} className="row oracle_result mt-2">
      //     <div className="col-6">
      //       <button className="btn btn-dark btn-block" type="button" onClick={() => this.handleOnRoll()}>
      //         <RollIcon /> Roll {this.props.tableName}
      //       </button>
      //     </div>
      //     <div className="col-6">
      //       <textarea
      //         type="text"
      //         className="form-control"
      //         placeholder="Result (click to copy)"
      //         aria-label="Character Descriptor"
      //         aria-describedby="basic-addon2"
      //         defaultValue={this.state.outputValue}
      //         onFocus={(e) => this.handleOnClick(e)}
      //         title="Click to copy"
      //       />
      //     </div>
      //   </div>
      // </React.Fragment>
    );
  }
}

export default OracleModal;
