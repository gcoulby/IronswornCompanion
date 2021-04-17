import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
import { HashRouter, Link } from "react-router-dom";
import NavMenu from "./nav_menu";
class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav id="sidebar" className="print-hide">
          <NavMenu />
        </nav>
      </React.Fragment>
    );
  }
}

export default Sidebar;
