import React, { Component } from "react";
class TitleBlock extends Component {
  render() {
    return (
      <div className="row text-uppercase">
        <div className="col">
          <h4 className="mt-5 stat-title">
            <span className="stat-title-s">{this.props.title}</span>
          </h4>
        </div>
      </div>
    );
  }
}

export default TitleBlock;
