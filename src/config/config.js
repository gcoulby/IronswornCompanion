'use strict';

const configs = {
  default: {
    // undefined GAME_RULES will use the datasworn data set
    GAME_RULES: process.env.REACT_APP_GAME_RULES,
    // GAME_RULES: 'Ironsworn',
    // GAME_RULES: 'STARFORGED',
    // GAME_RULES: undefined,
    NAME_TABLE: 'Ironlander Names',
    ROLE_TABLE: 'Character Role',
    GOAL_TABLE: 'Character Goal',
    CHARACTER_DESCRIPTOR_TABLE: 'Character Descriptor',
    SITE_TITLE: 'IRONSWORN'
  },
  STARFORGED: {
    NAME_TABLE: 'Given Name',
    ROLE_TABLE: 'Role',
    GOAL_TABLE: 'Goal',
    CHARACTER_DESCRIPTOR_TABLE: 'Revealed Aspect',
    SITE_TITLE: 'STARFORGED'
  },
  IRONSWORN: {
    ROLE_TABLE: 'Role',
    GOAL_TABLE: 'Goal',
    CHARACTER_DESCRIPTOR_TABLE: 'Descriptor',
  }
};

let config = configs.default;

if (process.env.NODE_ENV) config = Object.assign(configs.default, configs[process.env.NODE_ENV]);
if (configs.default.GAME_RULES) config = Object.assign(configs.default, configs[configs.default.GAME_RULES]);

module.exports = config;
