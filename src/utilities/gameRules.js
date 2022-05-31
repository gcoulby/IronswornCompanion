'use stritc';

import dataforged from "dataforged";
import helpers from "./helpers";
import config from "../config/config";
import truths from "../data/world-truths.json";

let gameRules;
if (config.GAME_RULES === 'IRONSWORN') {
  gameRules = dataforged.ironsworn;
}
if (config.GAME_RULES === 'STARFORGED') {
  gameRules = dataforged.starforged;
}

async function getMoves() {
  if (!gameRules)
    return fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_moves.json").then((response) => response.json());
  return new Promise((resolve, reject) => { // Just wrapping this as a promise for backwards compatibiility with existing code...
    const moves = { Categories: gameRules["Move Categories"] };
    resolve(moves);
  });
}

async function getAssets() {
  if (!gameRules)
    return fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_assets.json").then((response) => response.json());
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
  if (config.GAME_RULES === 'IRONSWORN') {
    const names = structuredClone(reformattedOracles.find(o => o.title === 'A'));
    names.prompts = [...names.prompts, ...reformattedOracles.find(o => o.title === 'B').prompts];
    names.title = "Ironlander Names";
    reformattedOracles.push(names);
    reformattedOracles = reformattedOracles.filter(o => o.title !== 'A' && o.title !== 'B');
  }

  return reformattedOracles;
}

function getFoes() {
  if (!gameRules)
    return fetch("https://raw.githubusercontent.com/rsek/datasworn/master/ironsworn_foes.json").then((response) => response.json());

  let foes = [];

  // Stargorged doesn't have these mapped into categories for some reason...
  if (config.GAME_RULES === "STARFORGED") {
    [...new Set(gameRules.Encounters.map(e => e.Nature))].map(c => {
      foes.push({
        Name: c + 's',
        Encounters: gameRules.Encounters.filter(e2 => e2.Nature === c),
      });
    })
  } else foes = gameRules.Encounters;

  return new Promise((resolve, reject) => {
    foes.forEach(c => {
      c.Foes = c.Encounters;
      c.Foes.forEach(e => {
        e.Source.Name = e.Source.Title;
        e.Quest = e['Quest Starter'];
      });
    });
    resolve({ Categories: foes });
  })
}

function getWorldTruths() {
  if (config.GAME_RULES === "STARFORGED") {
    truths.Starforged['Setting Truths'].forEach(truth => {
      truth.Options = truth.Table;
      truth.Options.forEach(option => {
        if (option.Subtable) {
          option.Options = option.Subtable;
          option.Subtable.forEach(subOption => {
            subOption.Description = subOption.Result;
          })
        }
      })
    })
    truths.Starforged['Setting Truths'].push({Name: 'Custom', Options: []});
    return new Promise((resolve, reject) => {
      resolve(truths.Starforged['Setting Truths']);
    })
  } else {
    truths.Ironsworn['Setting Truths'].push({Name: 'Custom', Options: []});
    return new Promise((resolve, reject) => {
      resolve(truths.Ironsworn['Setting Truths']);
    });
  };
}

export default {
  getMoves,
  getAssets,
  getOracles,
  getFoes,
  getWorldTruths
}
