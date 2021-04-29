import React, { Component } from "react";
import AssetCard from "./assetCard";
import DangerButton from "./dangerButton";
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
        this.props.addLog("event", `${p.name} acquired a new asset: ${asset.Name}`);
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
          this.props.addLog("event", `${p.name} no longer has the asset: ${a.Name}`);
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

  augment = (id) => {
    const players = this.props.players.map((p) => {
      if (!p.selected) return;

      p.assets.map((a) => {
        if (a.id === id) {
          a.augment = !a.augment;
        }
        return a;
      });

      return p;
    });
    this.setState({ players });
  };

  componentDidUpdate(prevProps, prevState) {
    this.props.onComponentUpdate(prevProps, prevState);
  }

  render() {
    if (this.props.selectedPlayer == null) return <UnselectedPlayer />;
    return (
      <React.Fragment>
        <h1>Assets</h1>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="input-group my-3">
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

          <div className="col-12 col-lg-6">
            <div className="input-group my-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Select Asset to Remove</label>
              </div>

              <select
                className="form-control"
                onChange={(e) => this.handleOnSelectedRemovalAssetChange(e)}
                value={this.state.selectedRemovalAssetId}
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
            <DangerButton
              buttonText="Remove Asset"
              additionalButtonClasses="btn-sm"
              iconClass="fas fa-minus"
              onDangerClick={this.handleRemoveAssetClick}
              deleteMessage="Are you sure you want to remove this asset from your character?"
            />
          </div>
        </div>
        <TitleBlock title="Owned Assets" />
        <div className="alert alert-secondary">
          (Optional) Track augmentations on assets by clicking the icon on the asset card. Augmented assets will have a
          gold icon.
        </div>
        <div className="row">
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
                augment={this.augment}
                onTrackProgressChange={this.handleStatTrackChange}
                onInputFieldChange={this.handleInputFieldChange}
                onAbilityCheckChange={this.handleOnAbilityCheckChange}
              />
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Assets;
