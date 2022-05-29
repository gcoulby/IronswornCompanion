import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DiceRoller from "./dice_roller";
import RollIcon from "./rollIcon";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class World extends Component {

  constructor(props) {
    super();
    this.diceRoller = new DiceRoller();
    this.state = {
      world: props.world
    };
  }

  /*=================================*/
  /*    Events
  /*=================================*/

  handleWorldTruthSelector = (option) => {
    option.Selected = !option.Selected
    this.setState({world: this.state.world});
  };

  handleWorldTruthCustomOption = (truth, field, value) => {
    let customOption = truth.Options.find(o => o.Custom === true);
    if (!customOption) {
      customOption = {Description: '', 'Quest Starter': ''};
      truth.Options.push(customOption);
    }
    customOption[field] = value;
    customOption.Custom = true;
    this.setState({world: this.state.world});
  };

  handleRollWorldClick = () => {
    this.state.world.truths.filter(t => t.Name !== 'Custom').forEach(truth => {
      const value = this.diceRoller.roll([truth.Options.filter(o => o.Custom !== true).length])[0].value;
      truth.Options.forEach(option => {
        option.Selected = false;
      })
      truth.Options[value].Selected = true;
    })
    this.setState({ world: this.state.world });
  };

  componentDidUpdate(prevProps, prevState) {
    this.props.onComponentUpdate(prevProps, prevState);
  }

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-dark mb-3" id="world-oracle" onClick={() => this.handleRollWorldClick()}>
          <RollIcon /> Roll a Random World
        </button>
        <div className="world-tabs">
          <Tabs id="uncontrolled-tab-example">
            {this.state.world.truths.map((truth) => (
              <Tab eventKey={truth.Name} title={truth.Name}>
                <ul className="mt-4">
                  {truth.Options.filter(option => option.Custom !== true).map((option) => (
                    <li key={UniqueKeyGenerator.generate()} className="card mb-2">
                      <label className="checkbox-card-label">
                        <input
                          key={UniqueKeyGenerator.generate()}
                          type="checkbox"
                          className="card-input-element d-none"
                          checked={option.Selected}
                          onChange={() => this.handleWorldTruthSelector(option)}
                        ></input>
                        <div className="card card-body d-flex flex-row justify-content-between align-items-center">
                          <div className="truth-card">
                            <p className="truth">{option.Description}</p>
                            <ul>
                              {(option.Subtable || []).map(subOption => (
                                <li>
                                  <label>
                                    <input
                                      key={UniqueKeyGenerator.generate()}
                                      className="card-input-element d-none"
                                      type="checkBox"
                                      checked={subOption.Selected}
                                      onChange={() => this.handleWorldTruthSelector(subOption)}/>
                                    <span>- {subOption.Description}</span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                            <p className="quest-starter mb-4">
                              <span className="modesto">Quest Starter: </span>
                              {option['Quest Starter']}
                            </p>
                          </div>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
                <React.Fragment>
                  <div className="card card-body mt-4 world-card">
                    <span className="modesto">Custom Truth:</span>
                    <textarea
                      className="form-control"
                      rows="15"
                      value={truth.Options.find(option => option.Custom === true)?.Description || ''}
                      onChange={e => this.handleWorldTruthCustomOption(truth, 'Description', e.target.value)}
                    ></textarea>
                    <span className="modesto mt-3">Custom Quest Starter:</span>
                    <textarea
                      className="form-control"
                      value={truth.Options.find(option => option.Custom === true)?.['Quest Starter'] || ''}
                      onChange={e => this.handleWorldTruthCustomOption(truth, 'Quest Starter', e.target.value)}
                    ></textarea>
                  </div>
                </React.Fragment>
              </Tab>
            ))}
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default World;
