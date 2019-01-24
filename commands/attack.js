'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const s = msg => Broadcast.sayAtExcept(player, msg);

            const [name, opt1, opt2] = input.split(' ');
            let type = '';
            let advantageDisadvantageNotes = '';
            let sneakAttackNotes = '';
            let sneak = '';

            if (!name) {
                return s(`attack using what?`);
            }

            if (!cls.weapon(name)) {
                return s(
                    `invalid weapon, have you add ${name} to your weapons?`
                );
            }

            if (opt1 === '+' || opt2 === '+') {
                type = 'advantage';
                advantageDisadvantageNotes = ' (with advantage)';
            }

            if (opt1 === '-' || opt2 === '-') {
                type = 'disadvantage';
                advantageDisadvantageNotes = ' (with disadvantage)';
            }

            if (opt1 && opt1.includes('d')) {
                sneak = opt1;
                sneakAttackNotes = ` (with ${opt1} sneak attack damage)`;
            }

            if (opt2 && opt2.includes('d')) {
                sneak = opt2;
                sneakAttackNotes = ` (with ${opt2} sneak attack damage)`;
            }

            const attack = cls.attack(name, type, sneak);
            let crit = attack.rolls.isCrit() ? ' CRITICAL HIT!' : '';

            s(`${player.name} attacks using weapon ${name}`);
            s(``);
            s(`Attack roll: ${attack.rolls.attackRoll.total}`);
            s(`${attack.rolls.attackRoll}${advantageDisadvantageNotes}${crit}`);
            s(``);
            s(`Damage roll: ${attack.rolls.damageRoll.total}`);
            s(`${attack.rolls.damageRoll}${sneakAttackNotes}`);
            s(``);
            s(`Weapon information: ${name}`);
            s(
                `Range: ${attack.range}, Modifier: ${
                    attack.modifier
                }, Damage: ${attack.damage}`
            );
            s(`${attack.notes}`);
        },
    };
};
