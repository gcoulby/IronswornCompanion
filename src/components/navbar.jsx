import React, { Component } from "react";
import { HashRouter, Link } from "react-router-dom";
import NavMenu from "./nav_menu";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class Navbar extends Component {
  state = {
    showColapsedMenu: false,
  };

  handleMenuToggleButton = (close) => {
    const showColapsedMenu = close ? false : !this.state.showColapsedMenu;
    this.setState({ showColapsedMenu });

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

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
              <ul className="navbar-nav mr-auto header-nav">
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

        <nav className="navbar navbar-dark bg-dark mobile-menu">
          <div className="row">
            <div className="col-auto">
              <HashRouter basename="/stats">
                <Link className="btn btn-outline-light" to="/" onClick={() => this.handleMenuToggleButton(true)}>
                  <i className="fas fa-heartbeat" aria-hidden="true"></i>
                </Link>
              </HashRouter>
            </div>
            <div className="col-auto">
              <div className="input-group">
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
                className="btn btn-outline-light"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample01"
                aria-controls="navbarsExample01"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => this.handleMenuToggleButton()}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div
            className={`collapse navbar-collapse ${this.state.showColapsedMenu ? "show" : ""}`}
            id="navbarsExample01"
          >
            <NavMenu
              onMenuItemClick={this.handleMenuToggleButton}
              selectedPlayer={this.props.selectedPlayer}
              footerDice={this.props.footerDice}
              burnMomentum={this.props.burnMomentum}
            />
          </div>
        </nav>
        <div className="nav-post print-hide"></div>
      </React.Fragment>
    );
  }
}

export default Navbar;
