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

/**
 * See barbarian.js for more on classes.
 */
module.exports = srcPath => {
    return {
        name: 'Barbarian',
        description: '',
        abilityTable: {
            1: { skills: ['rage', 'two weapon fighting'] },
        },

        setupPlayer: player => {
            player.addAttribute('strength', 17);
            player.addAttribute('dexterity', 13);
            player.addAttribute('constitution', 16);
            player.addAttribute('intelligence', 10);
            player.addAttribute('wisdom', 12);
            player.addAttribute('charisma', 8);

            player.setMeta('race', {
                main: 'dwarf',
                subrace: 'mountain',
            });

            player.addAttribute('ac', 14);
            player.setMeta('hit dice', {
                quantity: 1,
                die: 12,
            });

            player.addAttribute('level', 1);
            player.addAttribute('speed', 30);
            player.addAttribute('proficiency', 2);

            // 12 + constitution modifier
            player.setAttributeBase('health', 12 + modifiers[17]);
            player.setMeta('proficiencies', ['animal handling', 'nature']);

            player.setMeta('saving throw bonuses', {
                strength: player.getAttribute('proficiency'),
                constitution: player.getAttribute('proficiency'),
            });

            player.setMeta('saving throws', {
                strength:
                    modifiers[17] +
                        player.getMeta('saving throw bonuses')['strength'] || 0,
                intelligence:
                    modifiers[17] +
                        player.getMeta('saving throw bonuses')[
                            'intelligence'
                        ] || 0,
                constitution:
                    modifiers[17] +
                        player.getMeta('saving throw bonuses')[
                            'constitution'
                        ] || 0,
                dexterity:
                    modifiers[17] +
                        player.getMeta('saving throw bonuses')['dexterity'] ||
                    0,
                wisdom:
                    modifiers[17] +
                        player.getMeta('saving throw bonuses')['wisdom'] || 0,
                charisma:
                    modifiers[17] +
                        player.getMeta('saving throw bonuses')['charisma'] || 0,
            });

            player.addAttribute('passive perception', 13);
            player.addAttribute('passive investigation', 10);
            player.addAttribute('passive insight', 11);

            player.prompt = '[ %health.current%/%health.max% <b>hp</b> ]';
        },
    };
};
