import { join } from 'path';
import { ResourceManager } from '../index.js';
import { DefaultDataManager } from '../lib/managers.js';
import { ModelManager } from '../lib/assets-builders.js';
import { ExMetal } from './tfc_types.js';
import { TFCDataManager } from './TFCDataManager.js';
import { ALLMetals, Metalwork_Items, Metalwork_Blocks, Rules, TFCMetals, MetallumMetals, FirmalifeMetals } from './constants.js';
import List from 'void-list';

let manager = new ResourceManager('tfc_metalwork', TFCDataManager.create);

function cap(text: string) {
    if(text.includes('_')) {
        let split = text.split('_')
        return split.map(t => t.charAt(0).toUpperCase() + t.slice(1, t.length)).join(' ')
    }
    return text.charAt(0).toUpperCase() + text.slice(1, text.length)
}

manager.run((assets, data, modid) => {
    
    let models = ModelManager.create(modid);

    assets.lang.entry('itemGroup.tfc_metalwork.metals', 'TFC Metalwork: Metals');

    let metalList = List.merge(TFCMetals, MetallumMetals, FirmalifeMetals).filter(metal => metal.types.length > 0);
    let ladders = metalList.map(metal => `tfc_metalwork:metal/ladder/${metal.name}`);
    data.tags.addBlockTag('minecraft:climbable', ladders.toArray());
    data.tags.addBlockTag('forge:ladders', ladders.toArray());
    data.tags.addBlockTag('tfc_metalwork:ladders', ladders.toArray());

    let blocks = metalList.map(metal => `tfc_metalwork:metal/block/${metal.name}`);
    data.tags.addBlockTag('forge:storage_blocks', blocks.toArray());
    data.tags.addItemTag('forge:storage_blocks', blocks.toArray());

    let blocks_cut = metalList.map(metal => `tfc_metalwork:metal/cut/${metal.name}`);
    let extra: List<string> = new List();

    blocks.forEach(block => {
        extra.addAll(block+'_slab', block+'_stairs', block+'_wall');
    });
    blocks_cut.forEach(block => {
        extra.addAll(block+'_slab', block+'_stairs', block+'_wall');
    });
    data.tags.addBlockTag('tfc_metalwork:cut_blocks', blocks_cut.toArray());

    data.tags.addBlockTag('minecraft:mineable/pickaxe', List.merge(blocks, blocks_cut, extra).toArray());
    data.tags.addItemTag('tfc_metalwork:cut_blocks', blocks_cut.toArray());

    data.tags.addBlockTag('minecraft:mineable/axe', ladders.toArray());

    for(let [itemName, itemData] of Object.entries(Metalwork_Items)) {
        let tagList = metalList.map(metal => `tfc_metalwork:metal/${itemName}/${metal.name}`);
        data.tags.addItemTag(itemData.tag, tagList.toArray());
    }

    for(let [mod, metals] of Object.entries(ALLMetals)) {
        for(let metal of metals) {
            if(metal.types.length > 0) {
                let metalName = metal.name
                data.shapedRecipe(`crafting/ladder/${metalName}`, ['X   X', 'XXX', 'X   X'], {
                    x: {
                        item: `${mod}:metal/rod/${metalName}`
                    }
                }, { item:`tfc_metalwork:metal/ladder/${metalName}` });

                if(mod !== 'tfc') {
                    data.conditionalAnvilRecipe(`${metalName}_large_rod`, [`${mod}:metal/double_ingot/${metalName}`], { item:`${modid}:metal/large_rod/${metalName}`, count:2 }, metal.tier, [Rules.bend_last, Rules.draw_second_last, Rules.draw_third_last], mod);
                    data.conditionalAnvilRecipe(`${metalName}_plate`, [`${mod}:metal/ingot/${metalName}`], { item:`${modid}:metal/plate/${metalName}`, count:2 }, metal.tier, [Rules.hit_any, Rules.draw_any, Rules.bend_last], mod);
                    data.conditionalAnvilRecipe(`${metalName}_large_plate`, [`${mod}:metal/double_ingot/${metalName}`], { item:`${modid}:metal/large_plate/${metalName}`, count:2 }, metal.tier, [Rules.hit_any, Rules.draw_any, Rules.bend_last], mod);
                    
                    data.conditionalAnvilRecipe(`${metalName}_large_rod`, [`${mod}:metal/double_ingot/${metalName}`], { item:`${modid}:metal/large_rod/${metalName}` }, metal.tier, [Rules.bend_last, Rules.draw_second_last, Rules.draw_third_last], mod);
                    data.conditionalAnvilRecipe(`${metalName}_plate`, [`${mod}:metal/ingot/${metalName}`], { item:`${modid}:metal/plate/${metalName}` }, metal.tier, [Rules.hit_any, Rules.draw_any, Rules.bend_last], mod);
                    data.conditionalAnvilRecipe(`${metalName}_large_plate`, [`${mod}:metal/double_ingot/${metalName}`], { item:`${modid}:metal/large_plate/${metalName}` }, metal.tier, [Rules.hit_any, Rules.draw_any, Rules.bend_last], mod);
                    
                    // ladder
                    data.conditionalAnvilRecipe(`${metalName}_ladder`, [`${modid}:metal/large_rod/${metalName}`], { item:`${modid}:metal/ladder/${metalName}` }, metal.tier, [Rules.bend_last, Rules.bend_second_last, Rules.hit_any], mod);

                    // block recipes
                    data.conditionalAnvilRecipe(`${metalName}_block`, [`${mod}:metal/double_sheet/${metalName}`], { item:`${modid}:metal/block/${metalName}` }, metal.tier, [Rules.bend_last, Rules.hit_any, Rules.bend_any], mod);
                    data.conditionalAnvilRecipe(`${metalName}_block_slab`, [`${modid}:metal/block/${metalName}`], { item:`${modid}:metal/block/${metalName}_slab`, count:2 }, metal.tier, [Rules.bend_last, Rules.draw_any, Rules.draw_any], mod);
                    data.conditionalAnvilRecipe(`${metalName}_block_stairs`, [`${modid}:metal/block/${metalName}`], { item:`${modid}:metal/block/${metalName}_stairs` }, metal.tier, [Rules.hit_not_last, Rules.draw_any, Rules.draw_any], mod);
                    data.conditionalAnvilRecipe(`${metalName}_block_wall`, [`${modid}:metal/block/${metalName}`], { item:`${modid}:metal/block/${metalName}_wall` }, metal.tier, [Rules.hit_last, Rules.upset_second_last, Rules.upset_third_last], mod);
                    data.chiselRecipe(join('slab', `${metalName}_block_slab`), `${modid}:metal/block/${metalName}`, `${modid}:metal/block/${metalName}_slab`, 'slab', mod);
                    data.chiselRecipe(join('stair', `${metalName}_block_stair`), `${modid}:metal/block/${metalName}`, `${modid}:metal/block/${metalName}_stairs`, 'stair', mod);

                    // cut block recipes
                    data.chiselRecipe(join('cut', `${metalName}_cut`), `${modid}:metal/block/${metalName}`, `${modid}:metal/cut/${metalName}`, 'smooth', mod);
                    data.chiselRecipe(join('cut', `${metalName}_cut_slab`), `${modid}:metal/block/${metalName}_slab`, `${modid}:metal/cut/${metalName}_slab`, 'smooth', mod);
                    data.chiselRecipe(join('cut', `${metalName}_cut_stairs`), `${modid}:metal/block/${metalName}_stairs`, `${modid}:metal/cut/${metalName}_stairs`, 'smooth', mod);
                    data.chiselRecipe(join('cut', `${metalName}_cut_wall`), `${modid}:metal/block/${metalName}_wall`, `${modid}:metal/cut/${metalName}_wall`, 'smooth', mod);
                    data.conditionalAnvilRecipe(`${metalName}_cut_block`, [`${modid}:metal/block/${metalName}`], { item:`${modid}:metal/cut/${metalName}` }, metal.tier, [Rules.hit_last, Rules.hit_any, Rules.upset_any], mod);
                    data.conditionalAnvilRecipe(`${metalName}_cut_block_slab`, [`${modid}:metal/cut/${metalName}`], { item:`${modid}:metal/cut/${metalName}_slab`, count:2 }, metal.tier, [Rules.bend_last, Rules.draw_any, Rules.draw_any], mod);
                    data.conditionalAnvilRecipe(`${metalName}_cut_block_stairs`, [`${modid}:metal/cut/${metalName}`], { item:`${modid}:metal/cut/${metalName}_stairs` }, metal.tier, [Rules.hit_not_last, Rules.draw_any, Rules.draw_any], mod);
                    data.conditionalAnvilRecipe(`${metalName}_cut_block_wall`, [`${modid}:metal/cut/${metalName}`], { item:`${modid}:metal/cut/${metalName}_wall` }, metal.tier, [Rules.hit_last, Rules.upset_second_last, Rules.upset_third_last], mod);
                    data.chiselRecipe(join('slab', `${metalName}_cut_block_slab`), `${modid}:metal/cut/${metalName}`, `${modid}:metal/cut/${metalName}_slab`, 'slab', mod);
                    data.chiselRecipe(join('stair', `${metalName}_cut_block_stair`), `${modid}:metal/cut/${metalName}`, `${modid}:metal/cut/${metalName}_stairs`, 'stair', mod);

                    // crafting recipes
                    data.conditionalShapedRecipe(`crafting/small_gear/${metalName}`, [' X ', 'X X', ' X '], { 'X': { "item": `${mod}:metal/rod/${metalName}`} }, { item:`tfc_metalwork:metal/small_gear/${metalName}` }, mod);
                    data.conditionalShapedRecipe(`crafting/large_gear/${metalName}`, [' X ', 'X X', ' X '], { 'X': { "item": `${modid}:metal/large_rod/${metalName}`} }, { item:`tfc_metalwork:metal/large_gear/${metalName}` }, mod);

                    data.conditionalQuernRecipe(`${metalName}_dust`, [`${mod}:metal/ingot/${metalName}`], [`tfc_metalwork:metal/dust/${metalName}`], mod);
                }
                else {
                    data.anvilRecipe(`${metalName}_large_rod`, [`${mod}:metal/double_ingot/${metalName}`], { item:`${modid}:metal/large_rod/${metalName}` }, metal.tier, [Rules.bend_last, Rules.draw_second_last, Rules.draw_third_last]);
                    data.anvilRecipe(`${metalName}_plate`, [`${mod}:metal/ingot/${metalName}`], { item:`${modid}:metal/plate/${metalName}` }, metal.tier, [Rules.hit_any, Rules.draw_any, Rules.bend_last]);
                    data.anvilRecipe(`${metalName}_large_plate`, [`${mod}:metal/double_ingot/${metalName}`], { item:`${modid}:metal/large_plate/${metalName}` }, metal.tier, [Rules.hit_any, Rules.draw_any, Rules.bend_last]);
                    
                    // ladder
                    data.anvilRecipe(`${metalName}_ladder`, [`${modid}:metal/large_rod/${metalName}`], { item:`${modid}:metal/ladder/${metalName}` }, metal.tier, [Rules.bend_last, Rules.bend_second_last, Rules.hit_third_last]);

                    // block recipes
                    data.anvilRecipe(`${metalName}_block`, [`${mod}:metal/double_sheet/${metalName}`], { item:`${modid}:metal/block/${metalName}` }, metal.tier, [Rules.bend_last, Rules.hit_any, Rules.bend_any]);
                    data.anvilRecipe(`${metalName}_block_slab`, [`${modid}:metal/block/${metalName}`], { item:`${modid}:metal/block/${metalName}_slab`, count:2 }, metal.tier, [Rules.bend_last, Rules.draw_any, Rules.draw_any]);
                    data.anvilRecipe(`${metalName}_block_stairs`, [`${modid}:metal/block/${metalName}`], { item:`${modid}:metal/block/${metalName}_stairs` }, metal.tier, [Rules.hit_not_last, Rules.draw_any, Rules.draw_any]);
                    data.anvilRecipe(`${metalName}_block_wall`, [`${modid}:metal/block/${metalName}`], { item:`${modid}:metal/block/${metalName}_wall` }, metal.tier, [Rules.hit_last, Rules.upset_second_last, Rules.upset_third_last]);
                    data.chiselRecipe(join('slab', `${metalName}_block_slab`), `${modid}:metal/block/${metalName}`, `${modid}:metal/block/${metalName}_slab`, 'slab');
                    data.chiselRecipe(join('stair', `${metalName}_block_stair`), `${modid}:metal/block/${metalName}`, `${modid}:metal/block/${metalName}_stairs`, 'stair');

                    // cut block recipes
                    data.chiselRecipe(join('cut', `${metalName}_cut`), `${modid}:metal/block/${metalName}`, `${modid}:metal/cut/${metalName}`, 'smooth');
                    data.chiselRecipe(join('cut', `${metalName}_cut_slab`), `${modid}:metal/block/${metalName}_slab`, `${modid}:metal/cut/${metalName}_slab`, 'smooth');
                    data.chiselRecipe(join('cut', `${metalName}_cut_stairs`), `${modid}:metal/block/${metalName}_stairs`, `${modid}:metal/cut/${metalName}_stairs`, 'smooth');
                    data.chiselRecipe(join('cut', `${metalName}_cut_wall`), `${modid}:metal/block/${metalName}_wall`, `${modid}:metal/cut/${metalName}_wall`, 'smooth');
                    data.anvilRecipe(`${metalName}_cut_block`, [`${modid}:metal/block/${metalName}`], { item:`${modid}:metal/cut/${metalName}` }, metal.tier, [Rules.hit_last, Rules.hit_any, Rules.upset_any]);
                    data.anvilRecipe(`${metalName}_cut_block_slab`, [`${modid}:metal/cut/${metalName}`], { item:`${modid}:metal/cut/${metalName}_slab`, count:2 }, metal.tier, [Rules.bend_last, Rules.draw_any, Rules.draw_any]);
                    data.anvilRecipe(`${metalName}_cut_block_stairs`, [`${modid}:metal/cut/${metalName}`], { item:`${modid}:metal/cut/${metalName}_stairs` }, metal.tier, [Rules.hit_not_last, Rules.draw_any, Rules.draw_any]);
                    data.anvilRecipe(`${metalName}_cut_block_wall`, [`${modid}:metal/cut/${metalName}`], { item:`${modid}:metal/cut/${metalName}_wall` }, metal.tier, [Rules.hit_last, Rules.upset_second_last, Rules.upset_third_last]);
                    data.chiselRecipe(join('slab', `${metalName}_cut_block_slab`), `${modid}:metal/cut/${metalName}`, `${modid}:metal/cut/${metalName}_slab`, 'slab');
                    data.chiselRecipe(join('stair', `${metalName}_cut_block_stair`), `${modid}:metal/cut/${metalName}`, `${modid}:metal/cut/${metalName}_stairs`, 'stair');

                    // crafting recipes
                    data.shapedRecipe(`crafting/small_gear/${metalName}`, [' X ', 'X X', ' X '], { 'X': { "item": `${mod}:metal/rod/${metalName}`} }, { item:`tfc_metalwork:metal/small_gear/${metalName}` });
                    data.shapedRecipe(`crafting/large_gear/${metalName}`, [' X ', 'X X', ' X '], { 'X': { "item": `${modid}:metal/large_rod/${metalName}`} }, { item:`tfc_metalwork:metal/large_gear/${metalName}` });
                
                    data.quernRecipe(`${metalName}_dust`, [`${mod}:metal/ingot/${metalName}`], [`tfc_metalwork:metal/dust/${metalName}`]);
                }

                for(let [itemName, itemData] of Object.entries(Metalwork_Items)) {
                    data.heatingRecipe(`metal/${metalName}_${itemName}`, ['tag', `${itemData.tag}/${metalName}`], [`${mod}:metal/${metalName}`, itemData.smelt_amount], metal.melt_temperature);
                    data.tags.addItemTag(`${itemData.tag}/${metalName}`, [`tfc_metalwork:metal/${itemName}/${metalName}`]);
                    models.itemModel(`metal/${itemName}/${metalName}`);
                    assets.lang.itemEntry(`metal.${itemName}.${metalName}`, cap(`${metalName}_${itemName}`));
                    data.item_heat_tag(`metal/${metalName}_${itemName}`, `${itemData.tag}/${metalName}`, metal.ingot_heat_capacity, metal.melt_temperature, itemData.smelt_amount);
                }

                for(let [blockName, blockData] of Object.entries(Metalwork_Blocks)) {
                    data.heatingRecipe(`metal/${metalName}_${blockName}`, ['tag', `${blockData.tag}/${metalName}`], [`${mod}:metal/${metalName}`, blockData.smelt_amount], metal.melt_temperature);
                    data.heatingRecipe(`metal/${metalName}_${blockName}_slab`, [`tfc_metalwork/metal/${blockName}/${metalName}_slab`], [`${mod}:metal/${metalName}`, blockData.smelt_amount], metal.melt_temperature);
                    data.heatingRecipe(`metal/${metalName}_${blockName}_stairs`, [`tfc_metalwork/metal/${blockName}/${metalName}_stairs`], [`${mod}:metal/${metalName}`, blockData.smelt_amount], metal.melt_temperature);
                    data.heatingRecipe(`metal/${metalName}_${blockName}_wall`, [`tfc_metalwork/metal/${blockName}/${metalName}_wall`], [`${mod}:metal/${metalName}`, blockData.smelt_amount], metal.melt_temperature);
                    data.tags.addBlockTag(`${blockData.tag}/${metalName}`, [`tfc_metalwork:metal/${blockName}/${metalName}`]);
                    data.tags.addItemTag(`${blockData.tag}/${metalName}`, [`tfc_metalwork:metal/${blockName}/${metalName}`]);
                    if(blockName == 'ladder') {
                        models.ladder(`metal/${blockName}/${metalName}`);
                    }
                    else {
                        models.decorativeBlocks(`metal/${blockName}/${metalName}`);
                        data.loots.dropBlock(`metal/${blockName}/${metalName}_slab`);
                        data.loots.dropBlock(`metal/${blockName}/${metalName}_stairs`);
                        data.loots.dropBlock(`metal/${blockName}/${metalName}_wall`);
                        assets.lang.blockEntry(`metal.${blockName}.${metalName}_slab`, cap(`${metalName}_${blockName}_slab`));
                        assets.lang.blockEntry(`metal.${blockName}.${metalName}_stairs`, cap(`${metalName}_${blockName}_stairs`));
                        assets.lang.blockEntry(`metal.${blockName}.${metalName}_wall`, cap(`${metalName}_${blockName}_wall`));
                        data.item_heat(`metal/${metalName}_${blockName}_slab`, `${modid}/metal/${blockName}/${metalName}_slab`, metal.ingot_heat_capacity, metal.melt_temperature, blockData.smelt_amount);
                        data.item_heat(`metal/${metalName}_${blockName}_stairs`, `${modid}/metal/${blockName}/${metalName}_stairs`, metal.ingot_heat_capacity, metal.melt_temperature, blockData.smelt_amount);
                        data.item_heat(`metal/${metalName}_${blockName}_wall`, `${modid}/metal/${blockName}/${metalName}_wall`, metal.ingot_heat_capacity, metal.melt_temperature, blockData.smelt_amount);
                    }
                    data.item_heat_tag(`metal/${metalName}_${blockName}`, `${blockData.tag}/${metalName}`, metal.ingot_heat_capacity, metal.melt_temperature, blockData.smelt_amount);
                    data.loots.dropBlock(`metal/${blockName}/${metalName}`);
                    assets.lang.blockEntry(`metal.${blockName}.${metalName}`, cap(`${metalName}_${blockName}`));
                }
            }
        }
    }

    assets.registerModels(models);
});