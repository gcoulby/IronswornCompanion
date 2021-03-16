import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Character from "./models/character";
import Documentation from "./components/documentation";
import Map from "./components/map";
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
    updateCore: false,
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 3 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
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
    foes: [],
    nextFoeId: 0,
    newFoeCategoryId: -1,
    newFoeTypeId: -1,
    activeFoes: {
      loneFoes: [],
      packs: [],
    },
    newPlayerName: "",
    newPlayerRole: "",
    newPlayerGoal: "",
    newPlayerDescriptor: "",
    newPlayerStats: this.getNewStats(),
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
    newVowText: "",
    newVowRank: 0,
    world: [
      { id: "old-world", truths: [false, false, false] },
      { id: "iron", truths: [false, false, false] },
      { id: "legacies", truths: [false, false, false] },
      { id: "communities", truths: [false, false, false] },
      { id: "leaders", truths: [false, false, false] },
      { id: "defense", truths: [false, false, false] },
      { id: "mysticism", truths: [false, false, false] },
      { id: "religion", truths: [false, false, false] },
      { id: "firstborn", truths: [false, false, false] },
      { id: "beasts", truths: [false, false, false] },
      { id: "horrors", truths: [false, false, false] },
    ],
    imgurAlbumHash: "cFnZi",
    customWorldDetails: "",
    customWorldQuestStarter: "",
    logInput: "",
    backgroundInput: "",
    players: [],
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
    locations: [],
    nextLogId: 0,
    nextVowId: 0,
    nextAssetId: 0,
    nextBackgroundId: 0,
    nextLocationId: 0,
    nextNPCId: 0,
    footerDiceProgressId: "",
    footerDiceStatId: "",
    footerDiceAddVal: 0,
    footerDiceChallenge1Value: 0,
    footerDiceChallenge2Value: 0,
    footerDiceActionValue: 0,
    footerDiceActionScore: 0,
    footerDiceHitType: "",
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

  saveGameState() {
    localStorage.setItem("game_state", JSON.stringify(this.state));
  }

  updateCoreAssets() {
    console.log("UPDATE CORE");
    fetch(
      "https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_assets.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const assets = [...this.state.assets];
        for (let i = 0; i < data["Assets"].length; i++) {
          const asset = data["Assets"][i];
          asset.id = `core-${asset.Name.toLowerCase().replace(" ", "-")}`;
          console.log(asset.id);
          asset.core = true;
          let existingAsset = assets.find((a) => a.id == asset.id);
          if (existingAsset == undefined) {
            asset.icon = "crystal-ball";
            let coreIcon = this.state.coreAssetIcons.find(
              (c) => c.id == asset.id
            );
            if (coreIcon) asset.icon = coreIcon.icon;

            if (asset.id == "core-kindred") {
              asset["Input Fields"].push(asset.Abilities[0]["Input Fields"][0]);
            }
            assets.push(asset);
          } else {
            if (asset.id == "core-kindred") {
              asset["Input Fields"].push(asset.Abilities[0]["Input Fields"][0]);
            }
            assets[assets.indexOf(existingAsset)] = asset;
          }
        }
        this.state.assets = assets;
        this.saveGameState();
      });
  }

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
    window.location.replace("/");
  }

  getNewStats() {
    return [
      { id: 1, type: "core", stat: "Edge", value: 0 },
      { id: 2, type: "core", stat: "Heart", value: 0 },
      { id: 3, type: "core", stat: "Iron", value: 0 },
      { id: 4, type: "core", stat: "Shadow", value: 0 },
      { id: 5, type: "core", stat: "Wits", value: 0 },
      { id: 6, type: "status", stat: "Health", value: 5 },
      { id: 7, type: "status", stat: "Spirit", value: 5 },
      { id: 8, type: "status", stat: "Supply", value: 5 },
      { id: 9, type: "status", stat: "Momentum", value: 2 },
    ];
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
    console.log(evt.target.files[0]);
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

  componentDidUpdate() {
    this.saveGameState();
    this.scrollBottom();
    if (this.state.save) {
      // this.updateCoreAssets();
      // this.saveGameState();
      this.setState({ save: false });
    }
  }

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
    this.setState({ save: true });
    window.location.replace("/stats");
  };

  handleAddCharacter = () => {
    const players = [...this.state.players];
    const player = new Character();
    player.name = this.state.newPlayerName;
    player.role = this.state.newPlayerRole;
    player.goal = this.state.newPlayerGoal;
    player.descriptor = this.state.newPlayerDescriptor;
    player.stats = this.state.newPlayerStats;
    if (
      this.state.newPlayerName != "" &&
      !players.find((p) => p.name == this.state.newPlayerName)
    ) {
      players.push(player);
      this.setState({ newPlayerName: "" });
      this.setState({ newPlayerRole: "" });
      this.setState({ newPlayerGoal: "" });
      this.setState({ newPlayerDescriptor: "" });
      this.setState({ newPlayerStats: this.getNewStats() });
      this.setState({ players: players });
      this.setState({ save: true });
    }
  };

  handlePlayerDelete = (playerName) => {
    const players = this.state.players.filter((p) => p.name !== playerName);
    this.setState({ players });
    this.setState({ save: true });
  };

  handleOnRollPlayerName = () => {
    let rn = this.state.oracles.IronlanderName;
    this.setState({ newPlayerName: rn });
  };

  handleNewPlayerNameChanged = (evt) => {
    this.setState({ newPlayerName: evt.target.value });
  };

  handleOnRollPlayerRole = () => {
    let rn = this.state.oracles.CharacterRole;
    this.setState({ newPlayerRole: rn });
  };

  handleNewPlayerRoleChanged = (evt) => {
    this.setState({ newPlayerRole: evt.target.value });
  };

  handleOnRollPlayerGoal = () => {
    let rn = this.state.oracles.CharacterGoal;
    this.setState({ newPlayerGoal: rn });
  };

  handleNewPlayerGoalChanged = (evt) => {
    this.setState({ newPlayerGoal: evt.target.value });
  };

  handleOnRollPlayerDescriptor = () => {
    let rn = this.state.oracles.CharacterDescriptor;
    this.setState({ newPlayerDescriptor: rn });
  };

  handleNewPlayerDescriptorChanged = (evt) => {
    this.setState({ newPlayerDescriptor: evt.target.value });
  };

  handleOnRollPlayerPrimaryStat = () => {
    let rn = this.state.oracles.PrimaryStat;
    const newPlayerStats = this.state.newPlayerStats.map((s) => {
      if (s.type == "core") s.value = s.id == rn ? 3 : "";
      return s;
    });
    this.setState({ newPlayerStats });
  };

  handleNewPlayerStatChanged = (evt) => {
    let statName = evt.target.getAttribute("data-name");
    const newPlayerStats = this.state.newPlayerStats.map((s) => {
      if (s.stat == statName) s.value = evt.target.value;
      return s;
    });
    this.setState({ newPlayerStats });
  };

  getSelectedPlayer() {
    return this.state.players.find((p) => p.selected);
  }

  handleOnPlayerProgressionChanged = (playerName, increment) => {
    const players = this.state.players.map((p) => {
      if (p.name == playerName) {
        let val = increment ? 1 : -1;
        p.bonds += val;
        p.bonds = p.bonds > 40 ? 40 : p.bonds;
        p.bonds = p.bonds < 0 ? 0 : p.bonds;
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
  /*    World
  /*=================================*/

  handleWorldTruthSelector = (e, tab, id) => {
    const world = this.state.world.map((w) => {
      if (w.id == tab) w.truths[id] = e.target.checked;
      return w;
    });
    this.setState({ world });
  };

  handleRollWorldClick = () => {
    const world = this.state.world.map((w) => {
      const die = this.diceRoller.roll([3]);
      for (let i = 0; i < w.truths.length; i++) {
        if (i == die[0].value) {
          w.truths[i] = true;
        } else w.truths[i] = false;
      }
      return w;
    });
    this.setState({ world });
  };

  handleCustomWorldDetailsInputChanged = (evt) => {
    this.setState({ customWorldDetails: evt.target.value });
  };
  handleCustomWorldQuestStarterInputChanged = (evt) => {
    this.setState({ customWorldQuestStarter: evt.target.value });
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
  /*    Locations
  /*=================================*/

  handleAddLocationClick = (
    id,
    name,
    descriptor,
    features,
    trouble,
    x,
    y,
    additionalInfo
  ) => {
    if (name != "" && x > 0 && y > 0) {
      const locations = [...this.state.locations];
      id = id == -1 ? this.state.nextLocationId : id;
      locations[locations.length] = {
        id: id,
        name: name,
        descriptor: descriptor,
        features: features,
        trouble: trouble,
        x: x,
        y: y,
        additionalInfo: additionalInfo,
        bond: 0,
      };
      this.setState({ nextLocationId: this.state.nextLocationId + 1 });
      this.setState({ locations });
    }
  };

  handleOnLocationDeleteClick = (id) => {
    const locations = this.state.locations.filter((l) => l.id !== id);
    this.setState({ locations });
  };

  handleOnLocationProgressionChanged = (id, increment) => {
    const locations = this.state.locations.map((l) => {
      if (l.id == id) {
        let val = increment ? 1 : -1;
        l.bond += val;
        l.bond = l.bond > 40 ? 40 : l.bond;
        l.bond = l.bond < 0 ? 0 : l.bond;

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
      return l;
    });
    this.setState({ locations });
  };

  /*=================================*/
  /*    Enter the Fray
  /*=================================*/

  getRandomFoeCategory() {
    return this.diceRoller.roll([this.state.foes.length], false)[0].value;
  }

  getRandomFoeType(newFoeCategoryId) {
    return this.diceRoller.roll(
      [this.state.foes[newFoeCategoryId].Foes.length],
      false
    )[0].value;
  }

  getRandomPackFoe(newFoeCategoryId, rank = null) {
    let foes = this.state.foes[newFoeCategoryId].Foes.filter(
      (f) => f.Rank === "Dangerous"
    );
    console.log("foes");
    console.log(foes);
    let rn = this.diceRoller.roll([foes.length], false)[0].value;
    // console.log(rn);
    let foe = foes[rn];
    console.log(foe);
    return foe;
    // let i = this.state.foes[newFoeCategoryId].Foes.indexOf(foe);
    // return this.state.foes[newFoeCategoryId].Foes[i];
  }

  handleOnRollNewFoe = () => {
    const newFoeCategoryId = this.getRandomFoeCategory();
    this.setState({ newFoeCategoryId });
    const newFoeTypeId = this.getRandomFoeType(newFoeCategoryId);
    this.setState({ newFoeTypeId });
  };

  handleOnRollNewFoeType = () => {
    let newFoeCategoryId = this.state.newFoeCategoryId;
    if (
      this.state.newFoeCategoryId === -1 ||
      this.state.newFoeCategoryId === "Select Foe Category"
    ) {
      newFoeCategoryId = this.getRandomFoeCategory();
      this.setState({ newFoeCategoryId });
    }
    const newFoeTypeId = this.getRandomFoeType(newFoeCategoryId);
    this.setState({ newFoeTypeId });
  };

  handleOnNewFoeCategoryChanged = (evt) => {
    this.setState({ newFoeCategoryId: evt.target.value });
  };

  handleOnNewFoeTypeChanged = (evt) => {
    this.setState({ newFoeTypeId: evt.target.value });
  };

  handleOnAddFoe = () => {
    if (
      this.props.newFoeCategoryId == -1 ||
      this.props.newFoeCategoryId == "Select Foe Category" ||
      this.props.newFoeTypeId == -1 ||
      this.props.newFoeTypeId == "Select Foe Type"
    )
      return;
    const activeFoes = this.state.activeFoes;

    const foe = this.state.foes[this.state.newFoeCategoryId].Foes[
      this.state.newFoeTypeId
    ];
    foe.progress = 0;
    foe.id = this.state.nextFoeId;
    activeFoes.loneFoes.push(foe);
    this.setState({ activeFoes });
    this.setState({ newFoeCategoryId: -1 });
    this.setState({ newFoeTypeId: -1 });
    this.setState({ nextFoeId: this.state.nextFoeId + 1 });
  };

  handleOnAddRandomPack = () => {
    let ranks = ["Troublesome", "Dangerous"];
    let rank = ranks[this.diceRoller.roll([2], false)[0].value];
    console.log(`Rank ${rank}`);
    let rn = this.diceRoller.roll([10], false)[0].value;
    const activeFoes = this.state.activeFoes;
    const newFoeCategoryId = this.getRandomFoeCategory();
    console.log(`categoryId ${newFoeCategoryId}`);
    activeFoes.packs.push([]);
    for (let i = 0; i < rn; i++) {
      // const newFoeTypeId = this.getRandomFoeType(newFoeCategoryId, true);
      // const foe = this.state.foes[newFoeCategoryId].Foes[newFoeTypeId];
      const foe = this.getRandomPackFoe(newFoeCategoryId, rank);
      console.log(foe);

      activeFoes.packs[activeFoes.packs.length - 1].push(foe);
    }

    this.setState({ activeFoes });
    this.setState({ newFoeCategoryId: -1 });
    this.setState({ newFoeTypeId: -1 });
  };

  handleOnFoeProgressionChanged = (id, rank, increment) => {
    console.log(id);
    console.log(rank);
    console.log(increment);

    const activeFoes = this.state.activeFoes;

    activeFoes.loneFoes.map((lf) => {
      if (lf.id == id) {
        let val = 0;
        switch (rank) {
          case "Troublesome":
            val = increment ? 12 : -12;
            break;
          case "Dangerous":
            val = increment ? 8 : -8;
            break;
          case "Formidable":
            val = increment ? 4 : -4;
            break;
          case "Extreme":
            val = increment ? 2 : -2;
            break;
          case "Epic":
            val = increment ? 1 : -1;
            break;
        }
        console.log(`val: ${val}`);
        lf.progress += val;
        lf.progress = lf.progress > 40 ? 40 : lf.progress;
        lf.progress = lf.progress < 0 ? 0 : lf.progress;
      }
      console.log(lf);
      return lf;
    });
    this.setState({ activeFoes });
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
  /*    Stat
  /*=================================*/

  valueToStat(val, steps) {
    let n = 100 / (steps - 1);
    return val == 0 ? 0 : Math.round(val / n);
  }

  handleStatTrackChange = (evt, name, steps, offset) => {
    let val = evt.target.value;
    let stat = this.valueToStat(val, steps) + offset;
    const players = this.state.players.map((p) => {
      if (p.selected) {
        const stats = p.stats.map((s) => {
          if (s.stat == name) {
            s.value = stat;
          }
          return s;
        });
      }
      return p;
    });

    this.setState({ players });
    if (name == "Momentum") this.checkMomentum();
  };

  handleDebilityChange = (evt, name) => {
    let checked = evt.target.checked;
    let count = 0;
    const players = this.state.players.map((p) => {
      if (p.selected) {
        const debilities = p.debilities.map((d) => {
          if (d.name == name) {
            d.active = checked;
          }
          return d;
        });
        count = debilities.filter((d) => d.active).length;
        p.maxMomentum = 10 - count;
        switch (count) {
          case 0:
            p.resetMomentum = 2;
            break;
          case 1:
            p.resetMomentum = 1;
            break;
          default:
            p.resetMomentum = 0;
            break;
        }
      }
      return p;
    });
    this.setState({ players });
    this.checkMomentum();
  };

  checkMomentum() {
    const players = this.state.players.map((p) => {
      if (p.selected) {
        const stats = p.stats.map((s) => {
          if (s.stat == "Momentum" && s.value > p.maxMomentum) {
            s.value = p.maxMomentum;
          }
          return s;
        });
      }
      return p;
    });

    this.setState({ players });
  }

  handleOnExperienceChange = (type) => {
    const players = this.state.players.map((p) => {
      if (p.selected) {
        switch (type) {
          case "INC":
            p.totalExperience =
              p.totalExperience + 1 >= 30 ? 30 : p.totalExperience + 1;
            break;
          case "DEC":
            p.totalExperience =
              p.totalExperience - 1 <= 0 ? 0 : p.totalExperience - 1;

            p.spentExperience =
              p.totalExperience < p.spentExperience
                ? p.totalExperience
                : p.spentExperience;
            break;
          case "REG":
            p.spentExperience =
              p.spentExperience - 1 <= 0 ? 0 : p.spentExperience - 1;
            break;
          case "ADV":
            p.spentExperience =
              p.spentExperience + 1 >= 30 ? 30 : p.spentExperience + 1;

            p.totalExperience =
              p.spentExperience > p.totalExperience
                ? p.spentExperience
                : p.totalExperience;
            break;
        }
      }
      return p;
    });

    this.setState({ players });
  };

  /*=================================*/
  /*    Vows
  /*=================================*/

  handleOnNewProgressionTextChanged = (evt, type) => {
    const newProgressions = this.state.newProgressions.map((np) => {
      if (np.type == type) {
        np.text = evt.target.value;
      }
      return np;
    });
    this.setState({ newProgressions });
  };

  handleOnNewProgressionRankChanged = (evt, type) => {
    const newProgressions = this.state.newProgressions.map((np) => {
      if (np.type == type) {
        np.rank = evt.target.value;
      }
      return np;
    });
    this.setState({ newProgressions });
  };

  handleOnAddNewProgression = (type) => {
    // let type = "vow";
    if (this.getProgressionByType(type).text != "") {
      const players = this.state.players.map((p) => {
        if (p.selected) {
          p.progressions.push({
            id: this.getProgressionByType(type).nextId,
            type: type,
            progress: 0,
            text: this.getProgressionByType(type).text,
            rank: this.getProgressionByType(type).rank,
          });
        }
        return p;
      });

      const newProgressions = this.state.newProgressions.map((np) => {
        if (np.type == type) {
          np.text = "";
          np.rank = 0;
          np.nextId++;
        }
        return np;
      });
      this.setState({ players });
      this.setState({ newProgressions });
    }
  };

  handleOnProgressionChanged = (id, rank, increment) => {
    const players = this.state.players.map((p) => {
      if (p.selected) {
        p.progressions.map((p2) => {
          if (p2.id == id) {
            let val = 0;
            switch (parseInt(rank)) {
              case 0:
                val = increment ? 12 : -12;
                break;
              case 1:
                val = increment ? 8 : -8;
                break;
              case 2:
                val = increment ? 4 : -4;
                break;
              case 3:
                val = increment ? 2 : -2;
                break;
              case 4:
                val = increment ? 1 : -1;
                break;
            }
            p2.progress += val;
            p2.progress = p2.progress > 40 ? 40 : p2.progress;
            p2.progress = p2.progress < 0 ? 0 : p2.progress;
          }
        });
      }

      return p;
    });
    this.setState({ players });
  };

  handleOnProgressionRankChanged = (evt, id) => {
    const players = this.state.players.map((p) => {
      if (p.selected) {
        p.progressions.map((p2) => {
          if (p2.id == id) {
            p2.rank = evt.target.value;
          }
        });
      }
      return p;
    });
    this.setState({ players });
  };

  getProgressionByType(type) {
    return this.state.newProgressions.find((np) => np.type == type);
  }

  /*=================================*/
  /*    Oracles
  /*=================================*/

  handleNewOracleTableNameChange = (evt) => {
    const oracles = this.state.oracles;
    oracles.newOracleTableName = evt.target.value;
    this.setState({ oracles });
  };

  handleSelectedOracleTableChange = (evt) => {
    const oracles = this.state.oracles;
    oracles.selectedOracleTable = evt.target.value;
    this.setState({ oracles });
  };

  handleAddOracleTable = () => {
    const oracles = this.state.oracles;
    oracles.tables.push({
      title: this.state.oracles.newOracleTableName,
      core: false,
      prompts: [],
    });
    oracles.newOracleTableName = "";
    this.setState({ oracles });
  };

  handleDeleteOracleTable = (title) => {
    const oracles = this.state.oracles;
    oracles.tables = oracles.tables.filter((o) => o.title !== title);
    this.setState({ oracles });
  };

  handleOracleTablePromptsChange = (evt) => {
    const oracles = this.state.oracles;
    // oracles.selectedOracleTable = evt.target.value;
    // this.setState({ oracles });
    oracles.editOracleCursorPosition = evt.target.selectionStart;
    oracles.tables.map((o) => {
      let text = evt.target.value.replace(/^\s+|\s+$/g, "");
      if (o.title == this.state.oracles.selectedOracleTable) {
        let prompts = text.split("\n");

        o.prompts = prompts;
      }
      return o;
    });
    this.setState({ oracles });
  };

  /*=================================*/
  /*    Asset Builder
  /*=================================*/

  handleOnSelectedAssetChange = (evt) => {
    console.log(evt.target.value);
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
    this.handleOnFooterDiceResetClick();
    let progressId = `${type}_${id} | ${progress}`;
    this.setState({ footerDiceProgressId: progressId });
  };

  handleOnFooterDiceProgressChange = (id) => {
    this.handleOnFooterDiceResetClick();
    this.setState({ footerDiceProgressId: id });
  };

  handleOnFooterDiceStatChange = (evt) => {
    this.setState({ footerDiceStatId: evt.target.value });
  };

  handleOnFooterDiceAddValueChange = (evt) => {
    this.setState({ footerDiceAddVal: evt.target.value });
  };

  handleOnFooterDiceResetClick = () => {
    this.setState({ footerDiceProgressId: "" });
    this.setState({ footerDiceStatId: "" });
    this.setState({ footerDiceAddVal: 0 });
    this.setState({ footerDiceActionScore: 0 });
    this.setState({ footerDiceHitType: "" });
  };

  handleOnFooterDiceRollClicked = () => {
    let dice;
    let id = this.state.footerDiceProgressId;
    let actionRoll = 0;
    let actionScore = 0;
    if (this.state.footerDiceProgressId != "") {
      actionRoll = Math.floor(
        this.state.footerDiceProgressId.split(" | ")[1] / 4
      );
      dice = this.diceRoller.roll([1, 10, 10], true);
      actionScore = actionRoll;
      this.setState({ footerDiceActionValue: actionScore });
    } else {
      actionRoll = 6;
      dice = this.diceRoller.roll([actionRoll, 10, 10], true);
      let stat =
        this.state.footerDiceStatId != ""
          ? this.state.footerDiceStatId.split(" | ")[1]
          : 0;
      actionScore =
        parseInt(dice[0].value) +
        parseInt(stat) +
        parseInt(this.state.footerDiceAddVal);
      this.setState({ footerDiceActionValue: dice[0].value });
    }
    let hitType =
      actionScore > dice[1].value && actionScore > dice[2].value
        ? "Strong Hit"
        : actionScore > dice[1].value || actionScore > dice[2].value
        ? "Weak Hit"
        : "Miss";

    this.setState({ footerDiceChallenge1Value: dice[1].value });
    this.setState({ footerDiceChallenge2Value: dice[2].value });
    this.setState({ footerDiceActionScore: actionScore });
    this.setState({ footerDiceHitType: hitType });
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
              totalCounters={
                this.state.counters.filter((c) => c.value > 0).length
              }
              pages={this.state.pages}
              onPageChange={this.onPageChange}
            />
          </div>
          <div id="page-container">
            <div className="container-fluid">
              <Router>
                <Switch>
                  <Route exact path="/">
                    <h3 id="site-title">IRONSWORN</h3>
                    <h1 id="site-subtitle">COMPANION</h1>
                    <div id="bg-image"></div>
                  </Route>
                  <Route path="/characters">
                    <Characters
                      players={this.state.players}
                      onPlayerSelect={this.handlePlayerSelect}
                      oracles={this.state.oracles}
                      newPlayerName={this.state.newPlayerName}
                      newPlayerRole={this.state.newPlayerRole}
                      newPlayerGoal={this.state.newPlayerGoal}
                      newPlayerDescriptor={this.state.newPlayerDescriptor}
                      newPlayerStats={this.state.newPlayerStats}
                      onAddCharacter={this.handleAddCharacter}
                      onRollPlayerName={this.handleOnRollPlayerName}
                      onNewPlayerNameChanged={this.handleNewPlayerNameChanged}
                      onRollPlayerRole={this.handleOnRollPlayerRole}
                      onNewPlayerRoleChanged={this.handleNewPlayerRoleChanged}
                      onRollPlayerGoal={this.handleOnRollPlayerGoal}
                      onNewPlayerGoalChanged={this.handleNewPlayerGoalChanged}
                      onRollPlayerDescriptor={this.handleOnRollPlayerDescriptor}
                      onNewPlayerDescriptorChanged={
                        this.handleNewPlayerDescriptorChanged
                      }
                      onRollPlayerPrimaryStat={
                        this.handleOnRollPlayerPrimaryStat
                      }
                      onPlayerStatChanged={this.handleNewPlayerStatChanged}
                      onPlayerDelete={this.handlePlayerDelete}
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
                      onRollWorldClick={this.handleRollWorldClick}
                      onWorldTruthChange={this.handleWorldTruthSelector}
                      onCustomWorldDetailsInputChanged={
                        this.handleCustomWorldDetailsInputChanged
                      }
                      onCustomWorldQuestStarterInputChanged={
                        this.handleCustomWorldQuestStarterInputChanged
                      }
                      customWorldDetails={this.state.customWorldDetails}
                      customWorldQuestStarter={
                        this.state.customWorldQuestStarter
                      }
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
                      onRollNewNPCDisposition={
                        this.handleOnRollNewNPCDisposition
                      }
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
                      onNewNPCKnowledgeChanged={
                        this.handleNewNPCKnowledgeChanged
                      }
                      onNewNPCLocationChanged={this.handleNewNPCLocationChanged}
                      onNPCDelete={this.handleNPCDelete}
                      onNPCProgressionChanged={
                        this.handleOnNPCProgressionChanged
                      }
                      onNPCLocationChanged={this.handleOnNPCLocationChanged}
                      onAddRandomNPC={this.handleOnAddRandomNPC}
                    />
                  </Route>
                  <Route path="/locations">
                    <Map
                      onAddLocationClick={this.handleAddLocationClick}
                      onDeleteLocationClick={this.handleOnLocationDeleteClick}
                      locations={this.state.locations}
                      npcs={this.state.npcs}
                      selectedPlayer={this.getSelectedPlayer()}
                      onLocationProgressionChanged={
                        this.handleOnLocationProgressionChanged
                      }
                    />
                  </Route>
                  <Route exact path="/enter-the-fray">
                    <EnterTheFray
                      foes={this.state.foes}
                      newFoeCategoryId={this.state.newFoeCategoryId}
                      newFoeTypeId={this.state.newFoeTypeId}
                      onRollNewFoe={this.handleOnRollNewFoe}
                      onRollNewFoeType={this.handleOnRollNewFoeType}
                      onNewFoeCategoryChanged={
                        this.handleOnNewFoeCategoryChanged
                      }
                      onNewFoeTypeChanged={this.handleOnNewFoeTypeChanged}
                      onAddFoe={this.handleOnAddFoe}
                      onAddRandomPack={this.handleOnAddRandomPack}
                      activeFoes={this.state.activeFoes}
                      onProgressionChanged={this.handleOnFoeProgressionChanged}
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
                      selectedPlayer={this.getSelectedPlayer()}
                      onTrackChange={this.handleStatTrackChange}
                      onDebilityChange={this.handleDebilityChange}
                      onPlayerProgressionChanged={
                        this.handleOnPlayerProgressionChanged
                      }
                      onExperienceChange={this.handleOnExperienceChange}
                    />
                  </Route>
                  <Route exact path="/vows">
                    <Progression
                      title="Vows"
                      type="vow"
                      newProgression={this.getProgressionByType("vow")}
                      onNewProgressionTextChanged={
                        this.handleOnNewProgressionTextChanged
                      }
                      onNewProgressionRankChanged={
                        this.handleOnNewProgressionRankChanged
                      }
                      onAddNewProgression={this.handleOnAddNewProgression}
                      selectedPlayer={this.getSelectedPlayer()}
                      onProgressionChange={this.handleOnProgressionChanged}
                      onProgressionRankChange={
                        this.handleOnProgressionRankChanged
                      }
                      onProgressRollClicked={this.handleOnProgressRollClicked}
                    />
                  </Route>
                  <Route exact path="/quests">
                    <Progression
                      title="Quests"
                      type="quest"
                      info="Quests are mechanically identical to vows except they are not as much of a commitment to your character. Use quests when swearing an iron vow does not seem appropriate to the fiction."
                      newProgression={this.getProgressionByType("quest")}
                      onNewProgressionTextChanged={
                        this.handleOnNewProgressionTextChanged
                      }
                      onNewProgressionRankChanged={
                        this.handleOnNewProgressionRankChanged
                      }
                      onAddNewProgression={this.handleOnAddNewProgression}
                      selectedPlayer={this.getSelectedPlayer()}
                      onProgressionChange={this.handleOnProgressionChanged}
                      onProgressionRankChange={
                        this.handleOnProgressionRankChanged
                      }
                      onProgressRollClicked={this.handleOnProgressRollClicked}
                    />
                  </Route>
                  <Route exact path="/journeys">
                    <Progression
                      title="Journeys"
                      type="journey"
                      newProgression={this.getProgressionByType("journey")}
                      onNewProgressionTextChanged={
                        this.handleOnNewProgressionTextChanged
                      }
                      onNewProgressionRankChanged={
                        this.handleOnNewProgressionRankChanged
                      }
                      onAddNewProgression={this.handleOnAddNewProgression}
                      selectedPlayer={this.getSelectedPlayer()}
                      onProgressionChange={this.handleOnProgressionChanged}
                      onProgressionRankChange={
                        this.handleOnProgressionRankChanged
                      }
                      onProgressRollClicked={this.handleOnProgressRollClicked}
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
                      selectedOracleTable={
                        this.state.oracles.selectedOracleTable
                      }
                      onAddOracleTable={this.handleAddOracleTable}
                      onNewOracleTableNameChange={
                        this.handleNewOracleTableNameChange
                      }
                      onSelectedOracleTableChange={
                        this.handleSelectedOracleTableChange
                      }
                      onOracleTablePromptsChange={
                        this.handleOracleTablePromptsChange
                      }
                      onDeleteOracleTable={this.handleDeleteOracleTable}
                    />
                  </Route>

                  <Route path="/asset-builder">
                    <AssetBuilder
                      assets={this.state.assets}
                      selectedAsset={this.state.assetBuilderSelectedAsset}
                      onSelectedAssetChange={this.handleOnSelectedAssetChange}
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
                    />
                  </Route>
                </Switch>
              </Router>
            </div>
          </div>
        </div>
        <Footer
          selectedPlayer={this.getSelectedPlayer()}
          npcs={this.state.npcs}
          foes={this.state.activeFoes.loneFoes}
          footerDiceProgressId={this.state.footerDiceProgressId}
          footerDiceStatId={this.state.footerDiceStatId}
          footerDiceAddVal={this.state.footerDiceAddVal}
          footerChallenge1Value={this.state.footerDiceChallenge1Value}
          footerChallenge2Value={this.state.footerDiceChallenge2Value}
          footerActionValue={this.state.footerDiceActionValue}
          footerActionScore={this.state.footerDiceActionScore}
          footerDiceHitType={this.state.footerDiceHitType}
          onFooterDiceProgressChanged={this.handleOnFooterDiceProgressChange}
          onFooterDiceStatChanged={this.handleOnFooterDiceStatChange}
          onFooterDiceAddValueChanged={this.handleOnFooterDiceAddValueChange}
          onFooterDiceResetClick={this.handleOnFooterDiceResetClick}
          onFooterDiceRollClicked={this.handleOnFooterDiceRollClicked}
        />

        {/* <div className="row"> */}
        {/* </div> */}
      </React.Fragment>
    );
  }

  /*=================================*/
  /*    Examples
  /*=================================*/

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  onPageChange = () => {
    console.log("Page Change");
  };
}

export default App;
