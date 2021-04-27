import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import DefaultFoe from "../models/defaultFoe";
import FoeCard from "./foeCard";
import IconPicker from "./iconPicker";
import TitleBlock from "./titleBlock";
import _, { last } from "lodash";
import DangerButton from "./dangerButton";
import ContentEditable from "react-contenteditable";
class FoeEditor extends Component {
  state = {
    printableCards: [],
    ranks: this.props.ranks,
    DefaultFoe: new DefaultFoe(),
    showCards: false,
    showIconPicker: false,
  };

  showCards = (show) => {
    this.setState({ showCards: show });
  };

  setPrintableCardSet(showBacks = true) {
    let cache = [];
    const printableCards = [];
    let foes = [...this.props.foes];
    let remainder = 4 - (foes.length % 4);
    if (remainder < 4) {
      for (let i = 0; i < remainder; i++) {
        foes.push(new DefaultFoe());
      }
    }
    for (let i = 0; i < foes.length; i++) {
      let foe = foes[i];
      let foeBack = { type: foe.Type, front: false };
      cache.push(foeBack);
      printableCards.push(foe);
      if ((i + 1) % 4 == 0) {
        for (let j = 0; j < cache.length; j++) {
          let foeBack = cache[j];
          printableCards.push(foeBack);
        }
        cache = [];
      }
    }

    this.setState({ printableCards });
  }

  handleOnTextInputChange = (evt, field) => {
    const selectedFoe = this.props.selectedFoe;
    selectedFoe[field] = evt.target.value;
    this.setState({ selectedFoe });
    this.editorUpdate();
  };

  handleRowChange = (evt, listType, idx) => {
    const selectedFoe = this.props.selectedFoe;
    selectedFoe[listType][idx] = evt.target.value.replace(/<br>/g, "").replace(/&nbsp;/g, " ");
    this.setState({ selectedFoe });
  };

  handleOnIconPickerToggle = (show) => {
    this.setState({ showIconPicker: show });
  };

  handleOnIconSelect = (iconClass) => {
    const selectedFoe = this.props.selectedFoe;
    selectedFoe.icon = iconClass;
    this.setState({ selectedFoe });
    this.handleOnIconPickerToggle(false);
  };

  handleThemeTagChange = (evt, id, tag) => {
    const selectedFoe = this.props.selectedFoe;

    if (evt.target.checked) {
      selectedFoe.Tags.push(tag);
    } else {
      selectedFoe.Tags = selectedFoe.Tags.filter((t) => t != tag);
    }
    selectedFoe.Tags = [...new Set(selectedFoe.Tags)];
    this.setState({ selectedFoe });
    this.editorUpdate();
  };

  getUserFoeId(name) {
    return `user-${name.toLowerCase().replace(" ", "-")}`;
  }

  handleOnAddFoe = () => {
    const foes = this.props.foes;
    let foe = { ...this.props.selectedFoe };
    foe.id = this.getUserFoeId(foe.Name);
    foe.core = false;
    foe.Source.Name = "User";
    foe.Source.Page = "n/a";
    foes.push(foe);
    this.setState({ foes });
    this.props.onSelectedFoeChange(foe.id);
    this.editorUpdate();
  };

  handleOnSaveChanges = () => {
    const foes = this.props.foes;
    for (let i = 0; i < foes.length; i++) {
      const foe = foes[i];
      if (foe.id === this.props.selectedFoe.id) {
        foes[i] = { ...this.props.selectedFoe };
      }
    }
    this.setState({ foes });
    this.props.onSelectedFoeChange(this.props.selectedFoe.id);
    this.editorUpdate();
  };

  handleOnDeleteUserFoe = () => {
    const foes = this.props.foes;
    let pos = -1;
    for (let i = 0; i < foes.length; i++) {
      let a = foes[i];
      if (a.id === this.props.selectedFoe.id) {
        pos = i;
      }
    }

    if (pos != -1) foes.splice(pos, 1);
    this.setState({ foes });
    this.props.onSelectedFoeChange("");
    this.editorUpdate();
  };

  componentDidMount() {
    this.editorUpdate();
  }
  handlePrint() {
    window.print();
  }

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  editorUpdate = () => {
    this.showCards(false);
    this.setPrintableCardSet();
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="print-hide">Foe Editor</h1>
        <div className="row print-hide">
          <FoeCard static={true} foe={this.props.selectedFoe} />
          <div className="col">
            <input id="id" type="hidden" />

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Select Existing Foe</label>
              </div>

              <select
                className="form-control"
                onChange={(e) => this.props.onSelectedFoeChange(e.target.value, this.props.selectedFoe.Type)}
                value={this.props.selectedFoe ? this.props.selectedFoe.id : -1}
              >
                <option key={`delve_card_selector_noid`} val="">
                  Select Foe
                </option>
                {this.props.foes.map((d) => (
                  <option key={`delve_card_selector_type_${d.Type}_id_${d.id}`} value={d.id}>
                    {d.core ? "(Core)" : React.Fragment} {d.Type} | {d.Name}
                  </option>
                ))}
              </select>
            </div>

            {/*  Cannot add if Name is blank, 
                Can only save changes if the selected foes is not a core Foe, the Foe Name
                cannot be different to the previous version, and the at least on other field
                must be different to the previous version
                */}
            <div id="assetBuilderControls" className="mb-4">
              {this.props.selectedFoe.Name === "" ||
              this.props.selectedFoe.core ||
              this.props.selectedFoe.id === -1 ||
              this.props.selectedFoe.id === "" ||
              this.props.selectedFoe.id !== this.getUserFoeId(this.props.selectedFoe.Name) ||
              _.isEqual(this.props.selectedFoe, this.state.defaultAsset) ||
              _.isEqual(
                this.props.selectedFoe,
                this.props.foes.find((a) => a.id === this.props.selectedFoe.id)
              ) ? (
                React.Fragment
              ) : (
                <React.Fragment>
                  <button className="btn btn-dark" onClick={() => this.handleOnSaveChanges()}>
                    <i className="fas fa-save"></i> Save Changes
                  </button>
                </React.Fragment>
              )}

              {/* Cannot add if Name is blank, Cannot add asset if selected asset is core asset. Cannot add if an asset exists with same name
              cannot add if the asset is same as default asset (ie no changes) cannot add if asset with same id already exists 
              add button is not shown when modifying an existing asset - copy shown instead*/}
              {this.props.selectedFoe.Name === "" ||
              this.props.selectedFoe.core ||
              this.props.selectedFoe.id === -1 ||
              this.props.selectedFoe.id != "" ||
              this.props.foes.find((a) => a.Name === this.props.selectedFoe.Name) != null ||
              _.isEqual(this.props.selectedFoe, this.state.defaultAsset) ||
              _.isEqual(
                this.props.selectedFoe,
                this.props.foes.find((a) => a.id === this.props.selectedFoe.id)
              ) ? (
                React.Fragment
              ) : (
                <React.Fragment>
                  <button className="btn btn-dark" onClick={() => this.handleOnAddFoe()}>
                    <i className="fas fa-plus"></i> Add Delve Card
                  </button>
                </React.Fragment>
              )}

              {/* Name cannot be blank, Cannot copy asset that does not exist 
              No asset can be selected              
              */}
              {this.props.selectedFoe.Name === "" ||
              this.props.selectedFoe.id === -1 ||
              this.props.selectedFoe.id === "" ||
              this.props.foes.find((a) => a.Name === this.props.selectedFoe.Name) != null ? (
                React.Fragment
              ) : (
                <React.Fragment>
                  <button className="btn btn-dark ml-2" onClick={() => this.handleOnAddFoe()}>
                    <i className="fas fa-copy"></i> Save As Copy
                  </button>
                </React.Fragment>
              )}

              {/* Delete Button not available on new foes or core foes */}
              {this.props.selectedFoe.core || this.props.selectedFoe.id === -1 || this.props.selectedFoe.id === "" ? (
                React.Fragment
              ) : (
                <React.Fragment>
                  <DangerButton
                    buttonText="Delete Asset"
                    additionalButtonClasses="ml-2"
                    iconClass="fas fa-times"
                    onDangerClick={this.handleOnDeleteUserFoe}
                    deleteMessage="Are you sure you want to delete this asset?"
                  />
                </React.Fragment>
              )}
            </div>

            <Tabs defaultActiveKey="header" id="uncontrolled-tab-example">
              <Tab key="headertab" eventKey="header" title="Header">
                <div className="container">
                  <div className="row mt-4">
                    <div className="col">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">Type</label>
                        </div>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Foe Type"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          value={this.props.selectedFoe.Type}
                          onChange={(e) => this.handleOnTextInputChange(e, "Type")}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">Name</label>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Foe Name"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          value={this.props.selectedFoe.Name}
                          onChange={(e) => this.handleOnTextInputChange(e, "Name")}
                        />
                      </div>
                      <div className="input-group mt-3 mb-2">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">Difficulty</label>
                        </div>
                        <select
                          className="form-control"
                          onChange={(e) => this.handleOnTextInputChange(e, "Rank")}
                          value={this.props.selectedFoe.Rank}
                        >
                          {this.state.ranks.map((r, i) => (
                            <option key={`foe_rank_${i}`} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="modesto mt-3">DESCRIPTION</span>
                      <div className="input-group mb-3">
                        {/* <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">Summary</label>
                        </div> */}
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Foe Description"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          rows="6"
                          value={this.props.selectedFoe.Description}
                          onChange={(e) => this.handleOnTextInputChange(e, "Description")}
                        />
                      </div>
                      <span className="modesto mt-3">Quest</span>
                      <div className="input-group mb-3">
                        {/* <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">Summary</label>
                        </div> */}
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Foe Quest"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          rows="4"
                          value={this.props.selectedFoe.Quest}
                          onChange={(e) => this.handleOnTextInputChange(e, "Quest")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <button className="btn btn-dark" onClick={() => this.handleOnIconPickerToggle(true)}>
                        <i className="fas fa-eye-dropper"></i>&nbsp; Icon Picker
                      </button>
                    </div>
                    {/* {ComboBox(this.props.selectedFoe, this.handleOnIconInputChange)} */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Foe Icon"
                      aria-label="Icon"
                      aria-describedby="basic-addon2"
                      value={this.props.selectedFoe.icon}
                      onChange={(e) => this.handleOnTextInputChange(e, "icon")}
                    />
                  </div>
                  <IconPicker
                    show={this.state.showIconPicker}
                    onClose={this.handleOnIconPickerToggle}
                    onIconSelect={this.handleOnIconSelect}
                  />
                  {/* {this.props.selectedFoe.core ? ( */}
                  <React.Fragment>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="btn btn-dark btn-tag">Source</label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Source"
                        aria-label="Name"
                        disabled
                        aria-describedby="basic-addon2"
                        value={this.props.selectedFoe.Source.Name}
                        // onChange={(e) => this.handleOnTextInputChange(e, "Source")}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="btn btn-dark btn-tag">Page</label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Source Page"
                        aria-label="source page"
                        disabled
                        aria-describedby="basic-addon2"
                        value={this.props.selectedFoe.Source.Page}
                        // onChange={(e) => this.handleOnTextInputChange(e, "Source")}
                      />
                    </div>
                  </React.Fragment>
                  {/* ) : (
                    React.Fragment
                  )} */}
                </div>
              </Tab>
              <Tab key="featurestab" eventKey="features" title="Features">
                <table className="table table-striped">
                  <tbody>
                    {this.props.selectedFoe.Features.map((f, i) => {
                      return (
                        <React.Fragment>
                          <tr>
                            <ContentEditable
                              innerRef={this.contentEditable}
                              html={f}
                              disabled={false}
                              onChange={(e) => this.handleRowChange(e, "Features", i)}
                              tagName="td"
                            />
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
              <Tab key="drivestab" eventKey="drives" title="Drives">
                <table className="table table-striped">
                  <tbody>
                    {this.props.selectedFoe.Drives.map((d, i) => {
                      return (
                        <React.Fragment>
                          <tr>
                            <ContentEditable
                              innerRef={this.contentEditable}
                              html={d}
                              disabled={false}
                              onChange={(e) => this.handleRowChange(e, "Drives", i)}
                              tagName="td"
                            />
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
              <Tab key="tacticstab" eventKey="tactics" title="Tactics">
                <table className="table table-striped">
                  <tbody>
                    {this.props.selectedFoe.Tactics.map((t, i) => {
                      return (
                        <React.Fragment>
                          <tr>
                            <ContentEditable
                              innerRef={this.contentEditable}
                              html={t}
                              disabled={false}
                              onChange={(e) => this.handleRowChange(e, "Tactics", i)}
                              tagName="td"
                            />
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </Tab>
              {/* <Tab key="tags" eventKey="tags" title="Tags">
                <div className="row p-4">
                  {this.props.oracles.getOracleTableAsArray("Delve Denizen Tags").map((d) => {
                    return (
                      <React.Fragment>
                        <div className="col-3">
                          <div className="cross-check">
                            <input
                              id={`check_denizen_tag_${d}`}
                              type="checkbox"
                              onChange={(e) => this.handleThemeTagChange(e, this.props.selectedFoe, d)}
                              checked={this.props.selectedFoe.Tags.includes(d)}
                            />
                            <label for={`check_denizen_tag_${d}`} className="pl-4">
                              {d}
                            </label>
                          </div>
                        </div>
                        <br />
                      </React.Fragment>
                    );
                  })}
                </div>
              </Tab> */}
            </Tabs>
          </div>
        </div>

        <div id="assetCards" className="print-hide mb-5 d-none d-lg-block">
          <TitleBlock title="Foe Deck" />
          <div className="alert alert-secondary">
            Use this section to print cards. You MUST click <strong>Show Cards</strong> before clicking{" "}
            <strong>Print Cards</strong>
          </div>

          {this.state.showCards ? (
            <React.Fragment>
              <button className="print-hide btn btn-dark mr-3" onClick={() => this.showCards(false)}>
                <i className="fa fa-eye-slash" aria-hidden="true"></i>&nbsp;Hide Cards
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button className="print-hide btn btn-dark mr-3" onClick={() => this.showCards(true)}>
                <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;Show Cards
              </button>
            </React.Fragment>
          )}

          <a className="print-hide btn btn-dark" title="Print" onClick={() => this.handlePrint()}>
            <i className="fa fa-print" aria-hidden="true"></i>&nbsp; Print Cards
          </a>
        </div>

        {this.state.showCards ? (
          <React.Fragment>
            {this.state.printableCards.map((f, i) => {
              if (f.front && f.Features)
                return (
                  <React.Fragment>
                    {/* {i % 4 == 0 ? <div className="page-break"></div> : React.Fragment} */}
                    <FoeCard foe={f} idx={i % 4} static={true} />
                  </React.Fragment>
                );
              else {
                return (
                  <React.Fragment key={`card_back_${i}`}>
                    <div className={`card foe-card foe-card-back text-center print-show ${`foe-card-${i % 4}`}`}>
                      <h3>IRONSWORN</h3>
                      <div className="foe-icon">
                        <i
                          className={`game-icon game-icon-croc-sword`}
                          // aria-hidden="true"
                        ></i>
                      </div>
                      <div className="hr"></div>

                      <h1 className="mt-5">{f.type}</h1>
                    </div>
                  </React.Fragment>
                );
              }
            })}
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <div className="page-break"></div>
      </React.Fragment>
    );
  }
}

export default FoeEditor;
