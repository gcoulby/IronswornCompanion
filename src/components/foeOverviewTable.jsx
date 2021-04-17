import React, { Component } from "react";
class FoeOverviewTable extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <table className="table">
          <thead className="modesto">
            <th>Name</th>
            <th>Source</th>
            <th>Page</th>
            <th>Category</th>
            <th>Rank</th>
            <th>Drives</th>
            <th>Features</th>
            <th>Tactics</th>
          </thead>
          <tbody>
            <td>{this.props.Type}</td>
            <td>{this.props.Source}</td>
            <td>{this.props.Page}</td>
            <td>{this.props.Category}</td>
            <td>{this.props.Rank}</td>
            <td>
              {this.props.Drives.map((d) => (
                <p>{d}</p>
              ))}
            </td>
            <td>
              {this.props.Features.map((f) => (
                <p>{f}</p>
              ))}
            </td>
            <td>
              {this.props.Tactics.map((t) => (
                <p>{t}</p>
              ))}
            </td>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default FoeOverviewTable;
