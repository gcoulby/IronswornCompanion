import React, { Component } from "react";
// import ReactHtmlParser from "react-html-parser";
import parse from "html-react-parser";
import ReactMarkdown from "react-markdown";
import { Turndown } from "turndown";
import StatTrack from "./statTrack";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
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
    let trackLabels = asset.TrackLabels ? asset.TrackLabels : [];
    // if (asset.TrackLabels != null) {
    //   asset.TrackLabels.map((f) => {
    //     trackLabels.push(f);
    //   });
    // }
    return {
      stat: asset.id,
      hideLabel: true,
      value: asset.TrackValue,
      trackLabels: trackLabels,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="card asset-card">
          <div className="card-header bg-dark text-light">
            <h6>{this.props.asset.Type}</h6>
            <div
              className={`asset-icon ${this.props.asset.augment ? "text-warning" : ""}`}
              onClick={() => this.props.augment(this.props.asset.id)}
              title="Augment Asset"
            >
              <i className={`game-icon game-icon-${this.props.asset.icon}`} aria-hidden="true"></i>
            </div>
          </div>
          <div className="card-body">
            <h4>{this.props.asset.Name}</h4>

            {this.props.asset.InputFields ? (
              <React.Fragment>
                {this.props.asset.InputFields.filter((f) => f.name !== undefined && f.name !== "").map((f) => {
                  let idx = this.props.asset.InputFields.indexOf(f);
                  return (
                    <React.Fragment>
                      <div className="row input-field">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <label htmlFor={`${this.props.asset.id}||input||${idx}`}>
                              <strong>{f.name}:</strong>&emsp;
                            </label>
                          </div>
                          <input
                            id={`${this.props.asset.id}||input||${idx}`}
                            className="form-control form-control-sm"
                            type="text"
                            value={f.value}
                            disabled={this.props.disabled}
                            onChange={(e) => this.props.onInputFieldChange(e, this.props.asset.id, idx)}
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
            {this.props.asset.Description !== undefined ? <p>{this.props.asset.Description}</p> : React.Fragment}

            {this.props.asset.Abilities.filter(
              (a) => (a.Name !== undefined && a.Name !== "") || (a.Text !== undefined && a.Text !== "")
            ).map((a) => (
              <div className="row">
                <label className="control control-checkbox">
                  <input
                    type="checkbox"
                    checked={a.Enabled}
                    onChange={(e) =>
                      this.props.onAbilityCheckChange(e, this.props.asset.id, this.props.asset.Abilities.indexOf(a))
                    }
                  />
                  <div className="control_indicator"></div>
                </label>
                <div className="col">{this.content(a.Name, a.Text)}</div>
              </div>
            ))}

            {(this.props.asset.TrackMax !== undefined && this.props.asset.TrackMax > 0) ||
            (this.props.asset.TrackLabels !== undefined && this.props.asset.TrackLabels.length > 0) ? (
              <React.Fragment>
                <div className="stat-track-container">
                  <StatTrack
                    min={0}
                    max={
                      this.props.asset.TrackLabels &&
                      this.props.asset.TrackLabels.length > 0 &&
                      this.props.asset.TrackLabels[0] != ""
                        ? this.props.asset.TrackLabels.length - 1
                        : this.props.asset.TrackMax
                    }
                    onChange={this.props.onTrackProgressChange}
                    // onChange={this.handleStatTrackChange}
                    value={this.props.asset.TrackValue}
                    stat={this.props.stat} // {this.props.asset.id}
                    hideThumb={this.props.hideThumb}
                    // hideLabel="true"
                  />
                </div>
                {/* <p>{this.props.asset.TrackMax}</p> */}
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
