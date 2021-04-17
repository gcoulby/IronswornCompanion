import React, { Component } from "react";
class DenizenMatrix extends Component {
  state = {};
  render() {
    console.log(this.props.denizens);
    return (
      <React.Fragment>
        <div className="row denizen-matrix">
          {this.props.denizens.map((d) => (
            <div className="col-4">
              <div className="row">
                <div className="col-6 denizen-matrix-rank">{d.Rank}</div>
                <div className="col-6 denizen-matrix-chance">
                  {d.Min} {d.Min != 100 ? <React.Fragment>- {d.Max}</React.Fragment> : React.Fragment}
                </div>
              </div>
              <div className="row">
                <div className="col denizen-matrix-name"> {d.denizen.Name}</div>
              </div>
              <div className="row">
                <div className="col denizen-matrix-source">
                  {d.denizen.Source.Name} (Page {d.denizen.Source.Page})
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default DenizenMatrix;
