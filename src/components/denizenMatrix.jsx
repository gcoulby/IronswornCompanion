import React, { Component } from "react";
class DenizenMatrix extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row denizen-matrix">
          {this.props.denizens.map((d) => (
            <div className="col-4">
              <div className="row">
                <div className="col-12 col-lg-6 denizen-matrix-rank text-center text-lg-left">{d.Rank}</div>
                <div className="col-12 col-lg-6 denizen-matrix-chance text-center text-lg-right">
                  {d.Min} {d.Min != 100 ? <React.Fragment>- {d.Max}</React.Fragment> : React.Fragment}
                </div>
              </div>
              <div className="row">
                <div className="col denizen-matrix-name"> {d.denizen.Name}</div>
              </div>
              <div className="row d-none d-lg-block">
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
