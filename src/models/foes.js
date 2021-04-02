const foes = [
  {
    Name: "Ironlanders",
    Foes: [
      {
        Name: "Broken",
        Tags: [
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "corrupted",
          "sentient",
          "squatter",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Common Folk",
        Tags: ["sentient", "squatter"],
      },
      {
        Name: "Hunter",
        Tags: ["marine", "pass", "shadowfen", "tanglewood", "wild", "sentient", "squatter", "plains", "wastes"],
      },
      {
        Name: "Mystic",
        Tags: [
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "corrupted",
          "faithful",
          "remnant",
          "sentient",
          "squatter",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Raider",
        Tags: ["marine", "pass", "shadowfen", "subterranean", "tanglewood", "sentient", "squatter", "plains", "wastes"],
      },
      {
        Name: "Warrior",
        Tags: ["marine", "pass", "shadowfen", "subterranean", "tanglewood", "faithful", "sentient", "plains", "wastes"],
      },
      {
        Name: "Husk",
        Tags: [
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "corrupted",
          "sentient",
          "squatter",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Zealot",
        Tags: [
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "faithful",
          "remnant",
          "sentient",
          "squatter",
          "plains",
          "wastes",
        ],
      },
    ],
  },
  {
    Name: "Firstborn",
    Foes: [
      {
        Name: "Elf",
        Tags: ["tanglewood", "wild", "sentient"],
      },
      {
        Name: "Giant",
        Tags: ["pass", "wild", "sentient", "wastes"],
      },
      {
        Name: "Primordial",
        Tags: ["arctic", "marine", "pass", "shadowfen", "tanglewood", "wild", "flying", "plains", "wastes"],
      },
      {
        Name: "Troll",
        Tags: ["shadowfen", "wild", "sentient", "DEVEL_freshwater"],
      },
      {
        Name: "Varou",
        Tags: ["tanglewood", "wild", "sentient"],
      },
      {
        Name: "Atanya",
        Tags: ["arctic", "marine", "wild", "sentient"],
      },
      {
        Name: "Merrow",
        Tags: ["marine", "shadowfen", "faithful", "wild", "remnant", "sentient"],
      },
    ],
  },
  {
    Name: "Animal",
    Foes: [
      {
        Name: "Bear",
        Tags: ["arctic", "pass", "shadowfen", "tanglewood", "wild", "squatter", "plains", "wastes"],
      },
      {
        Name: "Boar",
        Tags: ["shadowfen", "tanglewood", "wild", "squatter", "plains"],
      },
      {
        Name: "Gaunt",
        Tags: ["tanglewood", "wild"],
      },
      {
        Name: "Marsh Rat",
        Tags: ["shadowfen", "vermin", "wild"],
      },
      {
        Name: "Wolf",
        Tags: ["arctic", "pass", "shadowfen", "tanglewood", "wild", "squatter", "plains", "wastes"],
      },
      {
        Name: "Bladewing",
        Tags: ["pass", "shadowfen", "subterranean", "vermin", "wild", "squatter", "flying", "plains", "wastes"],
      },
      {
        Name: "Carrion Newt",
        Tags: ["shadowfen", "subterranean", "vermin", "wild", "DEVEL_freshwater"],
      },
      {
        Name: "Cave Lion",
        Tags: ["pass", "subterranean", "tanglewood", "wild", "squatter", "wastes"],
      },
      {
        Name: "Deep Rat",
        Tags: ["subterranean", "vermin", "wild", "squatter"],
      },
      {
        Name: "Nightmare Spider",
        Tags: ["subterranean", "tanglewood", "vermin", "wild", "squatter"],
      },
      {
        Name: "Shroud Crab",
        Tags: ["marine", "vermin", "wild"],
      },
      {
        Name: "Trog",
        Tags: ["subterranean", "vermin", "wild"],
      },
    ],
  },
  {
    Name: "Beast",
    Foes: [
      {
        Name: "Basilisk",
        Tags: ["shadowfen", "vermin", "wild", "DEVEL_freshwater"],
      },
      {
        Name: "Elder Beast",
        Tags: ["arctic", "marine", "pass", "shadowfen", "subterranean", "tanglewood", "wild", "flying", "plains"],
      },
      {
        Name: "Harrow Spider",
        Tags: ["tanglewood", "vermin", "wild"],
      },
      {
        Name: "Leviathan",
        Tags: ["marine", "wild"],
      },
      {
        Name: "Mammoth",
        Tags: ["wild", "plains", "wastes"],
      },
      {
        Name: "Wyvern",
        Tags: ["marine", "pass", "tanglewood", "vermin", "wild", "flying", "plains", "wastes"],
      },
      {
        Name: "Chitter",
        Tags: ["subterranean", "vermin", "wild", "squatter"],
      },
      {
        Name: "Gnarl",
        Tags: ["tanglewood", "wild"],
      },
      {
        Name: "Iron-Wracked Beast",
        Tags: [
          "arctic",
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "vermin",
          "corrupted",
          "wild",
          "flying",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Kraken",
        Tags: ["marine", "wild"],
      },
      {
        Name: "Nightspawn",
        Tags: [
          "arctic",
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "vermin",
          "corrupted",
          "faithful",
          "wild",
          "remnant",
          "squatter",
          "flying",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Rhaskar",
        Tags: ["arctic", "marine", "wild"],
      },
      {
        Name: "Wyrm",
        Tags: ["subterranean", "tanglewood", "wild"],
      },
    ],
  },
  {
    Name: "Horror",
    Foes: [
      {
        Name: "Bonewalker",
        Tags: ["arctic", "pass", "shadowfen", "subterranean", "tanglewood", "corrupted", "undead", "plains", "wastes"],
      },
      {
        Name: "Frostbound",
        Tags: ["arctic", "pass", "remnant", "undead", "wastes"],
      },
      {
        Name: "Chimera",
        Tags: [
          "arctic",
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "vermin",
          "corrupted",
          "flying",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Haunt",
        Tags: [
          "arctic",
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "remnant",
          "sentient",
          "squatter",
          "undead",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Hollow",
        Tags: ["tanglewood", "wild", "sentient", "undead"],
      },
      {
        Name: "Iron Revenant",
        Tags: [
          "arctic",
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "faithful",
          "remnant",
          "sentient",
          "undead",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Sodden",
        Tags: ["marine", "shadowfen", "remnant", "sentient", "undead", "DEVEL_freshwater"],
      },
      {
        Name: "Blighthound",
        Tags: ["arctic", "pass", "shadowfen", "subterranean", "tanglewood", "corrupted", "plains", "wastes"],
      },
      {
        Name: "Bog Rot",
        Tags: ["shadowfen", "corrupted", "remnant", "sentient", "undead"],
      },
      {
        Name: "Bonehorde",
        Tags: ["pass", "shadowfen", "subterranean", "tanglewood", "corrupted", "remnant", "undead", "plains", "wastes"],
      },
      {
        Name: "Thrall",
        Tags: [
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "remnant",
          "sentient",
          "squatter",
          "undead",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Wight",
        Tags: [
          "arctic",
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "faithful",
          "remnant",
          "sentient",
          "squatter",
          "undead",
          "plains",
          "wastes",
        ],
      },
    ],
  },
  {
    Name: "Anomaly",
    Foes: [
      {
        Name: "Blood Thorn",
        Tags: ["tanglewood", "wild", "immobile"],
      },
      {
        Name: "Circle of Stones",
        Tags: ["pass", "shadowfen", "tanglewood", "remnant", "sentient", "immobile", "plains", "wastes"],
      },
      {
        Name: "Glimmer",
        Tags: [
          "arctic",
          "marine",
          "pass",
          "shadowfen",
          "subterranean",
          "tanglewood",
          "corrupted",
          "sentient",
          "plains",
          "wastes",
        ],
      },
      {
        Name: "Gloom",
        Tags: ["shadowfen", "subterranean", "tanglewood", "corrupted", "flying"],
      },
      {
        Name: "Maelstrom",
        Tags: ["marine", "subterranean", "wild", "remnant"],
      },
      {
        Name: "Tempest",
        Tags: ["arctic", "marine", "pass", "shadowfen", "tanglewood", "flying", "plains", "wastes"],
      },
    ],
  },
];

export default foes;
