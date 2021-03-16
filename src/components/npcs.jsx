import React, { Component } from "react";
import ProgressTrack from "./progressTrack";
import TitleBlock from "./titleBlock";
class NPCs extends Component {
  state = {};
  render() {
    console.log(this.props.races);
    return (
      <React.Fragment>
        <h1>NPCs</h1>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-dark mt-2 mb-4"
              type="button"
              onClick={() => this.props.onAddRandomNPC()}
            >
              <i className="fas fa-dice-d20" aria-hidden="true"></i>
              &nbsp;Roll Random NPC
            </button>
            <div className="row">
              <div className="col-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollNPCRace()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <select
                    className="form-control"
                    value={this.props.newNPC.Race}
                    onChange={(e) => this.props.onNewNPCRaceChanged(e)}
                  >
                    <option>Select Race</option>
                    {this.props.races.map((r) => (
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
                      onClick={() => this.props.onRollNewNPCGoal()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Goal"
                    aria-label="NPC Goal"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Goal}
                    onChange={(e) => this.props.onNewNPCGoalChanged(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollNewNPCDescriptor()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Descriptor"
                    aria-label="NPC Descriptor"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Descriptor}
                    onChange={(e) => this.props.onNewNPCDescriptorChanged(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollNewNPCConversation()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Conversation"
                    aria-label="NPC Conversation"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Conversation}
                    onChange={(e) => this.props.onNewNPCConversationChanged(e)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="btn btn-dark btn-tag">
                      Last Location
                    </label>
                  </div>

                  <select
                    className="form-control"
                    value={this.props.newNPC.Location}
                    onChange={(e) => this.props.onNewNPCLocationChanged(e)}
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
                      onClick={() => this.props.onRollNPCName()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Name"
                    aria-label="NPC Name"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Name}
                    onChange={(e) => this.props.onNewNPCNameChanged(e)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollNewNPCRole()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Role"
                    aria-label="NPC Role"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Role}
                    onChange={(e) => this.props.onNewNPCRoleChanged(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollNewNPCDisposition()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Disposition"
                    aria-label="NPC Disposition"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Disposition}
                    onChange={(e) => this.props.onNewNPCDispositionChanged(e)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollNewNPCKnowledge()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NPC Knowledge"
                    aria-label="NPC Knowledge"
                    aria-describedby="basic-addon2"
                    value={this.props.newNPC.Knowledge}
                    onChange={(e) => this.props.onNewNPCKnowledgeChanged(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => this.props.onAddNPC()}
                >
                  <i className="fas fa-plus" aria-hidden="true"></i>
                  &nbsp;Add NPC
                </button>
              </div>
            </div>
          </div>
        </div>
        <TitleBlock title="NPCs" />

        <div className="row mt-4">
          {this.props.npcs.map((npc) => (
            <div key={npc.name} className="col-md-6 col-lg-6 col-sm-12">
              <div className="card">
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
                    <div className="col">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag btn-tag-sm">
                            Last Location
                          </label>
                        </div>

                        <select
                          className="form-control form-control-sm"
                          value={npc.locationId}
                          onChange={(e) =>
                            this.props.onNPCLocationChanged(e, npc.id)
                          }
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
                  </div>
                  {this.props.selectedPlayer != null ? (
                    <React.Fragment>
                      <h6 className="text-center">BOND</h6>
                      <ProgressTrack
                        key={npc.id}
                        progress={npc.bond}
                        onProgressionChange={(increment) =>
                          this.props.onNPCProgressionChanged(npc.id, increment)
                        }
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-12">
                      <button
                        className="btn btn-dark btn-block"
                        onClick={() => this.props.onNPCSelect(npc.name)}
                      >
                        <i className="fas fa-user-plus" aria-hidden="true"></i>
                        &nbsp;Select
                      </button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <button
                        className="btn btn-danger btn-block"
                        onClick={() => this.props.onNPCDelete(npc.id)}
                      >
                        <i className="fas fa-times" aria-hidden="true"></i>
                        &nbsp;Delete
                      </button>
                    </div>
                  </div>
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
