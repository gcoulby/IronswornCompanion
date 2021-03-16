class NPC {
  name = "";
  rank = "";
  features = [];
  drives = [];
  tactics = [];
  bonds = [];
  progress = 0;
  progressPerHarm = 0;
  inflictsHarm = 0;
  takesHarm() {
    switch (rank) {
      case "Troublesome":
        this.progress += 3;
        break;
      case "Dangerous":
        this.progress += 2;
        break;
      case "Formidable":
        this.progress += 1;
        break;
      case "Extreme":
        this.progress += 2;
        break;
      case "Epic":
        this.progress += 1;
        break;
    }
    this.progress = this.progress > 10 ? 10 : this.progress;
  }

  inflictsHarm() {}
}

export default NPC;
