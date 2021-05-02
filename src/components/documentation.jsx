import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import gclogo from "../img/gc_logoai.png";
import gfm from "remark-gfm";
import toc from "remark-toc";
import source from "../README.md";

class Documentation extends Component {
  state = {
    post: null,
  };
  constructor() {
    super();
  }

  componentDidMount() {
    fetch(source)
      .then((res) => res.text())
      .then((post) => this.setState((state) => ({ ...state, post })))
      .catch((err) => console.error(err));
  }

  render() {
    return this.getDocumentationContent();
  }

  getDocumentationContent() {
    const { post } = this.state;
    return (
      <React.Fragment>
        <div className="documentation">
          <ReactMarkdown source={post} plugins={[gfm, toc]} />
        </div>
        {/* <h1 id="ironsworn-companion">Ironsworn Companion</h1>
        <br />
        <br />
        <h2 id="what-is-ironsworn-">What is Ironsworn?</h2>
        <p>
          Ironsworn is a tabletop RPG created by Shawn Tomkin. What makes Ironsworn unique is that unlike traditional
          tabletop RPGs, Ironsworn enables solo/ small-group play, as its unique game mechanics remove the need for a
          traditional game master.
        </p>
        <p>
          What is even more fascinating about Ironsworn is the distribution methods. When reading the game, you realise
          the care, effort and devotion that has gone in to creating this game and yet, the game is released as
          open-source under the creative commons 4.0{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">
            <img
              src="https://camo.githubusercontent.com/bca967b18143b8a5b2ffe78bd4a1a30f6bc21de83bd8336f748e96498af38b38/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d43432532304259253230342e302d6c69676874677265792e737667"
              alt="License: CC BY 4.0"
            />
          </a>
        </p>
        <p>
          Ironsworn truly is a labour of love and is available for free at{" "}
          <a href="https://www.ironswornrpg.com/">https://www.ironswornrpg.com/</a>
        </p>
        <h2 id="what-is-the-ironsworn-companion-">What is the Ironsworn Companion?</h2>
        <p>
          First and foremost, this application is not an official Ironsworn product, instead it leverages the CC4.0
          license to provide a digital toolkit for playing the game.
        </p>
        <p>
          I used to use platforms such as Roll20 for playing campaigns with a remote group of friends. I wanted a
          similar experience from Ironsworn, e.g. a digital companion app that could aid, automate and track my game to
          reduce on paper waste and also provide quick and easy ways to exploit mechanics such as{" "}
          <code>The Oracle</code> <em>(a roll-based game mechanic to spark ideas during game play).</em>
        </p>
        <p>
          While there are various companions out there, I was disappointed with the features and felt they didn&#39;t
          match my view of what the companion should be like. That&#39;s not to say the other apps are bad, but many
          just felt like lightweight tools to support pen and paper play, which is great, if that is what you want.
        </p>
        <p>
          This app is not designed to replace the rules, though it may clear your desk of progress tracks and asset
          cards.
        </p>
        <hr />
        <h1 id="using-the-app">Using the app</h1>
        <p>The following sections will provide instruction on how to use the individual components in the app.</p>
        <hr />
        <h2 id="sections">Sections</h2>
        <p>
          Key areas such as a pages will be shown like this throughout the documentation: <code>Characters</code>,{" "}
          <code>Background</code> etc.
        </p>
        <p>
          At times the documentation will refer to sections. There are three main sections to this app:{" "}
          <code>Header</code>, <code>Sidebar</code> and <code>Footer</code>. These are fairly self explanatory.
        </p>
        <h3 id="header">Header</h3>
        <p>
          The <code>Header</code> refers to the top of the page where the <code>Character Selector</code> and{" "}
          <code>Stat Overview</code> exists.
        </p>
        <p>
          <img src="https://i.imgur.com/RMaRVJB.png" alt="image-20210316092433055" />
        </p>
        <h3 id="sidebar">Sidebar</h3>
        <p>
          The <code>Sidebar</code> refers to the side navigation menu. This section is used for navigating around the
          app.
        </p>
        <p>
          <img src="https://i.imgur.com/WHH1Tc9.png" alt="image-20210316092602896" />
        </p>
        <h3 id="footer">Footer</h3>
        <p>
          The <code>Footer</code> contains a quick dice roller. This can be used to roll on stats with an action dice vs
          two challenge dice. When you click <code>Roll</code> a box will appear that will state either{" "}
          <code>Miss</code>, <code>Weak Hit</code>, or <code>Strong Hit</code>. Hovering over this box will make a
          breakdown of the roll appear in a popup. Progression tracks also make use of this, which we will explore
          later.
        </p>
        <p>
          <img src="https://i.imgur.com/UQCOnvb.png" alt="image-20210316092805822" />
        </p>
        <hr />
        <h2 id="oracles">Oracles</h2>
        <p>
          Before discussing the features of the app its important to understand how the oracle works. Throughout the
          companion you will see the following roll icon in various places:
        </p>
        <p>
          <img src="https://i.imgur.com/JlEztdW.png" alt="image-20210226101636509" />
        </p>
        <p>
          This icon denotes that you can consult the oracle. Each implementation of the oracle differs between pages.
          For example, by consulting the oracle during character creation, a random Ironlander name will be generated.
          On the other hand, by consulting the oracle during world creation, a number of world truths will be defined.
          As with everything in Ironsworn, if the Oracle&#39;s insights are not inline with your version of the
          Ironlands or provides some contradiction, you can either roll again or carve your own path. You should
          definitely consult the rules on how exactly to use the Oracle, this app merely takes away the need to cross
          reference a comprehensive list of roll tables.
        </p>
        <h3 id="oracle-page">Oracle Page</h3>
        <p>
          To supplement the oracle implementations on each page, there is also a page dedicated to oracles. The Oracles
          page provides the ability to roll on any oracle table and get a random result. Since there are no dice
          involved here, the oracle tables can be any size you like. After rolling an oracle table you can click on the
          result and it will automatically copy to clipboard.
        </p>
        <h4 id="oracle-creation">Oracle Creation</h4>
        <p>
          New Oracle tables can be created using the form at the top of the page. Simply enter the Oracle Table name and
          press
        </p>
        <p>
          <code>+ Add Oracle Table</code>
        </p>
        <h4 id="editing-oracle-tables">Editing Oracle Tables</h4>
        <p>
          Once you have added an oracle table you can edit the tables using the left hand column. Add rows by clicking
          the `Add Row` button and then it will add a row to the table. This is edited simply by clicking on the row and
          typing in the value you wish to be in the row. You can add multiple rows and delete rows you no longer
          require.
        </p>
        <hr />
        <h2 id="characters">Characters</h2>
        <p>
          Most of the functionality of the the companion app will not work unless you create and select a character.
          Characters represent players and multiple characters can be created. However, only 1 character can be selected
          at a time. This will mean a degree of micro management will be needed in coop games.
        </p>
        <h3 id="create-a-character">Create a character</h3>
        <p>
          To create a character go to the <code>Characters</code> page and either enter the details into the form
          manually or roll the individual fields against the respective oracle tables.
        </p>
        <blockquote>
          <p>
            For more information on Character creation consult <strong>Chapter 2</strong> of the Ironsworn rulebook.
          </p>
        </blockquote>
        <h4 id="stats">Stats</h4>
        <p>
          There are five stats in total. Each is given a value from 1 to 3. To start, arrange these bonuses across your
          five stats in any order: <strong>3, 2, 2, 1, 1.</strong> You can also roll on the oracle to leave your primary
          stat choice down to fate. The <code>Roll Primary Stat</code> button will choose 1 of the stats at random to be
          your primary stat <code>value=3</code>. You can then enter two 1s and two 2s into the remaining stats.
        </p>
        <h3 id="selected-character">Selected character</h3>
        <p>
          Once you have created a character it will appear under the <code>CHARACTER SELECTION</code> heading. This will
          show a card for each character, which will all contain a <code>Select</code> and <code>Delete</code> button.
          Delete button will completely delete your character and Select will make your character the{" "}
          <strong>
            <code>Selected Character</code>
          </strong>
          . To use all of the functionality of the companion there must always be one{" "}
          <strong>
            <code>Selected Character</code>
          </strong>
          .
        </p>
        <p>
          Characters can also be selected from the dropdown box in the <code>Header</code>. Once a character is a
          selected, their stats will be shown across the top of the pages, which provide 2 purposes. Firstly, they
          provide a persistent view of character stats, regardless of where you at the app. Secondly, the stats are
          buttons and can be clicked to take you to your <code>Character Sheet</code>.
        </p>
        <p>
          After selecting a character you are automatically taken to the <code>Stats</code> page, which shows a
          character sheet for the{" "}
          <strong>
            <code>Selected Character</code>
          </strong>
          .
        </p>
        <hr />
        <h2 id="logs">Logs</h2>
        <p>
          There are two logs in the companion <code>Campaign Log</code> and <code>Background</code>. These logs are used
          to add fiction or metagame information to your campaign. The <code>Campaign Log</code> is for adding
          information about events, plot, story or anything related to the campaign that is not character specific. The{" "}
          <code>Background</code> page is for adding information specific to the{" "}
          <strong>
            <code>Selected Character</code>
          </strong>
        </p>
        <h3 id="adding-logs">Adding Logs</h3>
        <p>
          To add a log enter text into the text box at the bottom of a log page and press <code>SHIFT + ENTER</code> to
          enter fiction <em>(this information should be in character/roleplay)</em>. Alternatively press{" "}
          <code>CTRL + ENTER</code> to enter metagame information{" "}
          <em>(This information can be out of character/roleplay)</em>.
        </p>
        <h3 id="viewing-and-deleting-logs">Viewing and Deleting Logs</h3>
        <p>
          Once logs are added they will appear in the box above the input box. They will appear in chronological order
          and are all timestamped with the date/time they were added. The box will auto scroll to the bottom of the page
          on refresh, or when a new log item is added.
        </p>
        <hr />
        <h2 id="world-truths">World Truths</h2>
        <p>
          As the name suggests, the <code>World Truths</code> page is for selecting the truths of your world. In short,
          there are a various categories under the <code>World Truths</code> page such as <code>The Old World</code> or{" "}
          <code>Religion</code>. Under each category there are <strong>3</strong> truths. You should choose a truth from
          each page this will define the parameters of your world. For example, the <code>Mysticism</code> tab is for
          choosing the truth about the prevalence of magic, the three options define whether magic is a myth, a rarity
          or commonplace.
        </p>
        <h3 id="selecting-a-truth">Selecting a Truth</h3>
        <p>
          To select a truth, simply click on the card. Once selected, a checkmark (<code>✔</code>) will appear on the
          right hand side of the card and the card will be surrounded with a black border.
        </p>
        <h3 id="changing-truths">Changing Truths</h3>
        <p>
          As your story unfolds you may find out that you were wrong about your truth selection, i.e. you may go into
          your world with the idea that there is no magic, but then you meet a ancient mystic who shows you that magic
          is not a myth, but is rare, dangerous and part of an underground movement. For this reason, you can change
          your truths at any time.
        </p>
        <h3 id="rolling-a-random-world">Rolling a Random World</h3>
        <p>
          You have the option to <code>Roll a Random World</code>. Clicking this box will randomly choose a truth for
          each category to add more randomness to your world.
        </p>
        <h3 id="custom-world-truths-">Custom World Truths.</h3>
        <p>
          The custom tab contains two text boxes. One for a custom quest starter and the other for custom world details.
          Be descriptive here. You can use this box to define an entirely custom world or provide modifiers to existing
          truths from other categories. It is your world so get creative.
        </p>
        <blockquote>
          <p>
            For more information on World Truths consult <strong>Chapter 4</strong> of the Ironsworn rulebook.
          </p>
        </blockquote>
        <hr />
        <h2 id="npcs">NPCs</h2>
        <p>
          The NPCs page is for creating <strong>N</strong>on-<strong>P</strong>layer <strong>C</strong>haracters.
          Creation of NPCs is functionally similar to character creation except there are more options to roll on. Each
          oracle roll will work the same way as character creation, except for <code>Name</code>. If you roll on{" "}
          <code>Name</code>, before choosing a <code>Race</code>, a race will be selected for you as this will determine
          which oracle table the name is chosen from.
        </p>
        <h3 id="story-helpers">Story Helpers</h3>
        <p>
          NPCs have more options to roll on that characters to provide more flavour to your NPCs that can drive your
          story.
        </p>
        <ul>
          <li>
            <code>Dispositions</code> help drive the narrative as NPCs could be <code>helpful</code> or{" "}
            <code>curious</code>, alternatively they could be <code>threatening</code> or <code>derisive</code>
          </li>
          <li>
            <code>NPC Conversation</code> will tell you the nature of their conversations topics; for example, they may
            tell you about their heritage or about the leadership of their settlement.
          </li>
          <li>
            <code>NPC Knowledge</code> will inform you about what information they know about.
          </li>
        </ul>
        <h3 id="last-location">Last Location</h3>
        <p>
          If you have created locations (See <a href="#locations-and-settlements">Locations and Settlements</a>) you
          will be able to specify the NPC&#39;s last know location. Simply select a location from the dropdown box
          either during NPC creation, or from their NPC card.
        </p>
        <h3 id="bonds">Bonds</h3>
        <p>
          If you have a character selected a <code>Bond</code> Track will appear on the NPC card once it is created.
          Increasing the bond track of an NPC. will increase the NPCs track by <code>1 Tick</code>. It will also
          increase the bond track of the{" "}
          <strong>
            <code>Selected Character</code>
          </strong>{" "}
          by <code>1 Tick</code>. If you need to add <code>bonds</code> to multiple characters <em>(for co-op)</em>,
          this will <strong>not</strong> be done automatically, instead you should use the character select drop down in
          the <code>Header</code> to switch to other character sheets and manually enter those bonds to other
          characters.
        </p>
        <hr />
        <h2 id="locations-and-settlements">Locations and Settlements</h2>
        <p>
          Locations and settlements can be added to an interactive map under the <code>Locations and Settlements</code>{" "}
          page.
        </p>
        <h3 id="adding-a-location">Adding a location</h3>
        <p>
          The <code>Add Location</code> form is also used to edit existing locations. Consequently, when you click on
          the map the form will be reset. Therefore, to add a location you <strong>must</strong> click on the map{" "}
          <strong>first</strong> to choose the location of the new settlement. This will add the XY coordinates to the
          input form. From there, you can then manually enter details about the settlement or roll on the oracle to
          generate random location details. The additional information can be used to provide flavour and context to
          your location.
        </p>
        <p>
          Once you have completed the form, click <code>Save Location</code> this will add a marker to the map.
        </p>
        <h3 id="editing-a-location">Editing a Location</h3>
        <p>
          Clicking on a map marker will populate the form with details on the location. If any NPCs have their{" "}
          <code>Last Location</code> set to this location/settlement they will appear in a list on this screen. A{" "}
          <code>bond</code> track is also available, which works the same way as an NPC <code>bond</code> track. Each
          progression adds <code>1 Tick</code> to the location and also <code>1 Tick</code> to the selected player.
        </p>
        <p>
          When you have finished editing the location click <code>Save Location</code>
        </p>
        <h3 id="delete-location">Delete Location</h3>
        <p>
          You can Delete locations by clicking on their map marker and then clicking <code>Delete</code>
        </p>
        <hr />
        <h2 id="enter-the-fray">Enter the Fray</h2>
        <p>Enter the fray describes the action of combat.</p>
        <p>
          To enter combat, create <code>Active Foes</code> by either selecting from the <code>Category</code> and{" "}
          <code>Type</code> drop boxes or click <code>Roll Random Foe</code>. Multiple <code>Active Foes</code> can be
          added and each Foe will have an individual <code>combat track</code>.
        </p>
        <h3 id="foe-card">Foe Card</h3>
        <p>
          The <code>Foe Card</code> provides information and context about your foes:
        </p>
        <p>
          <img src="https://i.imgur.com/hs0ZCN8.png" alt="image-20210316095147244" />
        </p>
        <p>
          The title bar of each <code>Foe Card</code> contains the <code>Foe Type</code> and <code>Rank</code> of each
          Foe. The rank determines how much harm a foe can inflict on a player and also determines the combat
          progression per harm done. The <code>Foe Card</code> also contains the page number of the Foe and the source
          so you can refer to the books for more information.
        </p>
        <h3 id="roll-progress">Roll Progress</h3>
        <p>
          At any point you can <code>Roll Progress</code>. However, this is dangerous early in the fight, Rolling
          progress involves rolling the value of the progression track against the challenge dice. If your{" "}
          <code>Combat Progress</code> is only <strong>2</strong>, you will essentially roll <strong>2</strong> against
          two <strong>D10s</strong>. This strongly increases the chance of a Miss, which has consequences. When you
          click <code>Roll Progress</code> the Foe is selected in the <code>Footer</code> and you must then click{" "}
          <code>Roll</code> in the <code>Footer</code> to determine the outcome.
        </p>
        <p>
          If the roll is successful you can delete the character and move on. If it is not you must{" "}
          <code>Pay the Price</code>
        </p>
        <blockquote>
          <p>
            For information about <strong>Combat</strong> see <strong>Chapter 3</strong> of the Ironsworn rulebook
          </p>
        </blockquote>
        <h3 id="foe-packs">Foe Packs</h3>
        <p>
          The Ironsworn rules allows you to form packs of NPCs that have a single track. This app does not yet implement
          packs, but the functionality can be easily achieved. Simply, create a single <code>Dangerous</code> or{" "}
          <code>Formidable</code> opponent and treat that opponent as a pack.
        </p>
        <blockquote>
          <p>
            For information about <strong>NPC Packs</strong> see <strong>Chapter 5</strong> of the Ironsworn rulebook
          </p>
        </blockquote>
        <hr />
        <h2 id="stats">Stats</h2>
        <p>
          The stats page is your digital character sheet. Here you can track <code>Experience</code>,{" "}
          <code>Core Stats</code>, <code>Health</code>, <code>Spirit</code>, <code>Supply</code> and{" "}
          <code>Momentum</code> tracks, as well as <code>Debilities</code>
        </p>
        <h3 id="experience">Experience</h3>
        <p>
          Experience is changed manually after <code>Fulling a Vow</code>. You increase experience with the{" "}
          <code>[+]</code> button and decrease with the <code>[-]</code> button. The <code>[&gt;&gt;]</code> button is
          for advancing experience when it is spent on <code>Assets</code> (See <a href="#assets">Assets</a>)
        </p>
        <h3 id="debilities">Debilities</h3>
        <p>
          To add a debility simply click on one of the words. When done, they will be highlighted black. Momentum is
          automatically affected by <code>Debilities</code>; reducing the <code>Momentum Reset</code> and the{" "}
          <code>Max Momentum</code> values.
        </p>
        <blockquote>
          <p>
            For more information on <strong>Character Stats</strong> consult <strong>Chapter 2</strong> of the Ironsworn
            rulebook.
          </p>
        </blockquote>
        <hr />
        <h2 id="vows-quests-and-journeys">Vows, Quests and Journeys</h2>
        <p>
          Vows quests and Journeys are functionally identical to each other. They are created with the form at the topic
          where a <code>description</code> and <code>difficulty</code> are defined. A card will be created with a{" "}
          <code>Progress Track</code>, which will work the same way as a Foe <code>Combat Track</code>. When you roll to{" "}
          <code>Fulfill a Vow</code>, <code>Complete Your Quest</code> or <code>Reach Your Destination</code>, the{" "}
          <code>Progress</code> will be selected in the <code>Footer</code> and you can roll on the value.
        </p>
        <h3 id="differences">Differences</h3>
        <p>
          The only difference between these progressions is what happens at completion. When you complete a{" "}
          <code>Vow</code> you gain experience. However, when you complete quests or journeys you do not. Journeys and
          Quests are here to add more fictional context. As the rules suggest: Let the fiction drive this. Your Journey
          may be to <code>Sail to the Barrier Islands to Deliver a message to the leader Highcairn</code>. Completing
          this journey may get you a reward or increase your <code>bond</code> with the Highcairn settlement. Your quest
          may be to <code>find the mystical staff of Charrak</code> completing this quest would add this staff to your
          equipment and grant you whatever powers you envision it having.
        </p>
        <hr />
        <h2 id="assets">Assets</h2>
        <p>
          Assets screen allows you add assets to your character and make live changes to the asset card. If assets have
          tracks an interactive track will appear, with the same paper clip user experience found on the stats page.{" "}
        </p>
        <p>
          There a few controls to this page. The leftmost drop down allows you to select and an asset to you character.
          Whereas the rightmost allows you to select and remove an asset from your character.{" "}
        </p>
        <p>
          Once an asset is added you can input text into the Input Fields, modify tracks, upgrade the assets (but
          remember to spend your experience when you do)
        </p>
        <hr />
        <h2 id="asset-builder">Asset Builder</h2>
        <h3 id="asset-creation">Asset Creation</h3>
        <p>The asset builder allows you to create, copy, edit and delete assets. </p>
        <p>
          Assets with (Core) in the name cannot be edited or deleted. They are centrally maintained by the{" "}
          <strong>Data Management</strong> page. To update assets got to the <strong>Data Management</strong> page and
          press <strong>Update Core Assets</strong>
        </p>
        <p>
          To create a new Asset either fill out the various fields and press <strong>Save Asset</strong> or select an
          existing asset, make the required changes and press <strong>Save Asset.</strong> As you make changes, those
          changes will be reflect live on the card nearest the input form. Use this to ensure your content fits inside
          the card (so that it will display/print correctly).
        </p>
        <p>
          <strong>Assets MUST have a unique name</strong>. Therefore you will be unable to click{" "}
          <strong>Save Asset.</strong> unless a unique name is chosen.
        </p>
        <h4 id="buttons">Buttons</h4>
        <p>
          The buttons on this page are dynamic. A button will only appear if an action is allowed. For example, since
          you can&#39;t delete or modify a core asset. When a core asset is selected, the only button available to you
          is <code>Save as Copy</code>. However, this button only appears when the name is unique. Similarly, if
          you&#39;re creating a new asset, then the <code>Delete</code>, <code>Save as Copy</code> and{" "}
          <code>Save Changes</code> button are hidden.{" "}
        </p>
        <p>There are four buttons in total: </p>
        <table>
          <thead>
            <tr>
              <th>Button</th>
              <th>Action</th>
              <th>Rules</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Add Asset</td>
              <td>Adds a new Asset</td>
              <td>
                Is not shown if existing asset is selected
                <br />
                Name cannot be blank
              </td>
            </tr>
            <tr>
              <td>Save Changes</td>
              <td>Saves changes to an existing asset</td>
              <td>
                Cannot add if Name is blank, <br />
                Can only save changes if the selected assets is not a core asset, <br />
                The asset Name cannot be different to the previous version. <br />
                At least one other field must be different to the previous version.
              </td>
            </tr>
            <tr>
              <td>Save as a Copy</td>
              <td>Creates a new Asset based on previous asset</td>
              <td>
                Cannot add if Name is blank, <br />
                Cannot add asset if selected asset is core asset. <br />
                Cannot add if an asset exists with same name
                <br />
                cannot add if the asset is same as default asset (ie no changes)
                <br />
                cannot add if asset with same id already exists
                <br />
                add button is not shown when modifying an existing asset (copy shown instead)
              </td>
            </tr>
            <tr>
              <td>Delete</td>
              <td>Delete an Existing Asset</td>
              <td>
                Existing asset cannot be a core asset
                <br />
                Cannot be an asset that is not yet created
              </td>
            </tr>
          </tbody>
        </table>
        <h3 id="asset-deck">Asset Deck</h3>
        <p>
          At the bottom of the Asset Builder page, all the existing assets can be viewed on the page. At the top of the
          Asset Deck, there is a <code>Print Cards</code> button, which will modify the page and hide non essential
          visual elements to create an automated printable page. This process will also automatically generate card
          backs and place them in order so that they print correctly on double sided printers. (if you don&#39;t want
          card backs you can select those pages not to print in the printer options)
        </p>
        <blockquote>
          <p>
            <strong>KNOWN ISSUE:</strong> The way the page is generate the last page always generates an almost blank
            page. This should be removed in the printer settings.{" "}
          </p>
        </blockquote>
        <hr />
        <h2 id="roll">Roll</h2>
        <p>
          The <code>Roll</code> button in the <code>Sidebar</code> takes you to a simple Dice Roller. This uses the same
          Dice Roller that drives the tables, but allows you to specify a series of dice and roll them. The dice roller
          in the <code>Footer</code> is functionally more useful to Ironsworn, but this was added for those that want to
          roll on some dice for whatever reason.
        </p>
        <hr />
        <h2 id="data-management">Data Management</h2>
        <p>
          This companion has a persistent state meaning that you can move between pages and your textboxes wont clear
          when you return. This is done through your browser&#39;s <code>local storage</code>. The{" "}
          <code>Data Management</code> page allows you to <code>Reset</code>, <code>Load</code> or <code>Save</code>{" "}
          your gamestate at any point.
        </p>
        <h3 id="saving-and-loading-the-game-state">Saving and Loading the Game State</h3>
        <p>
          The <code>Save</code> Button allows you to download your gamestate to a JSON file that you can store on your
          computer. If you not a programmer/unaware of what JSON is, don&#39;t worry. You don&#39;t need to know what
          the file is, except that it is a text file that contains all of the information to maintain your game save. It
          also allows your to move your game between browsers or computers.
        </p>
        <p>
          JSON files can be loaded using the <code>Load</code> button to replace the current gamestate with the
          gamestate from the save file.
        </p>
        <p>
          The <code>Reset</code> button wipes the gamestate back to defaults. This cannot be reversed so ensure you save
          your game before doing this.
        </p>
        <h3 id="updating-core-assets">Updating Core Assets</h3>
        <p>
          This platform makes use of RSEK&#39;s datasworn assets. If your assets fall behind RSEKs datasworn assets, you
          can use the update button to bring them up to date.
        </p>
        <hr />
        <h2 id="acknowledgements">Acknowledgements</h2>
        <p>
          The acknowledgement page provides the following information, but it is also here to make the documentation
          more complete.
        </p>
        <h3 id="license">License</h3>
        <p>
          To honour the labour of love created by Shawn, this companion is distributed (for free) under the same
          International Attribution-NonCommercial-ShareAlike 4.0 license as the official Ironsworn game. This companion
          could not exist without Shawn&#39;s work and since his game is distributed for free it seemed only right to do
          the same with the companion. The images, icons and maps used in this companion are provided from different
          authors (See Contributors below). Consequently, they are <strong>NOT</strong> covered by the same ShareAlike
          4.0 license
        </p>
        <p>
          <a href="https://creativecommons.org/licenses/by/4.0/">
            <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg" alt="img" />
          </a>
        </p>
        <blockquote>
          <p>
            As part of the Attribution-NonCommercial-ShareAlike 4.0 license: any forks of this application must only
            build upon this page. No attributions may be taken away from this page without expressed written permission.
            This page must be included in any derivative works and may not be &#39;hidden&#39; from view.
          </p>
        </blockquote>
        <h3 id="contributors">Contributors</h3>
        <p>
          There were several content developers from the Ironsworn community that deserve an honourable mention here.
          During the creation of this companion the following people provided direct or indirect support to this app.
        </p>
        <table>
          <thead>
            <tr>
              <th>Contributor</th>
              <th>Contribution</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SHAWN TOMKIN</td>
              <td>
                Without Shawn&#39;s work none of this could be possible. When reading the game, you realise the care,
                effort and devotion that has gone in to creating this game and yet, the game is released as open-source
                under the creative commons 4.0. True Legend!
              </td>
              <td>
                <a href="https://www.ironswornrpg.com/">https://www.ironswornrpg.com/</a>
              </td>
            </tr>
            <tr>
              <td>JOSIAH VAN EGMOND</td>
              <td>
                The coloured version of the map was created by Josiah Van Egmond from Black Hawk Cartography (who make
                some amazing maps I might add). Additional thanks to Shawn Tomkin for providing me with explicit
                permission to use this image outside of the CC4.0 license.
              </td>
              <td>
                <a href="https://www.blackhawkcartography.com/">https://www.blackhawkcartography.com/</a>
              </td>
            </tr>
            <tr>
              <td>RSEK</td>
              <td>
                RSEK provided continued support and feedback throughout development and their Datasworn repository was
                used to build the core assets in this companion.
              </td>
              <td>
                <a href="https://github.com/rsek">https://github.com/rsek</a>
              </td>
            </tr>
            <tr>
              <td>ERIC BRIGHT</td>
              <td>
                To provide more variety and options when rolling on oracle tables, Eric&#39;s expanded oracles were used
                to populate the core oracle tables
              </td>
              <td>
                <a href="https://www.drivethrurpg.com/browse/pub/8584/Eric-Bright">
                  https://www.drivethrurpg.com/browse/pub/8584/Eric-Bright
                </a>
              </td>
            </tr>
            <tr>
              <td>DELAPOUITE &amp; LORC</td>
              <td>
                The icons used at Game-Icons.net are fundamental for achieving the Ironsworn look-and-feel. Therefore
                the icon selector for asset creation is driven by Game-Icons.net fonts.
              </td>
              <td>
                <a href="https://game-icons.net/">https://game-icons.net/</a>
              </td>
            </tr>
            <tr>
              <td>KYLE KEMP</td>
              <td>
                To integrate the Game-Icons.net icons into the application, Kyle&#39;s game-icons.net web-font was used,
                which was evidently inspired by FontAwesome.
              </td>
              <td>
                <a href="https://seiyria.com/gameicons-font/">https://seiyria.com/gameicons-font/</a>
              </td>
            </tr>
            <tr>
              <td>GHOST225</td>
              <td>
                Ghost provided continued support, feedback, feature suggestions and testing throughout the development
              </td>
              <td>
                <a href="https://github.com/ghost225">https://github.com/ghost225</a>
              </td>
            </tr>
            <tr>
              <td>NOMADSOUL1</td>
              <td>
                Credit goes to NOMADSOUL1 from freepik for the homepage image. The colour image was filtered to get the
                same look and feel as the Ironsworn book.
              </td>
              <td>
                <a href="https://www.freepik.com/nomadsoul1">https://www.freepik.com/nomadsoul1</a>
              </td>
            </tr>
            <tr>
              <td>ONLINE WEB FONTS</td>
              <td>Modesto font made from Online Web Fonts licensed by CC BY 3.0</td>
              <td>
                <a href="http://www.onlinewebfonts.com/">http://www.onlinewebfonts.com</a>
              </td>
            </tr>
          </tbody>
        </table>
        <h3 id="developer">Developer</h3>
        <p>
          This app was created by Graham Coulby to serve as a holistic digital companion for the Ironsworn tabletop RPG.
          This app was not designed to replace the official rules nor was it designed to supersede the work done by
          Shawn Tomkin.
        </p>
        <p>
          <a href="https://grahamcoulby.co.uk/">
            <img src="https://i.imgur.com/SIbTgYU.png" alt="img" />
          </a>
        </p> */}
      </React.Fragment>
    );
  }
}

export default Documentation;
