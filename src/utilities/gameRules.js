'use stritc';

import { ironsworn as gameRules } from "dataforged";
import helpers from "./helpers";

function getMoveByName(moveName) {
  return gameRules["Move Categories"].map(mc => mc.Moves).flat().find(m => m.Name === moveName);
}

function getMoveCategories() {
  return gameRules['Move Categories'].map(mc => mc.Name).sort();
}

function getMovesInCategory(categoryName) {
  return gameRules['Move Categories'].find(mc => mc.Name === categoryName)["Moves"].sort(helpers.sortByProperty('Name'));
}

function getAssetTypes() {
  return gameRules['Asset Types'].map(at => at.Name).sort();
}

function getAssetById(id) {
  console.log(id);
  return getAssetsAll().find(a => a.$id === id);
}

function getAssetsAll() {
  return gameRules['Asset Types'].map(at => at.Assets).flat().sort(helpers.sortByProperty("Name"));
}

async function getMoves() {
  // return fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_moves.json")
  return new Promise ((resolve, reject) => { // Just wrapping this as a promise for backwards compatibiility with existing code...
    const moves = { Categories: gameRules["Move Categories"] };
    resolve (moves);
  });
}


export default {
  getMoveByName,
  getMoveCategories,
  getMovesInCategory,
  getAssetTypes,
  getAssetsAll,
  getAssetById,
  getMoves
}
