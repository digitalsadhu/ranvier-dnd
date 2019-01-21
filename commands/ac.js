'use strict';

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (value, player) => {
            if (value) {
                player.setMeta('ac', value);
            }

            const ac = player.getMeta('ac');

            if (!ac) {
                return Broadcast.sayAt(
                    player,
                    'No armor class value currently set.'
                );
            }

            Broadcast.sayAtExcept(player, `armor class ${ac}`);
        },
    };
};
