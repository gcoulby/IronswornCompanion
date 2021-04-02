import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DiceRoller from "./dice_roller";
import RollIcon from "./rollIcon";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class World extends Component {
  state = {
    tabs: [
      {
        title: "The Old World",
        eventKey: "old-world",
        truths: [
          {
            truth:
              "The savage clans called the Skulde invaded the kingdoms of the Old World. Our armies fell. Most were killed or taken into slavery. Those who escaped set sail aboard anything that would float. After an arduous months-long voyage, the survivors made landfall upon the Ironlands.",
            questStarter:
              "You are a descendant of the Skulde. Because of your heritage, your family has long borne the distrust of your fellow Ironlanders. Now, a small force of Skulde have landed on our shores. Are they the harbinger of an invasion? Where do your loyalties lie?",
          },
          {
            truth:
              "The sickness moved like a horrible wave across the Old World, killing all in its path. Thousands fled aboard ships. However, the plague could not be outrun. On many ships, the disease was contained through ruthless measures—tossing overboard any who exhibited the slightest symptom. Other ships were forever lost. In the end, those who survived found the Ironlands and made it their new home. Some say we will forever be cursed by those we left behind.",
            questStarter:
              "A settlement is stricken by disease. Though this sickness bears some similarities to the Old World plague, it doesn’t kill its victims. Instead, it changes them. How does this disease manifest? Why do you swear to seek out a cure?",
          },
          {
            truth:
              "The Old World could no longer sustain us. We were too large in number. We had felled the forests. Our crops withered in the barren ground. The cities and villages overflowed with desperate, hungry people. Petty kings battled for scraps. We cast our fate to the sea and found the Ironlands. A new world. A fresh start.",
            questStarter:
              "Decades ago, the exodus ended. Since then, no ships have sailed here from the Old World. Until now. Word comes of a single ship, newly arrived across the vast ocean, grounded on the rocks of the Barrier Islands. When you hear the name of this ship, you swear to uncover the fate of its passengers. Why is it so important to you?",
          },
        ],
      },
      {
        title: "Iron",
        eventKey: "iron",
        truths: [
          {
            truth:
              "The imposing hills and mountains of the Ironlands are rich in iron ore. Most prized of all is the star-forged black iron.",
            questStarter:
              "The caravan, bound for the distant southlands, left the mining settlement last season but never arrived at its destination. It carried a bounty of black iron. Why is finding this lost caravan so important to you?",
          },
          {
            truth:
              "The weather is bleak. Rain and wind sweep in from the ocean. The winters are long and bitter. One of the first settlers complained, “Only those made of iron dare live in this foul place”—and thus our land was named.",
            questStarter:
              "The harvest fell short. The unrelenting snows left the village isolated. The food is running out. What will you do to see these people through this harsh season?",
          },
          {
            truth:
              "Inscrutable metal pillars are found throughout the land. They are iron gray, and smooth as river stone. No one knows their purpose. Some say they are as old as the world. Some, such as the Iron Priests, worship them and swear vows upon them. Most make the warding sign and hurry along their way when they happen across one. The pillars do not tarnish, and even the sharpest blade cannot mark them.",
            questStarter:
              "Your dreams are haunted by visions of a pillar which stands in an unfamiliar landscape. What do you see? Why are you sworn to seek it out?",
          },
        ],
      },
      {
        title: "Legacies",
        eventKey: "legacies",
        truths: [
          {
            truth: "We are the first humans to walk these lands",
            questStarter:
              "In the writings of one of the first settlers, there is a description of a glade in the heart of the Deep Wilds. The spirits of this place are said to grant a miraculous blessing. What boon does it bestow?",
          },
          {
            truth:
              "Other humans sailed here from the Old World untold years ago, but all that is left of them is a savage, feral people we call the broken. Is their fate to become our own?",
            questStarter:
              "You find a child—one of the broken. It is wounded, and hunted by others of its kind. Do you protect it, even at the risk of inviting the wrath of the broken tribes?",
          },
          {
            truth:
              "Before the Ironlanders, before even the firstborn, another people lived here. Their ancient ruins are found throughout the Ironlands.",
            questStarter:
              "Miners uncovered an underground ruin. Thereafter, the people of the settlement are haunted by strange dreams. The ruins call to them, they say. Several have disappeared in that dark, ancient place— including someone important to you.",
          },
        ],
      },
      {
        title: "Communities",
        eventKey: "communities",
        truths: [
          {
            truth:
              "We are few in number in this accursed land. Most rarely have contact with anyone outside our own small steading or village, and strangers are viewed with deep suspicion.",
            questStarter:
              "In the dead of winter, a desperate man arrives at a snowbound steading. He is wounded, hungry, and nearly frozen to death. His family has been taken. By whom? Will you brave the merciless winter to save them?",
          },
          {
            truth:
              "We live in communities called circles. These are settlements ranging in size from a steading with a few families to a village of several hundred. Some circles belong to nomadic folk. Some powerful circles might include a cluster of settlements. We trade (and sometimes feud) with other circles.",
            questStarter:
              "A decades-long feud between two circles has flared into open conflict. What is the cause of this dispute? Do you join in the fight, or swear to put a stop to it?",
          },
          {
            truth:
              "We have forged the Ironlands into a home. Villages within the Havens are connected by well-trod roads. Trade caravans travel between settlements in the Havens and those in outlying regions. Even so, much of this land is untamed.",
            questStarter:
              "Caravans are forced to pay for passage along a trade road. This payment, one-quarter of the goods carried, leaves several communities without sufficient winter stores. Who is making these demands? How will you set things right?",
          },
        ],
      },
      {
        title: "Leaders",
        eventKey: "leaders",
        truths: [
          {
            truth:
              "Leadership is as varied as the people. Some communities are governed by the head of a powerful family. Or, they have a council of elders who make decisions and settle disputes. In others, the priests hold sway. For some, it is duels in the circle that decide.",
            questStarter:
              "You have vivid reoccurring dreams of an Ironlands city. It has strong stone walls, bustling markets, and a keep on a high hill. And so many people! Nowhere in the Ironlands does such a city exist. In your dreams, you are the ruler of this city. Somehow, no matter how long it takes, you must make this vision a reality.",
          },
          {
            truth:
              "Each of our communities has its own leader, called an overseer. Every seventh spring, the people affirm their current overseer or choose a new one. Some overseers wear the iron circlet reluctantly, while others thirst for power and gain it through schemes or threats.",
            questStarter:
              "An overseer has fallen ill. She is sure to die without help, and the illness is unknown to the village healer. Poison, or perhaps even foul magic, is suspected. The families in the community are now at each other’s throats as they position their preferred candidates to take up the iron circlet. Will you discover the truth of the overseer’s illness and restore her to health?",
          },
          {
            truth:
              "Numerous clan-chiefs rule over petty domains. Most are intent on becoming the one true king. Their squabbles will be our undoing.",
            questStarter:
              "You secretly possess one-half of the True Crown, an Old World relic. Centuries ago, this crown was broken in two when an assassin’s axe split the head of the supreme ruler. You are descended from that lineage. Who gave you this relic? Will you find the other half of the broken crown and attempt to unite the clans under your rule? Or, do you see another use for it?",
          },
        ],
      },
      {
        title: "Defense",
        eventKey: "defense",
        truths: [
          {
            truth:
              "Here in the Ironlands, supplies are too precious, and the lands are too sparsely populated, to support organized fighting forces. When a community is threatened, the people stand together to protect their own.",
            questStarter:
              "A settlement is unable, or unwilling, to defend itself against an imminent threat. Why? What peril do they face? What will you do to protect them?",
          },
          {
            truth:
              "The wardens are our soldiers, guards, and militia. They serve their communities by standing sentry, patrolling surrounding lands, and organizing defenses in times of crisis. Most have strong ties to their community. Others, called free wardens, are wandering mercenaries who hire on to serve a community or protect caravans.",
            questStarter:
              "You come upon a dying warden. She tells you of an important mission, and charges you with its completion. “Swear to me,” she says, reaching out with a bloodied hand to give you an object crucial to the quest. What is it?",
          },
          {
            truth:
              "Our warbands are rallied to strike at our enemies or defend our holdings. Though not nearly as impressive as the armies that once marched across the Old World, these forces are as well-trained and equipped as their communities can manage. The banners of the warbands are adorned with depictions of their Old World history and Ironland victories.",
            questStarter:
              "A warband was wiped out in a battle against an overwhelming enemy. What is your connection to this band? Who defeated them? Will you carry their banner on a quest for vengeance, or do you vow to see it brought home to a place of honor?",
          },
        ],
      },
      {
        title: "Mysticism",
        eventKey: "mysticism",
        truths: [
          {
            truth:
              "Some still find comfort in the old ways. They call on mystics to divine the fortune of their newborn, or ask them to perform rituals to invoke a bountiful harvest. Others act out of fear against those who they suspect of having power. However, most folk believe true magic—if it ever existed— is lost to us now.",
            questStarter:
              "Someone close to you is accused of cursing a settlement, causing fields to go fallow and cattle to become sick. What is the evidence of this? Will you defend this person and uncover the true cause of the settlement’s troubles?",
          },
          {
            truth: "Magic is rare and dangerous, but those few who wield the power are truly gifted.",
            questStarter:
              "You have heard stories of someone who wields true power. They live in an isolated settlement far away. Who told you of this mystic? Are they feared or respected? Why do you swear to seek them out?",
          },
          {
            truth:
              "Magic courses through this land as the rivers flow through the hills. The power is there for those who choose to harness it, and even the common folk often know a helpful ritual or two.",
            questStarter:
              "Someone you love walked the paths of power, and succumbed to it. Who are they? Why did they fall into darkness? Where are they now? Do you seek to save them or defeat them?",
          },
        ],
      },
      {
        title: "Religion",
        eventKey: "religion",
        truths: [
          {
            truth:
              "A few Ironlanders still make signs or mumble prayers out of habit or tradition, but most believe the gods long ago abandoned us.",
            questStarter:
              "A charismatic Ironlander, encouraging her followers to renounce the vestiges of Old World religions, proposes a new path for this new world. What doctrine does she teach? What does she seek to achieve? Are you sworn to aid or stop her?",
          },
          {
            truth: "The people honor old gods and new. In this harsh land, a prayer is a simple but powerful comfort.",
            questStarter:
              "An Ironlander is determined to make a pilgrimage into dangerous lands. What holy place do they seek? Why do you swear to aid them on this journey? Who seeks to stop them and why?",
          },
          {
            truth:
              "Our gods are many. They make themselves known through manifestations and miracles. Some say they even secretly walk among us. The priests convey the will of the gods and hold sway over many communities.",
            questStarter:
              "You bear the mark of a god. What is it? The priests declare this as a sign you are chosen to fulfill a destiny. Do you accept this fate, and swear to see it through, or are you determined to see it undone? What force opposes you?",
          },
        ],
      },
      {
        title: "Firstborn",
        eventKey: "firstborn",
        truths: [
          {
            truth:
              "The firstborn have passed into legend. Some say the remnants of the old tribes still dwell in deep forests or high mountains. Most believe they were never anything more than myth.",
            questStarter:
              "Someone obsessed with the firstborn wants to find evidence of their existence. This will require an expedition into the far reaches of the Ironlands. What is your role in this mission?",
          },
          {
            truth: "The firstborn live in isolation and are fiercely protective of their own lands.",
            questStarter:
              "The elf, outcast from his kind, lives with Ironlanders. Over time, he became a part of the community. Now, he is dying. He yearns to return to his people before he passes. Does he seek absolution or justice? Why do you swear to help him? What force opposes his return?",
          },
          {
            truth:
              "The firstborn hold sway in the Ironlands. The elves of the deep forests and the giants of the hills tolerate us and even trade with us—for now. Ironlanders fear the day they decide we are no longer welcome here.",
            questStarter:
              "Humans and giants are on the brink of war. What has happened? Who do you side with? Can anything be done to defuse the situation?",
          },
        ],
      },
      {
        title: "Beasts",
        eventKey: "beasts",
        truths: [
          {
            truth:
              "The beasts of old are nothing but legend. A few who travel into the deep forests and high mountains return with wild tales of monstrous creatures, but they are obviously delusional. No such things exist.",
            questStarter:
              "You were witness to an attack by what you thought was an animal of monstrous proportions. No one believes you. In fact, you are accused of the murder you blame on this beast. How can you prove your innocence? Can you even trust your own memories of the event?",
          },
          {
            truth: "Monstrous beasts stalk the wild areas of the Ironlands.",
            questStarter:
              "A prominent Ironlander is consumed with the need to bring vengeance upon a specific beast. What makes this creature distinctive? How did it earn the wrath of this Ironlander? Do you aid this person in their quest, or act to prevent their blind hate from destroying more than just the beast?",
          },
          {
            truth:
              "Beasts of all sorts roam the Ironlands. They dwell primarily in the reaches, but range into the settled lands to hunt. There, they often prey on cattle, but attacks on travelers, caravans, or even settlements are not uncommon.",
            questStarter:
              "Professional slayers earn their keep by killing beasts. This particular slayer, famed throughout the Ironlands for her numerous kills, has gone missing on a hunt. Did she finally meet her match, or is something more nefarious at play. What is your connection to her?",
          },
        ],
      },
      {
        title: "Horrors",
        eventKey: "horrors",
        truths: [
          {
            truth: "Nothing but stories to frighten children.",
            questStarter:
              "The murders began last season. Local gossip suggests they are the work of a vengeful horror, but there may be more mundane forces at work. What is your connection to these killings? What will you do to stop them?",
          },
          {
            truth:
              "We are wary of dark forests and deep waterways, for monsters lurk in those places. In the depths of the long-night, when all is wreathed in darkness, only fools venture beyond their homes.",
            questStarter:
              "You bear the scars of an attack by a horror. What was it? Are those scars physical, emotional, or both? How do you seek to make yourself whole again?",
          },
          {
            truth:
              "The dead do not rest in the Ironlands. At night we light torches, scatter salt, and post sentries at the gate. It is not enough. They are coming.",
            questStarter:
              "A group of Ironlanders establish a settlement in a territory cursed by a malevolent horror. What evil plagues this land? Why are the Ironlanders so intent on settling here? Will you aid them, or attempt to force them to give up this foolish undertaking?",
          },
        ],
      },
    ],
  };

  constructor(props) {
    super();
    if (props.world.categories === undefined) {
      const world = props.world;
      world.categories = [
        { id: "old-world", truths: [false, false, false] },
        { id: "iron", truths: [false, false, false] },
        { id: "legacies", truths: [false, false, false] },
        { id: "communities", truths: [false, false, false] },
        { id: "leaders", truths: [false, false, false] },
        { id: "defense", truths: [false, false, false] },
        { id: "mysticism", truths: [false, false, false] },
        { id: "religion", truths: [false, false, false] },
        { id: "firstborn", truths: [false, false, false] },
        { id: "beasts", truths: [false, false, false] },
        { id: "horrors", truths: [false, false, false] },
      ];
      this.setState({ world: world });
    }
    this.diceRoller = new DiceRoller();
  }

  /*=================================*/
  /*    Events
  /*=================================*/

  handleWorldTruthSelector = (e, tab, id) => {
    const world = this.props.world.categories.map((w) => {
      if (w.id == tab) w.truths[id] = e.target.checked;
      return w;
    });
    this.setState({ world: world });
  };

  handleRollWorldClick = () => {
    const world = this.props.world.categories.map((w) => {
      const die = this.diceRoller.roll([3]);
      for (let i = 0; i < w.truths.length; i++) {
        if (i == die[0].value) {
          w.truths[i] = true;
        } else w.truths[i] = false;
      }
      return w;
    });
    this.setState({ world: world });
  };

  handleCustomWorldDetailsInputChanged = (evt) => {
    const world = this.props.world;
    world.customWorldDetails = evt.target.value;
    this.setState({ world: world });
  };
  handleCustomWorldQuestStarterInputChanged = (evt) => {
    const world = this.props.world;
    world.customWorldQuestStarter = evt.target.value;
    this.setState({ world: world });
  };

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-dark mb-3" id="world-oracle" onClick={() => this.handleRollWorldClick()}>
          <RollIcon /> Roll a Random World
        </button>
        <div className="world-tabs">
          <Tabs defaultActiveKey="old-world" id="uncontrolled-tab-example">
            {this.state.tabs.map((tab) => (
              <Tab eventKey={tab.eventKey} title={tab.title}>
                <ul className="mt-4">
                  {tab.truths.map((truth) => (
                    <li key={UniqueKeyGenerator.generate()} className="card mb-2">
                      <label className="checkbox-card-label">
                        <input
                          key={UniqueKeyGenerator.generate()}
                          type="checkbox"
                          name="demo"
                          className="card-input-element d-none"
                          datatype={tab.eventKey}
                          checked={
                            this.props.world.categories.find((w) => w.id == tab.eventKey).truths[
                              this.state.tabs.find((t) => t.eventKey == tab.eventKey).truths.indexOf(truth)
                            ]
                          }
                          onChange={(e) =>
                            this.handleWorldTruthSelector(
                              e,
                              tab.eventKey,
                              this.state.tabs.find((t) => t.eventKey == tab.eventKey).truths.indexOf(truth)
                            )
                          }
                        ></input>
                        <div className="card card-body d-flex flex-row justify-content-between align-items-center">
                          <div className="truth-card">
                            <p className="truth">{truth.truth}</p>
                            <p className="quest-starter mb-4">
                              <span className="modesto">Quest Starter: </span>
                              {truth.questStarter}
                            </p>
                          </div>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </Tab>
            ))}
            <Tab eventKey="custom" title={"Custom"}>
              <React.Fragment>
                <div className="card card-body mt-4 world-card">
                  <span className="modesto">World Details:</span>
                  <textarea
                    className="form-control"
                    rows="15"
                    onChange={(e) => this.handleCustomWorldDetailsInputChanged(e, this)}
                    value={this.props.world.customWorldDetails}
                  ></textarea>
                  <span className="modesto mt-3">Quest Starter:</span>
                  <textarea
                    className="form-control"
                    onChange={(e) => this.handleCustomWorldQuestStarterInputChanged(e, this)}
                    value={this.props.world.customWorldQuestStarter}
                  ></textarea>
                </div>
              </React.Fragment>
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default World;
