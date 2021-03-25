import React, { Component } from "react";
import AssetCard from "./assetCard";
import TitleBlock from "./titleBlock";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
import UnselectedPlayer from "./unselected_player";
class Assets extends Component {
  state = {
    selectedAssetId: null,
    selectedRemovalAssetId: null,
  };
  handleOnSelectedAssetChange = (evt) => {
    this.setState({
      selectedAssetId: evt.target.value,
    });
  };

  handleOnSelectedRemovalAssetChange = (evt) => {
    this.setState({
      selectedRemovalAssetId: evt.target.value,
    });
  };

  handleAddAssetClick = () => {
    let asset = JSON.parse(JSON.stringify(this.props.assets.find((a) => a.id == this.state.selectedAssetId)));

    const players = this.props.players.map((p) => {
      if (!p.selected) return;
      if (p.assets.find((a) => a.id == asset.id) === undefined) {
        p.assets.push(asset);
      }
      return p;
    });
    this.setState({ players });
    this.setState({ selectedAssetId: -1 });
  };

  handleRemoveAssetClick = () => {
    const players = this.props.players.map((p) => {
      if (!p.selected) return;

      let pos = -1;
      for (let i = 0; i < p.assets.length; i++) {
        let a = p.assets[i];
        if (a.id === this.state.selectedRemovalAssetId) {
          pos = i;
        }
      }
      if (pos != -1) p.assets.splice(pos, 1);
      return p;
    });
    this.setState({ selectedRemovalAssetId: -1 });
    this.setState({ players });
  };

  valueToStat(val, steps) {
    let n = 100 / (steps - 1);
    return val == 0 ? 0 : Math.round(val / n);
  }

  handleStatTrackChange = (evt, name, steps, offset) => {
    let val = evt.target.value;
    let stat = this.valueToStat(val, steps);

    const players = this.props.players.map((p) => {
      if (!p.selected) return;

      p.assets.map((a) => {
        if (a.id === name) {
          a.TrackValue = stat;
        }
        return a;
      });

      return p;
    });

    this.setState({ players });
  };

  handleInputFieldChange = (evt, id, field) => {
    let val = evt.target.value;

    const players = this.props.players.map((p) => {
      if (!p.selected) return;

      p.assets.map((a) => {
        if (a.id === id) {
          a.InputFields[field].value = val;
        }
        return a;
      });

      return p;
    });
    this.setState({ players });
  };

  handleOnAbilityCheckChange = (evt, id, ability) => {
    let val = evt.target.checked;
    const players = this.props.players.map((p) => {
      if (!p.selected) return;

      p.assets.map((a) => {
        if (a.id === id) {
          a.Abilities[ability].Enabled = val;
        }
        return a;
      });

      return p;
    });
    this.setState({ players });
  };

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    if (this.props.selectedPlayer == null) return <UnselectedPlayer />;
    return (
      <React.Fragment>
        <h1>Assets</h1>
        <div className="row">
          <div className="col-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Select Asset to Add</label>
              </div>

              <select
                className="form-control"
                onChange={(e) => this.handleOnSelectedAssetChange(e)}
                value={this.state.selectedAssetId}
              >
                <option value="">Select Asset</option>
                {this.props.assets.map((a) => {
                  return (
                    <React.Fragment>
                      {this.props.selectedPlayer.assets.find((pa) => pa.id == a.id) === undefined ? (
                        <React.Fragment>
                          <option value={a.id}>
                            {a.core ? "(Core)" : React.Fragment} {a.Name}
                          </option>
                        </React.Fragment>
                      ) : (
                        React.Fragment
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-sm btn-dark" onClick={this.handleAddAssetClick}>
              <i className="fa fa-plus" aria-hidden="true"></i> Add Asset
            </button>
          </div>

          <div className="col-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Select Asset to Remove</label>
              </div>

              <select
                className="form-control"
                onChange={(e) => this.handleOnSelectedRemovalAssetChange(e)}
                value={this.state.selectedAssetId}
              >
                <option value="">Select Asset</option>
                {this.props.assets.map((a) => {
                  return (
                    <React.Fragment>
                      {this.props.selectedPlayer.assets.find((pa) => pa.id == a.id) !== undefined ? (
                        <React.Fragment>
                          <option value={a.id}>
                            {a.core ? "(Core)" : React.Fragment} {a.Name}
                          </option>
                        </React.Fragment>
                      ) : (
                        React.Fragment
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-sm btn-danger" onClick={this.handleRemoveAssetClick}>
              <i className="fa fa-minus" aria-hidden="true"></i> Remove Asset
            </button>
          </div>
        </div>
        <TitleBlock title="Owned Assets" />
        {this.props.selectedPlayer.assets.map((a) => (
          <React.Fragment>
            <AssetCard
              asset={a}
              stat={{
                stat: a.id,
                hideLabel: true,
                value: a.TrackValue,
                trackLabels: a.TrackLabels ? a.TrackLabels : [],
              }}
              onTrackProgressChange={this.handleStatTrackChange}
              onInputFieldChange={this.handleInputFieldChange}
              onAbilityCheckChange={this.handleOnAbilityCheckChange}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default Assets;
