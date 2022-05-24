'use strict';

const configs = {
  default: {
    // undefined GAME_RULES will use the datasworn data set
    GAME_RULES: process.env.REACT_APP_GAME_RULES,
    // GAME_RULES: 'Ironsworn',
    // GAME_RULES: 'Starforged',
    // GAME_RULES: undefined,
    get NAME_TABLE () {
      if (config.GAME_RULES === 'Starforged')
        return 'Given Name';
      return 'Ironlander Names';
    },
    get ROLE_TABLE () {
      if (config.GAME_RULES)
        return 'Role';
      return 'Character Role';
    },
    get GOAL_TABLE () {
      if (config.GAME_RULES)
        return 'Goal';
      return 'Character Goal';
    },
    get CHARACTER_DESCRIPTOR_TABLE () {
      if (config.GAME_RULES === 'Ironsworn')
        return 'Descriptor';
      if (config.GAME_RULES === 'Starforged')
        return 'Revealed Aspect';
      return 'Character Descriptor';
    }
  }
};

let config = configs.default;

if (process.env.NODE_ENV) config = Object.assign(configs.default, configs[process.env.NODE_ENV]);

module.exports = config;
