import React, { Component } from "react";
import DangerButton from "./dangerButton";
import TitleBlock from "./titleBlock";
class Inventory extends Component {
  state = {};
  handleAddNewItem = () => {
    const newItem = this.props.newItem;
    const players = this.props.players.map((p) => {
      if (p.selected) {
        p.inventory.push({
          id: newItem.NextId,
          Name: newItem.Name,
          Description: newItem.Description,
        });
        newItem.Name = "";
        newItem.Description = "";
        newItem.NextId = newItem.NextId + 1;
      }
      return p;
    });
    this.setState({ players });
  };

  handleOnNewItemTextChanged = (evt, field) => {
    const newItem = this.props.newItem;
    newItem[field] = evt.target.value;
    this.setState({ newItem });
  };

  handleOnItemDeleted = (id) => {
    const players = this.props.players.map((p) => {
      if (p.selected) {
        let pos = -1;
        for (let i = 0; i < p.inventory.length; i++) {
          let item = p.inventory[i];
          if (item.id === id) {
            pos = i;
          }
        }
        if (pos != -1) p.inventory.splice(pos, 1);
      }
      return p;
    });

    this.setState({ players });
  };

  handleOnItemPropertyChanged = (evt, id, field) => {
    const players = this.props.players.map((p) => {
      if (p.selected) {
        p.inventory.map((item) => {
          if (item.id == id) {
            item[field] = evt.target.value;
          }
        });
      }
      return p;
    });
    this.setState({ players });
  };

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Inventory</h1>
        <div className="alert alert-secondary">
          <p>
            Inventory management is not a feature of Ironsworn. The tracking of food supplies or ammunition is simply
            done by your supply track, with the track is high your character is prepared for a situation and when it is
            low they are unprepared.
          </p>
          <p>
            Inventory is included here as a generic tracker to manage objects of value you may find on your journeys
            through the Ironlands. This may be a unique weapon needed to defeat a deadly foe. It could be tradable items
            used to curry favour or amass fortune as a fortune hunter. How you use this is up to you, but it serves only
            to enhance fiction and does not provide mechanical benefit to your game.
          </p>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Name</label>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Item Name"
                aria-label="Name"
                aria-describedby="basic-addon2"
                value={this.props.newItem.Name}
                onChange={(e) => this.handleOnNewItemTextChanged(e, "Name")}
              />
            </div>

            <span className="modesto mt-2">Additional Details:</span>
            <textarea
              type="text"
              className="form-control"
              placeholder="Description"
              aria-label="Name"
              aria-describedby="basic-addon2"
              rows="4"
              value={this.props.newItem.Description}
              onChange={(e) => this.handleOnNewItemTextChanged(e, "Description")}
            ></textarea>

            <button className="btn btn-dark" type="button" onClick={() => this.handleAddNewItem()}>
              <i className="fas fa-plus" aria-hidden="true"></i>
              &nbsp;Add Item
            </button>
          </div>
        </div>
        <TitleBlock title={`OWNED ITEMS`} />
        <div className="row">
          {this.props.selectedPlayer.inventory
            ? this.props.selectedPlayer.inventory.map((item) => (
                <div className="col-4">
                  <div className="card my-3">
                    <div className="card-header text-light bg-dark">
                      <div className="row">
                        <div className="col-8">
                          <h6>Item</h6>
                        </div>
                        <div className="col-4 text-right">
                          <DangerButton
                            buttonText="Delete"
                            additionalButtonClasses="pt-2 pb-2"
                            iconClass="fas fa-times"
                            onDangerClick={this.handleOnItemDeleted}
                            deleteId={item.id}
                            deleteMessage="Are you sure you want to delete this item?"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <label className="btn btn-dark btn-tag">Name</label>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          aria-label="Name"
                          aria-describedby="basic-addon2"
                          value={item.Name}
                          onChange={(e) => this.handleOnItemPropertyChanged(e, item.id, "Name")}
                        />
                      </div>

                      <span className="modesto mt-2">Additional Details:</span>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        aria-label="Name"
                        aria-describedby="basic-addon2"
                        rows="4"
                        value={item.Description}
                        onChange={(e) => this.handleOnItemPropertyChanged(e, item.id, "Description")}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))
            : React.Fragment}
        </div>
      </React.Fragment>
    );
  }
}

export default Inventory;
