'use strict';

const tap = require('tap');
const FeatureManager = require('./feature-manager');

const manager = new FeatureManager();

tap.test('featureByName', t => {
    const feat = manager.featureByName('rage');
    t.equal(feat.name, 'Rage');
    t.end();
});

tap.test('featuresByLevel', t => {
    const feats = manager.featuresByLevel(1);
    t.equal(feats[0].name, 'Rage');
    t.end();
});

tap.test('featuresForClass', t => {
    const feats = manager.featuresForClass('barbarian');
    t.equal(feats[0].name, 'Rage');
    t.end();
});

tap.test('featuresForSubClass', t => {
    const feats = manager.featuresForSubClass('berserker');
    t.equal(feats[0].name, 'Frenzy');
    t.end();
});

tap.test('featuresForLevelClassAndSubClass', t => {
    const feats = manager.featuresForLevelClassAndSubClass(
        1,
        'barbarian',
        'berserker'
    );
    t.equal(feats[0].name, 'Rage');
    t.end();
});

tap.test('featuresForPlayer', t => {
    const feats = manager.featuresForPlayer({
        level: 1,
        class: 'barbarian',
        subclass: 'berserker',
    });
    t.equal(feats[0].name, 'Rage');
    t.end();
});
