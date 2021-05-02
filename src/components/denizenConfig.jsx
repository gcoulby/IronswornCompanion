import React, { Component } from "react";
import RollIcon from "./rollIcon";
import TagTable from "./tagTable";
import TitleBlock from "./titleBlock";
class DenizenConfig extends Component {
  state = {};

  handleFoeTagCheckChange = (evt, foe, tag) => {
    const foes = this.props.foes.map((f) => {
      if (f.id == foe.id) {
        if (evt.target.checked) {
          f.Tags.push(tag);
        } else {
          f.Tags = f.Tags.filter((t) => t != tag);
        }
        f.Tags = [...new Set(f.Tags)];
      }
      return f;
    });
    this.setState({ foes });
  };

  handleDelveCardTagChange = (evt, delveCard, tag) => {
    const delveCards = this.props.delveCards.map((d) => {
      if (d.id == delveCard.id) {
        if (evt.target.checked) {
          d.Tags.push(tag);
        } else {
          d.Tags = d.Tags.filter((t) => t != tag);
        }
        d.Tags = [...new Set(d.Tags)];
      }
      return d;
    });
    this.setState({ delveCards });
  };

  componentDidUpdate(prevProps, prevState) {
    this.props.onComponentUpdate(prevProps, prevState);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Denizen Config</h1>
        <TitleBlock title="Foe Tags" />
        <div className="tagTableContainer mb-5">
          <table className="denizenTable table table-striped">
            <thead>
              <th style={{ zIndex: 100 }}>
                <span className="name-col">Name</span>
              </th>
              {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d, i) => (
                <th style={{ zIndex: 99 - i }}>
                  <span className="tag-col">{d}</span>
                </th>
              ))}
            </thead>
            <tbody>
              {this.props.foes.map((f) => {
                return (
                  <React.Fragment>
                    <tr>
                      <td>{f.Name}</td>
                      {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d) => {
                        return (
                          <td key={`td_${f.Name}_tag_${d}`}>
                            <div className="cross-check">
                              <input
                                id={`${f.Type}_check_${f.Name}_tag_${d}`}
                                type="checkbox"
                                onChange={(e) => this.handleFoeTagCheckChange(e, f, d)}
                                checked={f.Tags?.includes(d)}
                              />
                              <label htmlFor={`${f.Type}_check_${f.Name}_tag_${d}`}>&nbsp;</label>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <TitleBlock title="Theme Tags" />
        <div className="tagTableContainer mb-5">
          <table className="denizenTable table table-striped">
            <thead>
              <th style={{ zIndex: 100 }}>
                <span className="name-col">Name</span>
              </th>
              {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d, i) => (
                <th style={{ zIndex: 99 - i }}>
                  <span className="tag-col">{d}</span>
                </th>
              ))}
            </thead>
            <tbody>
              {this.props.delveCards
                .filter((d) => d.Type === "Theme")
                .map((f) => {
                  return (
                    <React.Fragment>
                      <tr>
                        <td>{f.Name}</td>
                        {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d) => {
                          return (
                            <td key={`td_${f.Name}_tag_${d}`}>
                              <div className="cross-check">
                                <input
                                  id={`${f.Type}_check_${f.Name}_tag_${d}`}
                                  type="checkbox"
                                  onChange={(e) => this.handleDelveCardTagChange(e, f, d)}
                                  checked={f.Tags.includes(d)}
                                />
                                <label htmlFor={`${f.Type}_check_${f.Name}_tag_${d}`}>&nbsp;</label>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>

        <TitleBlock title="Domain Tags" />
        <div className="tagTableContainer mb-5">
          <table className="denizenTable table table-striped">
            <thead>
              <th style={{ zIndex: 100 }}>
                <span className="name-col">Name</span>
              </th>
              {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d, i) => (
                <th style={{ zIndex: 99 - i }}>
                  <span className="tag-col">{d}</span>
                </th>
              ))}
            </thead>
            <tbody>
              {this.props.delveCards
                .filter((d) => d.Type === "Domain")
                .map((f) => {
                  return (
                    <React.Fragment>
                      <tr>
                        <td>{f.Name}</td>
                        {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d) => {
                          return (
                            <td key={`td_${f.Name}_tag_${d}`}>
                              <div className="cross-check">
                                <input
                                  id={`${f.Type}_check_${f.Name}_tag_${d}`}
                                  type="checkbox"
                                  onChange={(e) => this.handleDelveCardTagChange(e, f, d)}
                                  checked={f.Tags.includes(d)}
                                />
                                <label htmlFor={`${f.Type}_check_${f.Name}_tag_${d}`}>&nbsp;</label>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* <TitleBlock title="Foe Weighting" /> */}
      </React.Fragment>
    );
  }
}

export default DenizenConfig;
