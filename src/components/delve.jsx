import { faGrinTongueSquint } from "@fortawesome/free-solid-svg-icons";
import { Tab, Tabs } from "@material-ui/core";
import React, { Component } from "react";
import DangerButton from "./dangerButton";
import DiceResult from "./diceResult";
import DiceRoller from "./dice_roller";
import EnterTheFray from "./enterTheFray";
import FoeCard from "./foeCard";
import Oracles from "./oracles";
import ProgressTrack from "./progressTrack";
import RollButton from "./rollButton";
import RollIcon from "./rollIcon";
import StatTrack from "./statTrack";
import TitleBlock from "./titleBlock";
import UnselectedPlayer from "./unselected_player";
class Delve extends Component {
  state = {
    rollResult: [
      { EdgeChance: 1, ShadowChance: 1, WitsChance: 1, Result: "Mark Progress but Reveal a Danger.", Level: 0 },
      { EdgeChance: 46, ShadowChance: 31, WitsChance: 41, Result: "Mark Progress", Level: 1 },
      {
        EdgeChance: 66,
        ShadowChance: 66,
        WitsChance: 56,
        Result: "Choose One: Mark Progress or Find an Opportunity",
        Level: 2,
      },
      {
        EdgeChance: 76,
        ShadowChance: 91,
        WitsChance: 81,
        Result: "Mark Progress and Find an Opportunity",
        Level: 3,
      },
      {
        EdgeChance: 81,
        ShadowChance: 100,
        WitsChance: 100,
        Result: "Mark Progress Twice but Reveal a Danger",
        Level: 4,
      },
    ],
    dangers: [
      { Chance: 46, Description: "You encounter a hostile denizen." },
      { Chance: 58, Description: "You face an environmental or architectural hazard." },
      { Chance: 69, Description: "A discovery undermines or complicates your quest." },
      { Chance: 77, Description: "You confront a harrowing situation or sensation." },
      { Chance: 80, Description: "You face the consequences of an earlier choice or approach." },
      { Chance: 83, Description: "Your way is blocked or trapped." },
      { Chance: 86, Description: "A resource is diminished, broken, or lost." },
      { Chance: 89, Description: "You face a perplexing mystery or tough choice." },
      { Chance: 92, Description: "You lose your way or are delayed." },
      {
        Chance: 95,
        Description: "Roll twice more on this table. Both results occur. If they are the same result, make it worse.",
      },
    ],
    defaultDelve: {
      //   id: 0,
      theme: "",
      domain: "",
      siteName: "",
      feature: "",
      rank: 0,
      approachLevel: -1,
      progress: 0,
      denizens: [],
      danger: "",
      step: 0,
      weakHitResult: -1,
      changeThemeOrDomain: false,
    },
  };

  constructor(props) {
    super();
    this.oracles = props.oracles;
    this.diceRoller = new DiceRoller();
  }

  handleOnRollNewTheme = () => {
    const newDelve = this.props.newDelve;
    let themes = this.props.delveCards.filter((d) => d.Type === "Theme");
    let rn = this.diceRoller.roll([themes.length], false, false)[0].value;
    newDelve.theme = themes[rn].Name;
    this.setState({ newDelve });
  };

  handleOnRollNewDomain = () => {
    const newDelve = this.props.newDelve;
    let domains = this.props.delveCards.filter((d) => d.Type === "Domain");
    let rn = this.diceRoller.roll([domains.length], false, false)[0].value;
    newDelve.domain = domains[rn].Name;
    this.setState({ newDelve });
  };

  handleNewThemeDomainSelectChanged = (evt, table) => {
    const newDelve = this.props.newDelve;
    newDelve[table] = evt.target.value;
    this.setState({ newDelve });
  };

  handleOnDiscoverSite = () => {
    const delves = this.props.delves;
    const newDelve = this.props.newDelve;
    let id = this.props.delves.length > 0 ? this.props.delves[this.props.delves.length - 1].id + 1 : 0;
    let delve = {
      ...this.state.defaultDelve,
      ...this.props.newDelve,
      ...{
        id: id,
        siteName: this.oracles.getDelveSiteName(this.props.newDelve.domain),
        complete: false,
        progressRoll: null,
        activeFoes: [],
        nextFoeId: 0,
      },
    };
    newDelve.theme = "";
    newDelve.domain = "";
    delves.push(delve);
    this.props.addLog("event", `${this.props.selectedPlayer.name} discovered ${delve.siteName}`);
    this.setState({ delves });
    this.setState({ newDelve });
    this.props.onDelveSelectChange(id);
  };

  handleDelveDelete = (id) => {
    const delves = this.props.delves;
    let pos = -1;
    for (let i = 0; i < delves.length; i++) {
      let d = delves[i];
      console.log(d);
      if (d.id == id) {
        pos = i;
      }
    }
    if (pos != -1) delves.splice(pos, 1);
    this.setState({ delves });
  };

  clearDelve = () => {
    const newDelve = this.props.newDelve;
    newDelve.theme = "";
    newDelve.domain = "";
    newDelve.rank = 0;
    this.setState({ newDelve });
  };

  handleOnNewProgressionRankChanged = (evt) => {
    const newDelve = this.props.newDelve;
    newDelve.rank = evt.target.value;
    this.setState({ newDelve });
  };

  handleOnProgressionChanged = (increment) => {
    const delves = this.props.delves.map((d) => {
      if (d.id == this.props.selectedDelveId) {
        let val = 0;
        switch (parseInt(d.rank)) {
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
        d.progress += val;
        d.progress = d.progress > 40 ? 40 : d.progress;
        d.progress = d.progress < 0 ? 0 : d.progress;
      }
      return d;
    });
    this.setState({ delves });
  };

  getSelectedDelve = () => {
    return this.props.delves[this.props.selectedDelveId];
  };

  getPreposition = (str) => {
    let chr = str.charAt(0);
    switch (chr) {
      case "A":
      case "E":
      case "I":
      case "O":
      case "U":
        return "an";
      default:
        return "a";
    }
  };

  handleOnReverseDelveStep = () => {
    const delves = this.props.delves;

    if (delves[this.props.selectedDelveId].step === 4 || delves[this.props.selectedDelveId].step === 5)
      this.changeDelveStep(2);
    else if (delves[this.props.selectedDelveId].step > 0)
      this.changeDelveStep(delves[this.props.selectedDelveId].step - 1);
    this.setState({ delves });
  };

  handleOnEnvisionSurroundings = (changeThemeOrDomain = false) => {
    const delves = this.props.delves;
    let selectedDelve = this.getSelectedDelve();
    let rn = this.diceRoller.roll([100], true, false)[0].value;
    let themeText = selectedDelve.theme;
    let domainText = selectedDelve.domain;
    switch (rn) {
      case 99:
        themeText = this.oracles.DelveTheme;
        delves[this.props.selectedDelveId].theme = themeText;
        this.setState({ delves });
        this.handleOnEnvisionSurroundings(true);
        return;
      case 100:
        domainText = this.oracles.DelveDomain;
        delves[this.props.selectedDelveId].domain = domainText;
        this.setState({ delves });
        this.handleOnEnvisionSurroundings(true);
        return;
    }
    delves[this.props.selectedDelveId].changeThemeOrDomain = changeThemeOrDomain;
    let theme = this.props.delveCards.find((t) => t.Name == themeText);
    let domain = this.props.delveCards.find((d) => d.Name == domainText);

    let features = [...theme.Features, ...domain.Features];
    let feature = features.filter((f) => f.Chance <= rn).slice(-1)[0]?.Description ?? features[0].Description;
    delves[this.props.selectedDelveId].feature = feature;
    delves[this.props.selectedDelveId].approachLevel = -1;

    this.changeDelveStep(1);
    this.setState({ delves });
  };

  handleOnApproachLevelChange = (level) => {
    const delves = this.props.delves;
    delves[this.props.selectedDelveId].approachLevel = level;
    this.changeDelveStep(2);
    this.setState({ delves });
  };

  changeDelveStep(step) {
    const delves = this.props.delves;
    delves[this.props.selectedDelveId].step = step;
    switch (step) {
      case 0:
        delves[this.props.selectedDelveId].feature = "";
        delves[this.props.selectedDelveId].denizen = null;
        break;
      case 1:
        delves[this.props.selectedDelveId].approachLevel = -1;
        delves[this.props.selectedDelveId].denizen = null;
        break;
      case 2:
        delves[this.props.selectedDelveId].weakHitResult = -1;
        delves[this.props.selectedDelveId].actionRoll = null;
        delves[this.props.selectedDelveId].denizen = null;
        break;
      case 3:
        this.revealDenizen();
        break;
      case 4:
        break;
      case 5:
        this.revealDenizen();
        this.findAnOpportunity();
        break;
    }
    this.setState({ delves });
  }

  handleOnActionRollClicked = () => {
    const delves = this.props.delves;

    delves[this.props.selectedDelveId].actionRoll = this.diceRoller.actionRoll(
      this.props.selectedPlayer.stats.find((s) => s.stat === this.getSelectedDelve().approachLevel).value
    );

    this.setState({ delves });
    this.postRollAction();
  };

  handleOnProgressRollClicked = () => {
    const delves = this.props.delves;

    delves[this.props.selectedDelveId].progressRoll = this.diceRoller.progressionRoll(
      Math.floor(delves[this.props.selectedDelveId].progress / 4)
    );
    if (this.getSelectedDelve().progressRoll.HitType.includes("Hit")) {
      delves[this.props.selectedDelveId].complete = true;
      this.props.addLog(
        "event",
        `${this.props.selectedPlayer.name} located thier objective in ${this.getSelectedDelve().siteName}`
      );
    }
    this.setState({ delves });

    // this.postRollAction();
  };

  postRollAction = () => {
    const delves = this.props.delves;

    // delves[this.props.selectedDelveId].actionRoll = this.diceRoller.actionRoll(
    //   this.props.selectedPlayer.stats.find((s) => s.stat === this.getSelectedDelve().approachLevel).value
    // );
    delves[this.props.selectedDelveId].actionRoll.StatName = this.getSelectedDelve().approachLevel;

    if (delves[this.props.selectedDelveId].actionRoll.HitType === "Strong Hit") {
      this.handleOnProgressionChanged(true);
      this.changeDelveStep(5);
    } else if (delves[this.props.selectedDelveId].actionRoll.HitType === "Miss") {
      this.changeDelveStep(3);
    } else {
      let rn = this.diceRoller.roll([100], true, false)[0].value;
      let rollResult = this.state.rollResult
        .filter((r) => r[`${this.getSelectedDelve().approachLevel}Chance`] <= rn)
        .slice(-1)[0].Level;
      delves[this.props.selectedDelveId].weakHitResult = rollResult;
      switch (rollResult) {
        case 0:
          this.handleOnProgressionChanged(true);
          this.changeDelveStep(3);
          break;
        case 1:
          this.handleOnProgressionChanged(true);
          this.changeDelveStep(0);
          break;
        case 2:
          this.changeDelveStep(4);
          break;
        case 3:
          this.handleOnProgressionChanged(true);
          this.changeDelveStep(5);
          break;
        case 4:
          this.handleOnProgressionChanged(true);
          this.handleOnProgressionChanged(true);
          this.changeDelveStep(3);
          break;
      }
    }
    this.setState({ delves });
  };

  handleOnOpportunityChoice = (progress) => {
    const delves = this.props.delves;
    if (progress) {
      this.changeDelveStep(5);
    } else {
      this.handleOnProgressionChanged(true);
      this.changeDelveStep(0);
    }
    this.setState({ delves });
  };

  handleOnRevealDanger = () => {
    const delves = this.props.delves;
    let selectedDelve = this.getSelectedDelve();
    let rn = this.diceRoller.roll([100], true, false)[0].value;
    let themeText = selectedDelve.theme;
    let domainText = selectedDelve.domain;

    let theme = this.props.delveCards.find((t) => t.Name == themeText);
    let domain = this.props.delveCards.find((d) => d.Name == domainText);

    let dangers = [...theme.Dangers, ...domain.Dangers, ...this.state.dangers];
    let danger = dangers.filter((d) => d.Chance <= rn).slice(-1)[0]?.Description ?? dangers[0].Description;
    if (rn >= 95) {
      let rns = this.diceRoller.roll([94, 94], true, false);
      let danger1 = dangers.filter((d) => d.Chance <= rns[0].value).slice(-1)[0]?.Description ?? dangers[0].Description;
      let danger2 = dangers.filter((d) => d.Chance <= rns[1].value).slice(-1)[0]?.Description ?? dangers[0].Description;
      danger = danger1;
      danger += danger1 === danger2 ? " (Enhanced Danger)" : ` =AND= ${danger2}`;
    }

    delves[this.props.selectedDelveId].danger = danger;

    // this.changeDelveStep(1);
    this.setState({ delves });
  };

  findAnOpportunity = (opportunity) => {
    const delves = this.props.delves;
    // let selectedDelve = this.getSelectedDelve();
    let op = opportunity ? opportunity : this.oracles.DelveOpportunity;
    delves[this.props.selectedDelveId].opportunity = op;
    this.setState({ delves });
  };

  handleOpportunity = (evt) => {
    if (evt.target.value == -1) return;
    this.findAnOpportunity(evt.target.value);
    console.log(this.getSelectedDelve());
    if (evt.target.value.includes("denizen")) {
      // const delves = this.props.delves;
      // delves[this.props.selectedDelveId].denizen = this.getDenizen();
      // this.setState({ delves });
    }
  };

  denizenReplace(str, denizen) {
    if (!denizen) denizen = this.getSelectedDelve().denizen.Name;
    let den = denizen;
    return str.replace("denizen", den).replace("Denizen", den);
  }

  revealDenizen = () => {
    const delves = this.props.delves;
    delves[this.props.selectedDelveId].denizen = this.getDenizen();
    this.setState({ delves });
  };

  getDenizen = () => {
    let rn = this.diceRoller.roll([this.props.foes.length], false, false)[0].value;
    let denizen = this.props.foes[rn];

    return denizen;
  };

  fightDenizen = () => {
    let selectedDelve = this.getSelectedDelve();
    let denizen = { ...selectedDelve.denizen };
    denizen.id = selectedDelve.nextFoeId;
    const delves = this.props.delves;
    delves[this.props.selectedDelveId].nextFoeId = delves[this.props.selectedDelveId].nextFoeId + 1;
    delves[this.props.selectedDelveId].activeFoes.push(denizen);
    this.setState({ delves });
  };

  handleOnFoeProgressionChanged = (id, rank, increment) => {
    const delves = this.props.delves;
    delves[this.props.selectedDelveId].activeFoes.map((f) => {
      if (f.id === id) {
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
        f.progress += val;
        f.progress = f.progress > 40 ? 40 : f.progress;
        f.progress = f.progress < 0 ? 0 : f.progress;
      }
      return f;
    });
    this.setState({ delves });
  };

  handleOnFoeRankChanged = (evt, id) => {
    const delves = this.props.delves;
    delves[this.props.selectedDelveId].activeFoes.map((f) => {
      if (f.id === id) {
        f.Rank = evt.target.value;
      }
      return f;
    });

    this.setState({ delves });
  };

  handleOnFoeProgressRollClicked = (id) => {
    const delves = this.props.delves;
    delves[this.props.selectedDelveId].activeFoes.map((f) => {
      if (f.id === id) {
        f.progressRoll = this.diceRoller.progressionRoll(Math.floor(f.progress / 4));
        if (f.progressRoll.HitType.includes("Hit")) {
          f.complete = true;
          // this.logProgressionComplete();
        }
        console.log(f.progressRoll);
      }
      return f;
    });

    this.setState({ delves });
  };

  handleFoeDelete = (id) => {
    const delves = this.props.delves;

    let pos = -1;
    for (let i = 0; i < delves[this.props.selectedDelveId].activeFoes.length; i++) {
      let foe = delves[this.props.selectedDelveId].activeFoes[i];
      if (foe.id === id) {
        pos = i;
      }
    }
    if (pos != -1) delves[this.props.selectedDelveId].activeFoes.splice(pos, 1);

    this.setState({ delves });
  };

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    if (this.props.selectedPlayer == null) return <UnselectedPlayer />;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-10">
            <h1>Delve {this.props.selectedDelveId !== -1 ? this.getSelectedDelve().siteName : ""}</h1>
            {/* <h3 className="font-italic  text-secondary">
              "{this.getPreposition(this.getSelectedDelve().theme)}&nbsp;
              {this.getSelectedDelve().theme} {this.getSelectedDelve().domain}"
            </h3> */}
          </div>
          <div className="col-2 text-right">
            {this.props.selectedDelveId !== -1 ? (
              <button
                className="btn btn-dark"
                style={{ marginTop: 1 + "em" }}
                type="button"
                title=""
                onClick={() => this.props.onDelveSelected(-1)}
              >
                <i className="game-icon game-icon-exit-door"></i> Exit Site
              </button>
            ) : (
              React.Fragment
            )}
          </div>
        </div>

        {this.props.selectedDelveId === -1 ? (
          <React.Fragment>
            <span className="modesto">Discover a New Site:</span>
            <div className="row">
              <div className="col-3">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewTheme()}
                    >
                      <RollIcon /> Theme
                    </button>
                  </div>
                  <select
                    className="form-control"
                    value={this.props.newDelve.theme}
                    onChange={(e) => this.handleNewThemeDomainSelectChanged(e, "theme")}
                  >
                    <option value="-1">Select Theme</option>
                    {this.props.delveCards
                      .filter((f) => f.Type === "Theme")
                      .map((d) => (
                        <option key={`delve_theme_select_${d.Name}`} value={d.Name}>
                          {d.Name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-3">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewDomain()}
                    >
                      <RollIcon /> Domain
                    </button>
                  </div>
                  <select
                    className="form-control"
                    value={this.props.newDelve.domain}
                    onChange={(e) => this.handleNewThemeDomainSelectChanged(e, "domain")}
                  >
                    <option value="-1">Select Domain</option>
                    {this.props.delveCards
                      .filter((f) => f.Type === "Domain")
                      .map((d) => (
                        <option key={`delve_theme_select_${d.Name}`} value={d.Name}>
                          {d.Name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-3">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="btn btn-dark btn-tag">Difficulty</label>
                  </div>
                  <select
                    className="form-control"
                    onChange={(e) => this.handleOnNewProgressionRankChanged(e)}
                    // value={this.getProgressionByType().rank}
                  >
                    {this.props.ranks.map((r, i) => (
                      <option key={r} value={i}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-3">
                {this.props.newDelve.theme === "" ||
                this.props.newDelve.theme === "-1" ||
                this.props.newDelve.domain === "" ||
                this.props.newDelve.domain === "-1" ? (
                  React.Fragment
                ) : (
                  <React.Fragment>
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnDiscoverSite()}
                    >
                      <i className="fas fa-dungeon"></i> Discover a Site
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>

            {this.props.delves.length > 0 ? (
              <React.Fragment>
                <span className="modesto">Select Existing Site:</span>
                <div className="row">
                  <div className="col-6">
                    <div className="input-group mb-3">
                      {/* <div className="input-group-prepend">
                    <div className="btn btn-dark btn-tag">Select Existing Site</div>
                </div> */}
                      <select
                        className="form-control"
                        value={this.props.delveSelectorId}
                        onChange={(e) => this.props.onDelveSelectChange(e.target.value)}
                      >
                        <option value="-1">Select Site</option>
                        {this.props.delves.map((d) => (
                          <option key={`${d}_${d.id}`} value={d.id}>
                            {d.siteName} {d.complete ? "(Objective Located)" : React.Fragment}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    {this.props.delveSelectorId != -1 ? (
                      <React.Fragment>
                        <button
                          className="btn btn-dark"
                          onClick={() => this.props.onDelveSelected(this.props.delveSelectorId)}
                        >
                          <i className="game-icon game-icon-dungeon-gate"></i>&nbsp; Enter the Site
                        </button>
                        <DangerButton
                          buttonText="Delete Site"
                          additionalButtonClasses="ml-2"
                          iconClass="fas fa-times"
                          onDangerClick={this.handleDelveDelete}
                          deleteId={this.props.delveSelectorId}
                          deleteMessage="Are you sure you want to delete this delve?"
                        />
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3 className="font-italic  text-secondary">
              "{this.getPreposition(this.getSelectedDelve().theme)}&nbsp;
              {this.getSelectedDelve().theme} {this.getSelectedDelve().domain}"
            </h3>
            <div className="row">
              <div className="col text-center ">
                {/* <h3 className="font-italic  text-secondary">
                  "{this.getPreposition(this.getSelectedDelve().theme)}&nbsp;
                  {this.getSelectedDelve().theme} {this.getSelectedDelve().domain}"
                </h3>
                <TitleBlock title="PROGRESS" /> */}

                <ProgressTrack
                  progress={this.getSelectedDelve().progress}
                  hideButtons={this.getSelectedDelve().complete}
                  onProgressionChange={(increment) => this.handleOnProgressionChanged(increment)}
                  //   onProgressionRegress={this.props.onProgressionRegress}
                />
              </div>
            </div>
            <TitleBlock title="DELVE THE DEPTHS" />
            <div className="row text-center mb-5">
              <div className="col-3">
                <button
                  className={`btn btn-sm btn-outline-dark mb-3`}
                  type="button"
                  disabled={this.getSelectedDelve().step === 0 || this.getSelectedDelve().complete}
                  title="Reverse a step to make a change"
                  onClick={() => this.handleOnReverseDelveStep()}
                >
                  <i className="fa fa-chevron-left" aria-hidden="true"></i> Back Step
                </button>
              </div>
              <div className="col-6">
                <RollButton
                  disabled={this.getSelectedDelve().complete}
                  buttonText="Locate your Objective"
                  roll={this.getSelectedDelve().progressRoll}
                  onRoll={this.handleOnProgressRollClicked}
                />
              </div>
              <div className="col-3"></div>
            </div>
            {/* <div className="row">
              <div className="col">
                
              </div>
            </div> */}
            <div className="row text-center">
              <div className="col-3">
                <div className="card delve-step-card">
                  <div
                    className={`card-header bg-${this.getSelectedDelve().step === 0 ? "dark" : "light"} text-${
                      this.getSelectedDelve().step == 0 ? "light" : "dark"
                    } modesto`}
                  >
                    <i className="fa fa-eye"></i>&nbsp;Envision your surroundings
                  </div>
                  <div className="card-body py-5">
                    <button
                      className={`btn btn-${this.getSelectedDelve().step == 0 ? "" : "outline-"}dark`}
                      type="button"
                      disabled={this.getSelectedDelve().step != 0}
                      title="Delve deeper into the depths"
                      onClick={() => this.handleOnEnvisionSurroundings()}
                    >
                      <i className="fa fa-eye" aria-hidden="true"></i> Reveal
                    </button>
                    <h6 className="my-2">
                      {this.getSelectedDelve().feature ? (
                        <React.Fragment>
                          {this.getSelectedDelve().changeThemeOrDomain ? (
                            <React.Fragment>
                              <i>The landscape changes before you.</i>
                              <br />
                              <br />
                            </React.Fragment>
                          ) : (
                            React.Fragment
                          )}
                          Feature: {this.getSelectedDelve().feature}
                        </React.Fragment>
                      ) : (
                        React.Fragment
                      )}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="card delve-step-card">
                  <div
                    className={`card-header bg-${this.getSelectedDelve().step === 1 ? "dark" : "light"} text-${
                      this.getSelectedDelve().step == 1 ? "light" : "dark"
                    } modesto`}
                  >
                    <i className="game-icon game-icon-walk"></i>&nbsp;Consider your approach
                  </div>
                  <div className="card-body py-5">
                    <button
                      className={`btn btn-${this.getSelectedDelve().approachLevel === "Edge" ? "" : "outline-"}dark`}
                      type="button"
                      disabled={this.getSelectedDelve().step != 1}
                      title="Delve deeper into the depths"
                      onClick={() => this.handleOnApproachLevelChange("Edge")}
                    >
                      <i className="game-icon game-icon-running-ninja" aria-hidden="true"></i> HASTE
                    </button>

                    <button
                      className={`btn btn-${
                        this.getSelectedDelve().approachLevel === "Shadow" ? "" : "outline-"
                      }dark mx-2`}
                      type="button"
                      disabled={this.getSelectedDelve().step != 1}
                      title="Delve deeper into the depths"
                      onClick={() => this.handleOnApproachLevelChange("Shadow")}
                    >
                      <i className="game-icon game-icon-hood" aria-hidden="true"></i>STEALTH
                    </button>

                    <button
                      className={`btn btn-${this.getSelectedDelve().approachLevel === "Wits" ? "" : "outline-"}dark`}
                      type="button"
                      disabled={this.getSelectedDelve().step != 1}
                      title="Delve deeper into the depths"
                      onClick={() => this.handleOnApproachLevelChange("Wits")}
                    >
                      <i className="fa fa-eye" aria-hidden="true"></i> OBSERVATION
                    </button>
                    {this.getSelectedDelve().approachLevel != -1 ? (
                      <React.Fragment>
                        <h6 className="my-2">
                          Roll + {this.getSelectedDelve().approachLevel} (
                          {
                            this.props.selectedPlayer.stats.find(
                              (s) => s.stat === this.getSelectedDelve().approachLevel
                            ).value
                          }
                          )
                        </h6>
                      </React.Fragment>
                    ) : (
                      React.Fragment
                    )}
                  </div>
                </div>
              </div>

              <div className="col-3">
                <div className="card delve-step-card">
                  <div
                    className={`card-header bg-${this.getSelectedDelve().step === 2 ? "dark" : "light"} text-${
                      this.getSelectedDelve().step == 2 ? "light" : "dark"
                    } modesto`}
                  >
                    <i className="game-icon game-icon-swords-emblem"></i>&nbsp;Action
                  </div>
                  <div className="card-body py-5">
                    <RollButton
                      buttonText="Roll"
                      burnMomentum={this.props.burnMomentum}
                      selectedPlayer={this.props.selectedPlayer}
                      postRollAction={this.postRollAction}
                      disabled={this.getSelectedDelve().step != 2}
                      roll={this.getSelectedDelve().actionRoll}
                      onRoll={this.handleOnActionRollClicked}
                    />

                    <br />
                    {this.getSelectedDelve().weakHitResult != -1 ? (
                      <React.Fragment>
                        <h6 className="my-2">
                          {this.state.rollResult.find((r) => r.Level == this.getSelectedDelve().weakHitResult).Result}
                        </h6>
                      </React.Fragment>
                    ) : (
                      React.Fragment
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-4 text-center">
              <div className="col-6">
                <div className="card delve-step-card">
                  <div
                    className={`card-header bg-${this.getSelectedDelve().step === 3 ? "dark" : "light"} text-${
                      this.getSelectedDelve().step == 3 ? "light" : "dark"
                    } modesto`}
                  >
                    <i className="game-icon game-icon-wolf-trap"></i>&nbsp;Reveal a Danger
                  </div>
                  <div className="card-body py-5">
                    <button
                      className={`btn btn-${this.getSelectedDelve().step == 3 ? "" : "outline-"}dark`}
                      type="button"
                      disabled={this.getSelectedDelve().step != 3}
                      title="Delve deeper into the depths"
                      onClick={() => this.handleOnRevealDanger()}
                    >
                      <i className="fa fa-eye" aria-hidden="true"></i> Reveal
                    </button>
                    {this.getSelectedDelve().step === 3 && this.getSelectedDelve().denizen ? (
                      <React.Fragment>
                        <h6 className="my-2">{this.denizenReplace(this.getSelectedDelve().danger)}</h6>

                        {this.getSelectedDelve().danger &&
                        this.getSelectedDelve().danger.toLowerCase().includes("denizen") ? (
                          <React.Fragment>
                            <button
                              className={`btn btn-dark mt-4`}
                              type="button"
                              disabled={this.getSelectedDelve().step != 3}
                              onClick={() => this.fightDenizen()}
                            >
                              <i className="game-icon game-icon-sword-clash"></i> Fight{" "}
                              {this.getSelectedDelve().denizen.Name}
                            </button>
                          </React.Fragment>
                        ) : (
                          <React.Fragment></React.Fragment>
                        )}

                        <button
                          className={`btn btn-dark mt-4 ml-2`}
                          type="button"
                          disabled={this.getSelectedDelve().step != 3 || this.getSelectedDelve().complete}
                          title="Reverse a step to make a change"
                          onClick={() => this.changeDelveStep(0)}
                        >
                          <i className="game-icon game-icon-doorway" aria-hidden="true"></i> Delve Deeper
                        </button>
                      </React.Fragment>
                    ) : (
                      React.Fragment
                    )}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card delve-step-card">
                  <div
                    className={`card-header bg-${this.getSelectedDelve().step >= 5 ? "dark" : "light"} text-${
                      this.getSelectedDelve().step == 5 ? "light" : "dark"
                    } modesto`}
                  >
                    <i className="game-icon game-icon-gold-bar"></i>&nbsp;Find an Opportunity
                  </div>
                  <div className="card-body">
                    {this.getSelectedDelve().step === 4 ? (
                      <React.Fragment>
                        <h5>Choose your path</h5>
                        <div className="row">
                          <div className="col">
                            <button
                              className={`btn btn-${this.getSelectedDelve().step == 4 ? "" : "outline-"}dark mt-4`}
                              type="button"
                              disabled={this.getSelectedDelve().step != 4}
                              title="Mark Progress"
                              onClick={() => this.handleOnOpportunityChoice()}
                            >
                              <i className="game-icon game-icon-cross-mark"></i> Mark Progress
                            </button>
                          </div>
                          <div className="col-2">
                            <div className="diamond-container">
                              <i className="diamond"></i>
                            </div>
                          </div>
                          <div className="col">
                            <button
                              className={`btn btn-${this.getSelectedDelve().step == 4 ? "" : "outline-"}dark mt-4`}
                              type="button"
                              disabled={this.getSelectedDelve().step != 4}
                              title="Mark Progress"
                              onClick={() => this.handleOnOpportunityChoice(true)}
                            >
                              <i className="game-icon game-icon-gold-bar"></i> Find an opportunity
                            </button>
                          </div>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {this.getSelectedDelve().step === 5 ? (
                          <React.Fragment>
                            {this.getSelectedDelve().actionRoll &&
                            this.getSelectedDelve().actionRoll.HitType.includes("Weak") ? (
                              <React.Fragment>
                                <h6 className="my-2 mt-5">
                                  {this.denizenReplace(this.getSelectedDelve().opportunity)}
                                </h6>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <select
                                  className="form-control"
                                  // value={this.props.newDelve.domain}
                                  onChange={(e) => this.handleOpportunity(e)}
                                >
                                  <option value="-1">Select an Opportunity</option>
                                  {this.props.oracles.getOracleTableAsArray("Delve Opportunity").map((d) => (
                                    <option
                                      key={`delve_opportunity_select_${this.denizenReplace(d)}`}
                                      value={this.denizenReplace(d)}
                                    >
                                      {this.denizenReplace(d)}
                                    </option>
                                  ))}
                                </select>
                              </React.Fragment>
                            )}
                            {this.getSelectedDelve().opportunity &&
                            this.getSelectedDelve().opportunity.toLowerCase().includes("denizen") ? (
                              <React.Fragment>
                                <button
                                  className={`btn btn-dark mt-4`}
                                  type="button"
                                  disabled={this.getSelectedDelve().step != 5}
                                  onClick={() => this.fightDenizen()}
                                >
                                  <i className="game-icon game-icon-sword-clash"></i> Fight{" "}
                                  {this.getSelectedDelve().denizen.Name}
                                </button>
                              </React.Fragment>
                            ) : (
                              <React.Fragment></React.Fragment>
                            )}
                            <button
                              className={`btn btn-dark mt-4 ml-2`}
                              type="button"
                              disabled={this.getSelectedDelve().step != 5 || this.getSelectedDelve().complete}
                              title="Reverse a step to make a change"
                              onClick={() => this.changeDelveStep(0)}
                            >
                              <i className="game-icon game-icon-doorway" aria-hidden="true"></i> Delve Deeper
                            </button>
                          </React.Fragment>
                        ) : (
                          React.Fragment
                        )}
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        <TitleBlock title="Active Encounters" />
        <div className="row">
          <div className="col">
            {this.props.selectedDelveId !== -1 ? (
              <React.Fragment>
                {this.getSelectedDelve()
                  .activeFoes.filter((f) => !f.complete)
                  .map((f) => (
                    <React.Fragment>
                      <FoeCard
                        foe={f}
                        ranks={this.props.ranks}
                        onProgressionChange={this.handleOnFoeProgressionChanged}
                        onRankChange={this.handleOnFoeRankChanged}
                        onProgressRollClicked={this.handleOnFoeProgressRollClicked}
                        onFoeDelete={this.handleFoeDelete}
                      />
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ) : (
              React.Fragment
            )}
          </div>
        </div>

        <TitleBlock title="Defeated Denizens" />
        <div className="row">
          <div className="col">
            {this.props.selectedDelveId !== -1 ? (
              <React.Fragment>
                {this.getSelectedDelve()
                  .activeFoes.filter((f) => f.complete)
                  .map((f) => (
                    <React.Fragment>
                      <FoeCard
                        foe={f}
                        ranks={this.props.ranks}
                        onProgressionChange={this.handleOnFoeProgressionChanged}
                        onRankChange={this.handleOnFoeRankChanged}
                        onProgressRollClicked={this.handleOnFoeProgressRollClicked}
                        onFoeDelete={this.handleFoeDelete}
                      />
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ) : (
              React.Fragment
            )}
          </div>
        </div>
        {/* <EnterTheFray

          //foes={this.getSelectedDelve().denizens}
          //activeFoes={this.getSelectedDelve().activeDenizens}
          //newFoe={}
          //
          // onComponentUpdate={this.props.onComponentUpdate}
          // onProgressRollClicked={this.handleOnProgressRollClicked}
          showGenerator={true}


          foes={this.props.foes.filter(function (f) {
            return f.Foes.some(function (f2) {
              return (f.Foes = f.Foes.filter((f2) => {
                return f2.Source === "Delve";
              }));
            });
          })}
          // activeFoes={this.state.activeFoes}
          // newFoe={this.state.newFoe}
        /> */}
      </React.Fragment>
    );
  }
}

export default Delve;
