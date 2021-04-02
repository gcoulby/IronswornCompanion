import React, { Component } from "react";
import RollIcon from "./rollIcon";
import TagTable from "./tagTable";
import TitleBlock from "./titleBlock";
class DenizenConfig extends Component {
  state = {};
  handleOnNewFoeCategoryChanged = (evt) => {
    const denizenConfig = this.props.denizenConfig;
    denizenConfig.categoryId = evt.target.value;
    this.setState({ denizenConfig });
  };

  handleOnNewFoeNameChanged = (evt) => {
    const denizenConfig = this.props.denizenConfig;
    denizenConfig.nameId = evt.target.value;
    this.setState({ denizenConfig });
  };

  handleDenizenTagCheckChange = (evt, foe, tag) => {
    const foes = this.props.foes.map((f) => {
      f.Foes.map((f2) => {
        if (f2.Name == foe.Name) {
          if (evt.target.checked) {
            f2.Tags.push(tag);
          } else {
            f2.Tags = f2.Tags.filter((t) => t != tag);
          }
          f2.Tags = [...new Set(f2.Tags)];
        }
        return f2;
      });
      return f;
    });
    this.setState({ foes });
  };

  handleThemeTagChange = (evt, theme, tag) => {
    const denizenConfig = this.props.denizenConfig;
    denizenConfig.denizenThemeMap.map((t) => {
      if (t.Name === theme.Name) {
        if (evt.target.checked) {
          t.Tags.push(tag);
        } else {
          t.Tags = t.Tags.filter((t2) => t2 != tag);
        }
        t.Tags = [...new Set(t.Tags)];
      }
    });
    this.setState({ denizenConfig });
  };

  handleDomainTagChange = (evt, domain, tag) => {
    const denizenConfig = this.props.denizenConfig;
    denizenConfig.denizenDomainMap.map((d) => {
      if (d.Name === domain.Name) {
        if (evt.target.checked) {
          d.Tags.push(tag);
        } else {
          d.Tags = d.Tags.filter((t) => t != tag);
        }
        d.Tags = [...new Set(d.Tags)];
      }
    });
    this.setState({ denizenConfig });
  };

  componentDidMount() {
    const denizenConfig = this.props.denizenConfig;

    //Check array exists
    if (denizenConfig.denizenThemeMap.length === 0) {
      denizenConfig.denizenThemeMap = [];
    }
    if (denizenConfig.denizenDomainMap.length === 0) {
      denizenConfig.denizenDomainMap = [];
    }
    if (denizenConfig.denizenFoeMap.length === 0) {
      denizenConfig.denizenFoeMap = [];
    }

    this.props.foes.map((f) => {
      f.Foes.map((f2, i) => {
        if (denizenConfig.denizenFoeMap.find((d) => d.Name === f2.Name) == undefined) {
          denizenConfig.denizenFoeMap.push({
            Name: f2.Name,
            Type: f.Name,
            Source: f2.Source,
            Page: f2.Page,
            Rank: f2.Rank,
            Tags: f2.Tags,
          });
        }
      });
    });

    this.props.oracles.getOracleTableAsArray("Delve Theme").map((t) => {
      if (denizenConfig.denizenThemeMap.find((d) => d.Name === t) == undefined) {
        denizenConfig.denizenThemeMap.push({ Name: t, Tags: [] });
      }
    });
    this.props.oracles.getOracleTableAsArray("Delve Domain").map((d) => {
      if (denizenConfig.denizenDomainMap.find((m) => m.Name === d) == undefined) {
        denizenConfig.denizenDomainMap.push({ Name: d, Tags: [] });
      }
    });
    this.setState({ denizenConfig });
  }

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Denizen Config</h1>
        <TitleBlock title="Denizen Tags" />
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
                return f.Foes.map((f2, i) => {
                  return (
                    <React.Fragment>
                      <tr>
                        <td>{f2.Name}</td>
                        {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d) => {
                          return (
                            <td key={`td_${f2.Name}_tag_${d}`}>
                              <input
                                id={`${f.Name}_check_${f2.Name}_tag_${d}`}
                                type="checkbox"
                                onChange={(e) => this.handleDenizenTagCheckChange(e, f2, d)}
                                checked={f2.Tags.includes(d)}
                              />
                              <label for={`${f.Name}_check_${f2.Name}_tag_${d}`}>&nbsp;</label>
                            </td>
                          );
                        })}
                      </tr>
                    </React.Fragment>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
        {/* <div className="tagTableContainer mb-5"> */}
        {/* <TagTable
          tableContainerId="denizenTable"
          denizenConfig={this.props.denizenConfig}
          oracles={this.props.oracles}
          foes={this.props.foes}
          tagCheckChange={this.handleDenizenTagCheckChange}
        /> */}
        {/* </div> */}
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
              {this.props.denizenConfig.denizenThemeMap.map((t) => {
                return (
                  <tr>
                    <td>{t.Name}</td>
                    {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d) => {
                      return (
                        <td key={`td_${t.Name}_tag_${d}`}>
                          <input
                            id={`check_${t.Name}_tag_${d}`}
                            type="checkbox"
                            onChange={(e) => this.handleThemeTagChange(e, t, d)}
                            checked={t.Tags.includes(d)}
                          />
                          <label for={`check_${t.Name}_tag_${d}`}>&nbsp;</label>
                        </td>
                      );
                    })}
                  </tr>
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
              {this.props.denizenConfig.denizenDomainMap.map((m) => {
                return (
                  <tr>
                    <td>{m.Name}</td>
                    {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d) => {
                      return (
                        <td key={`td_${m.Name}_tag_${d}`}>
                          <input
                            id={`check_${m.Name}_tag_${d}`}
                            type="checkbox"
                            onChange={(e) => this.handleDomainTagChange(e, m, d)}
                            checked={m.Tags.includes(d)}
                          />
                          <label for={`check_${m.Name}_tag_${d}`}>&nbsp;</label>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <TitleBlock title="Foe Weighting" />
      </React.Fragment>
    );
  }
}

export default DenizenConfig;
