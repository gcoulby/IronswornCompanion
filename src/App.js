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

//TODO: Asset builder events
//TODO: Asset Importer
//TODO: Asset Exporter
//TODO: Asset builder
//TODO: Delve
//TODO: Asset Selector
//TODO: documentation
//TODO: Game Data management
//TODO: Popups for delete buttons

class App extends Component {
  state = {
    save: false,
    version: "0.46",
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
    assetBuilderSelectedAsset: {
      "Asset Type": "",
      Name: "",
      core: false,
      icon: "",
      id: "",
      Abilities: [],
      "Input Fields": [],
      Description: "",
      Health: 0,
      "Asset Track": {
        Name: "",
        Max: 0,
        "Starting Value": 0,
      },
      Deed: false,
    },
    coreAssetIcons: [
      { id: "core-cave-lion", icon: "saber-toothed-cat-head" },
      { id: "core-giant-spider", icon: "hanging-spider" },
      { id: "core-hawk", icon: "egyptian-bird" },
      { id: "core-horse", icon: "horse-head" },
      { id: "core-hound", icon: "sniffing-dog" },
      { id: "core-kindred", icon: "character" },
      { id: "core-mammoth", icon: "mammoth" },
      { id: "core-owl", icon: "owl" },
      { id: "core-raven", icon: "raven" },
      { id: "core-young-wyvern", icon: "wyvern" },
      { id: "core-alchemist", icon: "fizzing-flask" },
      { id: "core-animal-kin", icon: "octogonal-eye" },
      { id: "core-banner-sworn", icon: "flying-flag" },
      { id: "core-battle-scarred", icon: "triple-scratches" },
      { id: "core-blade-bound", icon: "rune-sword" },
      { id: "core-bonded", icon: "heart-shield" },
      { id: "core-dancer", icon: "bad-gnome" },
      { id: "core-devotant", icon: "sundial" },
      { id: "core-empowered", icon: "crenel-crown" },
      { id: "core-fortune-hunter", icon: "receive-money" },
      { id: "core-herbalist", icon: "three-leaves" },
      { id: "core-honorbound", icon: "cut-palm" },
      { id: "core-improviser", icon: "slalom" },
      { id: "core-infiltrator", icon: "annexation" },
      { id: "core-loyalist", icon: "shaking-hands" },
      { id: "core-masked", icon: "mecha-mask" },
      { id: "core-oathbreaker", icon: "shattered-sword" },
      { id: "core-outcast", icon: "orb-direction" },
      { id: "core-pretender", icon: "cowled" },
      { id: "core-revenant", icon: "heartburn" },
      { id: "core-rider", icon: "cavalry" },
      { id: "core-ritualist", icon: "divided-spiral" },
      { id: "core-shadow-kin", icon: "shadow-follower" },
      { id: "core-sighted", icon: "third-eye" },
      { id: "core-slayer", icon: "rock-golem" },
      { id: "core-spirit-bound", icon: "haunting" },
      { id: "core-storyweaver", icon: "book-aura" },
      { id: "core-trickster", icon: "cultist" },
      { id: "core-veteran", icon: "mailed-fist" },
      { id: "core-waterborn", icon: "big-wave" },
      { id: "core-wayfinder", icon: "compass" },
      { id: "core-weaponmaster", icon: "all-for-one" },
      { id: "core-wildblood", icon: "burning-forest" },
      { id: "core-wright", icon: "3d-hammer" },
      { id: "core-archer", icon: "high-shot" },
      { id: "core-berserker", icon: "flat-paw-print" },
      { id: "core-brawler", icon: "fist-2" },
      { id: "core-cutthroat", icon: "dripping-knife" },
      { id: "core-duelist", icon: "sword-clash" },
      { id: "core-fletcher", icon: "arrow-flights" },
      { id: "core-ironclad", icon: "viking-helmet" },
      { id: "core-long-arm", icon: "wizard-staff" },
      { id: "core-shield-bearer", icon: "viking-shield" },
      { id: "core-skirmisher", icon: "spear-feather" },
      { id: "core-slinger", icon: "sling" },
      { id: "core-sunderer", icon: "battered-axe" },
      { id: "core-swordmaster", icon: "winged-sword" },
      { id: "core-thunder-bringer", icon: "hammer-drop" },
      { id: "core-augur", icon: "crow-dive" },
      { id: "core-awakening", icon: "raise-zombie" },
      { id: "core-bind", icon: "wolf-head" },
      { id: "core-communion", icon: "candle-light" },
      { id: "core-divination", icon: "rune-stone" },
      { id: "core-invoke", icon: "embrassed-energy" },
      { id: "core-keen", icon: "dripping-blade" },
      { id: "core-leech", icon: "stigmata" },
      { id: "core-lightbearer", icon: "explosion-rays" },
      { id: "core-scry", icon: "fire-dash" },
      { id: "core-shadow-walk", icon: "abstract-116" },
      { id: "core-sway", icon: "waves" },
      { id: "core-talisman", icon: "tribal-pendant" },
      { id: "core-tether", icon: "chain-lightning" },
      { id: "core-totem", icon: "totem" },
      { id: "core-visage", icon: "double-face-mask" },
      { id: "core-ward", icon: "eclipse-flare" },
      { id: "core-commander", icon: "overlord-helm" },
      { id: "core-fated", icon: "crystal-ball" },
      { id: "core-lorekeeper", icon: "enlightenment" },
    ],
    logs: [],
    newAsset: {
      id: 0,
      type: "",
      title: "",
      iconClass: "",
      levels: [
        { selected: true, text: "" },
        { selected: true, text: "" },
        { selected: true, text: "" },
      ],
    },
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
    // newVowText: "",
    // newVowRank: 0,

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

    nextLogId: 0,
    // nextVowId: 0,
    nextAssetId: 0,
    nextBackgroundId: 0,
    // nextLocationId: 0,
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
      this.state.oracles = new Oracles(this.state.oracles);
    } else {
      this.updateCoreAssets();
      this.updateFoes();
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
    // console.log("UPDATE CORE");
    fetch(
      "https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_assets.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const assets = this.state.assets;
        for (let i = 0; i < data["Assets"].length; i++) {
          const asset = data["Assets"][i];
          asset.id = `core-${asset.Name.toLowerCase().replace(" ", "-")}`;
          asset.core = true;
          asset.front = true;
          asset.icon = "crystal-ball";
          let coreIcon = this.state.coreAssetIcons.find(
            (c) => c.id == asset.id
          );
          if (coreIcon) asset.icon = coreIcon.icon;
          asset.trackValue = 0;
          if (asset["Input Fields"] !== undefined) {
            asset["Input Fields"] = asset["Input Fields"].map((f) => {
              return { name: f, value: "" };
            });
          }
          // asset.Abilities = asset.Abilities.map(a=>{
          //   a.Enabled === undefined{}
          // })

          if (asset.id == "core-kindred") {
            asset["Input Fields"].push({
              name: asset.Abilities[0]["Input Fields"][0],
              value: "",
            });
          }

          let existingAsset = assets.find((a) => a.id == asset.id);
          if (existingAsset == undefined) {
            assets.push(asset);
          } else {
            // if (asset.id == "core-kindred") {
            //   asset["Input Fields"].push(asset.Abilities[0]["Input Fields"][0]);
            // }
            assets[assets.indexOf(existingAsset)] = asset;
          }
        }
        this.state.assets = assets;
        console.log(assets);
        this.saveGameState();
      });
  };

  updateFoes() {
    fetch(
      "https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_foes.json"
    )
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
    // console.log(evt.target.files[0]);
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
    const logs = this.state.logs.filter(
      (l) => this.state.logs.indexOf(l) !== logId
    );
    this.setState({ logs });
  };

  /*=================================*/
  /*    NPCs
  /*=================================*/

  handleAddNPC = () => {
    const npcs = [...this.state.npcs];
    const npc = {};
    npc.id = this.state.nextNPCId;
    npc.race = this.state.newNPC.Race;
    npc.name = this.state.newNPC.Name;
    npc.role = this.state.newNPC.Role;
    npc.goal = this.state.newNPC.Goal;
    npc.descriptor = this.state.newNPC.Descriptor;
    npc.disposition = this.state.newNPC.Disposition;
    npc.conversation = this.state.newNPC.Conversation;
    npc.knowledge = this.state.newNPC.Knowledge;
    npc.bond = 0;
    npc.locationId = this.state.newNPC.Location;
    if (
      this.state.newNPC.Name != "" &&
      !npcs.find((n) => n.id == this.state.newNPC.id)
    ) {
      npcs.push(npc);
      const newNPC = {
        Race: "",
        Name: "",
        Role: "",
        Goal: "",
        Descriptor: "",
        Disposition: "",
        Conversation: "",
        Knowledge: "",
        Location: -1,
      };

      this.setState({ npcs });
      this.setState({ newNPC });
      this.setState({ nextNPCId: this.state.nextNPCId + 1 });
    }
  };

  handleOnAddRandomNPC = () => {
    this.handleOnRollNewNPCName();
    this.handleOnRollNewNPCGoal();
    this.handleOnRollNewNPCRole();
    this.handleOnRollNewNPCDescriptor();
    this.handleOnRollNewNPCDisposition();
    this.handleOnRollNewNPCConversation();
    this.handleOnRollNewNPCKnowledge();
  };

  handleNPCDelete = (npcId) => {
    const npcs = this.state.npcs.filter((n) => n.id !== npcId);
    this.setState({ npcs });
  };

  handleRollNPCRace = () => {
    const newNPC = this.state.newNPC;
    newNPC.Race = this.state.oracles.NPCRace;
    this.setState({ newNPC });
  };

  handleNewNPCRaceChanged = (evt) => {
    const newNPC = this.state.newNPC;
    newNPC.Race = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCName = () => {
    const newNPC = this.state.newNPC;
    let race = newNPC.Race;
    if (race == "" || race == undefined || race == "Select Race") {
      newNPC.Race = this.state.oracles.NPCRace;
    }
    newNPC.Name = this.state.oracles.getNPCName(newNPC.Race);

    this.setState({ newNPC });
  };

  handleNewNPCNameChanged = (evt) => {
    const newNPC = this.state.newNPC;
    newNPC.Name = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCGoal = () => {
    const newNPC = this.state.newNPC;
    newNPC.Goal = this.state.oracles.CharacterGoal;
    this.setState({ newNPC });
  };

  handleNewNPCGoalChanged = (evt) => {
    const newNPC = this.state.newNPC;
    newNPC.Goal = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCRole = () => {
    const newNPC = this.state.newNPC;
    newNPC.Role = this.state.oracles.CharacterRole;
    this.setState({ newNPC });
  };

  handleNewNPCRoleChanged = (evt) => {
    const newNPC = this.state.newNPC;
    newNPC.Role = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCDescriptor = () => {
    const newNPC = this.state.newNPC;
    newNPC.Descriptor = this.state.oracles.CharacterDescriptor;
    this.setState({ newNPC });
  };

  handleNewNPCDescriptorChanged = (evt) => {
    const newNPC = this.state.newNPC;
    newNPC.Descriptor = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCDisposition = () => {
    const newNPC = this.state.newNPC;
    newNPC.Disposition = this.state.oracles.CharacterDisposition;
    this.setState({ newNPC });
  };

  handleNewNPCDispositionChanged = (evt) => {
    const newNPC = this.state.newNPC;
    newNPC.Disposition = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCConversation = () => {
    const newNPC = this.state.newNPC;
    newNPC.Conversation = this.state.oracles.NPCConversation;
    this.setState({ newNPC });
  };

  handleNewNPCConversationChanged = (evt) => {
    const newNPC = this.state.newNPC;
    newNPC.Conversation = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCKnowledge = () => {
    const newNPC = this.state.newNPC;
    newNPC.Knowledge = this.state.oracles.NPCKnowledge;
    this.setState({ newNPC });
  };

  handleNewNPCKnowledgeChanged = (evt) => {
    const newNPC = this.state.newNPC;
    newNPC.Knowledge = evt.target.value;
    this.setState({ newNPC });
  };

  handleNewNPCLocationChanged = (evt) => {
    const newNPC = this.state.newNPC;
    newNPC.Location = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnNPCProgressionChanged = (id, increment) => {
    const npcs = this.state.npcs.map((n) => {
      if (n.id == id) {
        let val = increment ? 1 : -1;
        n.bond += val;
        n.bond = n.bond > 40 ? 40 : n.bond;
        n.bond = n.bond < 0 ? 0 : n.bond;

        const players = this.state.players.map((p) => {
          // if (p.name == this.getSelectedPlayer().name) {
          p.bonds += val;
          p.bonds = p.bonds > 40 ? 40 : p.bonds;
          p.bonds = p.bonds < 0 ? 0 : p.bonds;
          // }
          return p;
        });
        this.setState({ players });
      }
      return n;
    });
    this.setState({ npcs });
  };

  handleOnNPCLocationChanged = (evt, id) => {
    const npcs = this.state.npcs.map((n) => {
      if (n.id == id) {
        n.locationId = evt.target.value;
      }
      return n;
    });
    this.setState({ npcs });
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
        p.background = p.background.filter(
          (b) => p.background.indexOf(b) !== logId
        );
      }
      return p;
    });
    this.setState({ players });
  };

  /*=================================*/
  /*    Asset Builder
  /*=================================*/

  handleOnSelectedAssetChange = (evt) => {
    // console.log(evt.target.value);
    this.setState({
      assetBuilderSelectedAsset: this.state.assets.find(
        (a) => a.id == evt.target.value
      ),
    });
  };

  /*=================================*/
  /*    Footer Dice
  /*=================================*/

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
                  <div id="bg-image"></div>
                  <div className="alert alert-danger">
                    This application is still heavilly under development and is
                    live only to demonstrate functionality and receive feedback.
                    As a result, it is unlikely that save files created in this
                    version of the application will work in future versions.
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
                  <World
                    world={this.state.world}
                    // setState={this.handleSetState}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>
                <Route path="/npcs">
                  <NPCs
                    selectedPlayer={this.getSelectedPlayer()}
                    newNPC={this.state.newNPC}
                    races={this.state.oracles.getOracleTableAsArray("Races")}
                    npcs={this.state.npcs}
                    locations={this.state.locations}
                    onAddNPC={this.handleAddNPC}
                    onRollNPCName={this.handleOnRollNewNPCName}
                    onNewNPCNameChanged={this.handleNewNPCNameChanged}
                    onRollNPCRace={this.handleRollNPCRace}
                    onNewNPCRaceChanged={this.handleNewNPCRaceChanged}
                    onRollNewNPCGoal={this.handleOnRollNewNPCGoal}
                    onNewNPCGoalChanged={this.handleNewNPCGoalChanged}
                    onRollNewNPCRole={this.handleOnRollNewNPCRole}
                    onNewNPCRoleChanged={this.handleNewNPCRoleChanged}
                    onRollNewNPCDescriptor={this.handleOnRollNewNPCDescriptor}
                    onNewNPCDescriptorChanged={
                      this.handleNewNPCDescriptorChanged
                    }
                    onRollNewNPCDisposition={this.handleOnRollNewNPCDisposition}
                    onNewNPCDispositionChanged={
                      this.handleNewNPCDispositionChanged
                    }
                    onRollNewNPCConversation={
                      this.handleOnRollNewNPCConversation
                    }
                    onNewNPCConversationChanged={
                      this.handleNewNPCConversationChanged
                    }
                    onRollNewNPCKnowledge={this.handleOnRollNewNPCKnowledge}
                    onNewNPCKnowledgeChanged={this.handleNewNPCKnowledgeChanged}
                    onNewNPCLocationChanged={this.handleNewNPCLocationChanged}
                    onNPCDelete={this.handleNPCDelete}
                    onNPCProgressionChanged={this.handleOnNPCProgressionChanged}
                    onNPCLocationChanged={this.handleOnNPCLocationChanged}
                    onAddRandomNPC={this.handleOnAddRandomNPC}
                  />
                </Route>
                <Route path="/locations">
                  <Locations
                    locations={this.state.locations}
                    nextLocationId={this.state.nextLocationId}
                    npcs={this.state.npcs}
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
                    logs={
                      this.getSelectedPlayer()
                        ? this.getSelectedPlayer().background
                        : null
                    }
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
                  <OracleEditor
                    oracles={this.state.oracles}
                    onComponentUpdate={this.componentDidUpdate}
                  />
                </Route>

                <Route path="/asset-builder">
                  <AssetBuilder
                    assets={this.state.assets}
                    selectedAsset={this.state.assetBuilderSelectedAsset}
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
          setState={this.handleSetState}
        />

        {/* <div className="row"> */}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default App;
