class Character {
  name = "";
  selected = false;
  stats = [];
  maxMomentum = 10;
  resetMomentum = 2;
  totalExperience = 0;
  spentExperience = 0;
  debilities = [
    { name: "Wounded", type: "conditions", active: false },
    { name: "Shaken", type: "conditions", active: false },
    { name: "Unprepared", type: "conditions", active: false },
    { name: "Encumbered", type: "conditions", active: false },
    { name: "Maimed", type: "banes", active: false },
    { name: "Corrupted", type: "banes", active: false },
    { name: "Cursed", type: "burdens", active: false },
    { name: "Tormented", type: "burdens", active: false },
  ];
  progressions = [];
  background = [];
  vows = [];
  quests = [];
  companions = [];
  bonds = 0;
  goals = [];
  assets = [];
}

export default Character;
