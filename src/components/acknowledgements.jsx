import React, { Component } from "react";
import TitleBlock from "./titleBlock";
import gclogo from "../img/gc_logoai.png";
class Acknowledgements extends Component {
  state = {
    contributors: [
      {
        contributor: "Shawn Tomkin",
        contribution:
          "Without Shawn's work none of this could be possible.  When reading the game, you realise the care, effort and devotion that has gone in to creating this game and yet, the game is released as open-source under the creative commons 4.0. True Legend!",
        url: "https://www.ironswornrpg.com/",
      },
      {
        contributor: "Josiah Van Egmond",
        contribution:
          "The coloured version of the map was created by Josiah Van Egmond from Black Hawk Cartography (who make some amazing maps I might add). Additional thanks to Shawn Tomkin for providing me with explicit permission to use this image outside of the CC4.0 license.",
        url: "https://www.blackhawkcartography.com/",
      },
      {
        contributor: "RSEK",
        contribution:
          "RSEK provided continued support and feedback throughout development and their Datasworn repository was used to build the core assets in this companion.",
        url: "https://github.com/rsek",
      },
      {
        contributor: "Eric Bright",
        contribution:
          "To provide more variety and options when rolling on oracle tables, Eric's expanded oracles were used to populate the core oracle tables",
        url: "https://www.drivethrurpg.com/browse/pub/8584/Eric-Bright",
      },
      {
        contributor: "Delapouite & Lorc",
        contribution:
          "The icons used at Game-Icons.net are fundamental for achieving the Ironsworn look-and-feel. Therefore the icon selector for asset creation is driven by Game-Icons.net fonts.",
        url: "https://game-icons.net/",
      },
      {
        contributor: "Kyle Kemp",
        contribution:
          "To integrate the Game-Icons.net icons into the application, Kyle's game-icons.net web-font was used, which was evidently inspired by FontAwesome.",
        url: "https://seiyria.com/gameicons-font/",
      },
      {
        contributor: "Ghost225",
        contribution:
          "Ghost provided continued support, feedback, feature suggestions and testing throughout the development",
        url: "https://github.com/ghost225",
      },
      {
        contributor: "nomadsoul1",
        contribution:
          "Credit goes to NOMADSOUL1 from freepik for the homepage image. The colour image was filtered to get the same look and feel as the Ironsworn book.",
        url: "https://www.freepik.com/nomadsoul1",
      },
      {
        contributor: "Online Web Fonts",
        contribution:
          "Modesto font made from Online Web Fonts licensed by CC BY 3.0",
        url: "http://www.onlinewebfonts.com",
      },
    ],
  };

  render() {
    return (
      <React.Fragment>
        <h1>Acknowledgements</h1>
        <TitleBlock title="License" />
        To honour the labour of love created by Shawn, this companion is
        distributed (for free) under the same International
        Attribution-NonCommercial-ShareAlike 4.0 license as the official{" "}
        <span className="modesto">Ironsworn</span> game. This companion could
        not exist without Shawn's work and since his game is distributed for
        free it seemed only right to do the same with the companion. The images,
        icons and maps used in this companion are provided from different
        authors (See Contributors below). Consequently, they are{" "}
        <strong>NOT</strong> covered by the same ShareAlike 4.0 license
        <br />
        <br />
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg" />
        </a>
        <div className="alert alert-secondary mt-4">
          As part of the Attribution-NonCommercial-ShareAlike 4.0 license: any
          forks of this application must only build upon this page. No
          attributions may be taken away from this page without expressed
          written permission. This page must be included in any derivative works
          and may not be 'hidden' from view.
        </div>
        <TitleBlock title="Contributors" />
        There were several content developers from the{" "}
        <span className="modesto">Ironsworn</span> community that deserve an
        honourable mention here. During the creation of this companion the
        following people provided direct or indirect support to this app.
        <table className="table table-striped mt-4">
          <thead>
            <th>Contributor</th>
            <th>Contribution</th>
            <th>URL</th>
          </thead>
          <tbody>
            {this.state.contributors.map((c) => (
              <tr>
                <td>
                  <h6>{c.contributor.toUpperCase()}</h6>
                </td>
                <td>{c.contribution}</td>
                <td>
                  <a href={c.url} target="_blank" rel="noreferrer noopener">
                    {c.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TitleBlock title="Developer" />
        This app was created by Graham Coulby to serve as a holistic digital
        companion for the <span className="modesto">Ironsworn</span> tabletop
        RPG. This app was not designed to replace the official rules nor was it
        designed to superseed the work done by Shawn Tomkin.
        <br />
        <br />
        <a href="https://grahamcoulby.co.uk/">
          <img
            src={gclogo}
            alt="img"
            // style="zoom:50%;"
          />
        </a>
      </React.Fragment>
    );
  }
}

export default Acknowledgements;
