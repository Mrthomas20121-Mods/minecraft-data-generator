import { upper } from "void-supper";
import { ResourceManager } from "../index.js";
import { ModelManager } from "../lib/assets-builders.js";
import { DefaultDataManager } from "../lib/managers.js";

let manager = new ResourceManager('gravitation', (modid) => new DefaultDataManager(modid));

manager.run((assets, data, modid) => {
    let models = ModelManager.create(modid);

    assets.lang.entry('itemGroup.gravitation.tools', 'Aether Gravitation Tools');

    models.itemModel('neptune_axe', 'minecraft:item/handheld');
    assets.lang.itemEntry('neptune_axe', upper('neptune_axe'));
    models.itemModel('neptune_battleaxe', 'minecraft:item/handheld');
    assets.lang.itemEntry('neptune_battleaxe', upper('neptune_battleaxe'));
    models.itemModel('neptune_cutlass', 'minecraft:item/handheld');
    assets.lang.itemEntry('neptune_cutlass', upper('neptune_cutlass'));
    models.itemModel('neptune_pickaxe', 'minecraft:item/handheld');
    assets.lang.itemEntry('neptune_pickaxe', upper('neptune_pickaxe'));
    models.itemModel('neptune_shovel', 'minecraft:item/handheld');
    assets.lang.itemEntry('neptune_shovel', upper('neptune_shovel'));

    models.itemModel('gravitite_battleaxe', 'minecraft:item/handheld');
    assets.lang.itemEntry('gravitite_battleaxe', upper('gravitite_battleaxe'));
    models.itemModel('zanite_battleaxe', 'minecraft:item/handheld');
    assets.lang.itemEntry('zanite_battleaxe', upper('zanite_battleaxe'));
    models.itemModel('valkyrie_battleaxe', 'minecraft:item/handheld');
    assets.lang.itemEntry('valkyrie_battleaxe', upper('valkyrie_battleaxe'));

    models.dartShooter('phoenix_dart_shooter');
    assets.lang.itemEntry('phoenix_dart_shooter', upper('phoenix_dart_shooter'));
    models.itemModel('phoenix_dart');
    assets.lang.itemEntry('phoenix_dart', upper('phoenix_dart'));

    assets.lang.entry('lore.item.gravitation.phoenix_dart', 'Found in gold dungeons, it is the Amo for the Phoenix Shooter, these darts set the target on fire on impact.');
    assets.lang.entry('lore.item.gravitation.phoenix_dart_shooter', 'Found in gold dungeons, A Dart Shooter which shoots Phoenix Darts.');
    assets.lang.entry('lore.item.gravitation.neptune_axe', 'Found in Silver Dungeons, The neptune toolset remove the mining penality underwater.');
    assets.lang.entry('lore.item.gravitation.neptune_battleaxe', 'Found in Silver Dungeons, The neptune toolset remove the mining penality underwater.');
    assets.lang.entry('lore.item.gravitation.neptune_pickaxe', 'Found in Silver Dungeons, The neptune toolset remove the mining penality underwater.');
    assets.lang.entry('lore.item.gravitation.neptune_shovel', 'Found in Silver Dungeons, The neptune toolset remove the mining penality underwater.');
    assets.lang.entry('lore.item.gravitation.neptune_cutlass', 'Found in Silver Dungeons, The neptune cutlass is a slightly better sword without the sweeping effect.');
    assets.lang.entry('lore.item.gravitation.valkyrie_battleaxe', 'Found in Silver Dungeons, The Valkyrie Battleaxe is a sweeping axe.');
    assets.lang.entry('lore.item.gravitation.gravitite_battleaxe', 'The Gravitite Battleaxe is a sweeping axe.');
    assets.lang.entry('lore.item.gravitation.zanite_battleaxe', 'The Gravitite Battleaxe is a sweeping axe.');

    assets.registerModels(models);
});