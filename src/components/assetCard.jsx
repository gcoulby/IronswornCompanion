import React, { Component } from "react";
// import ReactHtmlParser from "react-html-parser";
import parse from "html-react-parser";
import ReactMarkdown from "react-markdown";
import { Turndown } from "turndown";
import StatTrack from "./statTrack";
class AssetCard extends Component {
  state = {
    // stat: this.buildStat(this.props.asset),
  };
  content(name, text) {
    let str = "";
    if (text.includes("</")) {
      str = name ? `<strong>${name}:</strong>&nbsp${text}` : text;
      return parse(str);
    } else {
      str = name ? `**${name}:** ${text}` : text;
      return <ReactMarkdown>{str}</ReactMarkdown>;
    }
  }

  buildStat(asset) {
    let trackLabels = [];
    if (asset.MultiFieldAssetTrack != null) {
      asset.MultiFieldAssetTrack.Fields.map((f) => {
        trackLabels.push(f.ActiveText);
      });
    }
    return {
      stat: asset.id,
      hideLabel: true,
      value: asset.trackValue,
      trackLabels: trackLabels,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="card asset-card">
          <div className="card-header bg-dark text-light">
            <h6>{this.props.asset["Asset Type"]}</h6>

            <div className="asset-icon">
              <i
                class={`game-icon game-icon-${this.props.asset.icon}`}
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div className="card-body">
            <h4>{this.props.asset.Name}</h4>
            {this.props.asset["Input Fields"] ? (
              <React.Fragment>
                {this.props.asset["Input Fields"].map((f) => {
                  let idx = this.props.asset["Input Fields"].indexOf(f);
                  return (
                    <React.Fragment>
                      <div className="row input-field">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <label
                              htmlFor={`${this.props.asset.id}||input||${idx}`}
                            >
                              <strong>{f.name}:</strong>&emsp;
                            </label>
                          </div>
                          <input
                            id={`${this.props.asset.id}||input||${idx}`}
                            className="form-control form-control-sm"
                            type="text"
                            value={f.value}
                            disabled={this.props.disabled}
                            onChange={(e) =>
                              this.props.onInputFieldChange(
                                e,
                                this.props.asset.id,
                                idx
                              )
                            }
                          />
                          <div className="hr"></div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}

            {this.props.asset.Abilities.map((a) => (
              <div className="row">
                <label class="control control-checkbox">
                  <input
                    type="checkbox"
                    checked={a.Enabled}
                    onChange={(e) =>
                      this.props.onAbilityCheckChange(
                        e,
                        this.props.asset.id,
                        this.props.asset.Abilities.indexOf(a)
                      )
                    }
                  />
                  <div class="control_indicator"></div>
                </label>
                <div className="col">{this.content(a.Name, a.Text)}</div>
              </div>
            ))}

            {this.props.asset.Health !== undefined ||
            this.props.asset.MultiFieldAssetTrack !== undefined ? (
              <React.Fragment>
                <div className="stat-track-container">
                  <StatTrack
                    min={0}
                    max={
                      this.props.asset.Health !== undefined
                        ? this.props.asset.Health
                        : this.props.asset.MultiFieldAssetTrack.Fields.length -
                          1
                    }
                    onChange={this.props.onTrackProgressChange}
                    // onChange={this.handleStatTrackChange}
                    value={this.props.asset.trackValue}
                    stat={this.props.stat} // {this.props.asset.id}
                    hideThumb={this.props.hideThumb}
                    // hideLabel="true"
                  />
                </div>
                {/* <p>{this.props.asset.Health}</p> */}
              </React.Fragment>
            ) : (
              React.Fragment
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AssetCard;
