class DefaultDelveCard {
  id = "";
  Name = "";
  Summary = "";
  core = false;
  front = true;
  icon = "perspective-dice-six-faces-random";
  Tags = [];
  Features = [];
  Dangers = [];
  Source = {
    Name: "User",
    Page: "n/a",
  };
  constructor(type) {
    this.Type = type;
    if (type === "Theme") {
      this.Dangers = [
        {
          Chance: 5,
          Description: "",
          Min: 1,
        },
        {
          Chance: 10,
          Description: "",
          Min: 6,
        },
        {
          Chance: 12,
          Description: "",
          Min: 11,
        },
        {
          Chance: 14,
          Description: "",
          Min: 13,
        },
        {
          Chance: 16,
          Description: "",
          Min: 15,
        },
        {
          Chance: 18,
          Description: "",
          Min: 17,
        },
        {
          Chance: 20,
          Description: "",
          Min: 19,
        },
        {
          Chance: 22,
          Description: "",
          Min: 21,
        },
        {
          Chance: 24,
          Description: "",
          Min: 23,
        },
        {
          Chance: 26,
          Description: "",
          Min: 25,
        },
        {
          Chance: 28,
          Description: "",
          Min: 27,
        },
        {
          Chance: 30,
          Description: "",
          Min: 29,
        },
      ];
      this.Features = [
        {
          Chance: 4,
          Description: "",
          Min: 1,
        },
        {
          Chance: 8,
          Description: "",
          Min: 5,
        },
        {
          Chance: 12,
          Description: "",
          Min: 9,
        },
        {
          Chance: 16,
          Description: "",
          Min: 13,
        },
        {
          Chance: 20,
          Description: "",
          Min: 17,
        },
      ];
    } else if (type === "Domain") {
      this.Dangers = [
        {
          Chance: 33,
          Description: "",
          Min: 31,
        },
        {
          Chance: 36,
          Description: "",
          Min: 34,
        },
        {
          Chance: 39,
          Description: "",
          Min: 37,
        },
        {
          Chance: 42,
          Description: "",
          Min: 40,
        },
        {
          Chance: 45,
          Description: "",
          Min: 43,
        },
      ];
      this.Features = [
        {
          Chance: 43,
          Description: "",
          Min: 21,
        },
        {
          Chance: 56,
          Description: "",
          Min: 44,
        },
        {
          Chance: 64,
          Description: "",
          Min: 57,
        },
        {
          Chance: 68,
          Description: "",
          Min: 65,
        },
        {
          Chance: 72,
          Description: "",
          Min: 69,
        },
        {
          Chance: 76,
          Description: "",
          Min: 73,
        },
        {
          Chance: 80,
          Description: "",
          Min: 77,
        },
        {
          Chance: 84,
          Description: "",
          Min: 81,
        },
        {
          Chance: 88,
          Description: "",
          Min: 85,
        },
        {
          Chance: 98,
          Description: "Something unusual or unexpected",
          Min: 89,
        },
        {
          Chance: 99,
          Description: "You transition into a new theme",
          Min: 99,
        },
        {
          Chance: 100,
          Description: "You transition into a new domain",
          Min: 100,
        },
      ];
    }
  }
}
export default DefaultDelveCard;
