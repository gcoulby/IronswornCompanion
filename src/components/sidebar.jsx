import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
import { HashRouter, Link } from "react-router-dom";
class Sidebar extends Component {
  state = {
    baseUrl: "/Ironsworn",
    sections: [
      {
        title: "Campaign",
        pages: [
          // {
          //   url: "/",
          //   pageName: "Campaign Overview",
          //   icon: "fas fa-book",
          //   active: false,
          // },
          {
            url: "/characters",
            pageName: "Characters",
            icon: "fas fa-users",
            active: false,
          },
          {
            url: "/log",
            pageName: "Campaign Log",
            icon: "fas fa-pen-nib",
            active: false,
          },
          {
            url: "/world",
            pageName: "World Truths",
            icon: "fas fa-globe-americas",
            active: false,
          },
          {
            url: "/npcs",
            pageName: "NPCs",
            icon: "fas fa-id-badge",
            active: false,
          },
          {
            url: "/locations",
            pageName: "Locations and Settlements",
            icon: "fas fa-map-signs",
            active: false,
          },
          {
            url: "/enter-the-fray",
            pageName: "Enter the Fray",
            icon: "fas fa-fist-raised",
            active: false,
          },
          // {
          //   url: "/gallery",
          //   pageName: "Gallery",
          //   icon: "fas fa-images",
          //   active: false,
          // },
          // {
          //   url: "/epilogue",
          //   pageName: "Epilogue",
          //   icon: "fas fa-pencil-alt",
          //   active: false,
          // },
        ],
      },
      {
        title: "Character",
        pages: [
          {
            url: "/background",
            pageName: "Background",
            icon: "fas fa-address-card",
            active: false,
          },
          {
            url: "/stats",
            pageName: "Stats",
            icon: "fas fa-heartbeat",
            active: false,
          },
          {
            url: "/vows",
            pageName: "Vows",
            icon: "fas fa-comment",
            active: false,
          },
          {
            url: "/quests",
            pageName: "Quests",
            icon: "fas fa-scroll",
            active: false,
          },
          {
            url: "/journeys",
            pageName: "Journeys",
            icon: "fas fa-hiking",
            active: false,
          },
          // {
          //   url: "/delve",
          //   pageName: "Delve",
          //   icon: "fas fa-dungeon",
          //   active: false,
          // },
          // {
          //   url: "/companions",
          //   pageName: "Companions",
          //   icon: "fab fa-sticker-mule",
          //   active: false,
          // },
          // {
          //   url: "/bonds",
          //   pageName: "Bonds",
          //   icon: "fab fa-hubspot",
          //   active: false,
          // },
          // {
          //   url: "/goals",
          //   pageName: "Goals",
          //   icon: "fas fa-crown",
          //   active: false,
          // },
          {
            url: "/assets",
            pageName: "Assets",
            icon: "fas fa-toolbox",
            active: false,
          },
        ],
      },
      {
        title: "Tools and Information",
        pages: [
          {
            url: "/oracle-editor",
            // title: <h6 className="menu-title">Tools</h6>,
            pageName: "Oracles",
            icon: "game-icon game-icon-crystal-ball icon-md",
            active: false,
          },
          {
            url: "/asset-builder",
            pageName: "Asset Builder",
            icon: "fab fa-buffer",
            active: false,
          },
          {
            url: "/roll",
            pageName: "Roll",
            icon: "fas fa-dice-d20",
            active: false,
          },
          {
            url: "/acknowledgements",
            pageName: "Acknowledgements",
            icon: "fas fa-thumbs-up",
            active: false,
          },
          {
            url: "/documentation",
            pageName: "Documentation",
            icon: "fas fa-book",
            active: false,
          },
          {
            url: "/data-management",
            pageName: "Data Management",
            icon: "fas fa-save",
            active: false,
          },
        ],
      },
    ],
  };

  render() {
    return (
      <React.Fragment>
        <nav id="sidebar" className="print-hide">
          <ul>
            <HashRouter basename="/">
              {this.state.sections.map((section) => {
                return (
                  <li
                    key={UniqueKeyGenerator.generate("section")}
                    className="sidebarGroup"
                  >
                    <h6 className="menu-title">{section.title}</h6>
                    <ul>
                      {section.pages.map((page) => (
                        <li
                          key={UniqueKeyGenerator.generate("page")}
                          className={`${page.active ? "active" : ""}`}
                        >
                          {page.title}
                          <Link to={page.url}>
                            <i
                              className={`menu-icon ${page.icon}`}
                              aria-hidden="true"
                            ></i>
                            &nbsp;{page.pageName}
                          </Link>
                          {/* <a
                          href={page.url}
                          onClick={this.state.onPageChange}
                        >
                          <i
                            className={`menu-icon ${page.icon}`}
                            aria-hidden="true"
                          ></i>

                          {page.pageName}
                          <span className="sr-only">(current)</span>
                        </a> */}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </HashRouter>
            <li className="credit">
              This companion is an unofficial product building to support the
              table top game Ironsworn, developed by Shawn Tomkin
              <a
                className="btn btn-outline-light m-2"
                href="https://www.ironswornrpg.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                @ironswornrpg
              </a>
              <br />
              It is distributed for free under the
              Attribution-NonCommercial-ShareAlike 4.0 International license
              <a
                className="m-2"
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg" />
              </a>
            </li>
            ;
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Sidebar;
