import React, { Component } from "react";
import DangerButton from "./dangerButton";
import TitleBlock from "./titleBlock";
class DataManager extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Data Management</h1>
        <TitleBlock title="Reset" />
        <div className="alert alert-secondary">
          Use the reset button to reset the local gamestate to default settings
        </div>
        <DangerButton
          buttonText="Reset"
          iconClass="fas fa-refresh"
          onDangerClick={this.props.onResetClick}
          deleteMessage="Are you sure you want to reset the gamestate?"
        />
        <TitleBlock title="Load" />
        <div className="alert alert-secondary">Load a game state from a JSON file stored on your computer</div>
        <label for="file-upload" className="custom-file-upload btn btn-dark">
          <i className="fa fa-upload"></i> Load
        </label>
        <input id="file-upload" type="file" onChange={(e) => this.props.onLoadClick(e)} />
        {/* <input type="file" /> */}
        {/* <button className="btn btn-dark">
          <i className="fas fa-upload"></i>&nbsp;Load
        </button> */}
        <TitleBlock title="Save" />
        <div className="alert alert-secondary">Save a game state to a JSON file and download to your computer</div>
        <button className="btn btn-dark" onClick={() => this.props.onDownloadClick()}>
          <i className="fas fa-download"></i>&nbsp;Save
        </button>

        <TitleBlock title="Update RSEK's Datasworn" />
        <div className="alert alert-secondary">
          Update RSEK's Datasworn - Updates Core Assets and Foes as well as Delve core tables
        </div>
        <button className="btn btn-dark" onClick={() => this.props.onUpdateDataswornClick()}>
          <i className="fas fa-refresh"></i>&nbsp;Update Datasworn
        </button>
      </React.Fragment>
    );
  }
}

export default DataManager;
