import React, { Component } from "react";
import DiceResult from "./diceResult";
import DiceRoller from "./dice_roller";
import Moves from "./moves";
import OracleRoller from "./oracleRoller";
import Roller from "./roller";
import RollIcon from "./rollIcon";
class Footer extends Component {
  constructor(props) {
    super();
    this.diceRoller = new DiceRoller();
  }

  render() {
    return (
      <React.Fragment>
        <div className="footer-pre print-hide"></div>
        <div className="navbar fixed-bottom bg-dark text-light">
          <div className="col-12">
            <div className="row modesto">
              <Roller
                selectedPlayer={this.props.selectedPlayer}
                footerDice={this.props.footerDice}
                burnMomentum={this.props.burnMomentum}
              />
              <div className="col-auto">
                <label>&nbsp;</label>
                <br />
                <OracleRoller oracles={this.props.oracles} onComponentUpdate={this.props.onComponentUpdate} />
              </div>
              <div className="col-auto">
                <label>&nbsp;</label>
                <br />
                <Moves
                  moves={this.props.moves}
                  onComponentUpdate={this.props.onComponentUpdate}
                  selectedPlayer={this.props.selectedPlayer}
                  footerDice={this.props.footerDice}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
