import React, { Component } from "react";
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

  getTrackPosition() {
    let val = this.props.stat.value + this.state.offset;
    let n = 100 / (this.state.ticks.length - 1);
    let v = val * n;
    let v0 = v == 0 ? 0 : Math.round(v / n) * n;
    return v0;
  }

  render() {
    return (
      <React.Fragment>
        <div className={`stat-track stat-track-${this.props.stat.stat}`}>
          <span className="track-title modesto">{this.props.stat.stat}</span>
          <div className="slider-container">
            <ul className="slider-ticks">
              {this.state.ticks.map((t) => (
                <li className="slider-tick">{t <= 0 ? `${t}` : `+${t}`}</li>
              ))}
            </ul>
            <input
              type="range"
              min={this.state.min}
              max={this.state.max}
              step="1"
              value={this.getTrackPosition()}
              onChange={(e) =>
                this.props.onChange(
                  e,
                  this.props.stat.stat,
                  this.state.ticks.length,
                  -this.state.offset
                )
              }
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
