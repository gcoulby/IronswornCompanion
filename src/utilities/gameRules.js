'use stritc';

import dataforged from "dataforged";
import helpers from "./helpers";
import config from "../config/config";

let gameRules;
if (config.GAME_RULES === 'Ironsworn') {
  gameRules = dataforged.ironsworn;
}
if (config.GAME_RULES === 'Starforged') {
  gameRules = dataforged.starforged;
}

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
  if (!gameRules)
    return fetch("https:raw.githubusercontent.com/rsek/datasworn/master/ironsworn_moves.json").then((response) => response.json());
  return new Promise((resolve, reject) => { // Just wrapping this as a promise for backwards compatibiility with existing code...
    const moves = { Categories: gameRules["Move Categories"] };
    resolve(moves);
  });
}

async function getAssets() {
  if (!gameRules)
    return fetch("https:raw.githubusercontent.com/rsek/datasworn/master/ironsworn_assets.json").then((response) => response.json());
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

function getOracles() {
  if (!gameRules)
    return null;

  const oracles = [];
  function extractOracles(objs) {
    for (const obj of objs) {
      if (!obj.Oracles) {
        oracles.push(obj)
      } else {
        extractOracles(obj.Oracles);
      }
    }
  }
  extractOracles(gameRules['Oracle Categories']);

  let reformattedOracles = oracles.map(o => {
    const table = {};
    table.title = o.Name;
    table.source = o.Source.Title
    table.core = true;
    table.theme = o.Category.replace(/.*\//, '').replace(/_/g, ' ');
    table.prompts = o.Table.map(t => t.Result)
    return table;
  });

  // Combine the two names tables for Ironsworn
  if (config.GAME_RULES === 'Ironsworn') {
    const names = structuredClone(reformattedOracles.find(o => o.title === 'A'));
    names.prompts = [...names.prompts, ...reformattedOracles.find(o => o.title === 'B').prompts];
    names.title = "Ironlander Names";
    reformattedOracles.push(names);
    reformattedOracles = reformattedOracles.filter(o => o.title !== 'A' && o.title !== 'B');
  }

  return reformattedOracles;
}

export default {
  getMoveByName,
  getMoveCategories,
  getMovesInCategory,
  getAssetTypes,
  getAssetsAll,
  getAssetById,
  getMoves,
  getAssets,
  getOracles
}
