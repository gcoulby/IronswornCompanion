import React, { Component } from "react";
import { HashRouter, Link } from "react-router-dom";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-fixed-top  navbar-expand navbar-dark bg-dark print-hide">
          <h1 className="navbar-brand">
            <HashRouter basename="/">
              <Link to="/">IRONSWORN</Link>
            </HashRouter>
            {/* <a href="/">IRONSWORN</a> */}
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-prepend">
                      <label className="btn btn-outline-light btn-tag">Player</label>
                    </div>
                  </div>
                  <select
                    className="form-control bg-dark text-light"
                    value={this.props.selectedPlayer ? this.props.selectedPlayer.name : -1}
                    onChange={(e) => this.props.onPlayerSelect(e.target.value)}
                  >
                    <option>Select Character</option>
                    {this.props.players.length > 0 ? (
                      <React.Fragment>
                        {this.props.players.map((p) => (
                          <option key={p.name} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </React.Fragment>
                    ) : (
                      React.Fragment
                    )}
                  </select>
                </div>
                {/* <p className="nav-key">Player</p>
                <p className="nav-value">
                  {this.props.selectedPlayer
                    ? this.props.selectedPlayer.name
                    : "-"}
                </p> */}
                &emsp;
              </li>
              <ul key="playerName" className="navbar-nav mr-auto">
                {this.props.selectedPlayer ? (
                  <React.Fragment>
                    {this.props.selectedPlayer.stats.map((s) => (
                      <li key={UniqueKeyGenerator.generate()} className="nav-item active">
                        <HashRouter basename="/">
                          <Link to="/stats" className="btn btn-outline-light">
                            <p className="stat-value">{s.value}</p>
                            <p className="stat-key">{s.stat}</p>
                          </Link>
                        </HashRouter>
                        {/* <a href="/stats" className="btn btn-outline-light">
                          <p className="stat-value">{s.value}</p>
                          <p className="stat-key">{s.stat}</p>
                        </a> */}
                      </li>
                    ))}
                  </React.Fragment>
                ) : (
                  React.Fragment
                )}
              </ul>
            </ul>
          </div>
        </nav>
        <div className="nav-post print-hide"></div>
      </React.Fragment>
    );
  }
}

export default Navbar;
