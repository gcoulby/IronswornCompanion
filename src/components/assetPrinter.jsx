import React, { Component } from "react";
class AssetPrinter extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <a className="print-hide btn btn-success" href="javascript:window.print();" title="Print">
          Print Cards
        </a>
      </React.Fragment>
    );
  }
}

export default AssetPrinter;
