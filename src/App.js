import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter, Route, Link } from "react-router-dom";
import "./css/css-compiled/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
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
import delveCardIcons from "./models/delveCardIcons";
import DefaultAsset from "./models/defaultAssets";
import DefaultDelveCard from "./models/defaultDelveCard";
import Delve from "./components/delve";
import { faMagic } from "@fortawesome/free-solid-svg-icons";
import TitleBlock from "./components/titleBlock";
import Tags from "./models/tags";
import _, { last } from "lodash";
import DenizenConfig from "./components/denizenConfig";
import DelveThemeDomainEditor from "./components/delveThemeEditor";
import DefaultFoe from "./models/defaultFoe";
import FoeEditor from "./components/foeEditor";
import Inventory from "./components/inventory";
import OracleModal from "./components/oracleModal";
import OracleRoller from "./components/oracleRoller";
import Moves from "./components/moves";

//TODO moves
//TODO Region roll
//TODO delve threats
//TODO burn mom on delve - revert progress

class App extends Component {
  version = "0.66.0";
  state = {
    save: false,
    updateCore: false,
    players: [],
    newPlayer: {},
    world: {},
    locations: [],
    foes: [],
    delveThemes: [],
    delveDomains: [],
    delveCards: [],
    moves: [],
    newFoe: {},
    activeFoes: [],
    assets: [],
    ranks: ["Troublesome", "Dangerous", "Formidable", "Extreme", "Epic"],
    assetBuilderSelectedAsset: new DefaultAsset(),
    delveCardEditorSelectedCard: new DefaultDelveCard("Theme"),
    foeCardEditorSelectedFoe: new DefaultFoe(),
    logs: [],
    newItem: {
      Name: "",
      NextId: 0,
      Description: "",
    },
    denizenConfig: {
      categoryId: "",
      nameId: "",
      denizenThemeMap: [],
      denizenDomainMap: [],
      denizenFoeMap: [],
    },
    newProgressions: [
      {
        type: "vow",
        title: "",
        details: "",
        rank: 0,
        nextId: 0,
        buttonText: "Fulfill Your Vow",
      },
      {
        type: "quest",
        title: "",
        details: "",
        rank: 0,
        nextId: 0,
        buttonText: "Complete Your Quest",
      },
      {
        type: "journey",
        title: "",
        details: "",
        rank: 0,
        nextId: 0,
        buttonText: "Reach Your Destination",
      },
      {
        type: "foe",
        title: "",
        details: "",
        rank: 0,
        nextId: 0,
        buttonText: "End the Fight",
      },
      {
        type: "epilogue",
        title: "",
        details: "",
        rank: 0,
        nextId: 0,
        buttonText: "Write Your Epilogue",
      },
    ],
    delves: [],
    newDelve: {
      theme: "",
      domain: "",
      rank: 0,
    },
    selectedDelveId: -1,
    delveSelectorId: -1,
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
    dataSize: 0,
    showGameStateModal: false,
    oracles: new Oracles(),
  };

  constructor() {
    super();
    this.diceRoller = new DiceRoller();

    let gs = localStorage.getItem("game_state");
    let state = JSON.parse(gs);
    if (state != undefined) {
      this.state = _.merge(this.state, state);
      this.state.lastSaveVersion = this.version;
      this.state.oracles = new Oracles(state.oracles);
    } else {
      this.updateDataSworn();
      this.state.baseVersion = this.version;
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

  checkDataQuota = () => {
    const data = JSON.stringify(this.state);
    const dataSize = data.length;
    this.setState({ dataSize });
  };

  saveGameState(reload = false) {
    const data = JSON.stringify(this.state);
    const dataSize = data.length;
    if (dataSize != this.state.dataSize) {
      this.setState({ dataSize });
    }

    localStorage.setItem("game_state", data);
  }

  getQuotaUsage = () => {
    return `${(this.state.dataSize / 5000000).toFixed(2)}%`;
  };

  updateDataSworn = () => {
    this.updateCoreAssets();
    this.updateFoes();
    this.updateDelveCards();
    this.updateMoves();
    this.saveGameState();
  };

  checkState = () => {
    if (
      this.state.assets &&
      this.state.assets.length > 0 &&
      this.state.foes &&
      this.state.foes.length > 0 &&
      this.state.delveCards &&
      this.state.delveCards.length > 0 &&
      this.state.moves &&
      this.state.moves.length > 0
    ) {
      this.saveGameState();
      window.location.reload("/");
    }
  };

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
          asset.augmented = false;
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
          } else {
            asset.TrackLabels = [];
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
        this.checkState();
      });
  };

  updateFoes() {
    fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_foes.json")
      .then((response) => response.json())
      .then((data) => {
        const foes = [];
        data.Categories.map((c) => {
          console.log(c);
          c.Foes.map((f) => {
            f.id = `core-foe-${c.Name.toLowerCase()}-${f.Name.toLowerCase().replace(" ", "-")}`;
            f.Type = c.Name;
            f.core = true;
            f.front = true;
            f.Tags = [];
            f.complete = false;
            f.progress = 0;
            f.progressRoll = null;
            f.icon = "perspective-dice-six-faces-random";
            // f.Source = { Name: f.Source, Page: f.Page };

            function padStats(list) {
              let padAmount = 4 - list.length;
              if (padAmount < 0) return list;
              for (let i = 0; i < padAmount; i++) {
                list.push("");
              }
              return list;
            }

            f.Tactics = padStats(f.Tactics);
            f.Features = padStats(f.Features);
            f.Drives = padStats(f.Drives);
            delete f.Page;
            foes.push(f);
          });
        });
        let foeIcons = [];
        fetch("https://raw.githubusercontent.com/rsek/datasworn-community-extras/main/foe-icons.json")
          .then((r2) => r2.json())
          .then((d2) => {
            d2.map((f2) => {
              if (f2.Type == "Ironlander") f2.Type = "Ironlanders";
              foeIcons.push(f2);
              return f2;
            });

            let foesWithTags = _.merge(foes, Tags.Foes);
            let foesWithTagsAndIcons = _.merge(foesWithTags, foeIcons);
            // this.state.foes = _.merge(foes, Tags.Foes);
            this.state.foes = foesWithTagsAndIcons;
            this.state.foeCardEditorSelectedFoe = new DefaultFoe();
            this.saveGameState();
            this.checkState();
          });
      });
  }

  updateDelveCards() {
    fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_delve_themes.json")
      .then((r1) => r1.json())
      .then((d1) => {
        let themeCards = d1.Themes.map((t) => {
          t.id = `core-theme-${t.Name.toLowerCase().replace(" ", "-")}`;
          t.icon = "perspective-dice-six-faces-random";
          t.Type = "Theme";
          t.core = true;
          t.front = true;
          t.Tags = [];
          t.Features.map((f, i) => {
            f.Min = i == 0 ? 1 : t.Features[i - 1].Chance + 1;
            return f;
          });
          t.Dangers.map((f, i) => {
            f.Min = i == 0 ? 1 : t.Dangers[i - 1].Chance + 1;
            return f;
          });
          let coreIcon = delveCardIcons.find((i) => i.id == t.id);
          if (coreIcon) t.icon = coreIcon.icon;
          return t;
        });
        // _.merge(this.state.delveCards, themeCards);

        fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_delve_domains.json")
          .then((r2) => r2.json())
          .then((d2) => {
            let domainCards = d2.Domains.map((d) => {
              d.id = `core-domain-${d.Name.toLowerCase().replace(" ", "-")}`;
              d.Type = "Domain";
              d.core = true;
              d.front = true;
              d.Tags = [];
              d.icon = "perspective-dice-six-faces-random";
              d.Features.map((f, i) => {
                f.Min = i == 0 ? 21 : d.Features[i - 1].Chance + 1;
                return f;
              });
              d.Dangers.map((f, i) => {
                f.Min = i == 0 ? 31 : d.Dangers[i - 1].Chance + 1;
                return f;
              });
              let coreIcon = delveCardIcons.find((i) => i.id == d.id);
              if (coreIcon) d.icon = coreIcon.icon;
              return d;
            });

            let delveCards = _.concat(themeCards, domainCards);
            if (!this.state.delveCards) this.state.delveCards = delveCards;

            this.state.delveCards = _.merge(delveCards, Tags.DelveCards);
            this.state.delveCardEditorSelectedCard = new DefaultDelveCard("Theme");

            this.saveGameState();
            this.checkState();
          });
      });
  }

  updateMoves() {
    fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_moves.json")
      .then((r1) => r1.json())
      .then((d1) => {
        let moves = [];
        d1.Categories.map((c) => {
          let type = c.Name.replace(" Moves", "").replace("Optional ", "");
          c.Moves.map((m) => {
            m.Type = type;
            // if (m.Name === "Ask the Oracle") {
            //   m.Text =
            //     "When **you seek to resolve questions, discover details in the world, determine how other characters respond, or trigger encounters or events**, you may…\n\n  * Draw a conclusion: Decide the answer based on the most interesting and obvious result.\n  * Ask a yes/no question: Decide the odds of a ‘yes’, and roll on the table below to check the answer.\n  * Pick two: Envision two options. Rate one as ‘likely’, and roll on the table below to see if it is true. If not, it is the other.\n  * Spark an idea: Brainstorm or use a random prompt.\n\n```Odds          \tThe answer is ‘yes’ if you roll... \n\n|Odds|Result|\n|Almost Certain|11 or greater|\n|Likely|26 or greater|\n|50/50|51 or greater|\n|Unlikely|76 or greater|\n|Small chance|91 or greater|\n||*On a match, an extreme result or twist has occurred*|";
            // }
            moves.push(m);
          });
        });
        this.state.moves = moves;
        this.saveGameState();
        this.checkState();
        // fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_move_oracles.json")
        //   .then((r2) => r2.json())
        //   .then((d2) => {

        //   });
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
    let d = new Date();
    a.download = `isc_game_state_${d.toLocaleDateString()}_${d.toLocaleTimeString()}.isc_gamedata`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // createZipFile = () => {
  //   let categories = this.state.categories.filter((c) => c.checked);
  //   if (categories.length === 0) {
  //     this.setState({
  //       status:
  //         "No categories selected. Please select a cateogory before clicking download",
  //     });
  //     this.setState({
  //       alertLevel: "danger",
  //     });
  //     return;
  //   }

  //   let zip = new JSZip();
  //   let date = new Date();
  //   let d = date.toDateString();
  //   let t = date.toLocaleTimeString().replace(/:/gm, "_");
  //   categories.map((c) => {
  //     zip.file(
  //       `${c.name}_${d}-${t}.csv`,
  //       this.arrayToCsv(this.state.records[c.name])
  //     );
  //     return c;
  //   });
  //   zip.generateAsync({ type: "blob" }).then((content) => {
  //     this.saveData(content, `health_data_${d}-${t}.zip`);
  //   });
  // };

  saveObject = (obj) => {
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

  loadData = (evt, keys) => {
    let file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let json = JSON.parse(reader.result);
      let obj = JSON.parse(json);

      Object.keys(obj).map((k) => {
        if (!keys.includes(k)) {
          delete obj[k];
        }
      });
      let gs = { ...this.state };
      let state = _.merge(gs, obj);
      let js = JSON.stringify(state);
      localStorage.setItem("game_state", js);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
    window.location.reload("/");
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

  burnMomentum = () => {
    const players = this.state.players.map((p) => {
      if (p.selected) {
        p.stats.map((s) => {
          if (s.stat == "Momentum") {
            s.value = p.resetMomentum;
          }
        });
      }
      return p;
    });
    this.setState({ players });
  };

  /*=================================*/
  /*    Log
  /*=================================*/

  handleLogInputChanged = (evt) => {
    this.setState({ logInput: evt.target.value });
  };

  handleAddLog = (type, logEntry = null) => {
    if (this.state.logInput != "" || logEntry != null) {
      const logs = this.state.logs;
      logs.push({
        id: this.state.nextLogId,
        ts: new Date(),
        text: logEntry != null ? logEntry : this.state.logInput,
        type: type,
      });
      this.setState({ nextLogId: this.state.nextLogId + 1 });
      this.setState({ logs: logs });
      if (logEntry == null) this.setState({ logInput: "" });
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

  handleAddBackground = (type) => {
    if (this.state.backgroundInput != "") {
      const players = this.state.players.map((p) => {
        if (p.selected) {
          p.background.push({
            id: this.state.nextBackgroundId,
            text: this.state.backgroundInput,
            ts: new Date(),
            type: type,
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
  /*    Filters
  /*=================================*/

  handleDelveSelectChanged = (id) => {
    this.setState({ delveSelectorId: id });
  };

  handleDelveSelected = (id) => {
    this.setState({ selectedDelveId: id });
  };

  handleLocationFilterChanged = (evt) => {
    this.setState({ npcLocationFilterId: parseInt(evt.target.value) });
  };

  handleOnSelectedAssetChange = (id) => {
    let foundAsset = this.state.assets.find((a) => a.id == id);
    let asset = { ...foundAsset };
    // asset.TrackLabels = asset.TrackLabels ? asset.TrackLabels : [];
    if (!foundAsset) {
      asset = new DefaultAsset();
    }
    this.setState({ assetBuilderSelectedAsset: asset });
  };

  handleOnSelectedDelveCardChange = (id) => {
    let foundDelveCard = this.state.delveCards.find((d) => d.id == id);
    let delveCard = { ...foundDelveCard };
    if (!foundDelveCard) {
      delveCard = new DefaultDelveCard("Theme");
    }
    this.setState({ delveCardEditorSelectedCard: delveCard });
  };

  handleOnSelectedFoeChange = (id) => {
    let foundFoe = this.state.foes.find((f) => f.id == id);
    let foe = { ...foundFoe };
    if (!foundFoe) {
      foe = new DefaultFoe();
    }
    this.setState({ foeCardEditorSelectedFoe: foe });
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
                  <h6 className="text-light">Version {this.version}</h6>
                  <h6 className="text-light">You've used {this.getQuotaUsage()} of the 5MB storage quota</h6>
                  <div class="row">
                    <div class="col-4">
                      <div class="progress">
                        <div
                          className="progress-bar bg-dark"
                          role="progressbar"
                          style={{ width: this.getQuotaUsage() }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div id="bg-image"></div>
                  {/* <div id="welcome-page-notice" className="alert alert-secondary my-4">
                    This application is still heavilly under development and is live only to demonstrate functionality
                    and receive feedback. As a result, it cannot be guaranteed that save files created in this version
                    of the application will work in all future versions.
                  </div> */}
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
                    scrollBottom={this.scrollBottom}
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
                    addLog={this.handleAddLog}
                  />
                </Route>
                <Route path="/locations">
                  <Locations
                    locations={this.state.locations}
                    oracles={this.state.oracles}
                    nextLocationId={this.state.nextLocationId}
                    npcs={this.state.npcs}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onComponentUpdate={this.componentDidUpdate}
                    addLog={this.handleAddLog}
                  />
                </Route>
                <Route exact path="/enter-the-fray">
                  <EnterTheFray
                    foes={this.state.foes}
                    ranks={this.state.ranks}
                    activeFoes={this.state.activeFoes}
                    newFoe={this.state.newFoe}
                    onComponentUpdate={this.componentDidUpdate}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    showGenerator={true}
                    selectedPlayer={this.getSelectedPlayer()}
                  />
                </Route>
                <Route exact path="/delve">
                  <Delve
                    oracles={this.state.oracles}
                    delves={this.state.delves}
                    newDelve={this.state.newDelve}
                    delveCards={this.state.delveCards}
                    foes={this.state.foes}
                    ranks={this.state.ranks}
                    selectedDelveId={this.state.selectedDelveId}
                    delveSelectorId={this.state.delveSelectorId}
                    burnMomentum={this.burnMomentum}
                    selectedPlayer={this.getSelectedPlayer()}
                    onDelveSelected={this.handleDelveSelected}
                    onDelveSelectChange={this.handleDelveSelectChanged}
                    onComponentUpdate={this.componentDidUpdate}
                    onActionRollClicked={this.handleOnActionRollClicked}
                    addLog={this.handleAddLog}
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
                    scrollBottom={this.scrollBottom}
                  />
                </Route>
                <Route exact path="/stats">
                  <Stats
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    updatePlayerSelect={this.handlePlayerSelect}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>
                <Route exact path="/vows">
                  <Progression
                    title="Vows"
                    type="vow"
                    ranks={this.state.ranks}
                    newProgressions={this.state.newProgressions}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onComponentUpdate={this.componentDidUpdate}
                    addLog={this.handleAddLog}
                  />
                </Route>
                <Route exact path="/quests">
                  <Progression
                    title="Quests"
                    type="quest"
                    info="Quests are mechanically identical to vows except they are not as much of a commitment to your character. Use quests when swearing an iron vow does not seem appropriate to the fiction. However, quests do not grant experience upon completion."
                    ranks={this.state.ranks}
                    newProgressions={this.state.newProgressions}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onComponentUpdate={this.componentDidUpdate}
                    addLog={this.handleAddLog}
                  />
                </Route>
                <Route exact path="/journeys">
                  <Progression
                    title="Journeys"
                    type="journey"
                    ranks={this.state.ranks}
                    newProgressions={this.state.newProgressions}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onComponentUpdate={this.componentDidUpdate}
                    addLog={this.handleAddLog}
                  />
                </Route>
                <Route exact path="/inventory">
                  <Inventory
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    newItem={this.state.newItem}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>

                <Route exact path="/combat">
                  <Progression
                    title="Foes"
                    info="In most scenarios 'Enter the Fray' will be more suitable for combat situations. 'Enter the Fray' combat allows you to choose specific Foes to fight. This tool should be used for edge cases like custom one-off Foes or packs."
                    // supressTitle={true}
                    type="foe"
                    ranks={this.state.ranks}
                    newProgressions={this.state.newProgressions}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onComponentUpdate={this.componentDidUpdate}
                    addLog={this.handleAddLog}
                  />
                </Route>

                {/* <Route exact path="/delve">
                  {this.state.selectedDelveId != -1 ? (
                    <React.Fragment>
                      <TitleBlock title="Create a Foe" />
                      <Progression
                        title="Foes"
                        supressTitle={true}
                        type="foe"
                        newProgressions={this.state.newProgressions}
                        players={this.state.players}
                        selectedPlayer={this.getSelectedPlayer()}
                        onProgressRollClicked={this.handleOnProgressRollClicked}
                        onComponentUpdate={this.componentDidUpdate}
                      />
                    </React.Fragment>
                  ) : (
                    React.Fragment
                  )}
                </Route> */}

                <Route exact path="/assets">
                  <Assets
                    assets={this.state.assets}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>

                <Route exact path="/oracle-roller">
                  <OracleRoller oracles={this.state.oracles} onComponentUpdate={this.componentDidUpdate} />
                </Route>

                <Route exact path="/moves">
                  <Moves
                    moves={this.state.moves}
                    onComponentUpdate={this.componentDidUpdate}
                    selectedPlayer={this.getSelectedPlayer}
                    // footerDice={this.props.footerDice}
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

                <Route path="/delve-card-editor">
                  <DelveThemeDomainEditor
                    delveCards={this.state.delveCards}
                    oracles={this.state.oracles}
                    selectedDelveCard={this.state.delveCardEditorSelectedCard}
                    onSelectedDelveCardChange={this.handleOnSelectedDelveCardChange}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>

                <Route path="/foe-editor">
                  <FoeEditor
                    foes={this.state.foes}
                    oracles={this.state.oracles}
                    ranks={this.state.ranks}
                    selectedFoe={this.state.foeCardEditorSelectedFoe}
                    onSelectedFoeChange={this.handleOnSelectedFoeChange}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>

                <Route exact path="/denizen-config">
                  <DenizenConfig
                    denizenConfig={this.state.denizenConfig}
                    oracles={this.state.oracles}
                    foes={this.state.foes}
                    delveCards={this.state.delveCards}
                    denizenThemeMap={this.state.denizenThemeMap}
                    denizenDomainMap={this.state.denizenDomainMap}
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
                    onDownloadObjectClick={this.saveObject}
                    onLoadClick={this.loadData}
                    onUpdateDataswornClick={this.updateDataSworn}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    gamestate={this.state}
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
          oracles={this.state.oracles}
          moves={this.state.moves}
          burnMomentum={this.burnMomentum}
          onComponentUpdate={this.componentDidUpdate}
        />

        {/* <div className="row"> */}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default App;