import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import DangerButton from "./dangerButton";
import ProgressTrack from "./progressTrack";
import RollIcon from "./rollIcon";
import TitleBlock from "./titleBlock";
class NPCs extends Component {
  state = {};
  componentDidUpdate(prevProps, prevState) {
    this.props.onComponentUpdate(prevProps, prevState);
  }
  /*=================================*/
  /*    NPCs
  /*=================================*/

  handleAddNPC = () => {
    const npcs = this.props.npcs;
    const newNPC = this.props.newNPC;
    const npc = {};

    let id = 0;
    if (this.props.npcs.length > 0) {
      id = this.props.npcs[this.props.npcs.length - 1].id + 1;
    }

    npc.id = id;
    npc.race = this.props.newNPC.Race;
    npc.name = this.props.newNPC.Name;
    npc.role = this.props.newNPC.Role;
    npc.goal = this.props.newNPC.Goal;
    npc.descriptor = this.props.newNPC.Descriptor;
    npc.disposition = this.props.newNPC.Disposition;
    npc.conversation = this.props.newNPC.Conversation;
    npc.knowledge = this.props.newNPC.Knowledge;
    npc.bond = 0;
    npc.locationId = this.props.newNPC.Location;
    npc.additionalInfo = "";
    if (this.props.newNPC.Name != "" && !npcs.find((n) => n.id == this.props.newNPC.id)) {
      npcs.push(npc);
      newNPC.Race = "";
      newNPC.Name = "";
      newNPC.Role = "";
      newNPC.Goal = "";
      newNPC.Descriptor = "";
      newNPC.Disposition = "";
      newNPC.Conversation = "";
      newNPC.Knowledge = "";
      newNPC.Location = -1;

      this.setState({ npcs });
      this.setState({ newNPC });
      this.props.addLog(
        "event",
        `${this.props.selectedPlayer.name} met ${npc.name} the ${npc.race} ${
          npc.locationId != -1
            ? `at the ${this.props.locations.find((l) => l.id == npc.locationId).name} settlement`
            : ""
        }`
      );
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
    const npcs = this.props.npcs;
    let pos = -1;
    for (let i = 0; i < npcs.length; i++) {
      let n = npcs[i];
      if (n.id === npcId) {
        pos = i;
      }
    }
    if (pos != -1) npcs.splice(pos, 1);
    this.setState({ npcs });
  };

  handleOnRollNPCRace = () => {
    const newNPC = this.props.newNPC;
    newNPC.Race = this.props.oracles.NPCRace;
    this.setState({ newNPC });
  };

  handleNewNPCRaceChanged = (evt) => {
    const newNPC = this.props.newNPC;
    newNPC.Race = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCName = () => {
    const newNPC = this.props.newNPC;
    let race = newNPC.Race;
    if (race == "" || race == undefined || race == "Select Race") {
      newNPC.Race = this.props.oracles.NPCRace;
    }
    newNPC.Name = this.props.oracles.getNPCName(newNPC.Race);

    this.setState({ newNPC });
  };

  handleNewNPCNameChanged = (evt) => {
    const newNPC = this.props.newNPC;
    newNPC.Name = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCGoal = () => {
    const newNPC = this.props.newNPC;
    newNPC.Goal = this.props.oracles.CharacterGoal;
    this.setState({ newNPC });
  };

  handleNewNPCGoalChanged = (evt) => {
    const newNPC = this.props.newNPC;
    newNPC.Goal = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCRole = () => {
    const newNPC = this.props.newNPC;
    newNPC.Role = this.props.oracles.CharacterRole;
    this.setState({ newNPC });
  };

  handleNewNPCRoleChanged = (evt) => {
    const newNPC = this.props.newNPC;
    newNPC.Role = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCDescriptor = () => {
    const newNPC = this.props.newNPC;
    newNPC.Descriptor = this.props.oracles.CharacterDescriptor;
    this.setState({ newNPC });
  };

  handleNewNPCDescriptorChanged = (evt) => {
    const newNPC = this.props.newNPC;
    newNPC.Descriptor = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCDisposition = () => {
    const newNPC = this.props.newNPC;
    newNPC.Disposition = this.props.oracles.CharacterDisposition;
    this.setState({ newNPC });
  };

  handleNewNPCDispositionChanged = (evt) => {
    const newNPC = this.props.newNPC;
    newNPC.Disposition = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCConversation = () => {
    const newNPC = this.props.newNPC;
    newNPC.Conversation = this.props.oracles.NPCConversation;
    this.setState({ newNPC });
  };

  handleNewNPCConversationChanged = (evt) => {
    const newNPC = this.props.newNPC;
    newNPC.Conversation = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnRollNewNPCKnowledge = () => {
    const newNPC = this.props.newNPC;
    newNPC.Knowledge = this.props.oracles.NPCKnowledge;
    this.setState({ newNPC });
  };

  handleNewNPCKnowledgeChanged = (evt) => {
    const newNPC = this.props.newNPC;
    newNPC.Knowledge = evt.target.value;
    this.setState({ newNPC });
  };

  handleNewNPCLocationChanged = (evt) => {
    const newNPC = this.props.newNPC;
    newNPC.Location = evt.target.value;
    this.setState({ newNPC });
  };

  handleOnNPCProgressionChanged = (id, increment) => {
    const npcs = this.props.npcs.map((n) => {
      if (n.id == id) {
        let val = increment ? 1 : -1;
        n.bond = increment ? 2 : 0;
        // n.bond = n.bond > 40 ? 40 : n.bond;
        // n.bond = n.bond < 0 ? 0 : n.bond;

        const players = this.props.players.map((p) => {
          // if (p.name == this.getSelectedPlayer().name) {
          p.bonds += val;
          p.bonds = p.bonds > 40 ? 40 : p.bonds;
          p.bonds = p.bonds < 0 ? 0 : p.bonds;
          // }
          return p;
        });
        this.setState({ players });
        this.props.addLog(
          "event",
          `The bond between ${this.props.selectedPlayer.name} and ${n.name} the ${n.race} ${
            increment ? "increases" : "diminishes"
          }`
        );
      }
      return n;
    });
    this.setState({ npcs });
  };

  handleOnNPCFieldChanged = (evt, id, field) => {
    const npcs = this.props.npcs.map((n) => {
      if (n.id == id) {
        n[field] = evt.target.value;
      }
      return n;
    });
    this.setState({ npcs });
  };

  handleOnNPCAdditionalDetailsChanged = (evt, id) => {
    const npcs = this.props.npcs.map((n) => {
      if (n.id == id) {
        n.additionalInfo = evt.target.value;
      }
      return n;
    });
    this.setState({ npcs });
  };

  handleOnNPCLocationChanged = (evt, id) => {
    const npcs = this.props.npcs.map((n) => {
      if (n.id == id) {
        n.locationId = evt.target.value;
        if (n.locationId != -1)
          this.props.addLog(
            "event",
            `${n.name} the ${n.race} was last seen at the ${
              this.props.locations.find((l) => l.id == n.locationId).name
            } settlement`
          );
      }
      return n;
    });
    this.setState({ npcs });
  };

  render() {
    return (
      <React.Fragment>
        <h1>NPCs</h1>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-dark mt-2 mb-4"
              type="button"
              title="Roll on the oracle"
              onClick={() => this.handleOnAddRandomNPC()}
            >
              <RollIcon /> Random NPC
            </button>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNPCRace()}
                    >
                      <RollIcon /> Race
                    </button>
                  </div>
                  <select
                    className="form-control"
                    value={this.props.newNPC.Race}
                    onChange={(e) => this.handleNewNPCRaceChanged(e)}
                  >
                    <option value="-1">Select Race</option>
                    {this.props.oracles.getOracleTableAsArray("Races").map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewNPCGoal()}
                    >
                      <RollIcon /> Goal
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Goal"
                    aria-label="NPC Goal"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Goal}
                    onChange={(e) => this.handleNewNPCGoalChanged(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewNPCDescriptor()}
                    >
                      <RollIcon /> Descriptor
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Descriptor"
                    aria-label="NPC Descriptor"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Descriptor}
                    onChange={(e) => this.handleNewNPCDescriptorChanged(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewNPCConversation()}
                    >
                      <RollIcon /> Conversation
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Conversation"
                    aria-label="NPC Conversation"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Conversation}
                    onChange={(e) => this.handleNewNPCConversationChanged(e)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="btn btn-dark btn-tag">Last Location</label>
                  </div>

                  <select
                    className="form-control"
                    value={this.props.newNPC.Location}
                    onChange={(e) => this.handleNewNPCLocationChanged(e)}
                  >
                    <option>Select Location</option>
                    {this.props.locations.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewNPCName()}
                    >
                      <RollIcon /> Name
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Name"
                    aria-label="NPC Name"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Name}
                    onChange={(e) => this.handleNewNPCNameChanged(e)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewNPCRole()}
                    >
                      <RollIcon /> Role
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Role"
                    aria-label="NPC Role"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Role}
                    onChange={(e) => this.handleNewNPCRoleChanged(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewNPCDisposition()}
                    >
                      <RollIcon /> Disposition
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Disposition"
                    aria-label="NPC Disposition"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Disposition}
                    onChange={(e) => this.handleNewNPCDispositionChanged(e)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewNPCKnowledge()}
                    >
                      <RollIcon /> Knowledge
                    </button>
                  </div>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="NPC Knowledge"
                    aria-label="NPC Knowledge"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Knowledge}
                    onChange={(e) => this.handleNewNPCKnowledgeChanged(e)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <button
                  className="btn btn-dark"
                  type="button"
                  title="Roll on the oracle"
                  onClick={() => this.handleAddNPC()}
                >
                  <i className="fas fa-plus" aria-hidden="true"></i>
                  &nbsp;Add NPC
                </button>
              </div>
            </div>
          </div>
        </div>
        <TitleBlock title="NPCs" />

        <div className="row my-4">
          <div className="col-md-12 col-lg-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Filter by Location</label>
              </div>

              <select
                className="form-control"
                value={this.props.npcLocationFilterId}
                onChange={(e) => this.props.onNpcLocationFilterIdChange(e)}
              >
                <option value="-2">Show all NPCs</option>
                <option value="-1">Show NPCs Not Linked to Location </option>
                {this.props.locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {this.props.npcs
            .filter((f) => {
              // return f;
              if (this.props.npcLocationFilterId === -2) return f;
              else if (f.locationId == this.props.npcLocationFilterId) return f;

              // switch (this.props.npcLocationFilterId) {
              //   case -2:
              //     return f;
              //   // case -1:
              //   //   if (f.locationId === "Select Location") return f;
              //   default:
              //     if (f.locationId === this.props.npcLocationFilterId) return f;
              // }
            })
            .map((npc) => (
              <div key={`${npc.id}_${npc.id}`} className="col-lg-6 col-sm-12">
                <div className="card my-3">
                  <div className="card-body">
                    <h4 className="mb-2">{npc.name}</h4>
                    <div className="row">
                      <div className="col-md-6 col-sm-12 editable-block-outer">
                        <span className="modesto">Race: </span>
                        <ContentEditable
                          className="editable-block"
                          innerRef={this.contentEditable}
                          html={npc.race}
                          disabled={false}
                          onChange={(e) => this.handleOnNPCFieldChanged(e, npc.id, "race")}
                          tagName="span"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12 editable-block-outer">
                        <span className="modesto">Descriptor: </span>
                        <ContentEditable
                          className="editable-block"
                          innerRef={this.contentEditable}
                          html={npc.descriptor}
                          disabled={false}
                          onChange={(e) => this.handleOnNPCFieldChanged(e, npc.id, "descriptor")}
                          tagName="span"
                        />
                        {/* <span>{npc.descriptor}</span> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12 editable-block-outer">
                        <span className="modesto">Goal: </span>
                        <ContentEditable
                          className="editable-block"
                          innerRef={this.contentEditable}
                          html={npc.goal}
                          disabled={false}
                          onChange={(e) => this.handleOnNPCFieldChanged(e, npc.id, "goal")}
                          tagName="span"
                        />
                      </div>

                      <div className="col-md-6 col-sm-12 editable-block-outer">
                        <span className="modesto">Role: </span>
                        <ContentEditable
                          className="editable-block"
                          innerRef={this.contentEditable}
                          html={npc.role}
                          disabled={false}
                          onChange={(e) => this.handleOnNPCFieldChanged(e, npc.id, "role")}
                          tagName="span"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col editable-block-outer">
                        <span className="modesto">Disposition: </span>
                        <ContentEditable
                          className="editable-block"
                          innerRef={this.contentEditable}
                          html={npc.disposition}
                          disabled={false}
                          onChange={(e) => this.handleOnNPCFieldChanged(e, npc.id, "disposition")}
                          tagName="span"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col editable-block-outer">
                        <span className="modesto">Conversation: </span>
                        <ContentEditable
                          className="editable-block"
                          innerRef={this.contentEditable}
                          html={npc.conversation}
                          disabled={false}
                          onChange={(e) => this.handleOnNPCFieldChanged(e, npc.id, "conversation")}
                          tagName="span"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col editable-block-outer">
                        <span className="modesto">Knowledge: </span>
                        <ContentEditable
                          className="editable-block"
                          innerRef={this.contentEditable}
                          html={npc.knowledge}
                          disabled={false}
                          onChange={(e) => this.handleOnNPCFieldChanged(e, npc.id, "knowledge")}
                          tagName="span"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span className="modesto mt-2">Additional Details:</span>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="AdditionalDetails"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          rows="4"
                          value={npc.additionalInfo ? npc.additionalInfo : ""}
                          onChange={(e) => this.handleOnNPCFieldChanged(e, npc.id, "additionalInfo")}
                        ></textarea>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-9 col-sm-12">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label className="btn btn-dark btn-tag btn-tag-sm">Last Location</label>
                          </div>

                          <select
                            className="form-control form-control-sm"
                            value={npc.locationId}
                            onChange={(e) => this.handleOnNPCLocationChanged(e, npc.id)}
                          >
                            <option value="-1">Unknown</option>
                            {this.props.locations.map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-12 text-right">
                        <DangerButton
                          buttonText="Delete"
                          additionalButtonClasses=""
                          iconClass="fas fa-times"
                          onDangerClick={this.handleNPCDelete}
                          deleteId={npc.id}
                          deleteMessage="Are you sure you want to delete this npc?"
                        />
                      </div>
                    </div>
                    {this.props.selectedPlayer != null ? (
                      <React.Fragment>
                        <h6 className="text-center">BOND</h6>
                        <ProgressTrack
                          key={npc.id}
                          progress={npc.bond}
                          trackLength={1}
                          onProgressionChange={(increment) => this.handleOnNPCProgressionChanged(npc.id, increment)}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment></React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default NPCs;
