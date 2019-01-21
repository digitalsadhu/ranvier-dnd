'use strict';

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (_, player) => {
            const hp = player.getAttribute('health');

            if (!hp) {
                return Broadcast.sayAt(
                    player,
                    'No hit points value currently set.'
                );
            }

            Broadcast.sayAtExcept(player, `hit points ${hp}`);
        },
    };
};
