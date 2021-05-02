import React, { Component } from "react";
import DangerButton from "./dangerButton";
import TitleBlock from "./titleBlock";
import JSZip from "jszip/dist/jszip.js";
class DataManager extends Component {
  state = {
    data: {},
    saveSelectors: {
      allDataSelected: true,
      journalDataDataSelected: true,
      activeFoesDataSelected: true,
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
      journalDataDataSelected: true,
      activeFoesDataSelected: true,
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
    this.state.data.activeFoes = props.gamestate.activeFoes;
    this.state.data.journalData = props.gamestate.journalData;
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

  saveJournals = (obj) => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display:none");

    var json = JSON.stringify(JSON.stringify(obj)),
      blob = new Blob([json], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    let d = new Date();
    a.download = `isc_${d.toLocaleDateString()}_${d.toLocaleTimeString()}.isgs`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  createZipFile = () => {
    let zip = new JSZip();
    let date = new Date();

    zip = this.addFilesToZip(zip, this.props.gamestate.journalData.files, null);

    zip.generateAsync({ type: "blob" }).then((content) => {
      this.saveData(content, `journals.zip`);
    });
  };

  addFilesToZip(zip, files, parentTitle) {
    let file = undefined;
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      zip.file(`${parentTitle ? `${parentTitle}/` : `${f.title}/`}${f.id}_${f.title}.md`, f.content);
      zip = this.addFilesToZip(zip, f.children, f.title);
    }
    return zip;
  }

  saveData = (blob, filename) => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display:none");
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
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
    save.nextLogId = this.props.gamestate.nextLogId;
    save.nextBackgroundId = this.props.gamestate.nextBackgroundId;
    save.nextNPCId = this.props.gamestate.nextNPCId;
    save.newNPC = this.props.gamestate.newNPC;
    save.newItem = this.props.gamestate.newItem;
    save.newProgressions = this.props.gamestate.newProgressions;
    this.props.onDownloadObjectClick(save);
  };

  handleLoadClick = (evt) => {
    let keys = [];
    for (const [key, value] of Object.entries(this.state.loadSelectors)) {
      if (value) {
        keys.push(key.replace("DataSelected", ""));
      }
    }
    keys.push("nextLogId");
    keys.push("nextBackgroundId");
    keys.push("nextNPCId");
    keys.push("newNPC");
    keys.push("newItem");
    keys.push("newProgressions");
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
        <TitleBlock title="Load Data" />
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
        <TitleBlock title="Save Data" />
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
        <TitleBlock title="Save Journals" />
        <div className="row">
          <div className="col-12">
            <div className="alert alert-secondary">
              Save your journal entries as Rich Text (Markdown format). Press save journals to save a zipped archive
              with a file for each journal page.
            </div>
            <button className="btn btn-dark" onClick={() => this.createZipFile()}>
              <i className="fas fa-download"></i>&nbsp;Save Journals
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
