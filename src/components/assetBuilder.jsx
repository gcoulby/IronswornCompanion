import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AssetCard from "./assetCard";
import TitleBlock from "./titleBlock";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

import ComboBox from "./icons";
class AssetBuilder extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="alert alert-secondary print-hide">
          This page is still under development. It is not yet possible to
          add/edit assets and tracks have not yet been implemented.
        </div>
        <h1 className="print-hide">Asset Builder</h1>
        <div className="row print-hide">
          {/* <div className="col-3"> */}
          <AssetCard asset={this.props.assets[0]} />
          {/* </div> */}
          <div className="col">
            <input id="id" type="hidden" />
            <div className="alert alert-secondary">
              Select an asset for editing from the drop down box or create a new
              asset from scratch. Assets should have a unique name, if you
              select an asset to edit, but then change the name, a new asset
              will be created with that name. Use this method to create modified
              asset variants
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">
                  Select Existing Asset
                </label>
              </div>

              <select
                className="form-control"
                onChange={(e) => this.props.onSelectedAssetChange(e)}
                value={
                  this.props.selectedAsset ? this.props.selectedAsset.id : -1
                }
              >
                <option val="">Select Asset</option>
                {this.props.assets.map((a) => (
                  <option value={a.id}>
                    {a.core ? "(Core)" : React.Fragment} {a.Name}
                  </option>
                ))}
              </select>
            </div>

            <Tabs defaultActiveKey="header" id="uncontrolled-tab-example">
              <Tab eventKey="header" title="Header">
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
                          placeholder="Asset Type"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          // value={this.props.newProgression.text}
                          // onChange={(e) =>
                          //   this.props.onNewProgressionTextChanged(
                          //     e,
                          //     this.props.newProgression.type
                          //   )
                          // }
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">Title</label>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Asset Title"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          // value={this.props.newProgression.text}
                          // onChange={(e) =>
                          //   this.props.onNewProgressionTextChanged(
                          //     e,
                          //     this.props.newProgression.type
                          //   )
                          // }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label className="btn btn-dark btn-tag">Icon</label>
                    </div>
                    {ComboBox()}
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Icon (see documentation for more info)"
                      aria-label="Name"
                      aria-describedby="basic-addon2"
                      // value={this.props.newProgression.text}
                      // onChange={(e) =>
                      //   this.props.onNewProgressionTextChanged(
                      //     e,
                      //     this.props.newProgression.type
                      //   )
                      // }
                    /> */}
                  </div>
                  {/* <div className="alert alert-secondary">
                    Icon classes can be found at{" "}
                    <a
                      href="https://fontawesome.com/icons?d=gallery&p=2&m=free"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FontAwesome
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://nagoshiashumari.github.io/Rpg-Awesome/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RPG-Awesome
                    </a>
                    . Please declare full class names and the assosciate
                    library. For example, Font Aweome have several libraries.
                    For the Icon <b>address-book</b> from the <b>Regular</b>{" "}
                    library, enter <b>far fa-address-book</b> into the icon
                    class box, where <b>far</b> defines the library and{" "}
                    <b>fa-address-book</b> defines the icon. Similarly, for
                    RPG-Awesome fonts, enter <b>ra ra-crossed-axes</b> where{" "}
                    <b>ra</b> defines the library and <b>ra-crossed-axes</b>{" "}
                    defines the icon.
                  </div> */}
                </div>
              </Tab>
              <Tab eventKey="additional-info" title="Additional Info">
                <div className="container mt-4">
                  <div className="row">
                    <div className="col">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">
                            Description
                          </label>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description (optional)"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          // value={this.props.newProgression.text}
                          // onChange={(e) =>
                          //   this.props.onNewProgressionTextChanged(
                          //     e,
                          //     this.props.newProgression.type
                          //   )
                          // }
                        />
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label className="btn btn-dark btn-tag">
                                Input Title 1
                              </label>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User Input Title"
                              aria-label="Name"
                              aria-describedby="basic-addon2"
                              // value={this.props.newProgression.text}
                              // onChange={(e) =>
                              //   this.props.onNewProgressionTextChanged(
                              //     e,
                              //     this.props.newProgression.type
                              //   )
                              // }
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label className="btn btn-dark btn-tag">
                                Input Text 1
                              </label>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User Input Text"
                              aria-label="Name"
                              aria-describedby="basic-addon2"
                              // value={this.props.newProgression.text}
                              // onChange={(e) =>
                              //   this.props.onNewProgressionTextChanged(
                              //     e,
                              //     this.props.newProgression.type
                              //   )
                              // }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label className="btn btn-dark btn-tag">
                                Input Title 2
                              </label>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User Input Title"
                              aria-label="Name"
                              aria-describedby="basic-addon2"
                              // value={this.props.newProgression.text}
                              // onChange={(e) =>
                              //   this.props.onNewProgressionTextChanged(
                              //     e,
                              //     this.props.newProgression.type
                              //   )
                              // }
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label className="btn btn-dark btn-tag">
                                Input Text 2
                              </label>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User Input Text"
                              aria-label="Name"
                              aria-describedby="basic-addon2"
                              // value={this.props.newProgression.text}
                              // onChange={(e) =>
                              //   this.props.onNewProgressionTextChanged(
                              //     e,
                              //     this.props.newProgression.type
                              //   )
                              // }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="abilities" title="Abilities">
                <div className="container mt-4">
                  <div className="row border-left pl-2 mb-2">
                    {/* <span class="bg-dark text-light p-2 modesto">Level 1</span> */}
                    <div className="container">
                      <div className="row">
                        <div className="col-8">
                          <div className="input-group mb-1">
                            <div className="input-group-prepend">
                              <label className="btn btn-dark btn-tag">
                                Ability 1
                              </label>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Title (Optional)"
                              aria-label="Name"
                              aria-describedby="basic-addon2"
                              // value={this.props.newProgression.text}
                              // onChange={(e) =>
                              //   this.props.onNewProgressionTextChanged(
                              //     e,
                              //     this.props.newProgression.type
                              //   )
                              // }
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <input
                            type="checkbox"
                            //   name="cb"
                            id="cb_ability1"
                            // checked={d.active}
                            // onChange={(e) =>
                            //   this.props.onDebilityChange(e, d.name)
                            // }
                          />
                          <label htmlFor={`cb_ability1`}>Checked</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <textarea
                            className="form-control mb-3"
                            placeholder="Ability 1 Text"
                            rows="3"
                            //   value={this.state.additionalInfo}
                            //   onChange={(e) => this.handleOnAdditionalInfoChanged(e)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row border-left pl-2 mb-2">
                    {/* <span class="bg-dark text-light p-2 modesto">Level 1</span> */}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <label className="btn btn-dark btn-tag">
                          Ability 2
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title (Optional)"
                        aria-label="Name"
                        aria-describedby="basic-addon2"
                        // value={this.props.newProgression.text}
                        // onChange={(e) =>
                        //   this.props.onNewProgressionTextChanged(
                        //     e,
                        //     this.props.newProgression.type
                        //   )
                        // }
                      />
                    </div>
                    <textarea
                      className="form-control mb-3"
                      placeholder="Ability 2 Text"
                      rows="2"
                      //   value={this.state.additionalInfo}
                      //   onChange={(e) => this.handleOnAdditionalInfoChanged(e)}
                    ></textarea>
                  </div>

                  <div className="row border-left pl-2 mb-2">
                    {/* <span class="bg-dark text-light p-2 modesto">Level 1</span> */}
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <label className="btn btn-dark btn-tag">
                          Ability 3
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title (Optional)"
                        aria-label="Name"
                        aria-describedby="basic-addon2"
                        // value={this.props.newProgression.text}
                        // onChange={(e) =>
                        //   this.props.onNewProgressionTextChanged(
                        //     e,
                        //     this.props.newProgression.type
                        //   )
                        // }
                      />
                    </div>
                    <textarea
                      className="form-control mb-3"
                      placeholder="Ability 3 Text"
                      rows="2"
                      //   value={this.state.additionalInfo}
                      //   onChange={(e) => this.handleOnAdditionalInfoChanged(e)}
                    ></textarea>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="track" title="Track">
                <div className="container mt-4">
                  <div className="row">
                    <div className="col">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">
                            Track Type
                          </label>
                        </div>

                        <select className="form-control">
                          <option val="0">None</option>
                          <option val="1">Numbers</option>
                          <option val="2">List</option>
                        </select>
                      </div>
                      <div className="input-group mb-3"></div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div id="assetCards" className="print-hide mb-5">
          <TitleBlock title="Asset Deck" />
          <div className="alert alert-secondary">
            Use this section to print cards
          </div>
          <a
            class="print-hide btn btn-dark"
            href="javascript:window.print();"
            title="Print"
          >
            Print Cards
          </a>
        </div>
        {this.props.assets.map((a) => (
          <AssetCard asset={a} />
        ))}

        <div class="page-break"></div>

        {/* </div> */}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default AssetBuilder;
