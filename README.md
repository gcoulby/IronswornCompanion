# Ironsworn Companion

# Introduction

## What is Ironsworn?

Ironsworn is a tabletop RPG created by Shawn Tomkin. What makes Ironsworn unique is that unlike traditional tabletop RPGs, Ironsworn enables solo/ small-group play, as its unique game mechanics remove the need for a traditional game master.

What is even more fascinating about Ironsworn is the distribution methods. When reading the game, you realise the care, effort and devotion that has gone in to creating this game and yet, the game is released as open-source under the creative commons 4.0 [![License: CC BY 4.0](https://camo.githubusercontent.com/bca967b18143b8a5b2ffe78bd4a1a30f6bc21de83bd8336f748e96498af38b38/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d43432532304259253230342e302d6c69676874677265792e737667)](https://creativecommons.org/licenses/by/4.0/)

Ironsworn truly is a labour of love and is available for free at https://www.ironswornrpg.com/

## What is the Ironsworn Companion?

First and foremost, this application is not an official Ironsworn product, instead it leverages the CC4.0 license to provide a digital toolkit for playing the game.

I used to use platforms such as Roll20 for playing campaigns with a remote group of friends. I wanted a similar experience from Ironsworn, e.g. a digital companion app that could aid, automate and track my game to reduce on paper waste and also provide quick and easy ways to exploit mechanics such as `The Oracle` _(a roll-based game mechanic to spark ideas during game play)._

While there are various companions out there, I was disappointed with the features and felt they didn't match my view of what the companion should be like. That's not to say the other apps are bad, but many just felt like lightweight tools to support pen and paper play, which is great, if that is what you want.

This app is not designed to replace the rules, though it may clear your desk of progress tracks and asset cards.

---

# Using the app

The following sections will provide instruction on how to use the individual components in the app.

Should you experience issues with this app please log them in the Github issues or here [https://docs.google.com/spreadsheets/d/1GXvsk8f_Kx_lVNN78J1027Np0T7-pF1pLZsqnJA6-fE/edit#gid=1386834576](https://docs.google.com/spreadsheets/d/1GXvsk8f_Kx_lVNN78J1027Np0T7-pF1pLZsqnJA6-fE/edit#gid=1386834576)

---

## Sections

Key areas such as a pages will be shown like this throughout the documentation: `Characters`, `Background` etc.

At times the documentation will refer to sections. There are three main sections to this app: `Header`, `Sidebar` and `Footer`. These are fairly self explanatory.

### Header

The `Header` refers to the top of the page where the `Character Selector` and `Stat Overview` exists.

![image-20210316092433055](https://i.imgur.com/RMaRVJB.png)

### Sidebar

The `Sidebar` refers to the side navigation menu. This section is used for navigating around the app.

![image-20210316092602896](https://i.imgur.com/WHH1Tc9.png)

### Footer

The `Footer` contains a quick dice roller. This can be used to roll on stats with an action dice vs two challenge dice. When you click `Roll` a box will appear that will state either `Miss`, `Weak Hit`, or `Strong Hit`. Hovering over this box will make a breakdown of the roll appear in a popup. Progression tracks also make use of this, which we will explore later.

![image-20210316092805822](https://i.imgur.com/UQCOnvb.png)

---

## Oracles

Before discussing the features of the app its important to understand how the oracle works. Throughout the companion you will see the following roll icon in various places:

![image-20210226101636509](https://i.imgur.com/JlEztdW.png)

This icon denotes that you can consult the oracle. Each implementation of the oracle differs between pages. For example, by consulting the oracle during character creation, a random Ironlander name will be generated. On the other hand, by consulting the oracle during world creation, a number of world truths will be defined. As with everything in Ironsworn, if the Oracle's insights are not inline with your version of the Ironlands or provides some contradiction, you can either roll again or carve your own path. You should definitely consult the rules on how exactly to use the Oracle, this app merely takes away the need to cross reference a comprehensive list of roll tables.

### Oracle Page

To supplement the oracle implementations on each page, there is also a page dedicated to oracles. The Oracles page provides the ability to roll on any oracle table and get a random result. Since there are no dice involved here, the oracle tables can be any size you like. After rolling an oracle table you can click on the result and it will automatically copy to clipboard.

#### Oracle Creation

New Oracle tables can be created using the form at the top of the page. Simply enter the Oracle Table name and press

`+ Add Oracle Table`

#### Editing Oracle Tables

Once you have added an oracle table you can edit the tables using the left hand column. Add rows by clicking the `Add Row` button and then it will add a row to the table. This is edited simply by clicking on the row and typing in the value you wish to be in the row. You can add multiple rows and delete rows you no longer require.

---

## Characters

Most of the functionality of the the companion app will not work unless you create and select a character. Characters represent players and multiple characters can be created. However, only 1 character can be selected at a time. This will mean a degree of micro management will be needed in coop games.

### Create a character

To create a character go to the `Characters` page and either enter the details into the form manually or roll the individual fields against the respective oracle tables.

> For more information on Character creation consult **Chapter 2** of the Ironsworn rulebook.

#### Stats

There are five stats in total. Each is given a value from 1 to 3. To start, arrange these bonuses across your five stats in any order: **3, 2, 2, 1, 1.** You can also roll on the oracle to leave your primary stat choice down to fate. The `Roll Primary Stat` button will choose 1 of the stats at random to be your primary stat `value=3`. You can then enter two 1s and two 2s into the remaining stats.

### Selected character

Once you have created a character it will appear under the `CHARACTER SELECTION` heading. This will show a card for each character, which will all contain a `Select` and `Delete` button. Delete button will completely delete your character and Select will make your character the **`Selected Character`**. To use all of the functionality of the companion there must always be one **`Selected Character`**.

Characters can also be selected from the dropdown box in the `Header`. Once a character is a selected, their stats will be shown across the top of the pages, which provide 2 purposes. Firstly, they provide a persistent view of character stats, regardless of where you at the app. Secondly, the stats are buttons and can be clicked to take you to your `Character Sheet`.

After selecting a character you are automatically taken to the `Stats` page, which shows a character sheet for the **`Selected Character`**.

---

## Logs

There are two logs in the companion `Campaign Log` and `Background`. These logs are used to add fiction or metagame information to your campaign. The `Campaign Log` is for adding information about events, plot, story or anything related to the campaign that is not character specific. The `Background` page is for adding information specific to the **`Selected Character`**

### Adding Logs

To add a log enter text into the text box at the bottom of a log page and press `SHIFT + ENTER` to enter fiction _(this information should be in character/roleplay)_. Alternatively press `CTRL + ENTER` to enter metagame information _(This information can be out of character/roleplay)_.

### Viewing and Deleting Logs

Once logs are added they will appear in the box above the input box. They will appear in chronological order and are all timestamped with the date/time they were added. The box will auto scroll to the bottom of the page on refresh, or when a new log item is added.

---

## World Truths

As the name suggests, the `World Truths` page is for selecting the truths of your world. In short, there are a various categories under the `World Truths` page such as `The Old World` or `Religion`. Under each category there are **3** truths. You should choose a truth from each page this will define the parameters of your world. For example, the `Mysticism` tab is for choosing the truth about the prevalence of magic, the three options define whether magic is a myth, a rarity or commonplace.

### Selecting a Truth

To select a truth, simply click on the card. Once selected, a checkmark (`✔`) will appear on the right hand side of the card and the card will be surrounded with a black border.

### Changing Truths

As your story unfolds you may find out that you were wrong about your truth selection, i.e. you may go into your world with the idea that there is no magic, but then you meet a ancient mystic who shows you that magic is not a myth, but is rare, dangerous and part of an underground movement. For this reason, you can change your truths at any time.

### Rolling a Random World

You have the option to `Roll a Random World`. Clicking this box will randomly choose a truth for each category to add more randomness to your world.

### Custom World Truths.

The custom tab contains two text boxes. One for a custom quest starter and the other for custom world details. Be descriptive here. You can use this box to define an entirely custom world or provide modifiers to existing truths from other categories. It is your world so get creative.

> For more information on World Truths consult **Chapter 4** of the Ironsworn rulebook.

---

## NPCs

The NPCs page is for creating **N**on-**P**layer **C**haracters. Creation of NPCs is functionally similar to character creation except there are more options to roll on. Each oracle roll will work the same way as character creation, except for `Name`. If you roll on `Name`, before choosing a `Race`, a race will be selected for you as this will determine which oracle table the name is chosen from.

### Story Helpers

NPCs have more options to roll on that characters to provide more flavour to your NPCs that can drive your story.

- `Dispositions` help drive the narrative as NPCs could be `helpful` or `curious`, alternatively they could be `threatening` or `derisive`
- `NPC Conversation` will tell you the nature of their conversations topics; for example, they may tell you about their heritage or about the leadership of their settlement.
- `NPC Knowledge` will inform you about what information they know about.

### Last Location

If you have created locations (See [Locations and Settlements](#locations-and-settlements)) you will be able to specify the NPC's last know location. Simply select a location from the dropdown box either during NPC creation, or from their NPC card.

### Bonds

If you have a character selected a `Bond` Track will appear on the NPC card once it is created. Increasing the bond track of an NPC. will increase the NPCs track by `1 Tick`. It will also increase the bond track of the **`Selected Character`** by `1 Tick`. If you need to add `bonds` to multiple characters _(for co-op)_, this will **not** be done automatically, instead you should use the character select drop down in the `Header` to switch to other character sheets and manually enter those bonds to other characters.

---

## Locations and Settlements

Locations and settlements can be added to an interactive map under the `Locations and Settlements` page.

### Adding a location

The `Add Location` form is also used to edit existing locations. Consequently, when you click on the map the form will be reset. Therefore, to add a location you **must** click on the map **first** to choose the location of the new settlement. This will add the XY coordinates to the input form. From there, you can then manually enter details about the settlement or roll on the oracle to generate random location details. The additional information can be used to provide flavour and context to your location.

Once you have completed the form, click `Save Location` this will add a marker to the map.

### Editing a Location

Clicking on a map marker will populate the form with details on the location. If any NPCs have their `Last Location` set to this location/settlement they will appear in a list on this screen. A `bond` track is also available, which works the same way as an NPC `bond` track. Each progression adds `1 Tick` to the location and also `1 Tick` to the selected player.

When you have finished editing the location click `Save Location`

### Delete Location

You can Delete locations by clicking on their map marker and then clicking `Delete`

---

## Enter the Fray

Enter the fray describes the action of combat.

To enter combat, create `Active Foes` by either selecting from the `Category` and `Type` drop boxes or click `Roll Random Foe`. Multiple `Active Foes` can be added and each Foe will have an individual `combat track`.

### Foe Card

The `Foe Card` provides information and context about your foes:

![image-20210316095147244](https://i.imgur.com/hs0ZCN8.png)

The title bar of each `Foe Card` contains the `Foe Type` and `Rank` of each Foe. The rank determines how much harm a foe can inflict on a player and also determines the combat progression per harm done. The `Foe Card` also contains the page number of the Foe and the source so you can refer to the books for more information.

### Roll Progress

At any point you can `Roll Progress`. However, this is dangerous early in the fight, Rolling progress involves rolling the value of the progression track against the challenge dice. If your `Combat Progress` is only **2**, you will essentially roll **2** against two **D10s**. This strongly increases the chance of a Miss, which has consequences. When you click `Roll Progress` the Foe is selected in the `Footer` and you must then click `Roll` in the `Footer` to determine the outcome.

If the roll is successful you can delete the character and move on. If it is not you must `Pay the Price`

> For information about **Combat** see **Chapter 3** of the Ironsworn rulebook

### Foe Packs

The Ironsworn rules allows you to form packs of NPCs that have a single track. This app does not yet implement packs, but the functionality can be easily achieved. Simply, create a single `Dangerous` or `Formidable` opponent and treat that opponent as a pack.

> For information about **NPC Packs** see **Chapter 5** of the Ironsworn rulebook

---

## Stats

The stats page is your digital character sheet. Here you can track `Experience`, `Core Stats`, `Health`, `Spirit`, `Supply` and `Momentum` tracks, as well as `Debilities`

### Experience

Experience is changed manually after `Fulling a Vow`. You increase experience with the `[+]` button and decrease with the `[-]` button. The `[>>]` button is for advancing experience when it is spent on `Assets` (See [Assets](#assets))

### Debilities

To add a debility simply click on one of the words. When done, they will be highlighted black. Momentum is automatically affected by `Debilities`; reducing the `Momentum Reset` and the `Max Momentum` values.

> For more information on **Character Stats** consult **Chapter 2** of the Ironsworn rulebook.

---

## Vows, Quests and Journeys

Vows quests and Journeys are functionally identical to each other. They are created with the form at the topic where a `description` and `difficulty` are defined. A card will be created with a `Progress Track`, which will work the same way as a Foe `Combat Track`. When you roll to `Fulfill a Vow`, `Complete Your Quest` or `Reach Your Destination`, the `Progress` will be selected in the `Footer` and you can roll on the value.

### Differences

The only difference between these progressions is what happens at completion. When you complete a `Vow` you gain experience. However, when you complete quests or journeys you do not. Journeys and Quests are here to add more fictional context. As the rules suggest: Let the fiction drive this. Your Journey may be to `Sail to the Barrier Islands to Deliver a message to the leader Highcairn`. Completing this journey may get you a reward or increase your `bond` with the Highcairn settlement. Your quest may be to `find the mystical staff of Charrak` completing this quest would add this staff to your equipment and grant you whatever powers you envision it having.

---

## Assets

Assets screen allows you add assets to your character and make live changes to the asset card. If assets have tracks an interactive track will appear, with the same paper clip user experience found on the stats page.

There a few controls to this page. The leftmost drop down allows you to select and an asset to you character. Whereas the rightmost allows you to select and remove an asset from your character.

Once an asset is added you can input text into the Input Fields, modify tracks, upgrade the assets (but remember to spend your experience when you do)

---

## Asset Builder

### Asset Creation

The asset builder allows you to create, copy, edit and delete assets.

Assets with (Core) in the name cannot be edited or deleted. They are centrally maintained by the **Data Management** page. To update assets got to the **Data Management** page and press **Update Core Assets**

To create a new Asset either fill out the various fields and press **Save Asset** or select an existing asset, make the required changes and press **Save Asset.** As you make changes, those changes will be reflect live on the card nearest the input form. Use this to ensure your content fits inside the card (so that it will display/print correctly).

**Assets MUST have a unique name**. Therefore you will be unable to click **Save Asset.** unless a unique name is chosen.

#### Buttons

The buttons on this page are dynamic. A button will only appear if an action is allowed. For example, since you can't delete or modify a core asset. When a core asset is selected, the only button available to you is `Save as Copy`. However, this button only appears when the name is unique. Similarly, if you're creating a new asset, then the `Delete`, `Save as Copy` and `Save Changes` button are hidden.

There are four buttons in total:

| Button         | Action                                      | Rules                                                                                                                                                                                                                                                                                                                                                 |
| -------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add Asset      | Adds a new Asset                            | Is not shown if existing asset is selected<br />Name cannot be blank                                                                                                                                                                                                                                                                                  |
| Save Changes   | Saves changes to an existing asset          | Cannot add if Name is blank, <br />Can only save changes if the selected assets is not a core asset, <br />The asset Name cannot be different to the previous version. <br />At least one other field must be different to the previous version.                                                                                                      |
| Save as a Copy | Creates a new Asset based on previous asset | Cannot add if Name is blank, <br />Cannot add asset if selected asset is core asset. <br />Cannot add if an asset exists with same name<br />cannot add if the asset is same as default asset (ie no changes)<br />cannot add if asset with same id already exists<br />add button is not shown when modifying an existing asset (copy shown instead) |
| Delete         | Delete an Existing Asset                    | Existing asset cannot be a core asset<br />Cannot be an asset that is not yet created                                                                                                                                                                                                                                                                 |

### Asset Deck

At the bottom of the Asset Builder page, all the existing assets can be viewed on the page. At the top of the Asset Deck, there is a `Print Cards` button, which will modify the page and hide non essential visual elements to create an automated printable page. This process will also automatically generate card backs and place them in order so that they print correctly on double sided printers. (if you don't want card backs you can select those pages not to print in the printer options)

> **KNOWN ISSUE:** The way the page is generate the last page always generates an almost blank page. This should be removed in the printer settings.

---

## Roll

The `Roll` button in the `Sidebar` takes you to a simple Dice Roller. This uses the same Dice Roller that drives the tables, but allows you to specify a series of dice and roll them. The dice roller in the `Footer` is functionally more useful to Ironsworn, but this was added for those that want to roll on some dice for whatever reason.

---

## Data Management

This companion has a persistent state meaning that you can move between pages and your textboxes wont clear when you return. This is done through your browser's `local storage`. The `Data Management` page allows you to `Reset`, `Load` or `Save` your gamestate at any point.

### Saving and Loading the Game State

The `Save` Button allows you to download your gamestate to a JSON file that you can store on your computer. If you not a programmer/unaware of what JSON is, don't worry. You don't need to know what the file is, except that it is a text file that contains all of the information to maintain your game save. It also allows your to move your game between browsers or computers.

JSON files can be loaded using the `Load` button to replace the current gamestate with the gamestate from the save file.

The `Reset` button wipes the gamestate back to defaults. This cannot be reversed so ensure you save your game before doing this.

### Updating Core Assets

This platform makes use of RSEK's datasworn assets. If your assets fall behind RSEKs datasworn assets, you can use the update button to bring them up to date.

---

## Acknowledgements

The acknowledgement page provides the following information, but it is also here to make the documentation more complete.

### License

To honour the labour of love created by Shawn, this companion is distributed (for free) under the same International Attribution-NonCommercial-ShareAlike 4.0 license as the official Ironsworn game. This companion could not exist without Shawn's work and since his game is distributed for free it seemed only right to do the same with the companion. The images, icons and maps used in this companion are provided from different authors (See Contributors below). Consequently, they are **NOT** covered by the same ShareAlike 4.0 license

[![img](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg)](https://creativecommons.org/licenses/by/4.0/)

> As part of the Attribution-NonCommercial-ShareAlike 4.0 license: any forks of this application must only build upon this page. No attributions may be taken away from this page without expressed written permission. This page must be included in any derivative works and may not be 'hidden' from view.

### Contributors

There were several content developers from the Ironsworn community that deserve an honourable mention here. During the creation of this companion the following people provided direct or indirect support to this app.

| Contributor       | Contribution                                                                                                                                                                                                                                                       | URL                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| SHAWN TOMKIN      | Without Shawn's work none of this could be possible. When reading the game, you realise the care, effort and devotion that has gone in to creating this game and yet, the game is released as open-source under the creative commons 4.0. True Legend!             | https://www.ironswornrpg.com/                                   |
| JOSIAH VAN EGMOND | The coloured version of the map was created by Josiah Van Egmond from Black Hawk Cartography (who make some amazing maps I might add). Additional thanks to Shawn Tomkin for providing me with explicit permission to use this image outside of the CC4.0 license. | https://www.blackhawkcartography.com/                           |
| RSEK              | RSEK provided continued support and feedback throughout development and their Datasworn repository was used to build the core assets in this companion.                                                                                                            | https://github.com/rsek                                         |
| ERIC BRIGHT       | To provide more variety and options when rolling on oracle tables, Eric's expanded oracles were used to populate the core oracle tables                                                                                                                            | https://www.drivethrurpg.com/browse/pub/8584/Eric-Bright        |
| DELAPOUITE & LORC | The icons used at Game-Icons.net are fundamental for achieving the Ironsworn look-and-feel. Therefore the icon selector for asset creation is driven by Game-Icons.net fonts.                                                                                      | https://game-icons.net/                                         |
| KYLE KEMP         | To integrate the Game-Icons.net icons into the application, Kyle's game-icons.net web-font was used, which was evidently inspired by FontAwesome.                                                                                                                  | https://seiyria.com/gameicons-font/                             |
| GHOST225          | Ghost provided continued support, feedback, feature suggestions and testing throughout the development                                                                                                                                                             | https://github.com/ghost225                                     |
| NOMADSOUL1        | Credit goes to NOMADSOUL1 from freepik for the homepage image. The colour image was filtered to get the same look and feel as the Ironsworn book.                                                                                                                  | https://www.freepik.com/nomadsoul1                              |
| ONLINE WEB FONTS  | Modesto font made from Online Web Fonts licensed by CC BY 3.0                                                                                                                                                                                                      | [http://www.onlinewebfonts.com](http://www.onlinewebfonts.com/) |

### Developer

This app was created by Graham Coulby to serve as a holistic digital companion for the Ironsworn tabletop RPG. This app was not designed to replace the official rules nor was it designed to supersede the work done by Shawn Tomkin.

[![img](https://i.imgur.com/SIbTgYU.png)](https://grahamcoulby.co.uk/)
