import React, { Component } from "react";
// import ReactHtmlParser from "react-html-parser";
import parse from "html-react-parser";
import ReactMarkdown from "react-markdown";

class DelveCard extends Component {
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
        <div className={`card delve-card ${this.props.idx != undefined ? `delve-card-${this.props.idx}` : ""}`}>
          <div className="card-header bg-dark text-light">
            <h6>{this.props.delveCard.Type}</h6>

            <div className="delve-icon">
              <i className={`game-icon game-icon-${this.props.delveCard.icon}`} aria-hidden="true"></i>
            </div>
          </div>
          <div className="card-body">
            <h4>{this.props.delveCard.Name}</h4>
            {this.props.delveCard.Summary !== undefined ? <p>{this.props.delveCard.Summary}</p> : React.Fragment}
            <span className="modesto mt-3">FEATURES</span>
            <table className="table table-striped text-left">
              <tbody>
                {this.props.delveCard.Features.map((f) => {
                  return (
                    <React.Fragment>
                      <tr>
                        <td width="60">{f.Chance == 99 ? "99" : f.Chance == 100 ? "00" : `${f.Min} - ${f.Chance}`}</td>
                        <td>{f.Description}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
            <span className="modesto mt-3">DANGERS</span>
            <table className="table table-striped">
              <tbody>
                {this.props.delveCard.Dangers.map((f) => {
                  return (
                    <React.Fragment>
                      <tr>
                        <td width="60">
                          {f.Min} - {f.Chance}
                        </td>
                        <td>{f.Description}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DelveCard;
