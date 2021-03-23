import React, { Component } from "react";
import ProgressTrack from "./progressTrack";
import TitleBlock from "./titleBlock";
class NPCs extends Component {
  state = {};
  componentDidUpdate() {
    this.props.onComponentUpdate();
  }
  /*=================================*/
  /*    NPCs
  /*=================================*/

  handleAddNPC = () => {
    const npcs = this.props.npcs;
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
    if (this.props.newNPC.Name != "" && !npcs.find((n) => n.id == this.props.newNPC.id)) {
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
        n.bond += val;
        n.bond = n.bond > 40 ? 40 : n.bond;
        n.bond = n.bond < 0 ? 0 : n.bond;

        const players = this.props.players.map((p) => {
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
    const npcs = this.props.npcs.map((n) => {
      if (n.id == id) {
        n.locationId = evt.target.value;
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
              <i className="fas fa-dice-d20" aria-hidden="true"></i>
              &nbsp;Random NPC
            </button>
            <div className="row">
              <div className="col-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNPCRace()}
                    >
                      <i className="fas fa-dice-d20"></i> Race
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
                      <i className="fas fa-dice-d20"></i> Goal
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
                      <i className="fas fa-dice-d20"></i> Descriptor
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
                      <i className="fas fa-dice-d20"></i> Conversation
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
              <div className="col-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewNPCName()}
                    >
                      <i className="fas fa-dice-d20"></i> Name
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
                      <i className="fas fa-dice-d20"></i> Role
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
                      <i className="fas fa-dice-d20"></i> Disposition
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
                      <i className="fas fa-dice-d20"></i> Knowledge
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
          <div className="col-6">
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
              <div key={`${npc.id}_${npc.id}`} className="col-md-6 col-lg-6 col-sm-12">
                <div className="card my-3">
                  <div className="card-body">
                    <h4 className="mb-2">{npc.name}</h4>
                    <div className="row">
                      <div className="col-6">
                        <span className="modesto">Race: </span>
                        <span>{npc.race}</span>
                      </div>
                      <div className="col-6">
                        <span className="modesto">Role: </span>
                        <span>{npc.role}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <span className="modesto">Goal: </span>
                        <span>{npc.goal}</span>
                      </div>
                      <div className="col-6">
                        <span className="modesto">Descriptor: </span>
                        <span>{npc.descriptor}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span className="modesto">Disposition: </span>
                        <span>{npc.disposition}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span className="modesto">Conversation: </span>
                        <span>{npc.conversation}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span className="modesto">Knowledge: </span>
                        <span>{npc.knowledge}</span>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-9">
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
                      <div className="col-3 text-right">
                        <button className="btn btn-danger btn" onClick={() => this.handleNPCDelete(npc.id)}>
                          <i className="fas fa-times" aria-hidden="true"></i>
                          &nbsp;Delete
                        </button>
                      </div>
                    </div>
                    {this.props.selectedPlayer != null ? (
                      <React.Fragment>
                        <h6 className="text-center">BOND</h6>
                        <ProgressTrack
                          key={npc.id}
                          progress={npc.bond}
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
