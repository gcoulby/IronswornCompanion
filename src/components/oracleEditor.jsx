import React, { Component } from "react";
import EditableTable from "./editableTable";
import OracleRoller from "./oracleRoller";
class OracleEditor extends Component {
  state = {
    lastKeyCode: "",
  };

  handleNewOracleTableNameChange = (evt) => {
    const oracles = this.props.oracles;
    oracles.newOracleTableName = evt.target.value;
    this.setState({ oracles });
  };

  handleSelectedOracleTableChange = (evt) => {
    const oracles = this.props.oracles;
    oracles.selectedOracleTable = evt.target.value;
    this.setState({ oracles });
  };

  handleAddOracleTable = () => {
    const oracles = this.props.oracles;
    oracles.tables.push({
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
    this.setState({ oracles });
  };

  handleOracleTablePromptsRowInput = (evt, idx) => {
    const oracles = this.props.oracles;
    oracles.prompts[idx] = evt.target.value;
    this.setState({ oracles });
  };

  handleOracleTablePromptsRowDelete = (idx) => {
    const oracles = this.props.oracles;
    oracles.prompts.splice(idx, 1);
    this.setState({ oracles });
  };

  handleOracleTablePromptsAddRow = () => {
    const oracles = this.props.oracles;
    oracles.prompts = oracles.prompts.length > 0 ? oracles.prompts : [];
    oracles.prompts.push("");
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

  componentDidUpdate() {
    // let el = document.getElementById("tableEditor");
    // el.setSelectionRange(this.props.oracles.editOracleCursorPosition, this.props.oracles.editOracleCursorPosition);
    this.props.onComponentUpdate();
  }
  render() {
    let table = this.props.oracles.getOracleTableAsArray(this.props.oracles.selectedOracleTable);
    return (
      <React.Fragment>
        <h1>Oracles</h1>
        <div className="row">
          <div className="col">
            <h3>New Oracle Table</h3>
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
        <div className="row mb-4">
          <div className="col">
            <button className="btn btn-dark" type="button" onClick={() => this.handleAddOracleTable()}>
              <i className="fas fa-plus" aria-hidden="true"></i>
              &nbsp;Add Oracle Table
            </button>
          </div>
        </div>
        <div className="row">
          <div id="oracle_editor" className="col-5">
            <h3>
              <i className="fa fa-table" aria-hidden="true"></i> Edit Oracle Table
            </h3>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Select Table</label>
              </div>

              <select
                className="form-control"
                value={this.props.oracles.selectedOracleTable}
                onChange={(e) => this.handleSelectedOracleTableChange(e)}
              >
                <option val="">Select Table</option>
                {this.props.oracles.OracleTableNames.map((o) => (
                  <option key={this.props.oracles.OracleTableNames.indexOf(o)} value={o}>
                    {o}
                  </option>
                ))}
              </select>
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
            {/* <textarea
              id="tableEditor"
              wrap="off"
              value={this.props.oracles.getOracleTablePrompts(this.props.oracles.selectedOracleTable)}
              onChange={(e) => this.handleOracleTablePromptsChange(e)}
              onKeyDown={(e) => this.handleTrackLabelsKeyDown(e)}
              onMouseUp={(e) => this.handleTrackLabelsMouseUp(e)}
            ></textarea> */}
            {table && !this.props.oracles.isCore(this.props.oracles.selectedOracleTable) ? (
              <React.Fragment>
                <div className="row">
                  <div className="col">
                    <div
                      id="locationDeleteBtn"
                      className={`mt-2 ${this.state.deleteButtonClass}`}
                      onClick={() => this.handleDeleteOracleTable(this.props.oracles.selectedOracleTable)}
                    >
                      <button className="btn btn-danger">
                        <i className="fas fa-times"></i> Delete Table
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </div>
          <div className="col-7">
            <h3>
              <i className="ra ra-crystal-ball" aria-hidden="true"></i> Ask the Oracle
            </h3>
            {this.props.oracles.tables.map((o) => (
              <OracleRoller tableName={o.title} oracles={this.props.oracles} />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OracleEditor;
