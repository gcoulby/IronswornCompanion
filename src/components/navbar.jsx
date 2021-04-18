import React, { Component } from "react";
import { HashRouter, Link } from "react-router-dom";
import NavMenu from "./nav_menu";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-fixed-top  navbar-expand navbar-dark bg-dark print-hide desktop-menu">
          <div className="row">
            <div className="col-auto">
              <h1 className="navbar-brand">
                <HashRouter basename="/">
                  <Link to="/">IRONSWORN</Link>
                </HashRouter>
              </h1>
            </div>
          </div>
          <div className="col-auto">
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
                  &emsp;
                </li>
                <ul key="playerName" className="navbar-nav mr-auto">
                  {this.props.selectedPlayer ? (
                    <React.Fragment>
                      {this.props.selectedPlayer.stats.map((s, i) => (
                        <li key={`quick_stat_${i}`} className="nav-item active stat-button">
                          <HashRouter basename="/">
                            <Link to="/stats" className="btn btn-outline-light">
                              <p className="stat-value">{s.value}</p>
                              <p className="stat-key">{s.stat}</p>
                            </Link>
                          </HashRouter>
                        </li>
                      ))}
                    </React.Fragment>
                  ) : (
                    React.Fragment
                  )}
                </ul>
              </ul>
            </div>
          </div>
        </nav>

        <nav class="navbar navbar-dark bg-dark mobile-menu">
          <div className="row">
            <div className="col-auto">
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
            </div>
            <div className="col-auto">
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample01"
                aria-controls="navbarsExample01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div class="collapse navbar-collapse" id="navbarsExample01">
            <NavMenu />
          </div>
        </nav>
        <div className="nav-post print-hide"></div>
      </React.Fragment>
    );
  }
}

export default Navbar;