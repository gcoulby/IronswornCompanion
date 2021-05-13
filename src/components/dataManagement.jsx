import React, { Component } from "react";
import DangerButton from "./dangerButton";
import TitleBlock from "./titleBlock";
import JSZip from "jszip/dist/jszip.js";
import { gapi } from "gapi-script";
import google_btn from "../img/btn_google_light_normal_ios.svg";

//TODO Region roll
//TODO delve threats
//TODO burn mom on delve - revert progress
// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

var SCOPE = "https://www.googleapis.com/auth/drive.file";
var discoveryUrl = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

var dataManager = {};
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
    googleAuth: null,
    googleDriveFiles: [],
    gDriveFolderId: "",
    gDriveSelectedFileId: "",
  };
  constructor(props) {
    super();
    dataManager = this;
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

  /*=================================*/
  /*    Google API
  /*=================================*/

  componentDidMount() {
    if (!this.props.loadGoogle) return;
    console.log("TE");
    var script = document.createElement("script");
    script.onload = this.handleClientLoad;
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
  }

  initClient = () => {
    try {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPE,
          discoveryDocs: [discoveryUrl],
        })
        .then(() => {
          let auth = gapi.auth2.getAuthInstance();
          this.setState({
            googleAuth: auth,
          });
          this.state.googleAuth.isSignedIn.listen(this.updateSigninStatus);
          this.createGoogleDriveFolderIfNonExist();
          this.getAuthorisedGoogleDriveFiles();
        });
    } catch (e) {
      console.log(e);
    }
  };

  signInFunction = () => {
    this.state.googleAuth.signIn();
    this.updateSigninStatus();
  };

  signOutFunction = () => {
    this.state.googleAuth.signOut();
    this.updateSigninStatus();
  };

  isSignedIn = () => {
    return this.state.googleAuth & this.state.googleAuth.isSignedIn.le;
  };

  updateSigninStatus = () => {
    this.setSigninStatus();
  };

  setSigninStatus = async () => {
    var user = this.state.googleAuth.currentUser.get();
    console.log("USER:", user);
    if (user.wt == null) {
      this.setState({
        name: "",
      });
    } else {
      var isAuthorized = user.hasGrantedScopes(SCOPE);
      console.log(isAuthorized);
      if (isAuthorized) {
        this.setState({
          name: user.wt.Ad,
        });
        this.createGoogleDriveFolderIfNonExist();
        this.getAuthorisedGoogleDriveFiles();
      }
    }
  };

  getAuthorisedGoogleDriveFiles = () => {
    if (!this.state.googleAuth || !this.state.googleAuth.isSignedIn.le) return;
    var request = gapi.client.request({
      path: "https://www.googleapis.com/drive/v3/files",
      method: "GET",
    });
    return request.execute((files) => {
      let fileArr = files.files.filter((f) => f.mimeType === "application/json");
      const gDriveFiles = fileArr;
      this.setState({ gDriveFiles });
    });
  };

  createGoogleDriveFolderIfNonExist = () => {
    var request = gapi.client.request({
      // params: { q: "name=Ironsworn Companion Data" },
      path: "https://www.googleapis.com/drive/v3/files?q=",
      method: "GET",
    });
    request.execute((r) => {
      //check failed request
      if (!r) return;

      //check to see if the Ironsworn Companion Data directory exists
      let dir = r?.files?.find((f) => f.name == "Ironsworn Companion Data");

      if (dir !== undefined) {
        // console.log("DIR", dir.id);
        this.setState({ gDriveFolderId: dir.id });
        return;
      }
      //If it does not exist create a directory called Ironsworn Companion Data
      const boundary = "ironsworn";
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      var fileName = "Ironsworn Companion Data";
      var contentType = "application/vnd.google-apps.folder";
      var metadata = {
        name: fileName,
        mimeType: contentType,
      };

      var multipartRequestBody =
        delimiter +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        "Content-Type: " +
        contentType +
        "\r\n\r\n" +
        close_delim;
      var request = gapi.client.request({
        path: "https://www.googleapis.com/upload/drive/v3/files",
        method: "POST",
        params: { uploadType: "multipart" },
        headers: {
          "Content-Type": "multipart/related; boundary=" + boundary + "",
        },
        body: multipartRequestBody,
      });
      request.execute(function (file) {
        // console.log(file.id);
        dataManager.setState({ gDriveFolderId: file.id });
      });
    });
  };

  saveToGoogleDrive = (data, fileName, contentType = "application/json") => {
    let folderId = this.state.gDriveFolderId ?? "";
    if (folderId === "") {
      console.log("Error: no drive folder found");
      return;
    }
    const boundary = "ironsworn";
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    // let d = new Date();
    // var fileName = `isc_${d.toLocaleDateString()}_${d.toLocaleTimeString()}.isgs`;
    // var fileName = "mychat123.json";
    var fileData = contentType === "application/json" ? JSON.stringify(data) : data;
    var metadata = {
      name: fileName,
      parents: [folderId],
      mimeType: contentType,
    };
    // var contentType = "application/json";

    var multipartRequestBody = "";
    if (contentType === "application/zip") {
      multipartRequestBody =
        delimiter +
        "Content-Type: application/json\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        "Content-Type: " +
        contentType +
        "\r\n" +
        "Content-Transfer-Encoding: base64\r\n" +
        "\r\n" +
        fileData +
        close_delim;
    } else {
      multipartRequestBody =
        delimiter +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        "Content-Type: " +
        contentType +
        "\r\n\r\n" +
        fileData +
        "\r\n" +
        close_delim;
    }

    var request = gapi.client.request({
      path: "https://www.googleapis.com/upload/drive/v3/files",
      method: "POST",
      params: { uploadType: "multipart" },
      headers: {
        "Content-Type": "multipart/related; boundary=" + boundary + "",
      },
      body: multipartRequestBody,
    });
    request.execute((file) => {
      // console.log(file);
      this.createGoogleDriveFolderIfNonExist();
      this.getAuthorisedGoogleDriveFiles();
    });
  };

  handleClientLoad = () => {
    gapi.load("client:auth2", this.initClient);
  };

  handleGoogleLoadClick = () => {
    if (this.state.gDriveSelectedFileId === "") return;
    let fileId = this.state.gDriveSelectedFileId;
    var request = gapi.client.drive.files.get({
      fileId: fileId,
      alt: "media",
    });
    request.then(
      (response) => {
        this.buildAndLoadData(response.body);
      },
      function (error) {
        console.error(error);
      }
    );
  };

  /*=================================*/
  /*    General
  /*=================================*/

  onGoogleDriveFileSelectChange = (evt) => {
    this.setState({ gDriveSelectedFileId: evt.target.value });
  };

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

  createZipFile = (local = true) => {
    let zip = new JSZip();

    let d = new Date();
    var fileName = `isc_journals_${d.toLocaleDateString()}_${d.toLocaleTimeString()}.zip`;

    zip = this.addFilesToZip(zip, this.props.gamestate.journalData.files, null);

    if (local) {
      zip.generateAsync({ type: "blob" }).then((content) => {
        this.saveData(content, fileName);
      });
    } else {
      zip.generateAsync({ type: "base64", mimeType: "application/zip" }).then((content) => {
        this.saveToGoogleDrive(content, fileName, "application/zip");
      });
    }
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

  buildSaveObject = (local = true) => {
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
    if (local) {
      this.props.onDownloadObjectClick(save);
    } else {
      let d = new Date();
      var fileName = `isc_${d.toLocaleDateString()}_${d.toLocaleTimeString()}.isgs`;
      this.saveToGoogleDrive(save, fileName);
    }
  };

  handleLoadClick = (evt) => {
    let file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let json = JSON.parse(reader.result);
      this.buildAndLoadData(json);
    };
  };

  buildAndLoadData = (json) => {
    let obj = JSON.parse(json);

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

    Object.keys(obj).map((k) => {
      if (!keys.includes(k)) {
        delete obj[k];
      }
    });
    this.props.onLoadClick(obj);
  };

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Data Management</h1>
        {this.props.loadGoogle ? (
          <React.Fragment>
            <TitleBlock title="Cloud Authorisation" />
            <h2>You should not be here!</h2>
            <h6> This is a future feature, using this feature will break your future save.</h6>
            {!this.state.googleAuth || !this.state.googleAuth.isSignedIn.le ? (
              <React.Fragment>
                <div className="row">
                  {/* <div className="col-12 col-lg-4"> */}
                  <div className="col-12">
                    <div className="alert alert-secondary">
                      <p>
                        You are not logged in. This app can save and load data to/from Google Drive. However, to do this
                        you must authorise the app and sign in.
                      </p>
                      {/* <h6>NOTE</h6>
                  {/* <p>
                    Google Drive functionality is being tested for a future release. This button has been disabled
                    intentionally. Do not report anything to do with Google as a bug! Manually enabling this button
                    could break your game, do NOT do this.
                  </p> */}{" "}
                      <button
                        className="btn btn-sm btn-light btn-google"
                        id="signin-btn"
                        onClick={() => this.signInFunction()}
                      >
                        <img src={google_btn} width="20px"></img>&emsp;Sign in with Google
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className="alert alert-secondary">
                      <p>
                        Welcome {this.state.googleAuth ? this.state.googleAuth.currentUser.le.wt.rV : ""}. The Ironlands
                        await you!
                      </p>
                      <button
                        className="btn btn-sm btn-light btn-google"
                        id="signout-btn"
                        onClick={() => this.signOutFunction()}
                      >
                        <img src={google_btn} width="20px"></img>&emsp;Sign out of Google
                      </button>
                      {/* {this.getAuthorisedGoogleDriveFiles ? (
                    <React.Fragment>
                      <button className="btn btn-dark" onClick={() => this.getAuthorisedGoogleDriveFiles()}>
                        <i class="fa fa-file" aria-hidden="true"></i> Files
                      </button>
                    </React.Fragment>
                  ) : (
                    React.Fragment
                  )}
                  {this.createGoogleDriveFolderIfNonExist ? (
                    <React.Fragment>
                      <button className="btn btn-dark" onClick={() => this.createGoogleDriveFolderIfNonExist()}>
                        <i class="fa fa-folder" aria-hidden="true"></i> Create Folder
                      </button>
                    </React.Fragment>
                  ) : (
                    React.Fragment
                  )} */}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          React.Fragment
        )}

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
          <i className="fa fa-upload"></i> Load from Disk
        </label>
        <input id="file-upload" type="file" onChange={(e) => this.handleLoadClick(e)} />
        {this.state.googleAuth && this.state.googleAuth.isSignedIn.le ? (
          <React.Fragment>
            <h5 className="mt-4">Load from Google</h5>
            <div className="row my-4">
              <div className="col-md-12 col-lg-6">
                <div className="input-group mb-3">
                  {this.state.gDriveFiles && this.state.gDriveFiles.length > 0 ? (
                    <React.Fragment>
                      <div className="input-group-prepend">
                        <label className="btn btn-dark btn-tag">Select File</label>
                      </div>
                      <select
                        className="form-control"
                        value={this.state.gDriveSelectedFileId}
                        onChange={(e) => this.onGoogleDriveFileSelectChange(e)}
                      >
                        <option value="">Select a file...</option>
                        {this.state.gDriveFiles.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div className="alert alert-secondary">
                        There are no files on Google drive that were created by Ironsworn Companion. First save a file.
                        <strong>This can take a few minutes to load</strong>
                      </div>
                    </React.Fragment>
                  )}
                </div>
                {this.state.gDriveSelectedFileId !== "" ? (
                  <React.Fragment>
                    <button className="btn btn-sm btn-google" onClick={() => this.handleGoogleLoadClick()}>
                      <img src={google_btn} width="20px"></img>&emsp;Load from Google Drive
                    </button>
                  </React.Fragment>
                ) : (
                  React.Fragment
                )}
              </div>
            </div>
          </React.Fragment>
        ) : (
          React.Fragment
        )}

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
              <i className="fas fa-download"></i>&nbsp;Save to Disk
            </button>
            {this.state.googleAuth && this.state.googleAuth.isSignedIn.le ? (
              <React.Fragment>
                &emsp;
                <button className="btn btn-sm btn-google" onClick={() => this.buildSaveObject(false)}>
                  <img src={google_btn} width="20px"></img>&emsp;Save to Google Drive
                </button>
              </React.Fragment>
            ) : (
              React.Fragment
            )}
          </div>
          <div className="col"></div>
        </div>
        <TitleBlock title="Save Journals" />
        <div className="row">
          <div className="col-12">
            <div className="alert alert-secondary">
              Save your journal entries as Rich Text (Markdown format). Press save journals to save a zipped archive
              with a file for each journal page.
            </div>
            <button className="btn btn-dark" onClick={() => this.createZipFile()}>
              <i className="fas fa-download"></i>&nbsp;Save Journals to Disk
            </button>
            {this.state.googleAuth && this.state.googleAuth.isSignedIn.le ? (
              <React.Fragment>
                &emsp;
                <button className="btn btn-sm btn-google" onClick={() => this.createZipFile(false)}>
                  <img src={google_btn} width="20px"></img>&emsp;Save to Google Drive
                </button>
              </React.Fragment>
            ) : (
              React.Fragment
            )}
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
