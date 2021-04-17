import React, { Component } from "react";
import DangerButton from "./dangerButton";
import TitleBlock from "./titleBlock";
class DataManager extends Component {
  state = {
    data: {},
    saveSelectors: {
      allDataSelected: true,
      assetsDataSelected: true,
      delveCardsDataSelected: true,
      delvesDataSelected: true,
      foesDataSelected: true,
      locationsDataSelected: true,
      logsDataSelected: true,
      playersDataSelected: true,
      oraclesDataSelected: true,
      worldDataSelected: true,
    },
    loadSelectors: {
      allDataSelected: true,
      assetsDataSelected: true,
      delveCardsDataSelected: true,
      delvesDataSelected: true,
      foesDataSelected: true,
      locationsDataSelected: true,
      logsDataSelected: true,
      playersDataSelected: true,
      oraclesDataSelected: true,
      worldDataSelected: true,
    },
  };
  constructor(props) {
    super();
    // this.state.data.all = props.gamestate;
    this.state.data.assets = props.gamestate.assets;
    this.state.data.delveCards = props.gamestate.delveCards;
    this.state.data.delves = props.gamestate.delves;
    this.state.data.foes = props.gamestate.foes;
    this.state.data.locations = props.gamestate.locations;
    this.state.data.logs = props.gamestate.logs;
    this.state.data.players = props.gamestate.players;
    this.state.data.oracles = props.gamestate.oracles;
    this.state.data.world = props.gamestate.world;
  }

  saveCheckChange = (name) => {
    const saveSelectors = this.state.saveSelectors;
    saveSelectors[`${name}DataSelected`] = !saveSelectors[`${name}DataSelected`];

    for (const [key, value] of Object.entries(this.state.saveSelectors)) {
      if (name === "all" && saveSelectors[`${name}DataSelected`]) {
        saveSelectors[`${key.replace("DataSelected", "")}DataSelected`] = true;
      } else if (name === "all" && !saveSelectors[`${name}DataSelected`]) {
        saveSelectors[`${key.replace("DataSelected", "")}DataSelected`] = false;
      } else if (value == false) {
        saveSelectors.allDataSelected = false;
        break;
      }
    }
    // if (!selectors[`${name}DataSelected`] )
    this.setState({ saveSelectors });
  };

  loadCheckChange = (name) => {
    const loadSelectors = this.state.loadSelectors;
    loadSelectors[`${name}DataSelected`] = !loadSelectors[`${name}DataSelected`];

    for (const [key, value] of Object.entries(this.state.loadSelectors)) {
      if (name === "all" && loadSelectors[`${name}DataSelected`]) {
        loadSelectors[`${key.replace("DataSelected", "")}DataSelected`] = true;
      } else if (name === "all" && !loadSelectors[`${name}DataSelected`]) {
        loadSelectors[`${key.replace("DataSelected", "")}DataSelected`] = false;
      } else if (value == false) {
        loadSelectors.allDataSelected = false;
        break;
      }
    }
    // if (!selectors[`${name}DataSelected`] )
    this.setState({ loadSelectors });
  };

  buildSaveObject = () => {
    let save = {};
    Object.keys(this.state.saveSelectors).map((k) => {
      if (k) {
        let key = k.replace("DataSelected", "");
        if (key != "all" && this.state.saveSelectors[k]) {
          save[key] = this.state.data[key];
        }
      }
    });
    console.log(save);
    this.props.onDownloadObjectClick(save);
  };

  handleLoadClick = (evt) => {
    let keys = [];
    for (const [key, value] of Object.entries(this.state.loadSelectors)) {
      if (value) {
        keys.push(key.replace("DataSelected", ""));
      }
    }
    this.props.onLoadClick(evt, keys);
  };

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
        <div className="alert alert-secondary">
          Load a game state from a JSON file stored on your computer. Choose the items you want to import from the save
          file into your game <strong>Will only import a key if it is found in the save data.</strong>
        </div>
        <div className="row">
          {Object.keys(this.state.loadSelectors).map((d) => {
            d = d.replace("DataSelected", "");
            return (
              <div className="col">
                <div className="cross-check">
                  <input
                    id={`load_${d}_input`}
                    type="checkbox"
                    onChange={(e) => this.loadCheckChange(d)}
                    checked={this.state.loadSelectors.allDataSelected || this.state.loadSelectors[`${d}DataSelected`]}
                  />
                  <label htmlFor={`load_${d}_input`} className="pl-4">
                    &nbsp;{d}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <label for="file-upload" className="custom-file-upload btn btn-dark">
          <i className="fa fa-upload"></i> Load
        </label>
        <input id="file-upload" type="file" onChange={(e) => this.handleLoadClick(e)} />
        {/* <input type="file" /> */}
        {/* <button className="btn btn-dark">
          <i className="fas fa-upload"></i>&nbsp;Load
        </button> */}
        <TitleBlock title="Save" />
        <div className="alert alert-secondary">
          Save a game state to a JSON file and download to your computer. Choose the data categories you want to save
          and then press the Save button.
        </div>
        <div className="row my-3">
          {Object.keys(this.state.saveSelectors).map((d) => {
            d = d.replace("DataSelected", "");
            return (
              <div className="col">
                <div className="cross-check">
                  <input
                    id={`save_${d}_input`}
                    type="checkbox"
                    onChange={(e) => this.saveCheckChange(d)}
                    checked={this.state.saveSelectors.allDataSelected || this.state.saveSelectors[`${d}DataSelected`]}
                  />
                  <label htmlFor={`save_${d}_input`} className="pl-4">
                    &nbsp;{d}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-dark" onClick={() => this.buildSaveObject()}>
              <i className="fas fa-download"></i>&nbsp;Save
            </button>
          </div>
        </div>
        {/* <div className="row my-3">
          <div className="col">
            <button
              className="btn btn-dark"
              onClick={() => this.props.onDownloadObjectClick(this.props.selectedPlayer, "Player")}
            >
              <i className="fas fa-download"></i>&nbsp;Save Selected Player
            </button>
          </div>
        </div> */}

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
