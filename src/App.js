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
import delveCardIcons from "./models/delveCardIcons";
import DefaultAsset from "./models/defaultAssets";
import DefaultDelveCard from "./models/defaultDelveCard";
import Delve from "./components/delve";
import { faMagic } from "@fortawesome/free-solid-svg-icons";
import TitleBlock from "./components/titleBlock";
import foeTags from "./models/foes";
import _, { last } from "lodash";
import DenizenConfig from "./components/denizenConfig";
import DelveThemeDomainEditor from "./components/delveThemeEditor";

//TODO Delve
//TODO delve threats
//TODO burn mom on delve - revert progress
//TODO pay the price button
//TODO dice roller progress roll/action roll split
//TODO player Export
//TODO Settings export (assets, denizens oracles, foes)

class App extends Component {
  version = "0.50.2";
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
    newFoe: {},
    activeFoes: {
      loneFoes: [],
      packs: [],
    },
    assets: [],
    assetBuilderSelectedAsset: new DefaultAsset(),
    delveCardEditorSelectedCard: new DefaultDelveCard(),
    logs: [],
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
      this.state = _.merge(this.state, state);
      this.state.lastSaveVersion = this.version;
      this.state.oracles = new Oracles(state.oracles);
    } else {
      this.updateDataSworn();
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

  updateDataSworn = () => {
    // this.setState({ loading: true });
    this.updateCoreAssets();
    this.updateFoes();
    this.updateDelveThemes();
    this.updateDelveDomains();
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
      });
  };

  updateFoes() {
    // fetch(
    //   "https://script.googleusercontent.com/macros/echo?user_content_key=8ADH_3nTqFNUd3jqDoZDWqY6ACkI6BUqRYULzpu_Gb8Yp0nJWZdXJeUoLxt50rhxYoHPz4L6U1BJlyzlZ9gqL65L84z1baYeOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa5V7SzAZj2xBfFDRtNxpfsmuqfjnOYLBpWrI3G8IWJh29l4LSossvEa_fiNHZ0znxEBErwHi9mmijAjx2Qzi6YLFafVHYA-fHoaihMzNmH7H6fRUaYjRqb-wGtNIpK8czCo4suGtgA13VZz-s-VspJx_3Qdvv53yRg&lib=M7OO09pfGNQD9igEAo4bouJoiE_6Oxspk"
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const foes = [...this.state.foes, ...data.records];
    //     this.state.foes = foes;
    //     this.saveGameState();
    //   });

    fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_foes.json")
      .then((response) => response.json())
      .then((data) => {
        const foes = data.Categories.map((c) => {
          c.Foes.map((f) => {
            f.id = `core-foe-${c.Name.toLowerCase()}-${f.Name.toLowerCase().replace(" ", "-")}`;
            f.Type = c.Name;
            f.core = true;
            f.front = true;
            f.Tags = [];
            f.icon = "perspective-dice-six-faces-random";
            f.Source = { Name: f.Source, Page: f.Page };
            delete f.Page;
          });
        });
        this.state.foes = _.merge(foes, foeTags);
        this.saveGameState();
      });

    //     fetch(
    //       "https://script.googleusercontent.com/macros/echo?user_content_key=8ADH_3nTqFNUd3jqDoZDWqY6ACkI6BUqRYULzpu_Gb8Yp0nJWZdXJeUoLxt50rhxYoHPz4L6U1BJlyzlZ9gqL65L84z1baYeOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa5V7SzAZj2xBfFDRtNxpfsmuqfjnOYLBpWrI3G8IWJh29l4LSossvEa_fiNHZ0znxEBErwHi9mmijAjx2Qzi6YLFafVHYA-fHoaihMzNmH7H6fRUaYjRqb-wGtNIpK8czCo4suGtgA13VZz-s-VspJx_3Qdvv53yRg&lib=M7OO09pfGNQD9igEAo4bouJoiE_6Oxspk"
    //     )
    //       .then((r2) => r2.json())
    //       .then((d2) => {
    //         console.log(d2.records);
    //         this.state.foes.map((f) => {
    //           f.Foes.map((f2) => {
    //             f2.Tags = [];
    //             let record = d2.records.find(
    //               (d) =>
    //                 f2.Name.toLowerCase() === d.name.toLowerCase() &&
    //                 (f.Name.toLowerCase() === d.type.toLowerCase() ||
    //                   f.Name.toLowerCase() === d.type.toLowerCase() + "s")
    //             );
    //             for (let prop in record) {
    //               if (typeof record[prop] === "boolean") {
    //                 f2.Tags.push(prop);
    //                 console.log(prop);
    //               }
    //             }
    //             console.log(f2);
    //             return f2;
    //           });
    //           return f;
    //         });
    //         const foes = [...this.state.foes];
    //         console.log(d2.records);
    //         // this.state.foes = foes;
    //         // this.saveGameState();
    //       });
    //   });
    // this.state.foes = foes;
  }

  updateDelveThemes() {
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

            // this.state.delveCards = delveCards;
            // console.log(themeCards);
            let delveCards = _.concat(themeCards, domainCards);
            console.log(delveCards);
            if (!this.state.delveCards) this.state.delveCards = delveCards;

            _.merge(this.state.delveCards, delveCards);
            this.saveGameState();
            // console.log(
            //   this.state.delveCards.map((d) => {
            //     return { id: d.id, icon: "" };
            //   })
            // );
          });

        // this.state.delveCards = delveCards;

        // this.saveGameState();
      });
  }

  updateDelveDomains() {
    // fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_delve_domains.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const delveCards = data.Domains.map((t) => {
    //       t.Type = "Domain";
    //       return t;
    //     });
    //     _.merge(this.state.delveCards, delveCards);
    //     // this.state.delveCards = delveCards;
    //     this.saveGameState();
    //   });
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

  burnMomentum = () => {
    const players = this.state.players.map((p) => {
      if (p.selected) {
        p.stats.map((s) => {
          if (s.stat == "Momentum") {
            console.log("Mom");
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
    console.log(id);
    let foundDelveCard = this.state.delveCards.find((d) => d.id == id);
    console.log(foundDelveCard);
    let delveCard = { ...foundDelveCard };
    if (!foundDelveCard) {
      delveCard = new DefaultDelveCard("Theme");
    }
    this.setState({ delveCardEditorSelectedCard: delveCard });
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
                    foes={this.state.foes.filter(function (f) {
                      return f.Foes.some(function (f2) {
                        return (f.Foes = f.Foes.filter((f2) => {
                          return f2.Source === "Ironsworn";
                        }));
                      });
                    })}
                    activeFoes={this.state.activeFoes}
                    newFoe={this.state.newFoe}
                    onComponentUpdate={this.componentDidUpdate}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    showGenerator={true}
                  />
                </Route>
                <Route exact path="/delve">
                  <Delve
                    oracles={this.state.oracles}
                    delves={this.state.delves}
                    newDelve={this.state.newDelve}
                    delveThemes={this.state.delveThemes}
                    delveDomains={this.state.delveDomains}
                    foes={this.state.foes}
                    selectedDelveId={this.state.selectedDelveId}
                    delveSelectorId={this.state.delveSelectorId}
                    burnMomentum={this.burnMomentum}
                    selectedPlayer={this.getSelectedPlayer()}
                    onDelveSelected={this.handleDelveSelected}
                    onDelveSelectChange={this.handleDelveSelectChanged}
                    onComponentUpdate={this.componentDidUpdate}
                    onActionRollClicked={this.handleOnActionRollClicked}
                    footerDice={this.state.footerDice}
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
                    addLog={this.handleAddLog}
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
                    addLog={this.handleAddLog}
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
                    addLog={this.handleAddLog}
                  />
                </Route>

                <Route exact path="/enter-the-fray">
                  <Progression
                    title="Foes"
                    supressTitle={true}
                    type="foe"
                    newProgressions={this.state.newProgressions}
                    players={this.state.players}
                    selectedPlayer={this.getSelectedPlayer()}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onComponentUpdate={this.componentDidUpdate}
                    onAddLog={this.handleAddLog}
                  />
                </Route>

                <Route exact path="/delve">
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

                <Route path="/delve-card-editor">
                  <DelveThemeDomainEditor
                    delveCards={this.state.delveCards}
                    oracles={this.state.oracles}
                    selectedDelveCard={this.state.delveCardEditorSelectedCard}
                    onSelectedDelveCardChange={this.handleOnSelectedDelveCardChange}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>
                <Route exact path="/denizen-config">
                  <DenizenConfig
                    denizenConfig={this.state.denizenConfig}
                    oracles={this.state.oracles}
                    foes={this.state.foes}
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
                    onLoadClick={this.loadData}
                    onUpdateDataswornClick={this.updateDataSworn}
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
          onComponentUpdate={this.componentDidUpdate}
        />

        {/* <div className="row"> */}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default App;
