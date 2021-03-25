import React, { Component } from "react";
import glyphs from "../models/iconsNetGlyphs";
class IconPicker extends Component {
  state = {
    filter: "",
  };
  handleFilterChange = (evt) => {
    this.setState({ filter: evt.target.value });
  };
  render() {
    return (
      <React.Fragment>
        {this.props.show ? (
          <React.Fragment>
            <div id="iconPicker">
              <div className="overlay"></div>
              <div className="card">
                <div className="card-header bg-dark text-light modesto">
                  <div className="row">
                    <div className="col">
                      <h5 style={{ marginTop: 0.3 + "em" }}>
                        <i className="fas fa-eye-dropper"></i>&emsp;Icon Picker
                      </h5>
                    </div>
                    <div className="col text-right">
                      <button className="btn btn-sm btn-outline-light" onClick={() => this.props.onClose(false)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label className="btn btn-dark btn-tag">
                              <i className="fa fa-search" aria-hidden="true"></i>
                            </label>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search Icon"
                            aria-label="search"
                            aria-describedby="basic-addon2"
                            value={this.state.filter}
                            onChange={(e) => this.handleFilterChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    {/*  Icons   */}
                    <div id="iconPickerIcons" className="row">
                      <div className="col">
                        {glyphs
                          .filter((g) => g.includes(this.state.filter))
                          .map((g) => (
                            <i
                              key={`game-icon game-icon-${g}`}
                              className={`game-icon game-icon-${g}`}
                              aria-hidden="true"
                              onClick={() => this.props.onIconSelect(g)}
                            ></i>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default IconPicker;
