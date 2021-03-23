import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter, Route, Link } from "react-router-dom";
import "./css/css-compiled/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Dice from "./components/dice";
import Characters from "./components/players";
import Oracles from "./components/oracles";
import Log from "./components/log";
import World from "./components/world";
import DiceRoller from "./components/dice_roller";
import Documentation from "./components/documentation";
import Locations from "./components/locations";
import Stats from "./components/stats";
import Gallery from "./components/gallery";
import Footer from "./components/footer";
import Progression from "./components/progressions";
import NPCs from "./components/npcs";
import AssetBuilder from "./components/assetBuilder";
import OracleEditor from "./components/oracleEditor";
import Acknowledgements from "./components/acknowledgements";
import EnterTheFray from "./components/enterTheFray";
import DataManager from "./components/dataManagement";
import Assets from "./components/assets";
import coreAssetIcons from "./models/assetIcons";
import DefaultAsset from "./models/defaultAssets";

//TODO Asset Importer
//TODO Asset Exporter
//TODO Delve
//TODO Popups for delete buttons

class App extends Component {
  version = "0.49.3";
  state = {
    save: false,
    updateCore: false,
    players: [],
    newPlayer: {},
    world: {},
    locations: [],
    foes: [],
    newFoe: {},
    activeFoes: {
      loneFoes: [],
      packs: [],
    },
    assets: [],
    assetBuilderSelectedAsset: new DefaultAsset(),
    logs: [],
    newProgressions: [
      {
        type: "vow",
        text: "",
        rank: 0,
        nextId: 0,
        buttonText: "Fulfill Your Vow",
      },
      {
        type: "quest",
        text: "",
        rank: 0,
        nextId: 0,
        buttonText: "Complete Your Quest",
      },
      {
        type: "journey",
        text: "",
        rank: 0,
        nextId: 0,
        buttonText: "Reach Your Destination",
      },
      {
        type: "combat",
        text: "",
        rank: 0,
        nextId: 0,
        buttonText: "End the Fight",
      },
      {
        type: "epilogue",
        text: "",
        rank: 0,
        nextId: 0,
        buttonText: "Write Your Epilogue",
      },
    ],
    imgurAlbumHash: "cFnZi",
    logInput: "",
    backgroundInput: "",
    npcs: [],
    newNPC: {
      Race: "",
      Name: "",
      Role: "",
      Goal: "",
      Descriptor: "",
      Disposition: "",
      Conversation: "",
      Knowledge: "",
      Location: -1,
    },
    npcLocationFilterId: -2,
    nextLogId: 0,
    nextBackgroundId: 0,
    nextNPCId: 0,
    footerDice: {},
    oracles: new Oracles(),
  };

  constructor() {
    super();
    this.diceRoller = new DiceRoller();

    //TODO: MERGE SAVEDATA Rather than replace to allow for updates
    //Load game state - can only happen in constructor
    let gs = localStorage.getItem("game_state");
    let state = JSON.parse(gs);
    if (state != undefined) {
      this.state = { ...this.state, ...state };
      this.state.lastSaveVersion = this.version;
      this.state.oracles = new Oracles(this.state.oracles);
    } else {
      this.updateCoreAssets();
      this.updateFoes();
      this.state.baseVersion = this.version;
      // this.state.updateCore = true;
    }
  }

  componentDidMount() {
    this.scrollBottom();
    // if (this.state.updateCore) {
    //   this.updateCoreAssets();
    //   this.state.updateCore = false;
    // } else this.saveGameState();
    //Happens after render and good for AJAX calls etc
  }

  /*=================================*/
  /*    Gamestate and Data
  /*=================================*/

  handleSetState = (key, value) => {
    this.setState({ key, value });
  };

  saveGameState() {
    localStorage.setItem("game_state", JSON.stringify(this.state));
  }

  updateCoreAssets = () => {
    fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_assets.json")
      .then((response) => response.json())
      .then((data) => {
        const assets = this.state.assets;
        for (let i = 0; i < data["Assets"].length; i++) {
          const asset = data["Assets"][i];
          asset.id = `core-${asset.Name.toLowerCase().replace(" ", "-")}`;
          asset.core = true;
          asset.front = true;
          asset.icon = "crystal-ball";
          let coreIcon = coreAssetIcons.find((c) => c.id == asset.id);
          if (coreIcon) asset.icon = coreIcon.icon;
          asset.Type = asset["Asset Type"] ? asset["Asset Type"] : [];
          asset.InputFields = asset["Input Fields"] ? asset["Input Fields"] : [];
          asset.TrackMax = 0;
          if (asset.Health) asset.TrackMax = asset.Health;

          if (asset["Asset Track"]) {
            asset.TrackMax = asset["Asset Track"].Max;
            delete asset["Asset Track"];
          }
          asset.TrackValue = asset.Type === "Companion" ? asset.TrackMax : 0;

          if (asset.MultiFieldAssetTrack) {
            asset.TrackLabels = asset.MultiFieldAssetTrack.Fields.map((f) => f.ActiveText);
            delete asset.MultiFieldAssetTrack;
          }

          delete asset["Asset Type"];
          delete asset["Input Fields"];
          delete asset.Health;

          if (asset.InputFields !== undefined) {
            asset.InputFields = asset.InputFields.map((f) => {
              return { name: f, value: "" };
            });
          }

          asset.Abilities = asset.Abilities.map((a) => {
            a.Enabled = a.Enabled !== undefined ? a.Enabled : false;
            return a;
          });

          if (asset.id == "core-kindred") {
            asset.InputFields.push({
              name: asset.Abilities[0]["Input Fields"][0],
              value: "",
            });
          }

          let existingAsset = assets.find((a) => a.id == asset.id);
          if (existingAsset == undefined) {
            assets.push(asset);
          } else {
            assets[assets.indexOf(existingAsset)] = asset;
          }
        }
        this.state.assets = assets;
        this.saveGameState();
      });
  };

  updateFoes() {
    fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_foes.json")
      .then((response) => response.json())
      .then((data) => {
        const foes = [...this.state.foes, ...data.Categories];
        this.state.foes = foes;
        this.saveGameState();
      });
  }

  resetData() {
    localStorage.removeItem("game_state");
    window.location.reload("/");
  }

  saveData = () => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display:none");
    var json = JSON.stringify(localStorage.getItem("game_state")),
      blob = new Blob([json], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "ironsworn_save_data.json";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  loadData = (evt) => {
    let file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      let json = JSON.parse(reader.result);
      localStorage.setItem("game_state", json);
      window.location.reload("/");
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  componentDidUpdate = () => {
    this.saveGameState();
    this.scrollBottom();
    if (this.state.save) {
      this.setState({ save: false });
    }
  };

  /*=================================*/
  /*    PLAYERS
  /*=================================*/

  handlePlayerSelect = (playerName) => {
    const players = this.state.players.map((p) => {
      if (p.name != playerName) p.selected = false;
      else p.selected = true;
      return p;
    });
    this.setState({ players });
  };

  getSelectedPlayer() {
    return this.state.players.find((p) => p.selected);
  }

  /*=================================*/
  /*    Log
  /*=================================*/

  handleLogInputChanged = (evt) => {
    this.setState({ logInput: evt.target.value });
  };

  handleAddLog = (isMeta) => {
    if (this.state.logInput != "") {
      const logs = this.state.logs;
      logs.push({
        id: this.state.nextLogId,
        ts: new Date(),
        text: this.state.logInput,
        isMeta: isMeta,
      });
      this.setState({ nextLogId: this.state.nextLogId + 1 });
      this.setState({ logs: logs });
      this.setState({ logInput: "" });
    }
  };

  handleLogItemDeleted = (logId) => {
    const logs = this.state.logs.filter((l) => this.state.logs.indexOf(l) !== logId);
    this.setState({ logs });
  };

  /*=================================*/
  /*    Background
  /*=================================*/

  handleBackgroundInputChanged = (evt) => {
    this.setState({ backgroundInput: evt.target.value });
  };

  handleAddBackground = (isMeta) => {
    if (this.state.backgroundInput != "") {
      const players = this.state.players.map((p) => {
        if (p.selected) {
          p.background.push({
            id: this.state.nextBackgroundId,
            text: this.state.backgroundInput,
            ts: new Date(),
            isMeta: isMeta,
          });
        }
        return p;
      });
      this.setState({ nextBackgroundId: this.state.nextBackgroundId + 1 });
      this.setState({ players });
      this.setState({ backgroundInput: "" });
    }
  };

  handleBackgroundItemDeleted = (logId) => {
    const players = this.state.players.map((p) => {
      if (p.selected) {
        p.background = p.background.filter((b) => p.background.indexOf(b) !== logId);
      }
      return p;
    });
    this.setState({ players });
  };

  /*=================================*/
  /*    NPCS
  /*=================================*/

  handleLocationFilterChanged = (evt) => {
    this.setState({ npcLocationFilterId: parseInt(evt.target.value) });
  };

  /*=================================*/
  /*    Asset Builder
  /*=================================*/

  handleOnSelectedAssetChange = (id) => {
    let foundAsset = this.state.assets.find((a) => a.id == id);
    let asset = { ...foundAsset };
    if (!foundAsset) {
      asset = new DefaultAsset();
    }
    this.setState({ assetBuilderSelectedAsset: asset });
  };

  /*=================================*/
  /*    Footer Dice
  /*=================================*/

  updateFooterDice = () => {
    const footerDice = this.state.footerDice;
    this.setState({ footerDice: footerDice });
  };

  handleOnProgressRollClicked = (id, type, progress) => {
    const footerDice = this.state.footerDice;
    let progressId = `${type}_${id} | ${progress}`;
    footerDice.ProgressId = progressId;
    this.setState({ footerDice: footerDice });
  };

  /*=================================*/
  /*    Render
  /*=================================*/

  scrollBottom() {
    let items = document.getElementsByClassName("log-li");
    let last = items[items.length - 1];
    last?.scrollIntoView(false);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          selectedPlayer={this.getSelectedPlayer()}
          players={this.state.players}
          onPlayerSelect={this.handlePlayerSelect}
        />
        <div id="root-fragment" className="row">
          <div className="sidebar-wrapper print-hide">
            <Sidebar
              // totalCounters={
              //   this.state.counters.filter((c) => c.value > 0).length
              // }
              pages={this.state.pages}
              onPageChange={this.onPageChange}
            />
          </div>
          <div id="page-container">
            <div className="container-fluid">
              <HashRouter basename="/">
                {/* <Switch> */}
                <Route exact path="/">
                  <h3 id="site-title">IRONSWORN</h3>
                  <h1 id="site-subtitle">COMPANION</h1>
                  <h6 class="text-light">Version {this.version}</h6>

                  <div id="bg-image"></div>
                  <div id="welcome-page-notice" className="alert alert-secondary">
                    This application is still heavilly under development and is live only to demonstrate functionality
                    and receive feedback. As a result, it cannot be guaranteed that save files created in this version
                    of the application will work in all future versions.
                  </div>
                </Route>
                <Route path="/characters">
                  <Characters
                    players={this.state.players}
                    newPlayer={this.state.newPlayer}
                    onPlayerSelect={this.handlePlayerSelect}
                    oracles={this.state.oracles}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>
                <Route path="/log">
                  <Log
                    title="Campaign Log"
                    description="Use this section to provide additional information about your campaign. Use this to keep notes between sessions or to log metagame information."
                    logs={this.state.logs}
                    logInput={this.state.logInput}
                    onLogInputChanged={this.handleLogInputChanged}
                    onAddLog={this.handleAddLog}
                    onLogItemDeleted={this.handleLogItemDeleted}
                  />
                </Route>
                <Route path="/world">
                  <World world={this.state.world} onComponentUpdate={this.componentDidUpdate} />
                </Route>
                <Route path="/npcs">
                  <NPCs
                    selectedPlayer={this.getSelectedPlayer()}
                    newNPC={this.state.newNPC}
                    npcLocationFilterId={this.state.npcLocationFilterId}
                    onNpcLocationFilterIdChange={this.handleLocationFilterChanged}
                    races={this.state.oracles.getOracleTableAsArray("Races")}
                    players={this.state.players}
                    onComponentUpdate={this.componentDidUpdate}
                    setState={this.handleSetState}
                    npcs={this.state.npcs}
                    locations={this.state.locations}
                    oracles={this.state.oracles}
                  />
                </Route>
                <Route path="/locations">
                  <Locations
                    locations={this.state.locations}
                    nextLocationId={this.state.nextLocationId}
                    npcs={this.state.npcs}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>
                <Route exact path="/enter-the-fray">
                  <EnterTheFray
                    foes={this.state.foes}
                    activeFoes={this.state.activeFoes}
                    newFoe={this.state.newFoe}
                    onComponentUpdate={this.componentDidUpdate}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                  />
                </Route>
                <Route path="/gallery">
                  <Gallery imgurAlbumHash={this.state.imgurAlbumHash} />
                </Route>

                <Route path="/background">
                  <Log
                    title="Background"
                    description="Use this section to provide additional context to your character.
                      Snippets of background information can be entered in the text box
                      below."
                    logs={this.getSelectedPlayer() ? this.getSelectedPlayer().background : null}
                    logInput={this.state.backgroundInput}
                    onLogInputChanged={this.handleBackgroundInputChanged}
                    onAddLog={this.handleAddBackground}
                    onLogItemDeleted={this.handleBackgroundItemDeleted}
                  />
                </Route>
                <Route exact path="/stats">
                  <Stats
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onComponentUpdate={this.componentDidUpdate}
                    updateFooterDice={this.updateFooterDice}
                  />
                </Route>
                <Route exact path="/vows">
                  <Progression
                    title="Vows"
                    type="vow"
                    newProgressions={this.state.newProgressions}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onComponentUpdate={this.componentDidUpdate}
                    updateFooterDice={this.updateFooterDice}
                  />
                </Route>
                <Route exact path="/quests">
                  <Progression
                    title="Quests"
                    type="quest"
                    info="Quests are mechanically identical to vows except they are not as much of a commitment to your character. Use quests when swearing an iron vow does not seem appropriate to the fiction. However, quests do not grant experience upon completion."
                    newProgressions={this.state.newProgressions}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onComponentUpdate={this.componentDidUpdate}
                    updateFooterDice={this.updateFooterDice}
                  />
                </Route>
                <Route exact path="/journeys">
                  <Progression
                    title="Journeys"
                    type="journey"
                    newProgressions={this.state.newProgressions}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onComponentUpdate={this.componentDidUpdate}
                    updateFooterDice={this.updateFooterDice}
                  />
                </Route>

                <Route exact path="/assets">
                  <Assets
                    assets={this.state.assets}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>

                <Route exact path="/roll">
                  <Dice />
                </Route>
                <Route exact path="/acknowledgements">
                  <Acknowledgements />
                </Route>
                <Route path="/oracle-editor">
                  <OracleEditor oracles={this.state.oracles} onComponentUpdate={this.componentDidUpdate} />
                </Route>

                <Route path="/asset-builder">
                  <AssetBuilder
                    assets={this.state.assets}
                    selectedAsset={this.state.assetBuilderSelectedAsset}
                    // trackLabelCursorPosition={this.state.assetBuilderTrackLabelCursorPosition}
                    onSelectedAssetChange={this.handleOnSelectedAssetChange}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>

                <Route path="/documentation">
                  <Documentation />
                </Route>
                <Route path="/data-management">
                  <DataManager
                    onResetClick={this.resetData}
                    onDownloadClick={this.saveData}
                    onLoadClick={this.loadData}
                    onUpdateAssetClick={this.updateCoreAssets}
                  />
                </Route>
                {/* </Switch> */}
              </HashRouter>
            </div>
          </div>
        </div>
        <Footer
          selectedPlayer={this.getSelectedPlayer()}
          npcs={this.state.npcs}
          foes={this.state.activeFoes.loneFoes}
          footerDice={this.state.footerDice}
          onComponentUpdate={this.componentDidUpdate}
        />

        {/* <div className="row"> */}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default App;
