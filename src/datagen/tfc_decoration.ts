import List from 'void-list';
import { ResourceManager } from '../index.js';
import { AssetManager } from '../lib/managers.js';
import { TFCDataManager } from "./TFCDataManager.js";
import { ModelManager } from '../lib/assets-builders.js';
import { upper } from 'void-supper';
import { AllRocks, Wood, WoodTypes } from './constants.js';

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
    
    assets.lang.entry('tfc_decoration.creative_tab.decorations', 'TFCDeco Decorations');
    assets.lang.entry('tfc_decoration.creative_tab.food', 'TFCDeco Food');

    assets.lang.entry('fluid.tfc_decoration.caramel', 'Molten Caramel');

    assets.lang.itemEntry('food.caramel', 'Caramel');
    models.itemModel('food/caramel');
    assets.lang.itemEntry('food.caramel_apple', 'Caramel Apple');
    models.itemModel('food/caramel_apple');
    models.bucket('caramel_bucket', 'fluid/caramel');

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
        "tfc:wood/planks/mangrove",
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
        "tfc:wood/planks/mangrove",
        "tfc:wood/planks/rosewood",
        "tfc:wood/planks/sequoia",
        "tfc:wood/planks/spruce",
        "tfc:wood/planks/sycamore",
        "tfc:wood/planks/white_cedar",
        "tfc:wood/planks/willow"
    ]);

    for(let wood of WoodTypes) {
        assets.lang.blockEntry(`wood.${wood}_log_post`, `${upper(wood)} Log Post`);
        models.woodWall(`wood/${wood}_log_post`, `wood/log/${wood}`, 'tfc');
        data.loots.dropBlock(`wood/${wood}_log_post`);

        data.tags.addBlockTag('minecraft:mineable/axe', [
            `tfc_decoration:wood/${wood}_log_post`,
        ]);
    }

    for (let color of colors) {
        
        data.tags.addBlockTag('minecraft:mineable/axe', [
            `tfc_decoration:wood/${color}_terracotta_planks`,
            `tfc_decoration:wood/${color}_terracotta_stairs`,
            `tfc_decoration:wood/${color}_terracotta_slab`,
            `tfc_decoration:wood/${color}_planks`,
            `tfc_decoration:wood/${color}_stairs`,
            `tfc_decoration:wood/${color}_slab`,
        ]);
        
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
        data.shapedRecipe(`crafting/wood/${color}_stairs`, ['  #', ' ##', '###'], {
            '#': {
                item: `${modid}:wood/${color}_planks`
            }
        }, {
            item: `${modid}:wood/${color}_stairs`,
            count: 4
        });
        data.shapedRecipe(`crafting/wood/${color}_slab`, ['###'], {
            '#': {
                item: `${modid}:wood/${color}_planks`
            }
        }, {
            item: `${modid}:wood/${color}_slab`,
            count: 6
        });
        data.shapedRecipe(`crafting/wood/${color}_terracotta_stairs`, ['  #', ' ##', '###'], {
            '#': {
                item: `${modid}:wood/${color}_terracotta_planks`
            }
        }, {
            item: `${modid}:wood/${color}_terracotta_stairs`,
            count: 4
        });
        data.shapedRecipe(`crafting/wood/${color}_terracotta_slab`, ['###'], {
            '#': {
                item: `${modid}:wood/${color}_terracotta_planks`
            }
        }, {
            item: `${modid}:wood/${color}_terracotta_slab`,
            count: 6
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
        data.chiselRecipe(`stairs/${color}_stairs`, `${modid}:wood/${color}_planks`, `${modid}:wood/${color}_stairs`, 'stair');
        data.chiselRecipe(`slab/${color}_slab`, `${modid}:wood/${color}_planks`, `${modid}:wood/${color}_slab`, 'slab');
        data.chiselRecipe(`stairs/${color}_terracotta_stairs`, `${modid}:wood/${color}_terracotta_planks`, `${modid}:wood/${color}_terracotta_stairs`, 'stair');
        data.chiselRecipe(`slab/${color}_terracotta_slab`, `${modid}:wood/${color}_terracotta_planks`, `${modid}:wood/${color}_terracotta_slab`, 'slab');
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

    for (let rock of AllRocks) {
        assets.lang.blockEntry(`pillar.${rock.name}`, upper(`${rock.name}_pillar`));
        assets.lang.blockEntry(`cut_rockwool.${rock.name}`, upper(`${rock.name}_cut_rockwool`));
        assets.lang.blockEntry(`cut_rockwool.${rock.name}_slab`, upper(`${rock.name}_cut_rockwool_slab`));
        assets.lang.blockEntry(`cut_rockwool.${rock.name}_stairs`, upper(`${rock.name}_cut_rockwool_stairs`));
        assets.lang.blockEntry(`cut_rockwool.${rock.name}_wall`, upper(`${rock.name}_cut_rockwool_wall`));
        assets.lang.blockEntry(`rockwool.${rock.name}`, upper(`${rock.name}_rockwool`));
        assets.lang.blockEntry(`rockwool.${rock.name}_slab`, upper(`${rock.name}_rockwool_slab`));
        assets.lang.blockEntry(`rockwool.${rock.name}_stairs`, upper(`${rock.name}_rockwool_stairs`));
        assets.lang.blockEntry(`rockwool.${rock.name}_wall`, upper(`${rock.name}_rockwool_wall`));

        data.loots.dropBlock(`pillar/${rock.name}`);
        data.loots.dropBlock(`cut_rockwool/${rock.name}`);
        data.loots.dropBlock(`cut_rockwool/${rock.name}_slab`);
        data.loots.dropBlock(`cut_rockwool/${rock.name}_stairs`);
        data.loots.dropBlock(`cut_rockwool/${rock.name}_wall`);
        data.loots.dropBlock(`rockwool/${rock.name}`);
        data.loots.dropBlock(`rockwool/${rock.name}_slab`);
        data.loots.dropBlock(`rockwool/${rock.name}_stairs`);
        data.loots.dropBlock(`rockwool/${rock.name}_wall`);
        data.loots.dropBlock(`rockwool_bricks/${rock.name}`);
        data.loots.dropBlock(`rockwool_bricks/${rock.name}_slab`);
        data.loots.dropBlock(`rockwool_bricks/${rock.name}_stairs`);
        data.loots.dropBlock(`rockwool_bricks/${rock.name}_wall`);

        data.tags.addBlockTag('minecraft:mineable/pickaxe', [
            `tfc_decoration:pillar/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}_slab`,
            `tfc_decoration:cut_rockwool/${rock.name}_stairs`,
            `tfc_decoration:cut_rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool/${rock.name}`,
            `tfc_decoration:rockwool/${rock.name}_slab`,
            `tfc_decoration:rockwool/${rock.name}_stairs`,
            `tfc_decoration:rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool_bricks/${rock.name}`,
            `tfc_decoration:rockwool_bricks/${rock.name}_slab`,
            `tfc_decoration:rockwool_bricks/${rock.name}_stairs`,
            `tfc_decoration:rockwool_bricks/${rock.name}_wall`,
        ]);


        data.tags.addBlockTag('tfc:toughness_3', [
            `tfc_decoration:pillar/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}_slab`,
            `tfc_decoration:cut_rockwool/${rock.name}_stairs`,
            `tfc_decoration:cut_rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool/${rock.name}`,
            `tfc_decoration:rockwool/${rock.name}_slab`,
            `tfc_decoration:rockwool/${rock.name}_stairs`,
            `tfc_decoration:rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool_bricks/${rock.name}`,
            `tfc_decoration:rockwool_bricks/${rock.name}_slab`,
            `tfc_decoration:rockwool_bricks/${rock.name}_stairs`,
            `tfc_decoration:rockwool_bricks/${rock.name}_wall`,
        ]);

        data.tags.addBlockTag('tfc:forge_insulation', [
            `tfc_decoration:pillar/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}_slab`,
            `tfc_decoration:cut_rockwool/${rock.name}_stairs`,
            `tfc_decoration:cut_rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool/${rock.name}`,
            `tfc_decoration:rockwool/${rock.name}_slab`,
            `tfc_decoration:rockwool/${rock.name}_stairs`,
            `tfc_decoration:rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool_bricks/${rock.name}`,
            `tfc_decoration:rockwool_bricks/${rock.name}_slab`,
            `tfc_decoration:rockwool_bricks/${rock.name}_stairs`,
            `tfc_decoration:rockwool_bricks/${rock.name}_wall`,
        ]);

        data.tags.addBlockTag('tfc:bloomery_insulation', [
            `tfc_decoration:pillar/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}_slab`,
            `tfc_decoration:cut_rockwool/${rock.name}_stairs`,
            `tfc_decoration:cut_rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool/${rock.name}`,
            `tfc_decoration:rockwool/${rock.name}_slab`,
            `tfc_decoration:rockwool/${rock.name}_stairs`,
            `tfc_decoration:rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool_bricks/${rock.name}`,
            `tfc_decoration:rockwool_bricks/${rock.name}_slab`,
            `tfc_decoration:rockwool_bricks/${rock.name}_stairs`,
            `tfc_decoration:rockwool_bricks/${rock.name}_wall`,
        ]);

        data.tags.addBlockTag('tfc:blast_furnace_insulation', [
            `tfc_decoration:pillar/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}`,
            `tfc_decoration:cut_rockwool/${rock.name}_slab`,
            `tfc_decoration:cut_rockwool/${rock.name}_stairs`,
            `tfc_decoration:cut_rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool/${rock.name}`,
            `tfc_decoration:rockwool/${rock.name}_slab`,
            `tfc_decoration:rockwool/${rock.name}_stairs`,
            `tfc_decoration:rockwool/${rock.name}_wall`,
            `tfc_decoration:rockwool_bricks/${rock.name}`,
            `tfc_decoration:rockwool_bricks/${rock.name}_slab`,
            `tfc_decoration:rockwool_bricks/${rock.name}_stairs`,
            `tfc_decoration:rockwool_bricks/${rock.name}_wall`,
        ]);

        models.block(`pillar/${rock.name}`);
        models.decorativeBlocks(`rockwool/${rock.name}`);
        models.decorativeBlocks(`cut_rockwool/${rock.name}`);
        models.decorativeBlocks(`rockwool_bricks/${rock.name}`);
        models.itemModel(`rockwool_brick/${rock.name}`);
        assets.lang.itemEntry(`rockwool_brick/${rock.name}`, upper(`${rock.name}_rockwool_brick`));

        models.horizontalBlock(`pillar/${rock.name}`, `tfc_decoration:block/pillar/side/${rock.name}`, `tfc_decoration:block/pillar/top/${rock.name}`);

        data.chiselRecipe(`stairs/${rock.name}_rockwool_stairs`, `${modid}:rockwool/${rock.name}`, `${modid}:rockwool/${rock.name}_stairs`, 'stair');
        data.chiselRecipe(`slab/${rock.name}_rockwool_slab`, `${modid}:rockwool/${rock.name}`, `${modid}:rockwool/${rock.name}_slab`, 'slab');
        data.chiselRecipe(`stairs/${rock.name}_cut_rockwool_stairs`, `${modid}:cut_rockwool/${rock.name}`, `${modid}:cut_rockwool/${rock.name}_stairs`, 'stair');
        data.chiselRecipe(`slab/${rock.name}_cut_rockwool_slab`, `${modid}:cut_rockwool/${rock.name}`, `${modid}:cut_rockwool/${rock.name}_slab`, 'slab');
        data.chiselRecipe(`stairs/${rock.name}_rockwool_bricks_stairs`, `${modid}:rockwool_bricks/${rock.name}`, `${modid}:rockwool_bricks/${rock.name}_stairs`, 'stair');
        data.chiselRecipe(`slab/${rock.name}_rockwool_bricks_slab`, `${modid}:rockwool_bricks/${rock.name}`, `${modid}:rockwool_bricks/${rock.name}_slab`, 'slab');

        data.recipe(`crafting/pillar/${rock.name}.json`, 'minecraft:crafting_shaped', {
            group: 'pillar',
            pattern: [
                '#',
                '#'
            ],
            "key": {
                '#': {
                    item: `tfc:rock/raw/${rock.name}`
                }
            },
            result: {
                item: `tfc_decoration:pillar/${rock.name}`,
                count: 2
            }
        });

        data.recipe(`crafting/rockwool/${rock.name}.json`, 'minecraft:crafting_shaped', {
            group: 'rockwool',
            pattern: [
                '###',
                '#!#',
                '###'
            ],
            "key": {
                '#': {
                    item: `tfc:rock/hardened/${rock.name}`
                },
                '!': {
                    item: 'tfc:burlap_cloth'
                }
            },
            result: {
                item: `tfc_decoration:rockwool/${rock.name}`,
                count: 8
            }
        });

        data.recipe(`crafting/rockwool/${rock.name}_slab.json`, 'minecraft:crafting_shaped', {
            group: 'rockwool',
            pattern: [
                '###',
            ],
            "key": {
                '#': {
                    item: `tfc_decoration:rockwool/${rock.name}`
                }
            },
            result: {
                item: `tfc_decoration:rockwool/${rock.name}_slab`,
                count: 6
            }
        });

        data.recipe(`crafting/rockwool/${rock.name}_stairs.json`, 'minecraft:crafting_shaped', {
            group: 'rockwool',
            pattern: [
                '  #',
                ' ##',
                '###',
            ],
            "key": {
                '#': {
                    item: `tfc_decoration:rockwool/${rock.name}`
                }
            },
            result: {
                item: `tfc_decoration:rockwool/${rock.name}_stairs`,
                count: 4
            }
        });

        data.recipe(`crafting/rockwool/${rock.name}_wall.json`, 'minecraft:crafting_shaped', {
            group: 'rockwool',
            pattern: [
                '###',
                '###',
            ],
            "key": {
                '#': {
                    item: `tfc_decoration:rockwool/${rock.name}`
                }
            },
            result: {
                item: `tfc_decoration:rockwool/${rock.name}_wall`,
                count: 6
            }
        });

        data.recipe(`crafting/cut_rockwool/${rock.name}_slab.json`, 'minecraft:crafting_shaped', {
            group: 'rockwool',
            pattern: [
                '###',
            ],
            "key": {
                '#': {
                    item: `tfc_decoration:cut_rockwool/${rock.name}`
                }
            },
            result: {
                item: `tfc_decoration:cut_rockwool/${rock.name}_slab`,
                count: 6
            }
        });

        data.recipe(`crafting/cut_rockwool/${rock.name}_stairs.json`, 'minecraft:crafting_shaped', {
            group: 'rockwool',
            pattern: [
                '  #',
                ' ##',
                '###',
            ],
            "key": {
                '#': {
                    item: `tfc_decoration:cut_rockwool/${rock.name}`
                }
            },
            result: {
                item: `tfc_decoration:cut_rockwool/${rock.name}_stairs`,
                count: 4
            }
        });

        data.recipe(`crafting/cut_rockwool/${rock.name}_wall.json`, 'minecraft:crafting_shaped', {
            group: 'rockwool',
            pattern: [
                '###',
                '###',
            ],
            "key": {
                '#': {
                    item: `tfc_decoration:cut_rockwool/${rock.name}`
                }
            },
            result: {
                item: `tfc_decoration:cut_rockwool/${rock.name}_wall`,
                count: 6
            }
        });

        data.recipe(`crafting/cut_rockwool/${rock.name}.json`, 'minecraft:crafting_shaped', {
            group: 'rockwool',
            pattern: [
                '##',
                '##'
            ],
            "key": {
                '#': {
                    item: `tfc_decoration:rockwool/${rock.name}`
                }
            },
            result: {
                item: `tfc_decoration:cut_rockwool/${rock.name}`,
                count: 2
            }
        });

        data.recipe(`crafting/rockwool_bricks/${rock.name}.json`, 'minecraft:crafting_shaped', {
            group: 'rockwool',
            pattern: [
                '#!#',
                '!#!',
                '#!#'
            ],
            "key": {
                '#': {
                    item: `tfc_decoration:rockwool_brick/${rock.name}`
                },
                '!': {
                    item: 'tfc:mortar'
                }
            },
            result: {
                item: `tfc_decoration:rockwool_bricks/${rock.name}`,
                count: 4
            }
        });

        data.recipe(`crafting/rockwool_brick/${rock.name}.json`, 'tfc:damage_inputs_shapeless_crafting', {
            "recipe": {
                "type": "minecraft:crafting_shapeless",
                "ingredients": [
                    {
                        "item": `${modid}:rockwool/${rock.name}`
                    },
                    {
                        "tag": "tfc:hammers"
                    }
                ],
                "result": {
                    "item": `${modid}:rockwool_brick/${rock.name}`,
                    "count": 8
                }
            }
        });
    }
    assets.registerModels(models);
});