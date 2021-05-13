import React, { Component } from "react";
class DenizenMatrix extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row denizen-matrix">
          {this.props.denizens.map((d, i) => (
            <div className="col-4">
              <div className="row">
                <div className="col-12 col-lg-6 denizen-matrix-rank text-center text-lg-left">{d.Rank}</div>
                <div className="col-12 col-lg-6 denizen-matrix-chance text-center text-lg-right">
                  {d.Min} {d.Min != 100 ? <React.Fragment>- {d.Max}</React.Fragment> : React.Fragment}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="input-group">
                    {/* <div className="input-group-prepend">
                    <div className="btn btn-dark btn-tag">Select Existing Site</div>
                </div> */}
                    <select
                      className="form-control form-control-sm"
                      value={d.denizen.id}
                      onChange={(e) => this.props.onDenizenChange(e.target.value, i)}
                    >
                      <option value="-1">Select Site</option>
                      {this.props.foes.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col denizen-matrix-name"> {d.denizen.Name}</div>
              </div> */}
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
