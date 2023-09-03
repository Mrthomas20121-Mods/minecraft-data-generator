import List from 'void-list';
import { ResourceManager } from '../index.js';
import { AssetManager } from '../lib/managers.js';
import { TFCDataManager } from "./TFCDataManager.js";
import { ModelManager } from '../lib/assets-builders.js';
import { upper } from 'void-supper';
import { AllRocks, Rock } from './constants.js';

let manager = new ResourceManager('tfc_decoration', TFCDataManager.create);

let colors: List<string> = List.from(
    'black', 
    'blue', 
    'cyan',
    'gray',
    'green',
    'light_blue',
    'light_gray',
    'lime',
    'magenta',
    'orange',
    'pink',
    'purple',
    'white',
    'yellow'
);

manager.run((assets: AssetManager, data: TFCDataManager, modid: string) => {
    let models = ModelManager.create(modid);

    data.shapedRecipe(`crafting/polished_fire_clay`, ['###', '#X#', '###'], {
      '#': {
          item:`tfc:fire_clay`
      },
      'X': {
        tag:'tfc:rock/chiseled_bricks'
      }
    }, {
        item: `${modid}:polished_fire_clay`
    });

    data.chiselRecipe(`polished_fire_clay_stairs`, `${modid}:polished_fire_clay`, `${modid}:polished_fire_clay_stairs`, 'stair');
    data.chiselRecipe(`polished_fire_clay_slab`, `${modid}:polished_fire_clay`, `${modid}:polished_fire_clay_slab`, 'slab');

    data.tags.addBlockTag('tfc:planks', [
      "tfc:wood/planks/acacia",
      "tfc:wood/planks/ash",
      "tfc:wood/planks/aspen",
      "tfc:wood/planks/birch",
      "tfc:wood/planks/blackwood",
      "tfc:wood/planks/chestnut",
      "tfc:wood/planks/douglas_fir",
      "tfc:wood/planks/hickory",
      "tfc:wood/planks/kapok",
      "tfc:wood/planks/maple",
      "tfc:wood/planks/oak",
      "tfc:wood/planks/palm",
      "tfc:wood/planks/pine",
      "tfc:wood/planks/rosewood",
      "tfc:wood/planks/sequoia",
      "tfc:wood/planks/spruce",
      "tfc:wood/planks/sycamore",
      "tfc:wood/planks/white_cedar",
      "tfc:wood/planks/willow"
    ]);

    data.tags.addItemTag('tfc:planks', [
      "tfc:wood/planks/acacia",
      "tfc:wood/planks/ash",
      "tfc:wood/planks/aspen",
      "tfc:wood/planks/birch",
      "tfc:wood/planks/blackwood",
      "tfc:wood/planks/chestnut",
      "tfc:wood/planks/douglas_fir",
      "tfc:wood/planks/hickory",
      "tfc:wood/planks/kapok",
      "tfc:wood/planks/maple",
      "tfc:wood/planks/oak",
      "tfc:wood/planks/palm",
      "tfc:wood/planks/pine",
      "tfc:wood/planks/rosewood",
      "tfc:wood/planks/sequoia",
      "tfc:wood/planks/spruce",
      "tfc:wood/planks/sycamore",
      "tfc:wood/planks/white_cedar",
      "tfc:wood/planks/willow"
    ]);

    for(let color of colors) {
        let altName = `wood/${color}_terracotta`;
        let name = `wood/${color}`;
        
        models.woodDecorativeBlocks(name);
        models.woodDecorativeBlocks(altName);
        models.itemModel(`${name}_lumber`);
        models.itemModel(`${altName}_lumber`);

        assets.lang.blockEntry(`wood.${color}_terracotta_planks`, `${upper(color)} Terracotta Planks`);
        assets.lang.blockEntry(`wood.${color}_terracotta_stairs`, `${upper(color)} Terracotta Planks Stairs`);
        assets.lang.blockEntry(`wood.${color}_terracotta_slab`, `${upper(color)} Terracotta Planks Slab`);
        assets.lang.itemEntry(`wood.${color}_terracotta_lumber`, `${upper(color)} Terracotta Lumber`);
        assets.lang.blockEntry(`wood.${color}_planks`, `${upper(color)} Planks`);
        assets.lang.blockEntry(`wood.${color}_stairs`, `${upper(color)} Planks Stairs`);
        assets.lang.blockEntry(`wood.${color}_slab`, `${upper(color)} Planks Slab`);
        assets.lang.itemEntry(`wood.${color}_lumber`, `${upper(color)} Lumber`);

        data.tags.addBlockTag('minecraft:mineable/axe', [`${modid}:wood/${color}_planks`], false);
        data.tags.addBlockTag('minecraft:mineable/axe', [`${modid}:wood/${color}_slab`], false);
        data.tags.addBlockTag('minecraft:mineable/axe', [`${modid}:wood/${color}_stairs`], false);

        data.tags.addBlockTag('minecraft:mineable/axe', [`${modid}:wood/${color}_terracotta_planks`], false);
        data.tags.addBlockTag('minecraft:mineable/axe', [`${modid}:wood/${color}_terracotta_slab`], false);
        data.tags.addBlockTag('minecraft:mineable/axe', [`${modid}:wood/${color}_terracotta_stairs`], false);

        data.tags.addBlockTag('minecraft:planks', [`${modid}:wood/${color}_planks`], false);

        data.tags.addItemTag('tfc:lumber', [`${modid}:wood/${color}_lumber`, `${modid}:wood/${color}_terracotta_lumber`]);
        

        data.loots.dropBlock(`wood/${color}_planks`);
        data.loots.dropBlock(`wood/${color}_slab`);
        data.loots.dropBlock(`wood/${color}_stairs`);
        data.loots.dropBlock(`wood/${color}_terracotta_planks`);
        data.loots.dropBlock(`wood/${color}_terracotta_slab`);
        data.loots.dropBlock(`wood/${color}_terracotta_stairs`);

        data.shapedRecipe(`crafting/wood/${color}_stairs`, ['#  ', '##', '###'], {
            '#': {
                item:`${modid}:wood/${color}_planks`
            }
        }, {
            item: `${modid}:wood/${color}_stairs`
        });

        data.shapedRecipe(`crafting/wood/${color}_slab`, ['###'], {
            '#': {
                item:`${modid}:wood/${color}_planks`
            }
        }, {
            item: `${modid}:wood/${color}_slab`
        });

        data.shapedRecipe(`crafting/wood/${color}_terracotta_stairs`, ['#  ', '##', '###'], {
            '#': {
                item:`${modid}:wood/${color}_terracotta_planks`
            }
        }, {
            item: `${modid}:wood/${color}_terracotta_stairs`
        });

        data.shapedRecipe(`crafting/wood/${color}_terracotta_slab`, ['###'], {
            '#': {
                item:`${modid}:wood/${color}_terracotta_planks`
            }
        }, {
            item: `${modid}:wood/${color}_terracotta_slab`
        });

        data.recipe(`crafting/wood/${color}_lumber.json`, 'tfc:damage_inputs_shapeless_crafting', {
            "recipe": {
              "type": "minecraft:crafting_shapeless",
              "ingredients": [
                {
                  "item": `${modid}:wood/${color}_planks`
                },
                {
                  "tag": "tfc:saws"
                }
              ],
              "result": {
                "item": `${modid}:wood/${color}_lumber`,
                "count": 4
              }
            }
        });

        data.recipe(`crafting/wood/${color}_terracotta_lumber.json`, 'tfc:damage_inputs_shapeless_crafting', {
            "recipe": {
              "type": "minecraft:crafting_shapeless",
              "ingredients": [
                {
                  "item": `${modid}:wood/${color}_terracotta_planks`
                },
                {
                  "tag": "tfc:saws"
                }
              ],
              "result": {
                "item": `${modid}:wood/${color}_terracotta_lumber`,
                "count": 4
              }
            }
        });

        data.chiselRecipe(`${color}_stairs`, `${modid}:wood/${color}_planks`, `${modid}:wood/${color}_stairs`, 'stair');
        data.chiselRecipe(`${color}_slab`, `${modid}:wood/${color}_planks`, `${modid}:wood/${color}_slab`, 'slab');

        data.chiselRecipe(`${color}_terracotta_stairs`, `${modid}:wood/${color}_terracotta_planks`, `${modid}:wood/${color}_terracotta_stairs`, 'stair');
        data.chiselRecipe(`${color}_terracotta_slab`, `${modid}:wood/${color}_terracotta_planks`, `${modid}:wood/${color}_terracotta_slab`, 'slab');

        data.recipe(`barrel/dye/${color}_planks.json`, 'tfc:barrel_sealed', {
          "input_item": {
            "ingredient": {
              "tag": 'tfc:planks'
            }
          },
          "input_fluid": {
            "ingredient": `tfc:${color}_dye`,
            "amount": 25
          },
          "output_item": {
            "item": `${modid}:wood/${color}_planks`
          },
          "duration": 1000
        });

        data.recipe(`barrel/dye/${color}_terracotta_planks.json`, 'tfc:barrel_sealed', {
          "input_item": {
            "ingredient": {
              "item": `${modid}:wood/${color}_planks`
            }
          },
          "input_fluid": {
            "ingredient": "tfc:black_dye",
            "amount": 25
          },
          "output_item": {
            "item": `${modid}:wood/${color}_terracotta_planks`
          },
          "duration": 1000
        });
    }

    assets.lang.blockEntry('polished_fire_clay', 'Polished Fire Clay');
    assets.lang.blockEntry('polished_fire_clay_slab', 'Polished Fire Clay Slab');
    assets.lang.blockEntry('polished_fire_clay_stairs', 'Polished Fire Clay Stairs');
    assets.lang.blockEntry('polished_fire_clay_wall', 'Polished Fire Clay Wall');

    for(let rock of AllRocks) {
        assets.lang.blockEntry(`pillar.${rock.name}`, upper(`${rock.name}_pillar`));
        assets.lang.blockEntry(`rockwool.${rock.name}`, upper(`${rock.name}_rockwool`));
        assets.lang.blockEntry(`rockwool.${rock.name}_slab`, upper(`${rock.name}_rockwool_slab`));
        assets.lang.blockEntry(`rockwool.${rock.name}_stairs`, upper(`${rock.name}_rockwool_stairs`));
        assets.lang.blockEntry(`rockwool.${rock.name}_wall`, upper(`${rock.name}_rockwool_wall`));
    }

    assets.registerModels(models);
});