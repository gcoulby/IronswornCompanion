class Asset {
  id;
  title = "";
  assetType = "";
  iconClass = "ra ra-perspective-dice-random";
  levels = [
    { selected: true, text: "" },
    { selected: false, text: "" },
    { selected: false, text: "" },
  ];
  trackType = 0;
  trackCount = -1;
  trackValues = [];
  description = "";
  inputs = [];
}

defaultAssets: [];
