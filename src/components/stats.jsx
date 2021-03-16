import React, { Component } from "react";
import ExperienceTrack from "./experienceTrack";
import ProgressTrack from "./progressTrack";
import StatTrack from "./statTrack";
import TitleBlock from "./titleBlock";
import UnselectedPlayer from "./unselected_player";
class Stats extends Component {
  state = { health: 5, spirit: 5, momentum: -2 };

  valueToStat(val, steps) {
    let n = 100 / (steps - 1);
    return val == 0 ? 0 : Math.round(val / n);
  }

  handleTrackChange = (evt, name, steps, offset) => {
    let val = evt.target.value;
    let stat = this.valueToStat(val, steps);
    this.setState({ health: stat });
  };

  handleHealthTrackChange = (evt, steps) => {
    let val = evt.target.value;
    let stat = this.valueToStat(val, steps);
    this.setState({ health: stat });
  };

  handleMomentumTrackChange = (evt, steps, offset) => {
    let val = evt.target.value;
    let stat = this.valueToStat(val, steps) + offset;
    this.setState({ momentum: stat });
  };
  render() {
    if (this.props.selectedPlayer == null) return <UnselectedPlayer />;
    return (
      <React.Fragment>
        <h1 className="">{this.props.selectedPlayer.name}</h1>
        <TitleBlock title="EXPERIENCE" />
        <ExperienceTrack
          selectedPlayer={this.props.selectedPlayer}
          key={this.props.selectedPlayer}
          progress={this.props.selectedPlayer.bonds}
          onExperienceChange={this.props.onExperienceChange}
        />
        <TitleBlock title="STATS" />
        <div className="container">
          <div className="row row-cols-5 text-center">
            {this.props.selectedPlayer.stats
              .filter((s) => s.type == "core")
              .map((s) => (
                <div className="col stat-col">
                  <div key={s.stat} className="card stat-card">
                    <h2>{s.value}</h2>
                    <p className="modesto">{s.stat}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="stat-tracks">
          <TitleBlock title="BONDS" />

          <ProgressTrack
            key={this.props.selectedPlayer}
            progress={this.props.selectedPlayer.bonds}
            onProgressionChange={(increment) =>
              this.props.onPlayerProgressionChanged(
                this.props.selectedPlayer.name,
                increment
              )
            }
            // hideButtons={true}
          />
          <TitleBlock title="TRACKS" />
          <StatTrack
            min={0}
            max={5}
            onChange={this.props.onTrackChange}
            stat={this.props.selectedPlayer.stats.find(
              (s) => s.stat == "Health"
            )}
            value={
              this.props.selectedPlayer.stats.find((s) => s.stat == "Health")
                .value
            }
          />
          <StatTrack
            min={0}
            max={5}
            value={0}
            onChange={this.props.onTrackChange}
            stat={this.props.selectedPlayer.stats.find(
              (s) => s.stat == "Spirit"
            )}
          />
          <StatTrack
            min={0}
            max={5}
            value={0}
            onChange={this.props.onTrackChange}
            stat={this.props.selectedPlayer.stats.find(
              (s) => s.stat == "Supply"
            )}
          />
          <StatTrack
            min={-6}
            max={10}
            // onChange={this.handleMomentumTrackChange}
            onChange={this.props.onTrackChange}
            value={this.state.momentum}
            stat={this.props.selectedPlayer.stats.find(
              (s) => s.stat == "Momentum"
            )}
          />
        </div>
        <div className="row text-center">
          <div className="col mt-4">
            <div className="btn btn-outline-dark momentum-stat mr-1">
              <h5>{this.props.selectedPlayer.maxMomentum}</h5>
              <h6>MAX</h6>
            </div>
            <div className="btn btn-outline-dark momentum-stat">
              <h5>{this.props.selectedPlayer.resetMomentum}</h5>
              <h6>RESET</h6>
            </div>
          </div>
        </div>

        <div className="debilities text-center">
          <TitleBlock title="DEBILITIES" />
          <div className="row mt-5 modesto">
            <div className="col-4">
              <h4 className="mb-4">CONDITIONS</h4>
              {this.props.selectedPlayer.debilities
                .filter((d) => d.type == "conditions")
                .map((d) => (
                  <div key={d.name} className="deb-cb">
                    <input
                      type="checkbox"
                      //   name="cb"
                      id={`cb_${d.name}`}
                      checked={d.active}
                      onChange={(e) => this.props.onDebilityChange(e, d.name)}
                    />
                    <label htmlFor={`cb_${d.name}`}>{d.name}</label>
                  </div>
                ))}
            </div>
            <div className="col-4">
              <h4 className="mb-4">BANES</h4>
              {this.props.selectedPlayer.debilities
                .filter((d) => d.type == "banes")
                .map((d) => (
                  <div className="deb-cb">
                    <input
                      type="checkbox"
                      //   name="cb"
                      id={`cb_${d.name}`}
                      checked={d.active}
                      onChange={(e) => this.props.onDebilityChange(e, d.name)}
                    />
                    <label htmlFor={`cb_${d.name}`}>{d.name}</label>
                  </div>
                ))}
            </div>
            <div className="col-4">
              <h4 className="mb-4">BURDENS</h4>
              {this.props.selectedPlayer.debilities
                .filter((d) => d.type == "burdens")
                .map((d) => (
                  <div className="deb-cb">
                    <input
                      type="checkbox"
                      //   name="cb"
                      id={`cb_${d.name}`}
                      checked={d.active}
                      onChange={(e) => this.props.onDebilityChange(e, d.name)}
                    />
                    <label htmlFor={`cb_${d.name}`}>{d.name}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Stats;
