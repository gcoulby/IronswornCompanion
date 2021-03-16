import React, { Component } from "react";
// import ReactHtmlParser from "react-html-parser";
import parse from "html-react-parser";
import ReactMarkdown from "react-markdown";
import { Turndown } from "turndown";
class AssetCard extends Component {
  state = {};
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
                {this.props.asset["Input Fields"].map((f) => (
                  <div className="row input-field">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <label
                          htmlFor={`input_${this.props.asset[
                            "Input Fields"
                          ].indexOf(f)}`}
                        >
                          <strong>{f}:</strong>&emsp;
                        </label>
                      </div>
                      <input
                        id={`input_${this.props.asset["Input Fields"].indexOf(
                          f
                        )}`}
                        className="form-control form-control-sm"
                        type="text"
                      />
                      <div className="hr"></div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {/* .map((f) => (
            <React.Fragment>
              <div className="row">
                <div className="col-4">{f}</div>
              </div>
            </React.Fragment>
            ))} */}
            {this.props.asset.Abilities.map((a) => (
              <div className="row">
                <label class="control control-checkbox">
                  <input type="checkbox" checked={a.Enabled} />
                  <div class="control_indicator"></div>
                </label>
                <div className="col">{this.content(a.Name, a.Text)}</div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AssetCard;
