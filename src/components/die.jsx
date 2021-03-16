import React, { Component } from "react";

class Die extends Component {
  render() {
    return (
      <div className="col-3">
        <div className="card dice-card">
          <div className="dice text-center">
            <h6>D{this.props.die.id}</h6>
            <img
              src={
                "/img/d" +
                (this.props.die.id == 100 ? 10 : this.props.die.id) +
                ".svg"
              }
            />
          </div>
          <input
            id={`d${this.props.die.id}_qty`}
            className="die_qty"
            type="number"
            value={this.props.die.value}
            placeholder="0"
            min="0"
            max="10"
            step="1"
            data-sides="2"
            onChange={(e) => this.props.onChange(e, this.props.die)}
          />
        </div>
      </div>
    );
  }
}

export default Die;
