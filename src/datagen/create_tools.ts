import { upper } from "void-supper";
import { ResourceManager } from "../index.js";
import { ModelManager } from "../lib/assets-builders.js";
import { DefaultDataManager } from "../lib/managers.js";

let manager = new ResourceManager('create_tools', (modid) => new DefaultDataManager(modid));

manager.run((assets, data, modid) => {
    let models = ModelManager.create(modid);

    let tiers: string[] = ['brass', 'andesite_alloy'];

    for(let tier of tiers) {
        models.itemModel(`${tier}_axe`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_hoe`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_pickaxe`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_shovel`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_sword`, 'minecraft:item/handheld');

        models.itemModel(`${tier}_excavator`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_hammer`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_knife`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_sickle`, 'minecraft:item/handheld');

        models.itemModel(`${tier}_helmet`);
        models.itemModel(`${tier}_chestplate`);
        models.itemModel(`${tier}_leggings`);
        models.itemModel(`${tier}_boots`);

        assets.lang.itemEntry(`${tier}_axe`, upper(`${tier}_axe`));
        assets.lang.itemEntry(`${tier}_hoe`, upper(`${tier}_hoe`));
        assets.lang.itemEntry(`${tier}_pickaxe`, upper(`${tier}_pickaxe`));
        assets.lang.itemEntry(`${tier}_shovel`, upper(`${tier}_shovel`));
        assets.lang.itemEntry(`${tier}_sword`, upper(`${tier}_sword`));

        assets.lang.itemEntry(`${tier}_excavator`, upper(`${tier}_excavator`));
        assets.lang.itemEntry(`${tier}_hammer`, upper(`${tier}_hammer`));
        assets.lang.itemEntry(`${tier}_knife`, upper(`${tier}_knife`));
        assets.lang.itemEntry(`${tier}_sickle`, upper(`${tier}_sickle`));

        assets.lang.itemEntry(`${tier}_helmet`, upper(`${tier}_helmet`));
        assets.lang.itemEntry(`${tier}_chestplate`, upper(`${tier}_chestplate`));
        assets.lang.itemEntry(`${tier}_leggings`, upper(`${tier}_leggings`));
        assets.lang.itemEntry(`${tier}_boots`, upper(`${tier}_boots`));

        data.shapedRecipe(`crafting/materials/${tier}/axe`, ['##', '#X', ' X'], {
            '#': {
                tag: `forge:ingots/${tier}`
            },
            'X': {
                item: 'minecraft:stick'
            }
        }, {
            item: `${modid}:${tier}_axe`
        });

        data.shapedRecipe(`crafting/materials/${tier}/hoe`, ['##', ' X', ' X'], {
            '#': {
                tag: `forge:ingots/${tier}`
            },
            'X': {
                item: 'minecraft:stick'
            }
        }, {
            item: `${modid}:${tier}_hoe`
        });

        data.shapedRecipe(`crafting/materials/${tier}/pickaxe`, ['###', ' X ', ' X '], {
            '#': {
                tag: `forge:ingots/${tier}`
            },
            'X': {
                item: 'minecraft:stick'
            }
        }, {
            item: `${modid}:${tier}_pickaxe`
        });

        data.shapedRecipe(`crafting/materials/${tier}/shovel`, ['#', 'X', 'X'], {
            '#': {
                tag: `forge:ingots/${tier}`
            },
            'X': {
                item: 'minecraft:stick'
            }
        }, {
            item: `${modid}:${tier}_shovel`
        });

        data.shapedRecipe(`crafting/materials/${tier}/sword`, ['#', '#', 'X'], {
            '#': {
                tag: `forge:ingots/${tier}`
            },
            'X': {
                item: 'minecraft:stick'
            }
        }, {
            item: `${modid}:${tier}_sword`
        });

        data.shapedRecipe(`crafting/materials/${tier}/hammer`, ['#Y#', '#X#', ' X '], {
            '#': {
                tag: `forge:ingots/${tier}`
            },
            'Y': {
                tag: `forge:storage_blocks/${tier}`
            },
            'X': {
                item: 'minecraft:stick'
            }
        }, {
            item: `${modid}:${tier}_hammer`
        });

        data.shapedRecipe(`crafting/materials/${tier}/excavator`, [' Y ', '#X#', ' X '], {
            '#': {
                tag: `forge:ingots/${tier}`
            },
            'Y': {
                tag: `forge:storage_blocks/${tier}`
            },
            'X': {
                item: 'minecraft:stick'
            }
        }, {
            item: `${modid}:${tier}_excavator`
        });

        data.shapedRecipe(`crafting/materials/${tier}/knife`, ['#', 'X'], {
            '#': {
                tag: `forge:ingots/${tier}`
            },
            'X': {
                item: 'minecraft:stick'
            }
        }, {
            item: `${modid}:${tier}_knife`
        });

        data.shapedRecipe(`crafting/materials/${tier}/sickle`, [' X ', '  X', ' X#'], {
            'X': {
                tag: `forge:ingots/${tier}`
            },
            '#': {
                item: 'minecraft:stick'
            }
        }, {
            item: `${modid}:${tier}_sickle`
        });

        data.shapedRecipe(`crafting/materials/${tier}/helmet`, ['XXX', 'X X'], {
            'X': {
                tag: `forge:ingots/${tier}`
            }
        }, {
            item: `${modid}:${tier}_helmet`
        });

        data.shapedRecipe(`crafting/materials/${tier}/chestplate`, ['X X', 'XXX', 'XXX'], {
            'X': {
                tag: `forge:ingots/${tier}`
            }
        }, {
            item: `${modid}:${tier}_chestplate`
        });

        data.shapedRecipe(`crafting/materials/${tier}/leggings`, ['XXX', 'X X', 'X X'], {
            'X': {
                tag: `forge:ingots/${tier}`
            }
        }, {
            item: `${modid}:${tier}_leggings`
        });

        data.shapedRecipe(`crafting/materials/${tier}/boots`, ['X X', 'X X'], {
            'X': {
                tag: `forge:ingots/${tier}`
            }
        }, {
            item: `${modid}:${tier}_boots`
        });
    }

    data.tags.addItemTag('forge:ingots/andesite_alloy', ['create:andesite_alloy']);

    assets.registerModels(models);
});