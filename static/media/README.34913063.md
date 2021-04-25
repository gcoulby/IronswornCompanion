# Ironsworn Companion

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

![https://i.imgur.com/BxQJXwM.png](https://i.imgur.com/BxQJXwM.png)

## Roll Button

The Roll button is a context aware button that provides different functionality depending where it is placed.

On the footer the roll button can be used in conjunction with the the `Add Stat` drop down and the `Add` box, to create modifiers for the `Action Score`. When Roll is pressed the `Hit Type` ,`Action Score` `Challenge Dice 1` & `Challenge Dice 2` are shown right next to the button in the `Result Preview`. Hovering over the `Result Preview` will show the `Result Details` popup. This will provide detailed information about the Roll.

### Action Roll

Action Rolls will show the details of how the Action Score is created in the `Result Details` popup. Progress rolls just show the `Action Score`.

### Burning Momentum

If your character has enough momentum to burn a roll, the option will be displayed on the result preview:

![https://i.imgur.com/0jLp1Gv.png](https://i.imgur.com/0jLp1Gv.png)

clicking the burn button will reset the selected character's momentum.

> Note to make it mechanically possible to burn dice both dice will reset to **0**. This is confusing on the `Result Details` as 0 also represents 10 on a D10. Moreover. since both dice are reset to 0, it will show as a strong hit match. **This should be ignored.**

![https://i.imgur.com/bge5CpV.png](https://i.imgur.com/bge5CpV.png)

---

## Oracles

Before discussing the features of the app its important to understand how the oracle works. Throughout the companion you will see the following roll icon in various places:

![image-20210226101636509](https://i.imgur.com/Klb6AUO.png)

This icon denotes that you can consult the oracle. Each implementation of the oracle differs between pages. For example, by consulting the oracle during character creation, a random Ironlander name will be generated. On the other hand, by consulting the oracle during world creation, a number of world truths will be defined. As with everything in Ironsworn, if the Oracle's insights are not inline with your version of the Ironlands or provides some contradiction, you can either roll again or carve your own path. You should definitely consult the rules on how exactly to use the Oracle, this app merely takes away the need to cross reference a comprehensive list of roll tables.

### Oracles

#### Oracle Roller

To supplement the oracle implementations on each page, there is also a page dedicated to rolling oracle tables. The Oracles page provides the ability to roll on any oracle table and get a random result. Since there are no dice involved here, the oracle tables can be any size you like.

![https://i.imgur.com/Rz9Pgso.png](https://i.imgur.com/Rz9Pgso.png)

##### Ask the Oracle

There are five buttons at the top of the oracles page:

![https://i.imgur.com/gIvJTk8.png](https://i.imgur.com/gIvJTk8.png)

These buttons can be used to ask the oracle a question where you roll depending on the probability of the event happening i.e. finding the key item for your overarching vow in the bottom of your bag, like some miss placed keys is highly unlikely, so you would roll with `small chance` and if you score **91** **or greater** then the answer will be yes **_(don't do this)_**.

> For information on how to use the Ask the Oracle move consult the Ironsworn rulebook, Page 107

> _Ask the oracle is technically a move, but its related to the oracle so it is placed here_

##### Using the roller

To use the oracle roller, located the table you want to roll on and click the roll icon. You can click on the table and it will show you the oracle table on the right of the page. When you roll on a table the value is placed in a textbox at the top of the page.

> _Clicking that textbox will copy the value to the clipboard._

##### Roll History

The roll history button provides you with a modal interface to view previous rolls. One of the features of this box is that if you click on a past result it will be added to the text box at the top. However, the difference here is that every time you click a result it is added to the box so you can add multiple words. The reason for this is if you want to copy e.g.,**Action + Theme**

> The clear button allows you to empty the box so you can build a fresh copy

### Oracle Editor

##### Oracle Creation

New Oracle tables can be created using the form at the top of the Oracle Editor page. Simply choose a theme and enter the Oracle Table name then press

`+ Add Oracle Table`

##### Editing Oracle Tables

Once you have added an oracle table you can edit the tables using the left hand column. Add rows by clicking the `Add Row` button and then it will add a row to the table. This is edited simply by clicking on the row and typing in the value you wish to be in the row. You can add multiple rows and delete rows you no longer require.

---

## Characters

Most of the functionality of the the companion app will not work unless you create and select a character. Characters represent players and multiple characters can be created. However, only 1 character can be selected at a time. This will mean a degree of micro management will be needed in coop games.

### Create a character

To create a character go to the `Characters` page and either enter the details into the form manually or roll the individual fields against the respective oracle tables.

> For more information on Character creation consult **Chapter 2** of the Ironsworn rulebook.

#### Stats

There are five stats in total. Each is given a value from 1 to 4 (Level depending). To start, choose a difficulty and place the bonuses for that difficulty across your five stats in any order. You can also roll on the oracle to leave your primary stat choice down to fate. The `Roll Primary Stat` button will choose 1 of the stats at random to be your primary stat `value=3`. You can then enter two 1s and two 2s into the remaining stats.

![https://i.imgur.com/LcqryMA.png](https://i.imgur.com/LcqryMA.png)

> **Note: **The roll primary stat button will set a value to 3, if you are playing challenging you should changed the rolled value to 4 and fill in other values as you wish

### Selected character

Once you have created a character it will appear under the `CHARACTER SELECTION` heading. This will show a card for each character, which will all contain a `Select` and `Delete` button. Delete button will completely delete your character and Select will make your character the **`Selected Character`**. To use all of the functionality of the companion there must always be one **`Selected Character`**.

Characters can also be selected from the dropdown box in the `Header`. Once a character is a selected, their stats will be shown across the top of the pages, which provide 2 purposes. Firstly, they provide a persistent view of character stats, regardless of where you at the app. Secondly, the stats are buttons and can be clicked to take you to your `Character Sheet`.

After selecting a character you are automatically taken to the `Stats` page, which shows a character sheet for the **`Selected Character`**.

---

## Logs

There are two logs in the companion `Campaign Log` and `Background`. These logs are used to add fiction or metagame information to your campaign. The `Campaign Log` is for adding information about events, plot, story or anything related to the campaign that is not character specific. The `Background` page is for adding information specific to the **`Selected Character`**

> Logs are not intended for prose or journaling. To take more comprehensive notes see [#journals](#journals)

### Adding Logs

To add a log enter text into the text box at the bottom of a log page and press `SHIFT + ENTER` to enter fiction _(this information should be in character/roleplay)_. Alternatively press `CTRL + ENTER` to enter metagame information _(This information can be out of character/roleplay)_.

### Events

Events are logs that are automatically created by the app. These can help keep log of what is happening, whilst keeping the pace of the story flowing. The following narrative events are captured to the Campaign log:

| Event                                   | Text                                                                                                            |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Character Created                       | Solana began their journey in the Ironlands                                                                     |
| Add NPC                                 | Solana met Arsula the Elf                                                                                       |
| NPC Bond increased                      | The bond between Solana and Arsula the Elf increases                                                            |
| NPC Bond decreased                      | The bond between Solana and Arsula the Elf diminishes                                                           |
| NPC Location Changed                    | Arsula the Elf was last seen at the Snowsteinn settlement                                                       |
| New Location Created                    | Solana discovered the Boulderland settlement                                                                    |
| Experience Increase                     | Solana's experience grows                                                                                       |
| Experience Decreased                    | Solana's experience diminishes                                                                                  |
| Debility Added                          | Solana is Wounded                                                                                               |
| Debility Removed                        | Solana is no longer Wounded                                                                                     |
| Create Vow/Quest/Journey                | Solana swore a vow: To find the Iron Urn of Taeen                                                               |
| Make progress towards Vow/Quest/Journey | Solana made progress towards their vow: To find the Iron Urn of Taeen                                           |
| Lose progress towards Vow/Quest/Journey | Solana loses ground towards their vow: To find the Iron Urn of Taeen                                            |
| Complete Vow/Quest/Journey              | Solana fulfilled a vow: To find the Iron Urn of Taeen                                                           |
| Vow/Quest/Journey cancelled             | Solana forsaken a vow: To find the Iron Urn of Taeen                                                            |
| Add new Item to inventory               | Solana acquired a new item: The shard of Dismashk                                                               |
| Delete Item from inventory              | Solana no longer has the item: The shard of Dismashk                                                            |
| Acquire new asset                       | Solana acquired a new asset: Cave Lion                                                                          |
| Removed asset                           | Solana no longer has the asset: Cave Lion                                                                       |
| Discovered Foe                          | Solana discovered a new foe: A Clutter of Spider Wolves                                                         |
| Gain progress against Foe               | Solana made progress towards defeating their foe: A Clutter of Spider Wolves                                    |
| Lose progress against Foe               | Solana loses ground towards their foe: A Clutter of Spider Wolves                                               |
| Cancel Foe                              | Solana lost sight of the foe: A Clutter of Spider Wolves                                                        |
| Defeat Foe                              | Solana defeated the foe: A Clutter of Spider Wolves                                                             |
| Delve site Discovered                   | Solana discovered a new site to delve: Ingegerd's Hollow                                                        |
| Envision surroundings of a Delve        | Solana explores the surroundings of the Ingegerd's Hollow and notes a new feature: Dwellings or gathering place |
| Consider your approach                  | Solana Progresses through the delve site: Ingegerd's Hollow using their Edge                                    |
| Reveal a danger                         | Solana revealed a danger in the delve site: Ingegerd's Hollow: Unexpected disciples are revealed                |
| Find an opportunity                     | Solana found an opportunity in the delve site: Ingegerd's Hollow: You encounter a denizen in need of help.      |
| Fight a delve Foe                       | Solana discovered a new foe (Mystic) in the delve site: Ingegerd's Hollow                                       |
| Progress gained against delve foe       | Solana made progress against a foe (Mystic) in the delve site: Ingegerd's Hollow                                |
| Progress lost against a delve foe       | Solana loses ground against a foe (Mystic) in the delve site: Ingegerd's Hollow                                 |
| delve foe defeated                      | Solana defeated a foe (Mystic) in the delve site: Ingegerd's Hollow                                             |
| delve foe deleted                       | Solana lost sight of a foe (Mystic) in the delve site: Ingegerd's Hollow                                        |

### Viewing, Filtering and Deleting Logs

Once logs are added they will appear in the box above the input box. They will appear in chronological order and are all timestamped with the date/time they were added. The box will auto scroll to the bottom of the page on refresh, or when a new log item is added. They can be filtered using the filter drop down at the top.

---

## Journals

The journal screen allows you to take more comprehensive notes than the log allows. This uses a markdown text editor to create rich text notes:

![https://i.imgur.com/5xnOOWo.png](https://i.imgur.com/5xnOOWo.png)



The editor supports Grammarly, and also supports a wide range of style options that can be entered in various ways. 

#### Adding lines using + or slash commands

The editor supports inline additions of popular style items. New lines show a plus icon. Clicking this plus icon or typing a forward slash `/` will bring up a context menu:

![https://i.imgur.com/iLwaoNo.png](https://i.imgur.com/iLwaoNo.png)

![https://i.imgur.com/6I4rHLa.png](https://i.imgur.com/6I4rHLa.png)

This can be used to add styled items. 

You can also use markdown syntax here are some examples of the key commands available:

| Action    | Command                                                      |
| --------- | ------------------------------------------------------------ |
| Heading 1 | # Heading                                                    |
| Heading 2 | ## Heading 2                                                 |
| Heading 3 | ### Heading 3                                                |
| Heading 4 | #### Heading 4                                               |
| Bold      | This is **\*\*bold\*\***                                     |
| Italic    | This is *\*Italic\**                                         |
| Bullets   | * bullet<br />* bullet2<br /><br />- bullet<br />- bullet2   |
| Quote     | > This is a quote                                            |
| Images    | \!\[http://image.url/\](http://image.url/)                   |
| Code      | ``Use single `backticks` to block code like this ``          |
| Line      | ---                                                          |
| Urls      | can be pasted in. Double click a link to bring up a popup that will allow you to navigate to the link |
|           |                                                              |

> For a thorough breakdown of what commands are available see [https://www.markdownguide.org/basic-syntax/](https://www.markdownguide.org/basic-syntax/). 
>
> **NOTE:** This editor does not a complete support for all markdown commands, but there are many available. Its worth experimenting to see which commands are available. 



##### Saving Journal Entries

See [Data Management](#data-management) 

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

![https://i.imgur.com/0e3AJpa.png](https://i.imgur.com/0e3AJpa.png)

To enter combat, create `Active Foes` by either selecting from the `Category` and `Type` drop boxes or click `Roll Random Foe`. A preview of the foe is shown above the `+ Add Foe` button. Multiple `Active Foes` can be added and each Foe will have an individual `combat track`.

### Foe Card

The `Foe Card` provides information and context about your foes:

![image-20210316095147244](https://i.imgur.com/nMwPOyV.png)

The title bar of each `Foe Card` contains the `Foe Type` and `Rank` of each Foe. The rank determines how much harm a foe can inflict on a player and also determines the combat progression per harm done. This can be changed with the drop down. The `Foe Card` also contains the page number of the Foe and the source so you can refer to the books for more information.

#### Roll Progress

At any point you can `Roll Progress`. However, this is dangerous early in the fight, Rolling progress involves rolling the value of the progression track against the challenge dice. If your `Combat Progress` is only **2**, you will essentially roll **2** against two **D10s**. This strongly increases the chance of a Miss, which has consequences. When you click `Roll Progress` the outcome is resolved in the card. If the roll is successful, the foe moves to the defeated foes.

If the roll is successful you can delete the character and move on. If it is not you must `Pay the Price`

> For information about **Combat** see **Chapter 3** of the Ironsworn rulebook

### Edge Case

The Ironsworn rules allows you to form packs of NPCs that have a single track. This app does not implement packs as such, However, the quick combat window allows you to create foes (or packs) just by name alone and they get a progress track and a rank. Use this function to create a pack of foes:

![https://i.imgur.com/99HkX8B.png](https://i.imgur.com/99HkX8B.png)

> For information about **NPC Packs** see **Chapter 5** of the Ironsworn rulebook

You can add descriptive text to this foe type just to provide context, if needed.

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

## Delve

Most sections of the companion are just a mechanism to log data. Other than Event logs and Momentum burning, most play is not guided in any way. Delve is the only guided play section of the companion. This is because delves have a very rule based approach to how you play so it made sense for this section.

### Create a Delve Site

First create a delve site using the interface used throughout the companion.

![https://i.imgur.com/D2WgLTg.png](https://i.imgur.com/D2WgLTg.png)

One the site has been discovered. It will be selected in the drop down below. Select a site from the drop down and click `Enter The Site`

> You can also delete a site from here.

![https://i.imgur.com/RnAuAqy.png](https://i.imgur.com/RnAuAqy.png)

### Renaming a site

You can click on the delve site name and rename it at any point.

![https://i.imgur.com/kliw4QR.png](https://i.imgur.com/kliw4QR.png)

### Exit Site

You can leave the page and come back to a delve site, Leave site is intended for when your character actually leaves, there are penalties for doing this and

### Show Reference Information

Click Show Theme/Domain Card to display the reference card as a reference

![https://i.imgur.com/76Z5sZe.png](https://i.imgur.com/76Z5sZe.png)

Click show Denizen Matrix (this is configured using the [Denizen Config](#denizen-config))

![https://i.imgur.com/D8bpsS0.png](https://i.imgur.com/D8bpsS0.png)

### Enter the Delve site

Once you're in the delve site. There are a plethora of controls and features.

![https://i.imgur.com/ZqUBenX.png](https://i.imgur.com/ZqUBenX.png)

### Delve the depths

The delve the depths section has a series of boxes that correspond to the levels in delve. The level you are currently on is highlighted with a dark title bar.

1. Start with `Envision your surroundings` and press `Reveal` This will revel a `Feature` and move your to the `Consider your approach` level.

2. Choose `Haste` (Edge), `Stealth` (Shadow) or `Observation` (Wits). This will activate the stat for the following action roll and move you to the `Action` section.
3. Press `Roll` on the `Action` box. This will decide how your character progresses through.

> The flow of play is outlined on Page 45 of the Delve rulesbook.

4. Reveal Danger has a reveal button that will reveal dangers from the Theme/Domain. If the danger contains the word 'Denizen' it will be replaced with the Denizen's name and a Fight button will be displayed. A `delve deeper` button will also be shown. Clicking `Delve Deeper` will take you back to level 1

   ![https://i.imgur.com/fszigdW.png](https://i.imgur.com/fszigdW.png)

5. Find an opportunity box gives you the option to choose an opportunity if you score a strong hit, or will choose one for you on the right type of weak hit. The word denizen is replaced with a denizen name and a fight button is shown (this gives the player the option to fight should they wish to though it would depend on the situation)

   ![https://i.imgur.com/9rapcco.png](https://i.imgur.com/9rapcco.png)

   6. Some weak hits will roll a path choice, where you can choose to mark progress and go back to level 1 or find an opportunity.

   ![https://i.imgur.com/x3apIs2.png](https://i.imgur.com/x3apIs2.png)

   Throughout this guided play progress is automatically logged. When it is at a high enough level, the `Locate your Objective` progress roll button is available.

   If you choose to fight a Denizen a Foe card is added to the bottom of the page and they become an active encounter. Should you wish to envision this as a pack you could either just do that and use a single card, or use the quick combat window to manage the delve combat.

   > Foe ranks can be edited should you wish to use the optional **Risk Zone** rule

## Denizen Config

The denizen config probably needs the most documentation as this page directly drives the denizen matrix.

This page is essentially a sea of checkboxes. Each checkbox represents a matrix between a Foe/Theme/Domain against a Tag.

This is largely driven by RSEK's matrix generator. Though not exactly implemented with parity.

![https://i.imgur.com/phBbxid.png](https://i.imgur.com/phBbxid.png)

### Example:

The Delve is a Wild Frozen Cavern.

The Wild Theme is Tagged with `Wild` and `Squatter`

The Frozen Cavern Domain is Tagged with `Arctic` and `Subterranean`

When the denizen matrix is populated it gets all of the Foes that share Tags with the selected Theme/Domain.

A Wolf is Tagged with `Arctic`, `Pass`, `Shadowfen`, `Tanglewood`, `Wild`, `Squatter` and `Wastes`

Thus, a wolf shares 3 tags with a Wild Frozen Cavern.

Every time a Foe is found to share a tag it is added to a list, so, in this case **9** wolves are added to this list. This is repeated for every foe.

With default tags, and a Wild Frozen Cavern a total of **200** denizens are added to the list:

![https://i.imgur.com/nbAWYNJ.png](https://i.imgur.com/nbAWYNJ.png)

This list is then rolled on when populating the matrix. The tag system provides weighting and from this list it is mathematically more probable for `Nightspawn` to be picked than `Wyvern`.

#### Rules

Epic and Extreme foes can only appear as `Rare` or `Unforeseen`

Foes can not repeat within the same level of commonality, but cannot then appear in a lower commonality. i.e a Common Wolf cannot also be an uncommon wolf as this doesn't make sense.

## Asset/Delve Card/Foe Editors

### Create Cards

The asset builder allows you to create, copy, edit and delete cards.

Cards with (Core) in the name cannot be edited or deleted. They are centrally maintained by the [Data Management](data-management) page. To update these data go to the **[Data Management](data-management)** page and press **Update Datasworn**

To create a new Card either fill out the various fields and press **Save** or select an existing card, make the required changes and press **Save.** As you make changes, those changes will be reflect live on the card nearest the input form. Use this to ensure your content fits inside the card (so that it will display/print correctly).

**Cards MUST have a unique name**. Therefore you will be unable to click **Save.** unless a unique name is chosen.

#### Buttons

The buttons on this page are dynamic. A button will only appear if an action is allowed. For example, since you can't delete or modify a core asset. When a core asset is selected, the only button available to you is `Save as Copy`. However, this button only appears when the name is unique. Similarly, if you're creating a new asset, then the `Delete`, `Save as Copy` and `Save Changes` button are hidden.

There are four buttons in total:

| Button         | Action                                    | Rules                                                                                                                                                                                                                                                                                                                                          |
| -------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add            | Adds a new Card                           | Is not shown if existing card is selected<br />Name cannot be blank                                                                                                                                                                                                                                                                            |
| Save Changes   | Saves changes to an existing card         | Cannot add if Name is blank, <br />Can only save changes if the selected cards is not a core cards, <br />The card Name cannot be different to the previous version. <br />At least one other field must be different to the previous version.                                                                                                 |
| Save as a Copy | Creates a new Card based on previous card | Cannot add if Name is blank, <br />Cannot add asset if selected card is core card. <br />Cannot add if an card exists with same name<br />cannot add if the card is same as default card (ie no changes)<br />cannot add if card with same id already exists<br />add button is not shown when modifying an existing card (copy shown instead) |
| Delete         | Card                                      | Existing asset cannot be a core card<br />Cannot be an card that is not yet created                                                                                                                                                                                                                                                            |

#### Card Deck

At the bottom of the Card Editors, all the existing cards can be viewed on the page. At the top of the Card Deck, there is a `Print Cards` button, which will modify the page and hide non essential visual elements to create an automated printable page. This process will also automatically generate card backs and place them in order so that they print correctly on double sided printers. (if you don't want card backs you can select those pages not to print in the printer options)

> **KNOWN ISSUE:** The way the page is generate the last page always generates an almost blank page. This should be removed in the printer settings.

---

## Moves

The moves page is mechanically similar to the Oracles page in that you can click on a table on the left and details will be provided on the right. There are no roll buttons here, and the tables are provided here as a reference to reduce the need to look things up in the book.

**![https://i.imgur.com/Etb113P.png](https://i.imgur.com/Etb113P.png)**

## Roll

The `Roll` button in the `Sidebar` takes you to a simple Dice Roller. This uses the same Dice Roller that drives the tables, but allows you to specify a series of dice and roll them. The dice roller in the `Footer` is functionally more useful to Ironsworn, but this was added for those that want to roll on some dice for whatever reason.

---

## Data Management

This companion has a persistent state meaning that you can move between pages and your textboxes wont clear when you return. This is done through your browser's `local storage`. The `Data Management` page allows you to `Reset`, `Load` or `Save` your gamestate at any point.

![https://i.imgur.com/38qkMed.png](https://i.imgur.com/38qkMed.png)

### Saving and Loading the Game State

The `Save` Button allows you to download your gamestate to an ISGS file that you can store on your computer. This is a JSON file. The file type is obfuscated to make it not openable on to everyday users. However, if you a programmer and wish to delve deeper into the file it can be opened in any JSON editor. You don't need to know what the file is, except that it is a text file that contains all of the information to maintain your game save. It also allows your to move your game between browsers or computers.

Use the checkboxes to select which elements you would like to Save or Load and press the corresponding button.

The `Reset` button wipes the gamestate back to defaults. This cannot be reversed so ensure you save your game before doing this.



### Saving Journals 

This app allows you to save journals as save data in the same way as described above. However, the journal entries can also be exported in a zip file, with each file be saved as a markdown `.md` file. To do this simply click Save Journals. The archive will respect the hierarchy set out in the Journal page and folders will be created for parent documents.

![https://i.imgur.com/FFaBXpd.png](https://i.imgur.com/FFaBXpd.png)

![https://i.imgur.com/zWlV9Eh.png](https://i.imgur.com/zWlV9Eh.png)

 

### Updating Datasworn

This platform makes use of RSEK's datasworn. If your data falls behind RSEKs datasworn data, you can use the update button to bring them up to date.

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
