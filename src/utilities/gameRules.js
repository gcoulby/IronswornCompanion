'use stritc';

// import { ironsworn as gameRules } from "dataforged";
import { starforged as gameRules } from "dataforged";
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
  // return fetch("https:raw.githubusercontent.com/rsek/datasworn/master/ironsworn_moves.json").then((response) => response.json());
  return new Promise((resolve, reject) => { // Just wrapping this as a promise for backwards compatibiility with existing code...
    const moves = { Categories: gameRules["Move Categories"] };
    resolve(moves);
  });
}

async function getAssets() {
  // return fetch("https:raw.githubusercontent.com/rsek/datasworn/master/ironsworn_assets.json").then((response) => response.json());
  return new Promise((resolve, reject) => { // Just wrapping this as a promise for backwards compatibiility with existing code...
    const assets = gameRules['Asset Types'].map(at => at.Assets).flat();
    assets.map(a => {
      a['Asset Type'] = a['Asset Type'].replace(/.*\//, '');

      a['Input Fields'] = a.Inputs;
      delete a.Inputs;

      if (a['Condition Meter']) {
        a.Health = a['Condition Meter'].Max;
        a['Asset Track'] = a['Condition Meter'];
      }

      if (a['Input Fields']?.[0]?.Options?.length > 1) {
        a.MultiFieldAssetTrack = {
          Fields: a['Input Fields'][0].Options.map(o => {
            return {
              Name: o.Name,
              ActiveText: o.Name,
              InactiveText: '-',
              IsActive: false
            }
          })
        }
      }

      if (a['Input Fields']?.[0]) {
        a['Input Fields'] = a['Input Fields'].map(inputField => inputField.Name);
      }

      if (a.Abilities) {
        a.Abilities.map(a => {
          if (a.Inputs)
            a['Input Fields'] = a.Inputs;
          return a;
        })
      }

    });
    resolve({ Assets: assets });
  });
}


export default {
  getMoveByName,
  getMoveCategories,
  getMovesInCategory,
  getAssetTypes,
  getAssetsAll,
  getAssetById,
  getMoves,
  getAssets
}
