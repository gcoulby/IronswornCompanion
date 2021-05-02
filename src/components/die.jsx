import React, { Component } from "react";
import d2 from "../img/d2.svg";
import d4 from "../img/d4.svg";
import d6 from "../img/d6.svg";
import d8 from "../img/d8.svg";
import d10 from "../img/d10.svg";
import d12 from "../img/d12.svg";
import d20 from "../img/d20.svg";

class Die extends Component {
  state = {
    dieImg: d2,
  };
  constructor(props) {
    super();
    switch (props.die.id) {
      case 2:
        this.state.dieImg = d2;
        break;
      case 4:
        this.state.dieImg = d4;
        break;
      case 6:
        this.state.dieImg = d6;
        break;
      case 8:
        this.state.dieImg = d8;
        break;
      case 10:
      case 100:
        this.state.dieImg = d10;
        break;
      case 12:
        this.state.dieImg = d12;
        break;
      case 20:
        this.state.dieImg = d20;
        break;
    }
  }

  render() {
    return (
      <div className="col-6 col-lg-3">
        <div className="card dice-card ">
          <div className="dice text-center">
            <h6>D{this.props.die.id}</h6>
            <img className="d-none d-lg-block" src={this.state.dieImg} />
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
