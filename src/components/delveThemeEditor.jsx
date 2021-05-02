import React, { Component } from "react";
import DelveCard from "./delveCard";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import IconPicker from "./iconPicker";
import _, { last } from "lodash";
import DangerButton from "./dangerButton";
import ContentEditable from "react-contenteditable";
import DefaultDelveCard from "../models/defaultDelveCard";
import TitleBlock from "./titleBlock";
class DelveThemeDomainEditor extends Component {
  state = {
    printableCards: [],
    DefaultThemeCard: new DefaultDelveCard("Theme"),
    DefaultDomainCard: new DefaultDelveCard("Domain"),
    showCards: false,
    showIconPicker: false,
  };

  showCards = (show) => {
    this.setState({ showCards: show });
  };

  setPrintableCardSet(showBacks = true) {
    let cache = [];
    const printableCards = [];
    let delveCards = [...this.props.delveCards];
    let remainder = 4 - (delveCards.length % 4);
    if (remainder < 4) {
      for (let i = 0; i < remainder; i++) {
        delveCards.push(new DefaultDelveCard("Theme"));
      }
    }
    for (let i = 0; i < delveCards.length; i++) {
      let delveCard = delveCards[i];
      let delveCardBack = { type: delveCard.Type, front: false };
      cache.push(delveCardBack);
      printableCards.push(delveCard);
      if ((i + 1) % 4 == 0) {
        for (let j = 0; j < cache.length; j++) {
          let delveCardBack = cache[j];
          printableCards.push(delveCardBack);
        }
        cache = [];
      }
    }

    this.setState({ printableCards });
  }

  handleTypeChange = (evt) => {
    const selectedDelveCard = this.props.selectedDelveCard;
    selectedDelveCard.Type = evt.target.value;
    let dc = new DefaultDelveCard(evt.target.value);
    selectedDelveCard.Features = dc.Features;
    selectedDelveCard.Dangers = dc.Dangers;
    this.setState({ selectedDelveCard });
  };

  handleOnTextInputChange = (evt, field) => {
    const selectedDelveCard = this.props.selectedDelveCard;
    selectedDelveCard[field] = evt.target.value;
    this.setState({ selectedDelveCard });
    this.editorUpdate();
  };

  handleRowChange = (evt, listType, idx) => {
    const selectedDelveCard = this.props.selectedDelveCard;
    selectedDelveCard[listType][idx].Description = evt.target.value;
    this.setState({ selectedDelveCard });
  };

  handleOnIconPickerToggle = (show) => {
    this.setState({ showIconPicker: show });
  };

  handleOnIconSelect = (iconClass) => {
    const selectedDelveCard = this.props.selectedDelveCard;
    selectedDelveCard.icon = iconClass;
    this.setState({ selectedDelveCard });
    this.handleOnIconPickerToggle(false);
  };

  handleOnAddDelveCard = () => {
    const delveCards = this.props.delveCards;
    let delveCard = { ...this.props.selectedDelveCard };
    delveCard.id = this.getUserDelveCardId(delveCard.Name);
    delveCard.core = false;
    delveCard.Source.Name = "User";
    delveCard.Source.Page = "n/a";
    delveCard.Tags = [];
    delveCards.push(delveCard);
    this.setState({ delveCards });
    this.props.onSelectedDelveCardChange(delveCard.id);
    this.editorUpdate();
  };

  handleOnSaveChanges = () => {
    const delveCards = this.props.delveCards;
    for (let i = 0; i < delveCards.length; i++) {
      const delveCard = delveCards[i];
      if (delveCard.id === this.props.selectedDelveCard.id) {
        delveCards[i] = { ...this.props.selectedDelveCard };
      }
    }
    this.setState({ delveCards });
    this.props.onSelectedDelveCardChange(this.props.selectedDelveCard.id);
    this.editorUpdate();
  };

  handleOnDeleteUserDelveCard = () => {
    const delveCards = this.props.delveCards;
    let pos = -1;
    for (let i = 0; i < delveCards.length; i++) {
      let a = delveCards[i];
      if (a.id === this.props.selectedDelveCard.id) {
        pos = i;
      }
    }

    if (pos != -1) delveCards.splice(pos, 1);
    this.setState({ delveCards });
    this.props.onSelectedDelveCardChange("");
    this.editorUpdate();
  };

  handleThemeTagChange = (evt, id, tag) => {
    // const delveCards = this.props.delveCards;
    // for (let i = 0; i < delveCards.length; i++) {
    //   const delve = delveCards[i];
    //   if (delve.id === id) {
    //     if (evt.target.checked) {
    //       delveCards[i].Tags.push(tag);
    //     } else {
    //       delveCards[i].Tags = delveCards[i].Tags.filter((t) => t != tag);
    //     }
    //     delveCards[i].Tags = [...new Set(delveCards[i].Tags)];
    //   }
    // }
    // this.setState({ delves: delveCards });

    const selectedDelveCard = this.props.selectedDelveCard;

    if (evt.target.checked) {
      selectedDelveCard.Tags.push(tag);
    } else {
      selectedDelveCard.Tags = selectedDelveCard.Tags.filter((t) => t != tag);
    }
    selectedDelveCard.Tags = [...new Set(selectedDelveCard.Tags)];
    this.setState({ selectedDelveCard });

    // denizenConfig.denizenThemeMap.map((t) => {
    //   if (t.Name === theme.Name) {
    //     if (evt.target.checked) {
    //       t.Tags.push(tag);
    //     } else {
    //       t.Tags = t.Tags.filter((t2) => t2 != tag);
    //     }
    //     t.Tags = [...new Set(t.Tags)];
    //   }
    // });
    // this.setState({ denizenConfig });
  };

  getUserDelveCardId(name) {
    return `user-${name.toLowerCase().replace(" ", "-")}`;
  }

  componentDidMount() {
    this.editorUpdate();
  }
  handlePrint() {
    window.print();
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.onComponentUpdate(prevProps, prevState);
  }

  editorUpdate = () => {
    this.showCards(false);
    this.setPrintableCardSet();
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="print-hide">Delve Card Editor</h1>
        <div className="row print-hide">
          <DelveCard delveCard={this.props.selectedDelveCard} />

          <div className="col">
            <input id="id" type="hidden" />

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Select Existing Delve Card</label>
              </div>

              <select
                className="form-control"
                onChange={(e) =>
                  this.props.onSelectedDelveCardChange(e.target.value, this.props.selectedDelveCard.Type)
                }
                value={this.props.selectedDelveCard ? this.props.selectedDelveCard.id : -1}
              >
                <option key={`delve_card_selector_noid`} val="">
                  Select Delve Card
                </option>
                {this.props.delveCards.map((d) => (
                  <option key={`delve_card_selector_type_${d.Type}_id_${d.id}`} value={d.id}>
                    {d.core ? "(Core)" : React.Fragment} {d.Type} | {d.Name}
                  </option>
                ))}
              </select>
            </div>

            {/*  Cannot add if Name is blank, 
                Can only save changes if the selected delveCards is not a core delveCard, the delveCard Name
                cannot be different to the previous version, and the at least on other field
                must be different to the previous version
                */}
            <div id="assetBuilderControls" className="mb-4">
              {this.props.selectedDelveCard.Name === "" ||
              this.props.selectedDelveCard.core ||
              this.props.selectedDelveCard.id === -1 ||
              this.props.selectedDelveCard.id === "" ||
              this.props.selectedDelveCard.id !== this.getUserDelveCardId(this.props.selectedDelveCard.Name) ||
              _.isEqual(this.props.selectedDelveCard, this.state.defaultAsset) ||
              _.isEqual(
                this.props.selectedDelveCard,
                this.props.delveCards.find((a) => a.id === this.props.selectedDelveCard.id)
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
              {this.props.selectedDelveCard.Name === "" ||
              this.props.selectedDelveCard.core ||
              this.props.selectedDelveCard.id === -1 ||
              this.props.selectedDelveCard.id != "" ||
              this.props.delveCards.find((a) => a.Name === this.props.selectedDelveCard.Name) != null ||
              _.isEqual(this.props.selectedDelveCard, this.state.defaultAsset) ||
              _.isEqual(
                this.props.selectedDelveCard,
                this.props.delveCards.find((a) => a.id === this.props.selectedDelveCard.id)
              ) ? (
                React.Fragment
              ) : (
                <React.Fragment>
                  <button className="btn btn-dark" onClick={() => this.handleOnAddDelveCard()}>
                    <i className="fas fa-plus"></i> Add Delve Card
                  </button>
                </React.Fragment>
              )}

              {/* Name cannot be blank, Cannot copy asset that does not exist 
              No asset can be selected              
              */}
              {this.props.selectedDelveCard.Name === "" ||
              this.props.selectedDelveCard.id === -1 ||
              this.props.selectedDelveCard.id === "" ||
              this.props.delveCards.find((a) => a.Name === this.props.selectedDelveCard.Name) != null ? (
                React.Fragment
              ) : (
                <React.Fragment>
                  <button className="btn btn-dark ml-2" onClick={() => this.handleOnAddDelveCard()}>
                    <i className="fas fa-copy"></i> Save As Copy
                  </button>
                </React.Fragment>
              )}

              {/* Delete Button not available on new delveCards or core delveCards */}
              {this.props.selectedDelveCard.core ||
              this.props.selectedDelveCard.id === -1 ||
              this.props.selectedDelveCard.id === "" ? (
                React.Fragment
              ) : (
                <React.Fragment>
                  <DangerButton
                    buttonText="Delete Asset"
                    additionalButtonClasses="ml-2"
                    iconClass="fas fa-times"
                    onDangerClick={this.handleOnDeleteUserDelveCard}
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

                        <select
                          className="form-control"
                          onChange={(e) => this.handleTypeChange(e)}
                          value={this.props.selectedDelveCard.Type}
                        >
                          <option key={`delve_card_type_selector_theme`} value="Theme">
                            Theme
                          </option>
                          <option key={`delve_card_type_selector_domain`} value="Domain">
                            Domain
                          </option>
                        </select>
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">Name</label>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Card Name"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          value={this.props.selectedDelveCard.Name}
                          onChange={(e) => this.handleOnTextInputChange(e, "Name")}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">Summary</label>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Card Summary"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          value={this.props.selectedDelveCard.Summary}
                          onChange={(e) => this.handleOnTextInputChange(e, "Summary")}
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
                    {/* {ComboBox(this.props.selectedDelveCard, this.handleOnIconInputChange)} */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Card Icon"
                      aria-label="Icon"
                      aria-describedby="basic-addon2"
                      value={this.props.selectedDelveCard.icon}
                      onChange={(e) => this.handleOnTextInputChange(e, "icon")}
                    />
                  </div>
                  <IconPicker
                    show={this.state.showIconPicker}
                    onClose={this.handleOnIconPickerToggle}
                    onIconSelect={this.handleOnIconSelect}
                  />
                  {/* {this.props.selectedDelveCard.core ? ( */}
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
                        value={this.props.selectedDelveCard.Source.Name}
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
                        value={this.props.selectedDelveCard.Source.Page}
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
                    {this.props.selectedDelveCard.Features.map((f, i) => {
                      return (
                        <React.Fragment>
                          <tr>
                            <td width="80">
                              {f.Chance == 99 ? "99" : f.Chance == 100 ? "00" : `${f.Min} - ${f.Chance}`}
                            </td>
                            <ContentEditable
                              innerRef={this.contentEditable}
                              html={f.Description}
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
              <Tab key="dangerstab" eventKey="dangers" title="Dangers">
                <table className="table table-striped">
                  <tbody>
                    {this.props.selectedDelveCard.Dangers.map((d, i) => {
                      return (
                        <React.Fragment>
                          <tr>
                            <td width="80">
                              {d.Chance == 99 ? "99" : d.Chance == 100 ? "00" : `${d.Min} - ${d.Chance}`}
                            </td>
                            <ContentEditable
                              innerRef={this.contentEditable}
                              html={d.Description}
                              disabled={false}
                              onChange={(e) => this.handleRowChange(e, "Dangers", i)}
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
                              onChange={(e) => this.handleThemeTagChange(e, this.props.selectedDelveCard, d)}
                              checked={this.props.selectedDelveCard.Tags.includes(d)}
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
          <TitleBlock title="Delve Card Deck" />
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
            {this.state.printableCards.map((d, i) => {
              if (d.front && d.Features)
                return (
                  <React.Fragment>
                    {/* {i % 4 == 0 ? <div className="page-break"></div> : React.Fragment} */}
                    <DelveCard delveCard={d} idx={i % 4} />
                  </React.Fragment>
                );
              else {
                return (
                  <React.Fragment key={`card_back_${i}`}>
                    <div className={`card delve-card delve-card-back text-center print-show ${`delve-card-${i % 4}`}`}>
                      <h3>DELVE</h3>
                      <div className="delve-icon">
                        <i
                          className={`game-icon game-icon-croc-sword`}
                          // aria-hidden="true"
                        ></i>
                      </div>
                      <div className="hr"></div>

                      <h1 className="mt-5">{d.type}</h1>
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

export default DelveThemeDomainEditor;
