import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RollIcon from "./rollIcon";
import DiceRoller from "./dice_roller";
import Modal from "./modal";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Link } from 'react-router-dom';

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

  clearOutputValue = () => {
    this.setState({ outputValue: "" });
  };

  handleRollHistoryRowClick = (result) => {
    const outputValue = `${this.state.outputValue} ${result}`;
    this.setState({ outputValue });
  };

  handleAskOracleRoll(min) {
    let rn = this.diceRoller.roll([100], true, false)[0].value;
    let ans = rn >= min ? `[${rn}] Yes` : `[${rn}] No`;

    this.setState({ outputValue: ans });
  }

  handleOnClick = (evt) => {
    var range = document.createRange();
    range.selectNodeContents(evt.target);
    var selection=window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  };

  handleOracleClick = (tbl) => {
    const selectedOracleTable = this.props.oracles.getOracleTableAsArray(tbl);
    this.setState({ selectedOracleTable });
  };

  componentDidUpdate(prevProps, prevState) {
    this.props.onComponentUpdate(prevProps, prevState);
  }

  render() {
    const gfmRenderers = {
      link: (props) => {
        const page = props.href.split('/')[1];

        if (page === 'Oracles') {
          return <span className="pseudolink" onClick={() => {
            this.setState({ selectedOracleTable: this.props.oracles.tables.find(t => t.title === 'Action').prompts });
          }}>{props.node.children[0].value}</span>
        }

        if (page === 'Moves') {
          const moveName = props.href.replace(/.*\//, '').replace(/_/g, ' ');
          const move = JSON.parse(localStorage.getItem('game_state')).moves.find(m => m.Name === moveName);
          return <Link to={`/moves?moveName=${moveName}`}>{props.node.children[0].value}</Link>
        }

      },
      paragraph: "span"
    }

    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h1>Oracle Roller</h1>

            <div className="row mb-4">
              <div className="col">
                <span className="modesto mt-3">Ask the Oracle:</span>
                <br />
                <div className="" role="group" aria-label="Basic example">
                  <button onClick={() => this.handleAskOracleRoll(91)} type="button" className="btn btn-outline-dark">
                    <RollIcon />
                    Small Chance
                  </button>
                  <button onClick={() => this.handleAskOracleRoll(76)} type="button" className="btn btn-outline-dark">
                    <RollIcon />
                    Unlikely
                  </button>
                  <button onClick={() => this.handleAskOracleRoll(51)} type="button" className="btn btn-outline-dark">
                    <RollIcon />
                    50/50
                  </button>
                  <button onClick={() => this.handleAskOracleRoll(26)} type="button" className="btn btn-outline-dark">
                    <RollIcon />
                    Likely
                  </button>
                  <button onClick={() => this.handleAskOracleRoll(11)} type="button" className="btn btn-outline-dark">
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
            <Tabs defaultActiveKey={`oracle_source_${this.props.oracles.getOracleTableSources()[0]}`} id="uncontrolled-tab-example">
              {this.props.oracles.getOracleTableSources().map((src) => (
                <Tab eventKey={`oracle_source_${src}`} title={src}>
                  <React.Fragment>
                    <div className="row">
                      <div className="col mt-4">
                        <Modal
                          modalWidth={1000}
                          modalHeight={800}
                          buttonText="Roll History (newest first)"
                          modalComponent={
                            <React.Fragment>
                              <div className="alert alert-secondary">
                                Click on a result to add it to the result box. Then click the result box to copy it to
                                clipboard. To copy multiple results at once (e.g., Action + Theme) click multiple rows
                                to add each result to the box. You can then click the result box to copy.
                              </div>
                              <button className="btn btn-dark" onClick={() => this.clearOutputValue()}>
                                <i className="fa fa-times" aria-hidden="true"></i>&nbsp; Clear
                              </button>
                              <span
                                type="text"
                                className="form-control my-4"
                                style={{height: "auto"}}
                                aria-label="Character Descriptor"
                                aria-describedby="basic-addon2"
                                onClick={(e) => this.handleOnClick(e)}
                                title="Click to copy" >
                                <ReactMarkdown id="" plugins={[gfm]} renderers={gfmRenderers} onFocus={(e) => this.handleOnClick(e)}>
                                  {this.state.outputValue || "Result (click to copy)"}
                                </ReactMarkdown>
                              </span>
                              <table className="table table-striped table-hover">
                                <thead>
                                  <th>Theme</th>
                                  <th>Table</th>
                                  <th>Result</th>
                                </thead>
                                {this.props.oracles.rollHistory.map((r) => (
                                  <React.Fragment>
                                    <tr onClick={() => this.handleRollHistoryRowClick(r.Result)}>
                                      <td>{r.Theme}</td>
                                      <td>{r.Table}</td>
                                      <td>{r.Result}</td>
                                    </tr>
                                  </React.Fragment>
                                ))}
                              </table>
                            </React.Fragment>
                          }
                          icon="fas fa-history"
                          title="Roll History"
                        />
                        <span
                          type="text"
                          className="form-control my-4"
                          style={{height: "auto"}}
                          aria-label="Character Descriptor"
                          aria-describedby="basic-addon2"
                          onClick={(e) => this.handleOnClick(e)}
                          title="Click to copy">
                          <ReactMarkdown id="" plugins={[gfm]} renderers={gfmRenderers} onFocus={(e) => this.handleOnClick(e)}>
                            {this.state.outputValue || "Result (click to copy)"}
                          </ReactMarkdown>
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-4 oracle-tables">
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
                      <div className="col-12 col-lg-8 oracle-results">
                        <table className="table table-striped ">
                          <tbody>
                            {this.state.selectedOracleTable.map((t) => (
                              <tr>
                                <td>
                                  <ReactMarkdown id="" plugins={[gfm]} renderers={gfmRenderers}>{t}</ReactMarkdown>
                                </td>
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
