'use strict';

const { DiceRoller } = require('rpg-dice-roller');

const attributes = [
    'strength',
    'intelligence',
    'dexterity',
    'wisdom',
    'constitution',
    'charisma',
];

const modifiers = {
    1: -5,
    2: -4,
    3: -4,
    4: -3,
    5: -3,
    6: -2,
    7: -2,
    8: -1,
    9: -1,
    10: -0,
    11: -0,
    12: 1,
    13: 1,
    14: 2,
    15: 2,
    16: 3,
    17: 3,
    18: 4,
    19: 4,
    20: 5,
    21: 5,
    22: 6,
    23: 6,
    24: 7,
    25: 7,
    26: 8,
    27: 8,
    28: 9,
    29: 9,
    30: 10,
};

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (attr, player) => {
            const lastChar = attr[attr.length - 1];
            let advantage = false;
            let disadvantage = false;

            if (lastChar === '+') {
                advantage = true;
                attr = attr.replace('+', '').trim();
            }

            if (lastChar === '-') {
                disadvantage = true;
                attr = attr.replace('-', '').trim();
            }

            const roller = new DiceRoller();

            if (!attributes.includes(attr)) {
                return Broadcast.sayAt(
                    player,
                    `Invalid attribute ${attr} e.g., save strength`
                );
            }

            const savingThrows = player.getMeta('saving throws');

            let modifier = savingThrows[attr];

            let symbol = modifier >= 0 ? '+' : '';

            let roll;
            if (advantage) {
                roll = roller.roll(`2d20-L${symbol}${modifier}`);
            } else if (disadvantage) {
                roll = roller.roll(`2d20-H${symbol}${modifier}`);
            } else {
                roll = roller.roll(`1d20${symbol}${modifier}`);
            }

            let message = `${attr} save for ${player.name}`;

            if (advantage) {
                message += ' at advantage';
            }

            if (disadvantage) {
                message += ' at disadvantage';
            }

            Broadcast.sayAtExcept(player, `${message} ${roll}`);
        },
    };
};
