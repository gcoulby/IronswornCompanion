import React, { Component } from "react";
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
        <button
          className="btn btn-danger"
          onClick={() => this.props.onResetClick()}
        >
          <i className="fas fa-refresh"></i>&nbsp;Reset
        </button>
        <TitleBlock title="Load" />
        <div className="alert alert-secondary">
          Load a game state from a JSON file stored on your computer
        </div>
        <label for="file-upload" class="custom-file-upload btn btn-dark">
          <i class="fa fa-upload"></i> Load
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={(e) => this.props.onLoadClick(e)}
        />
        {/* <input type="file" /> */}
        {/* <button className="btn btn-dark">
          <i className="fas fa-upload"></i>&nbsp;Load
        </button> */}
        <TitleBlock title="Save" />
        <div className="alert alert-secondary">
          Save a game state to a JSON file and download to your computer
        </div>
        <button
          className="btn btn-dark"
          onClick={() => this.props.onDownloadClick()}
        >
          <i className="fas fa-download"></i>&nbsp;Save
        </button>
      </React.Fragment>
    );
  }
}

export default DataManager;
