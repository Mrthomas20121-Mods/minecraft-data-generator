import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import List from 'void-list';
import { ResourceManager } from '../index.js';
import { MetallumMetals, Rules, SedimentaryRocks, TFC_Metal_Items } from './constants.js';
import { MetallumModelManager } from './metallum-assets.js';
import { allToolParts, parts, tags } from './tagParts.js';
import { TFCDataManager } from './TFCDataManager.js';
import { ExMetal, Ore, Stone } from './tfc_types.js';
import { Metal } from './constants.js';

let manager = new ResourceManager('tfc_metallum', TFCDataManager.create);

function load(e: string): any {
    return JSON.parse(readFileSync(e, 'utf8'));
}

function getItems(metal: ExMetal[], partName: string): string[] {
    return metal.map(metal => `tfc_metallum:metal/${partName}/${metal.name}`);
}

function getFluids(metal: ExMetal[]): string[] {
    return metal.map(metal => `tfc_metallum:metal/${metal.name}`);
}

function cap(text: string) {
    if(text.includes('_')) {
        let split = text.split('_')
        return split.map(t => t.charAt(0).toUpperCase() + t.slice(1, t.length)).join(' ')
    }
    return text.charAt(0).toUpperCase() + text.slice(1, text.length)
}

manager.run((assets, data, modid) => {
    let metalParts: string[] = load('./src/datagen/data/metal_parts.json');
    let toolMetalParts: {name: string, isTool:boolean}[] = load('./src/datagen/data/tool_metal_parts.json');
    let metals: ExMetal[] = load('./src/datagen/data/metallum_metals.json');
    let toolMetals = metals.filter(metal => metal.hasToolArmor)
    let ores: Ore[] = load('./src/datagen/data/ores.json');
    let stones: Stone[] = load('./src/datagen/data/stones.json');
    let oreType = ['poor', 'rich', 'normal'];
    let barMetals: List<Metal> = MetallumMetals.filter(m => ['enderium', 'titanium', 'tungsten', 'tungsten_steel'].includes(m.name));
    let bellMetals: List<Metal> = MetallumMetals.filter(m => ['beryllium_copper', 'florentine_bronze'].includes(m.name));
    let models = MetallumModelManager.create(modid);

    data.cluster_vein('normal_bauxite', 40, -32, 60, 20, 15, 'tfc_metallum:small_ore/bauxite', (rock) => { return [
        { weight:10, block:`${modid}:ore/poor_bauxite/${rock.name}` },
        { weight:30, block:`${modid}:ore/normal_bauxite/${rock.name}` },
        { weight:60, block:`${modid}:ore/rich_bauxite/${rock.name}` }
    ] }, SedimentaryRocks);

    let mineableBlocks: List<string> = new List();

    for(let m of barMetals) {
        models.bars(m);
        assets.lang.blockEntry(`${m.name}_bars`, cap(`${m.name}_bars`));
        data.loots.dropBlock(`${m.name}_bars`);
        mineableBlocks.add(`${m.name}_bars`);
    }

    for(let m of bellMetals) {
        models.bell(m);
        assets.lang.blockEntry(`${m.name}_bell`, cap(`${m.name}_bell`));
        data.loots.dropBlock(`${m.name}_bell`);
        mineableBlocks.add(`${m.name}_bell`);
    }

    let mineable = data.tags.addBlockTag('minecraft:mineable/pickaxe', mineableBlocks.toArray());

    let partData = Object.entries(TFC_Metal_Items).filter(metalItem => metalItem[1].durability);
    let usable_on_tool_rack = []
    metals.forEach(metal => {
        if(metal.hasToolArmor) {
            partData.forEach(part => {
                if(!(part[1].type == 'armor' || part[0] == 'shield')) {
                    usable_on_tool_rack.push(`tfc_metallum:metal/${part[0]}/${metal.name}`);
                }
                
            })
        }
    });

    data.tags.addItemTag('tfc:usable_on_tool_rack', usable_on_tool_rack);

    assets.lang.entry('itemGroup.tfc_metallum.metals', 'TFC Metallum - Metals');
    assets.lang.entry('itemGroup.tfc_metallum.ores', 'TFC Metallum - Ores');

    // item names for tags
    tags.forEach(tagPart => {
        let items = getItems(tagPart.isToolPart ? toolMetals : metals, tagPart.name);
        let tagName: string;
        if(tagPart.name == 'shears') {
            tagName = `tfc:${tagPart.name}`;
        }
        else {
            tagName = `tfc:${tagPart.name}s`;
        }
        data.tags.addItemTag(tagName, items);
        data.tags.addItemTag(tagName.replace('tfc', 'forge'), ['#'+tagName]);
    });
    
    data.tags.addFluidTag('tfc:usable_in_tool_head_mold', getFluids(metals.filter(metal => metal.hasToolArmor)));
    data.tags.addFluidTag('tfc:usable_in_ingot_mold', getFluids(metals));
    data.tags.addItemTag('tfc:pileable_ingots', getItems(metals, 'ingot'));
    data.tags.addItemTag('tfc:pileable_sheets', getItems(metals, 'sheet'));

    data.tags.addItemTag('tfc:holds_small_fishing_bait', getItems(metals.filter(metal => metal.hasToolArmor), 'fishing_rod'));

    let heatingRecipes = readdirSync('./recipes');
    let craftingRecipes = readdirSync('./crafting_recipes');

    for(let metal of metals) {
        // lang
        assets.lang.entry(`fluid.tfc_metallum.metal.${metal.name}`, `Molten ${cap(metal.name)}`);
        assets.lang.entry(`metal.tfc_metallum.${metal.name}`, cap(metal.name));
        assets.lang.itemEntry(`bucket.metal.${metal.name}`, cap(`molten_${metal.name}_bucket`));
        assets.lang.itemEntry(`metal.ingot.${metal.name}`, cap(`${metal.name}_ingot`));
        if(metal.hasParts) {
            assets.lang.itemEntry(`metal.double_ingot.${metal.name}`, cap(`${metal.name}_double_ingot`));
            assets.lang.itemEntry(`metal.sheet.${metal.name}`, cap(`${metal.name}_sheet`));
            assets.lang.itemEntry(`metal.double_sheet.${metal.name}`, cap(`${metal.name}_double_sheet`));
            assets.lang.itemEntry(`metal.rod.${metal.name}`, cap(`${metal.name}_rod`));
        }

        data.customRecipe(join('casting', metal.name+'_ingot.json'), {
            "type": "tfc:casting",
            "mold": {
              "item": "tfc:ceramic/ingot_mold"
            },
            "fluid": {
              "ingredient": `tfc_metallum:metal/${metal.name}`,
              "amount": 100
            },
            "result": {
              "item": `tfc_metallum:metal/ingot/${metal.name}`
            },
            "break_chance": 0.1
        });

        data.tags.addItemTag(`forge:ingots/${metal.name}`, [`${modid}:metal/ingot/${metal.name}`]);
        data.tags.addItemTag(`forge:double_ingots/${metal.name}`, [`${modid}:metal/double_ingot/${metal.name}`]);
        data.tags.addItemTag(`forge:sheets/${metal.name}`, [`${modid}:metal/sheet/${metal.name}`]);
        data.tags.addItemTag(`forge:double_sheets/${metal.name}`, [`${modid}:metal/double_sheet/${metal.name}`]);
        data.tags.addItemTag(`forge:rods/${metal.name}`, [`${modid}:metal/rod/${metal.name}`]);
        data.tags.addFluidTag(`tfc:${metal.name}`, [`${modid}:metal/${metal.name}`, `${modid}:metal/flowing_${metal.name}`]);
        data.tags.addFluidTag(`forge:${metal.name}`, [`${modid}:metal/${metal.name}`, `${modid}:metal/flowing_${metal.name}`]);

        if(metal.hasToolArmor) {

            data.anvilRecipe(`${metal.name}_chain.json`, ['tag', `forge:ingots/${metal.name}`], {item:`${modid}:metal/chain/${metal.name}`, count:16}, metal.tier,  [Rules.hit_any, Rules.hit_any, Rules.draw_last], false);

            for(let toolPart of allToolParts) {
                let name = toolPart.useForgeTag ? `forge:${toolPart.name}s/${metal.name}` : `${modid}:metal/${toolPart.name}/${metal.name}`
                let json = {
                    "type": "tfc:heating",
                    "ingredient": {},
                    "result_fluid": {
                        "fluid": `${modid}:metal/${metal.name}`,
                        "amount": toolPart.meltInto
                    },
                    "temperature": metal.melt_temp
                }

                if(toolPart.useDurability) {
                    json['use_durability'] = true
                }
                if(toolPart.useForgeTag) {
                    json.ingredient["tag"] = name
                }
                else {
                    json.ingredient["item"] = name
                }

                data.item_heat(`metal/${metal.name}_${toolPart.name}`, `metal/${toolPart.name}/${metal.name}`, metal.ingot_heat_capacity, metal.melt_temp, toolPart.meltInto);
                data.customRecipe(join('heating', 'metal', `${metal.name}_${toolPart.name}.json`), json);
            }

            for(let file of craftingRecipes) {
                let json = readFileSync(join('.', 'crafting_recipes', file), 'utf8');
                while(json.includes('bismuth_bronze') || json.includes('tfc:metal')) {
                    json = json.replace('tfc:metal', modid+':metal').replace('bismuth_bronze', metal.name);
                }
                data.customRecipe(join('crafting', 'metal', `${metal.name}_${file}`), JSON.parse(json));
            }

            for(let file of heatingRecipes) {
                let json = load(join('.', 'recipes', file));
                delete json.__comment__
                let fluid = `tfc_metallum:metal/${metal.name}`;
                let partName = file.replace('.json', '');
                let result = `tfc_metallum:metal/${partName}/${metal.name}`
                json.fluid.ingredient = fluid
                json.result.item = result
                data.customRecipe(join('casting', `${metal.name}_${partName}.json`), json);
            }
            assets.lang.itemEntry(`metal.shield.${metal.name}`, cap(`${metal.name}_shield`));

            // tool parts models
            for(let toolPart of toolMetalParts) {

                let parent = toolPart.isTool ? 'item/handheld' : 'item/generated'
                if(toolPart.name == 'saw' || toolPart.name == 'knife' || toolPart.name == 'chisel') {
                    parent = 'tfc:item/handheld_flipped';
                }
                let name = toolPart.name.includes('propick') ? toolPart.name.replace('propick', 'prospector\'s_pickaxe'): toolPart.name;
                assets.lang.itemEntry(`metal.${toolPart.name}.${metal.name}`, cap(`${metal.name}_${name}`));
                if(toolPart.name == 'javelin') {
                    models.javelinItem(metal);
                }
                else if(toolPart.name == 'fishing_rod') {
                    models.fishingRodItem(metal);
                }
                else {
                    models.itemModel(`metal/${toolPart.name}/${metal.name}`, parent);
                }
            }

            // models
            models.anvil(`metal/anvil/${metal.name}`);
            models.chain(`metal/chain/${metal.name}`);
            models.lamp(`metal/lamp/${metal.name}`);
            models.trapdoor(`metal/trapdoor/${metal.name}`);
            models.shield(metal);

            // loots
            data.loots.copyBlockNBTData(`metal/anvil/${metal.name}`);
            data.loots.dropBlock(`metal/chain/${metal.name}`);
            data.loots.copyBlockNBTData(`metal/lamp/${metal.name}`);
            data.loots.dropBlock(`metal/trapdoor/${metal.name}`);
            assets.lang.blockEntry(`metal.anvil.${metal.name}`, cap(`${metal.name}_anvil`));
            assets.lang.blockEntry(`metal.chain.${metal.name}`, cap(`${metal.name}_chain`));
            assets.lang.blockEntry(`metal.lamp.${metal.name}`, cap(`${metal.name}_lamp`));
            assets.lang.blockEntry(`metal.lamp.${metal.name}_filled`, cap(`filled_${metal.name}_lamp`));
            assets.lang.blockEntry(`metal.trapdoor.${metal.name}`, cap(`${metal.name}_trapdoor`));
        }
        else {
            for(let part of parts) {
                data.item_heat(`metal/${metal.name}_${part.name}`, `metal/${part.name}/${metal.name}`, metal.ingot_heat_capacity, metal.melt_temp, part.meltInto);
                let name = part.useForgeTag ? `forge:${part.name}s/${metal.name}` : `${modid}:metal/${part.name}/${metal.name}`
                let json = {
                    "type": "tfc:heating",
                    "ingredient": {},
                    "result_fluid": {
                        "fluid": `${modid}:metal/${metal.name}`,
                        "amount": part.meltInto
                    },
                    "temperature": metal.melt_temp
                }

                if(part.useDurability) {
                    json['use_durability'] = true
                }
                if(part.useForgeTag) {
                    json.ingredient["tag"] = name
                }
                else {
                    json.ingredient["item"] = name
                }

                data.customRecipe(join('heating', 'metal', `${metal.name}_${part.name}.json`), json);
            }
        }
        // metal parts models
        for(let toolPart of metalParts) {
            models.itemModel(`metal/${toolPart}/${metal.name}`);
        }

        models.metalFluid(metal);
    }

    data.tags.addItemTag('forge:ores', ores.map(ore => {
        if(ore.isGraded) {
            return `#forge:ores/${ore.metal}`;
        }
        return `#forge:ores/${ore.name}`;
    }));

    data.tags.addItemTag('tfc:prospectable', ores.map(ore => {
        if(ore.isGraded) {
            return `#forge:ores/${ore.metal}`;
        }
        return `#forge:ores/${ore.name}`;
    }));

    data.tags.addBlockTag('tfc:prospectable', ores.map(ore => {
        if(ore.isGraded) {
            return `#forge:ores/${ore.metal}`;
        }
        return `#forge:ores/${ore.name}`;
    }));

    data.tags.addItemTag('tfc:rock/ores', ores.map(ore => {
        if(ore.isGraded) {
            return `#forge:ores/${ore.metal}`;
        }
        return `#forge:ores/${ore.name}`;
    }));

    data.tags.addBlockTag('tfc:rock/ores', ores.map(ore => {
        if(ore.isGraded) {
            return `#forge:ores/${ore.metal}`;
        }
        return `#forge:ores/${ore.name}`;
    }));

    data.tags.addBlockTag('minecraft:mineable/pickaxe', ores.map(ore => {
        if(ore.isGraded) {
            return `#forge:ores/${ore.metal}`;
        }
        return `#forge:ores/${ore.name}`;
    }));


    let orePieces = []
    let smallOrePieces = []
    ores.forEach(ore => {
        if(ore.isGraded) {
            orePieces.push(`${modid}:ore/rich_${ore.name}`, `${modid}:ore/normal_${ore.name}`, `${modid}:ore/poor_${ore.name}`);
            smallOrePieces.push(`${modid}:ore/small_${ore.name}`);
        }
        else {
            orePieces.push(`${modid}:ore/${ore.name}`);
        }
    });

    data.tags.addItemTag(`tfc:ore_pieces`, orePieces);
    data.tags.addItemTag(`tfc:small_ore_pieces`, smallOrePieces);

    for(let ore of ores) {
        let oreTagData = []
        if(ore.isGraded) {
            assets.lang.blockEntry(`ore.small_${ore.name}.prospected`, cap(`small_${ore.name}`));
        }
        for(let stone of stones) {
            if(ore.isGraded) {

                oreTagData.push(`${modid}:ore/rich_${ore.name}/${stone.name}`, `${modid}:ore/poor_${ore.name}/${stone.name}`, `${modid}:ore/normal_${ore.name}/${stone.name}`);
                for(let type of oreType) {

                    let amount = 25;
                    if(type == 'rich') {
                        amount = 35;
                    }
                    else if(type == 'poor') {
                        amount = 15;
                    }

                    let json = {
                        "type": "tfc:heating",
                        "ingredient": {
                            "item":  `${modid}:ore/${type}_${ore.name}`
                        },
                        "result_fluid": {
                            "fluid": `${modid}:metal/${ore.metal}`,
                            "amount": amount
                        },
                        "temperature": ore.metalTemp
                    }
    
                    data.customRecipe(join('heating', 'ore', `${type}_${ore.name}.json`), json);

                    assets.lang.blockEntry(`ore.${type}_${ore.name}.${stone.name}.prospected`, cap(`${type}_${stone.name}_${ore.name}`));
                    assets.lang.blockEntry(`ore.${type}_${ore.name}.${stone.name}`, cap(`${type}_${stone.name}_${ore.name}`));
                    assets.lang.itemEntry(`ore.${type}_${ore.name}`, cap(`${type}_${ore.name}`));
                    models.ore(`ore/${type}_${ore.name}/${stone.name}`, stone.name, `${type}_${ore.name}`);
                    models.itemModel(`ore/${type}_${ore.name}`);
                    data.loots.dropOther(`ore/${type}_${ore.name}/${stone.name}`, `ore/${type}_${ore.name}`);
                }

                let json = {
                    "type": "tfc:heating",
                    "ingredient": {
                        "item":  `${modid}:ore/small_${ore.name}`
                    },
                    "result_fluid": {
                        "fluid": `${modid}:metal/${ore.metal}`,
                        "amount": 10
                    },
                    "temperature": ore.metalTemp
                }

                data.customRecipe(join('heating', 'ore', `small_${ore.name}.json`), json);
            }
            else {
                assets.lang.blockEntry(`ore.${ore.name}.${stone.name}.prospected`, cap(`${stone.name}_${ore.name}`));
                assets.lang.blockEntry(`ore.${ore.name}.${stone.name}`, cap(`${stone.name}_${ore.name}`));
                assets.lang.itemEntry(`ore.${ore.name}`, cap(ore.name));
                oreTagData.push(`${modid}:ore/${ore.name}/${stone.name}`);
                models.ore(`ore/${ore.name}/${stone.name}`, stone.name, ore.name);
                models.itemModel(`ore/${ore.name}`);
                data.loots.dropOther(`ore/${ore.name}/${stone.name}`, `ore/${ore.name}`);
            }
        }
        if(ore.isGraded) {
            assets.lang.blockEntry(`ore.small_${ore.name}`, cap(`small_${ore.name}`));
            data.loots.dropBlock(`ore/small_${ore.name}`);
            oreTagData.push(`${modid}:ore/small_${ore.name}`);
            data.tags.addItemTag(`forge:ores/${ore.metal}`, oreTagData);
            data.tags.addBlockTag(`forge:ores/${ore.metal}`, oreTagData);
        }
        else {
            data.tags.addItemTag(`forge:ores/${ore.name}`, oreTagData);
            data.tags.addBlockTag(`forge:ores/${ore.name}`, oreTagData);
        }
    }
    assets.registerModels(models);
});