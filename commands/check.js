'use strict';

const { DiceRoller } = require('rpg-dice-roller');

const skills = {
    strength: 'strength',
    intelligence: 'intelligence',
    dexterity: 'dexterity',
    constitution: 'constitution',
    wisdom: 'wisdom',
    charisma: 'charisma',
    acrobatics: 'dexterity',
    'animal handling': 'wisdom',
    arcana: 'intelligence',
    athletics: 'strength',
    deception: 'charisma',
    history: 'intelligence',
    insight: 'wisdom',
    intimidation: 'charisma',
    investigation: 'intelligence',
    medicine: 'wisdom',
    nature: 'intelligence',
    perception: 'wisdom',
    performance: 'charisma',
    persuasion: 'charisma',
    religion: 'intelligence',
    'sleight of hand': 'dexterity',
    stealth: 'dexterity',
    survival: 'wisdom',
};

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
        command: state => (skill, player) => {
            const lastChar = skill[skill.length - 1];
            let advantage = false;
            let disadvantage = false;

            if (lastChar === '+') {
                advantage = true;
                skill = skill.replace('+', '').trim();
            }

            if (lastChar === '-') {
                disadvantage = true;
                skill = skill.replace('-', '').trim();
            }

            const roller = new DiceRoller();

            if (!skills[skill]) {
                return Broadcast.sayAt(
                    player,
                    `Invalid skill ${skill} e.g., check perception`
                );
            }

            if (!player.hasAttribute('proficiency')) {
                return Broadcast.sayAt(player, 'No proficiency bonus set.');
            }

            if (!player.hasAttribute(skills[skill])) {
                return Broadcast.sayAt(player, 'No such ability.');
            }

            const proficiency = player.getAttribute('proficiency');
            const proficiencies = player.getMeta('proficiencies');
            const ability = player.getAttribute(skills[skill]);

            let modifier = modifiers[ability];

            if (proficiencies.includes(skill)) {
                modifier = modifier + proficiency;
            }

            let symbol = modifier >= 0 ? '+' : '';

            let roll;
            if (advantage) {
                roll = roller.roll(`2d20-L${symbol}${modifier}`);
            } else if (disadvantage) {
                roll = roller.roll(`2d20-H${symbol}${modifier}`);
            } else {
                roll = roller.roll(`1d20${symbol}${modifier}`);
            }

            let message = `${skill} check for ${player.name}`;

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
