import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RollIcon from "./rollIcon";
import DiceRoller from "./dice_roller";
class OracleRoller extends Component {
  state = {
    outputValue: "",
    result: "",
    selectedOracleTable: [],
  };

  constructor() {
    super();
    this.diceRoller = new DiceRoller();
  }

  handleOnRoll(tbl) {
    let rand = this.props.oracles.getRandomPromptFromOracleTable(tbl);
    this.setState({ outputValue: rand });
  }

  handleAskOracleRoll(min) {
    let rn = this.diceRoller.roll([100], true, false)[0].value;
    let ans = rn >= min ? "Yes" : "No";

    this.setState({ outputValue: ans });
  }

  handleOnClick = (evt) => {
    evt.target.select();
    evt.target.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };

  handleOracleClick = (tbl) => {
    const selectedOracleTable = this.props.oracles.getOracleTableAsArray(tbl);
    this.setState({ selectedOracleTable });
  };

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h1>Oracle Roller</h1>

            <div className="row mb-4">
              <div className="col">
                <span className="modesto mt-3">Ask the Oracle:</span>
                <br />
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button onClick={() => this.handleAskOracleRoll(91)} type="button" class="btn btn-outline-dark">
                    <RollIcon />
                    Small Chance
                  </button>
                  <button onClick={() => this.handleAskOracleRoll(76)} type="button" class="btn btn-outline-dark">
                    <RollIcon />
                    Unlikely
                  </button>
                  <button onClick={() => this.handleAskOracleRoll(51)} type="button" class="btn btn-outline-dark">
                    <RollIcon />
                    50/50
                  </button>
                  <button onClick={() => this.handleAskOracleRoll(26)} type="button" class="btn btn-outline-dark">
                    <RollIcon />
                    Likely
                  </button>
                  <button onClick={() => this.handleAskOracleRoll(11)} type="button" class="btn btn-outline-dark">
                    <RollIcon />
                    Almost Certain
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row roller-body">
          <div className="col">
            <Tabs defaultActiveKey="oracle_source_Ironsworn" id="uncontrolled-tab-example">
              {this.props.oracles.getOracleTableSources().map((src) => (
                <Tab eventKey={`oracle_source_${src}`} title={src}>
                  <React.Fragment>
                    <div className="row">
                      <div className="col">
                        <textarea
                          type="text"
                          className="form-control my-4"
                          placeholder="Result (click to copy)"
                          aria-label="Character Descriptor"
                          aria-describedby="basic-addon2"
                          value={this.state.outputValue}
                          onFocus={(e) => this.handleOnClick(e)}
                          title="Click to copy"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 oracle-tables">
                        {this.props.oracles.getOracleTableThemes(src).map((thm) => (
                          // <div className="col-6">
                          <table className="table table-striped table-hover my-0">
                            <thead className="text-light bg-dark">
                              <th style={{ fontWeight: 100 }}>{thm}</th>
                            </thead>
                            <tbody>
                              {this.props.oracles.getOracleTableNames(src, thm).map((tbl) => (
                                <tr onClick={() => this.handleOracleClick(tbl)}>
                                  <td>
                                    <button
                                      className="btn btn-outline-dark roll-button"
                                      onClick={() => this.handleOnRoll(tbl)}
                                    >
                                      <RollIcon />
                                    </button>{" "}
                                    <span>{tbl}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          // </div>

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
                      <div className="col-8 oracle-results">
                        <table className="table table-striped ">
                          <tbody>
                            {this.state.selectedOracleTable.map((t) => (
                              <tr>
                                <td>{t}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
        </div>
      </React.Fragment>
    );
  }
}

export default OracleRoller;
