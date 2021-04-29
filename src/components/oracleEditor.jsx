import React, { Component } from "react";
import DangerButton from "./dangerButton";
import EditableTable from "./editableTable";
import OracleModal from "./oracleModal";
import TitleBlock from "./titleBlock";
class OracleEditor extends Component {
  state = {
    lastKeyCode: "",
  };

  handleNewOracleTableNameChange = (evt) => {
    const oracles = this.props.oracles;
    oracles.newOracleTableName = evt.target.value;
    this.setState({ oracles });
  };

  handleSelectedOracleSourceChange = (evt) => {
    const oracles = this.props.oracles;
    oracles.selectedOracleSource = evt.target.value;
    oracles.selectedOracleTheme = "";
    oracles.selectedOracleTable = "";
    this.setState({ oracles });
  };

  handleSelectedOracleThemeChange = (evt) => {
    const oracles = this.props.oracles;
    oracles.selectedOracleTheme = evt.target.value;
    oracles.selectedOracleTable = "";
    this.setState({ oracles });
  };

  handleExistingOracleThemeChange = (evt) => {
    const oracles = this.props.oracles;
    oracles.selectedOracleTheme = evt.target.value;
    oracles.tables.map((t) => {
      if (t.title === oracles.selectedOracleTable) {
        t.theme = evt.target.value;
      }
      return t;
    });
    this.setState({ oracles });
  };

  handleNewOracleThemeChange = (evt) => {
    const oracles = this.props.oracles;
    oracles.newOracleTableTheme = evt.target.value;
    this.setState({ oracles });
  };

  handleSelectedOracleTableChange = (evt) => {
    const oracles = this.props.oracles;
    oracles.selectedOracleTable = evt.target.value;
    oracles.selectedOracleTheme = this.props.oracles.tables.find((t) => t.title == evt.target.value)?.theme;
    this.setState({ oracles });
  };

  handleAddOracleTable = () => {
    const oracles = this.props.oracles;
    oracles.tables.push({
      source: "User",
      theme: this.props.oracles.newOracleTableTheme,
      title: this.props.oracles.newOracleTableName,
      core: false,
      prompts: [],
    });
    oracles.newOracleTableName = "";
    this.setState({ oracles });
  };

  handleDeleteOracleTable = (title) => {
    const oracles = this.props.oracles;
    oracles.tables = oracles.tables.filter((o) => o.title !== title);
    oracles.selectedOracleSource = "";
    oracles.selectedOracleTheme = "";
    oracles.selectedOracleTable = "";
    this.setState({ oracles });
  };

  handleOracleTablePromptsRowInput = (evt, idx) => {
    const oracles = this.props.oracles;
    oracles.tables.map((t) => {
      if (t.title === oracles.selectedOracleTable) {
        t.prompts[idx] = evt.target.value.replace(/<br>/g, "").replace(/&nbsp;/g, " ");
      }
      return t;
    });
    this.setState({ oracles });
  };

  handleOracleTablePromptsRowDelete = (idx) => {
    const oracles = this.props.oracles;
    oracles.tables.map((t) => {
      if (t.title === oracles.selectedOracleTable) {
        // t.prompts = t.prompts.length > 0 ? t.prompts : [];
        // t.prompts.push("");
        t.prompts.splice(idx, 1);
      }
      return t;
    });
    // oracles.prompts.splice(idx, 1);
    this.setState({ oracles });
  };

  handleOracleTablePromptsAddRow = () => {
    const oracles = this.props.oracles;
    oracles.tables.map((t) => {
      if (t.title === oracles.selectedOracleTable) {
        t.prompts = t.prompts.length > 0 ? t.prompts : [];
        t.prompts.push("");
      }
      return t;
    });
    this.setState({ oracles });
  };

  handleOracleTablePromptsChange = (evt) => {
    const oracles = this.props.oracles;
    let selection = evt.target.selectionStart;
    selection += this.state.lastKeyCode == "Space" ? 1 : 0;
    oracles.editOracleCursorPosition = evt.target.selectionStart;

    oracles.tables.map((o) => {
      let text = evt.target.value.replace(/^\s+|\s+$/g, "");
      if (o.title == this.props.oracles.selectedOracleTable) {
        let prompts = text.split("\n");
        prompts[prompts.length - 1] += this.state.lastKeyCode == "Space" ? " " : "";
        o.prompts = prompts;
      }
      return o;
    });
    this.setState({ oracles });
  };

  // handleTrackLabelsKeyDown = (evt) => {
  //   const oracles = this.props.oracles;
  //   oracles.editOracleCursorPosition = evt.target.selectionStart;
  //   this.setState({ lastKeyCode: evt.code });
  // };

  // handleTrackLabelsMouseUp = (evt) => {
  //   const oracles = this.props.oracles;
  //   oracles.editOracleCursorPosition = evt.target.selectionStart;
  // };

  componentDidUpdate(prevProps, prevState) {
    // let el = document.getElementById("tableEditor");
    // el.setSelectionRange(this.props.oracles.editOracleCursorPosition, this.props.oracles.editOracleCursorPosition);
    this.props.onComponentUpdate(prevProps, prevState);
  }
  render() {
    let table = this.props.oracles.getOracleTableAsArray(this.props.oracles.selectedOracleTable);
    return (
      <React.Fragment>
        <h1>Oracle Editor</h1>
        <div className="row">
          <div className="col">
            <TitleBlock title="Create New Oracle Table" />
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Theme</label>
              </div>

              <select
                className="form-control"
                value={this.props.oracles.newOracleTableTheme}
                onChange={(e) => this.handleNewOracleThemeChange(e)}
              >
                {this.props.oracles.getOracleTableThemes("").map((o, i) => (
                  <option key={`oracle_theme_${i}`} value={o}>
                    {o}
                  </option>
                ))}
                {this.props.oracles.tables.find((t) => t.theme === "Miscellaneous") === undefined ? (
                  <option key="oracle_theme_misc" value="Miscellaneous">
                    Miscellaneous
                  </option>
                ) : (
                  React.Fragment
                )}
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Table Name</label>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Table Name"
                aria-label="Name"
                aria-describedby="basic-addon2"
                value={this.props.oracles.newOracleTableName}
                onChange={(e) => this.handleNewOracleTableNameChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-dark" type="button" onClick={() => this.handleAddOracleTable()}>
              <i className="fas fa-plus" aria-hidden="true"></i>
              &nbsp;Add Oracle Table
            </button>
          </div>
        </div>
        <div className="row">
          <div id="oracle_editor" className="col">
            <TitleBlock title="Edit Existing Oracle Table" />
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="btn btn-dark btn-tag">Source</label>
                  </div>

                  <select
                    className="form-control"
                    value={this.props.oracles.selectedOracleSource}
                    onChange={(e) => this.handleSelectedOracleSourceChange(e)}
                  >
                    <option value="">Any</option>
                    {this.props.oracles.getOracleTableSources().map((o, i) => (
                      <option key={`oracle_source_${i}`} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="btn btn-dark btn-tag">Theme</label>
                  </div>

                  <select
                    className="form-control"
                    value={this.props.oracles.selectedOracleTheme}
                    onChange={(e) => this.handleSelectedOracleThemeChange(e)}
                  >
                    <option value="">Any</option>
                    {this.props.oracles.getOracleTableThemes(this.props.oracles.selectedOracleSource).map((o, i) => (
                      <option key={`oracle_theme_${i}`} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="btn btn-dark btn-tag">Name</label>
                  </div>

                  <select
                    className="form-control"
                    value={this.props.oracles.selectedOracleTable}
                    onChange={(e) => this.handleSelectedOracleTableChange(e)}
                  >
                    <option value="">Select Table</option>
                    {this.props.oracles
                      .getOracleTableNames(
                        this.props.oracles.selectedOracleSource,
                        this.props.oracles.selectedOracleTheme
                      )
                      .map((o, i) => (
                        <option key={`oracle_name_${i}`} value={o}>
                          {o}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            {/* <div contenteditable="true"></div> */}
            {table ? (
              <React.Fragment>
                <EditableTable
                  list={table}
                  onRowChange={this.handleOracleTablePromptsRowInput}
                  onRowDelete={this.handleOracleTablePromptsRowDelete}
                  onRowAdd={this.handleOracleTablePromptsAddRow}
                />
              </React.Fragment>
            ) : (
              React.Fragment
            )}
            {table && !this.props.oracles.isCore(this.props.oracles.selectedOracleTable) ? (
              <React.Fragment>
                <div className="row">
                  <div className="col">
                    <div className={`mt-2 ${this.state.deleteButtonClass}`}>
                      <div className="row">
                        <div className="col">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label className="btn btn-dark btn-tag">Change Table Theme</label>
                            </div>

                            <select
                              className="form-control"
                              value={this.props.oracles.selectedOracleTheme}
                              onChange={(e) => this.handleExistingOracleThemeChange(e)}
                            >
                              {this.props.oracles.getOracleTableThemes("").map((o, i) => (
                                <option key={`oracle_theme_${i}`} value={o}>
                                  {o}
                                </option>
                              ))}
                              {this.props.oracles.tables.find((t) => t.theme === "Miscellaneous") === undefined ? (
                                <option key="oracle_theme_misc" value="Miscellaneous">
                                  Miscellaneous
                                </option>
                              ) : (
                                React.Fragment
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <DangerButton
                            buttonText="Delete Table"
                            iconClass="fas fa-times"
                            onDangerClick={this.handleDeleteOracleTable}
                            deleteId={this.props.oracles.selectedOracleTable}
                            deleteMessage="Are you sure you want to delete this table?"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </div>
          {/* <div className="col-7">
            <h3>
              <i className="ra ra-crystal-ball" aria-hidden="true"></i> Ask the Oracle
            </h3>
            {this.props.oracles.tables.map((o) => (
              <OracleRoller tableName={o.title} oracles={this.props.oracles} />
            ))}
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default OracleEditor;
