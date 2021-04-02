import React, { Component } from "react";
class TagTable extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
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
                              {/* <p> */}
                              <input
                                id={`${f.Name}_check_${f2.Name}_tag_${d}`}
                                type="checkbox"
                                onChange={(e) => this.props.tagCheckChange(e, f2, d)}
                                checked={f2.Tags.includes(d)}
                              />
                              <label for={`${f.Name}_check_${f2.Name}_tag_${d}`}>&nbsp;</label>
                              {/* </p> */}
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
      </React.Fragment>
    );
  }
}

export default TagTable;
