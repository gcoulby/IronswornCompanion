import React, { Component } from "react";
import TitleBlock from "./titleBlock";
import gclogo from "../img/gc_logoai.png";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import toc from "remark-toc";
import source from "../LICENSE";
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
        contributor: "RSEK",
        contribution:
          "RSEK provided continued support and feedback throughout development. Their Datasworn repository was used to build the much of the core data in this companion. Their work on the Denizen matrix on Perchance also inspired the design and implementation of Delve in this project. RSEK was a major contributor for this project.",
        url: "https://github.com/rsek",
      },
      {
        contributor: "Josiah Van Egmond",
        contribution:
          "The coloured version of the map was created by Josiah Van Egmond from Black Hawk Cartography (who make some amazing maps I might add). Additional thanks to Shawn Tomkin for providing me with explicit permission to use this image outside of the CC4.0 license.",
        url: "https://www.blackhawkcartography.com/",
      },
      {
        contributor: "Eric Bright",
        contribution:
          "To provide more variety and options when rolling on oracle tables, Eric's expanded oracles were used to populate the core oracle tables. They are used under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 license",
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
        contribution: "Modesto font made from Online Web Fonts licensed by CC BY 3.0",
        url: "http://www.onlinewebfonts.com",
      },
    ],
  };

  componentDidMount() {
    fetch(source)
      .then((res) => res.text())
      .then((post) => this.setState((state) => ({ ...state, post })))
      .catch((err) => console.error(err));
  }

  render() {
    const { post } = this.state;
    return (
      <React.Fragment>
        <h1>Acknowledgements</h1>
        <TitleBlock title="License" />
        <ReactMarkdown source={post} plugins={[gfm, toc]} />
        <TitleBlock title="Contributors" />
        There were several content developers from the <span className="modesto">Ironsworn</span> community that deserve
        an honourable mention here. During the creation of this companion the following people provided direct or
        indirect support to this app.
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
        This app was created by Graham Coulby to serve as a holistic digital companion for the{" "}
        <span className="modesto">Ironsworn</span> tabletop RPG. This app was not designed to replace the official rules
        nor was it designed to superseed the work done by Shawn Tomkin.
        <br />
        <br />
        <a href="https://grahamcoulby.co.uk/" target="_blank" rel="noreferrer noopener">
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
