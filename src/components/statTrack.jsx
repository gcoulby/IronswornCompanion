import React, { Component } from "react";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class StatTrack extends Component {
  state = {
    ticks: [],
  };
  constructor(props) {
    super();
    for (let i = props.min; i <= props.max; i++) {
      this.state.ticks.push(i);
    }
    this.state.offset = props.min < 0 ? props.min * -1 : props.min;
  }

  getTicks = () => {
    let ticks = [];
    for (let i = this.props.min; i <= this.props.max; i++) {
      ticks.push(i);
    }
    return ticks;
  };

  getTrackPosition() {
    let val = this.props.stat.value + this.state.offset;
    let n = 100 / (this.state.ticks.length - 1);
    let v = val * n;
    let v0 = v == 0 ? 0 : Math.round(v / n) * n;
    return v0;
  }

  render() {
    let ticks = this.getTicks();
    return (
      <React.Fragment>
        <div className={`stat-track stat-track-${this.props.stat.stat == "Momentum" ? "16" : this.props.max} `}>
          {this.props.stat.hideLabel != true ? (
            <React.Fragment>
              <span className="track-title modesto">{this.props.stat.stat}</span>
            </React.Fragment>
          ) : (
            React.Fragment
          )}
          <div className={`slider-container ${this.props.hideThumb ? "hide-thumb" : ""}`}>
            <ul className="slider-ticks">
              {this.props.stat.trackLabels !== undefined && this.props.stat.trackLabels.length > 0 ? (
                <React.Fragment>
                  {this.props.stat.trackLabels.map((t) => (
                    <li key={UniqueKeyGenerator.generate()} className="slider-tick slider-tick-label">
                      <span>{t}</span>
                    </li>
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {ticks.map((t) => (
                    <li key={UniqueKeyGenerator.generate()} className="slider-tick">
                      {t <= 0 ? `${t}` : `+${t}`}
                    </li>
                  ))}
                </React.Fragment>
              )}
            </ul>
            <input
              type="range"
              min={this.state.min}
              max={this.state.max}
              step="1"
              value={this.getTrackPosition()}
              onChange={(e) => this.props.onChange(e, this.props.stat.stat, ticks.length, -this.state.offset)}
              className="slider gh-slider-option4"
              id="test"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StatTrack;
