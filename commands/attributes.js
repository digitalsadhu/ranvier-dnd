'use strict';

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

const attributes = [
    'strength',
    'intelligence',
    'dexterity',
    'wisdom',
    'constitution',
    'charisma',
];

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (attr, player) => {
            if (!attr) {
                for (let i = 0; i < attributes.length; i++) {
                    const a = player.getAttribute(attributes[i]);
                    const modifier = modifiers[a];
                    let symbol = modifier > 0 ? '+' : '';
                    Broadcast.sayAt(
                        player,
                        `${attributes[i]} ${symbol}${modifier} (${a})`
                    );
                }
                return;
            }

            if (!attributes.includes(attr)) {
                return Broadcast.sayAt(
                    player,
                    `Invalid attribute ${attr} e.g., attribute strength`
                );
            }

            if (!player.hasAttribute(attr)) {
                return Broadcast.sayAt(player, `Attribute ${attr} not set`);
            }

            const a = player.getAttribute(attr);
            const modifier = modifiers[a];
            const symbol = modifier > 0 ? '+' : '';
            Broadcast.sayAt(player, `${attr} ${symbol}${modifier} (${a})`);
        },
    };
};
