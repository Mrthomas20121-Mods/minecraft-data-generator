import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import List from 'void-list';
import { ResourceManager } from '../index.js';
import { AllRocks, IgneousExtrusiveRocks, IgneousIntrusiveRocks, MetallumMetals, MetallumOres, MetamorphicRocks, Rules, SedimentaryRocks, TFC_Metal_Items } from './constants.js';
import { MetallumModelManager } from './metallum-assets.js';
import { allToolParts, parts, tags } from './tagParts.js';
import { CriteriaBuilder, TFCDataManager } from './TFCDataManager.js';
import { ExMetal, Ore, Stone } from './tfc_types.js';
import { Metal, Ore as COre } from './constants.js';
import { AssetManager } from '../lib/managers.js';

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

let metalP = {
    ingot:TFC_Metal_Items.ingot,
    double_ingot:TFC_Metal_Items.double_ingot,
    sheet:TFC_Metal_Items.sheet,
    double_sheet:TFC_Metal_Items.double_sheet,
    rod:TFC_Metal_Items.rod
}

manager.run((assets, data, modid) => {
    for(let metal of MetallumMetals) {

        if(metal.types.length == 0) {
            data.item_heat(`metal/${metal.name}_ingot`, `metal/${metal.name}`, metal.ingot_heat_capacity, metal.melt_temperature, TFC_Metal_Items.ingot.smelt_amount);
            data.heatingRecipe(`metal/${metal.name}_ingot`, [`tfc_metallum:metal/ingot/${metal.name}`], [`${modid}:metal/${metal.name}`, TFC_Metal_Items.ingot.smelt_amount], metal.melt_temperature);
        }

        for(let [partName, partData] of Object.entries(metalP)) {
            data.item_heat_tag(`metal/${metal.name}_${partName}`, `forge:${partName}s/${metal.name}`, metal.ingot_heat_capacity, metal.melt_temperature, partData.smelt_amount);
            data.heatingRecipe(`metal/${metal.name}_${partName}`, ['tag', `forge:${partName}s/${metal.name}`], [`${modid}:metal/${metal.name}`, partData.smelt_amount], metal.melt_temperature);

        }
    }

    //assets.registerModels();
})

// /**
//  * TFC Metallum Advancements
//  * @param modid tfc_metallum
//  * @param data data manager
//  */
// function advancements(modid: string, data: TFCDataManager) {
//     let metals: List<Metal> = MetallumMetals;

//     let cBuild: CriteriaBuilder = new CriteriaBuilder();

//     for(let metal of metals) {
//         cBuild.addCriteria(metal.name, [
//             {
//                 tag: `${modid}:metal_item/${metal.name}`
//             }
//         ]);
//     }

//     data.advancement('world/metallum_metallurgist', 'tfc:world/nugget', cBuild, `tfc_metallum:metal/ingot/aluminum`);

//     for(let ore of MetallumOres) {
//         if(ore.graded) {
//             let c = new CriteriaBuilder();
//             c.addCriteria(`ore/${ore.metal}`, [ `tfc_metallum:ore/small_${ore.name}` ]);
//             data.advancement(`world/${ore.metal}`, 'tfc:world/nugget', c, `tfc_metallum:ore/small_${ore.name}`);
//         }
//         else {
//             let c = new CriteriaBuilder();
//             c.addCriteria(`ore/${ore.name}`, [
//                 {
//                     item: `tfc_metallum:ore/${ore.name}`
//                 }
//             ]);
//             data.advancement(`world/${ore.name}`, 'tfc:world/nugget', c, `tfc_metallum:ore/${ore.name}`);
//         }
//     }
// }

// function language(modid: string, assets: AssetManager) {
//     assets.lang.entry('itemGroup.tfc_metallum.metals', 'TFC Metallum - Metals');
//     assets.lang.entry('itemGroup.tfc_metallum.ores', 'TFC Metallum - Ores');
//     assets.lang.entry('tfc_metallum.advancements.world.metallum_metallurgist.title', 'Metallurgist+');
//     assets.lang.entry('tfc_metallum.advancements.world.metallum_metallurgist.description', 'Obtain a metal specimen of all TFC Metallum metals.');

//     for(let ore of MetallumOres) {
//         if(ore.graded) {
//             assets.lang.entry(`tfc_metallum.advancements.world.${ore.metal}.title`, cap(ore.metal));
//             assets.lang.entry(`tfc_metallum.advancements.world.${ore.metal}.description`, `Find ${cap(ore.name)}.`);
//         }
//         else {
//             assets.lang.entry(`tfc_metallum.advancements.world.${ore.name}.title`, cap(ore.name));
//             assets.lang.entry(`tfc_metallum.advancements.world.${ore.name}.description`, `Find ${cap(ore.name)}.`);
//         }
//     }
// }

// /**
//  * TFC Metallum Tags
//  * @param data 
//  */
// function metallumTags(modid: string, data: TFCDataManager) {
//     let ores: List<COre> = MetallumOres;
//     let toolMetals: List<Metal> = MetallumMetals.filter(metal => metal.types.includes('tool'));
//     let otherMetals: List<Metal> = MetallumMetals.filter(metal => !metal.types.includes('tool'));

//     for(let metal of toolMetals) {
//         let items: List<string> = new List();
//         for(let [partName, partData] of Object.entries(TFC_Metal_Items)) {
//             if(partData.tag != null) {
//                 data.tags.addItemTag(`${partData.tag}/${metal.name}`, [`${modid}:metal/${partName}/${metal.name}`]);
//                 data.tags.addItemTag(partData.tag, [`${modid}:metal/${partName}/${metal.name}`]);
//                 items.add(`#${partData.tag}/${metal.name}`);
//             }
//             else {
//                 items.add(`${modid}:metal/${partName}/${metal.name}`);
//             }
//         }
//         data.tags.addItemTag(`${modid}:metal_item/${metal.name}`, items.toArray());
//     }

//     for(let metal of otherMetals) {

//         data.tags.addFluidTag(`tfc:${metal.name}`, [`${modid}:metal/${metal.name}`, `${modid}:metal/flowing_${metal.name}`]);
//         data.tags.addFluidTag(`forge:${metal.name}`, [`${modid}:metal/${metal.name}`, `${modid}:metal/flowing_${metal.name}`]);

//         let items: List<string> = new List();
//         for(let [partName, partData] of Object.entries(TFC_Metal_Items)) {
//             // if parts are tools or armor parts, ignore
//             if(partData.type == 'tool' || partData.type == 'armor' || partData.type == 'shield') {
//                 continue;
//             }
//             else if(partData.tag != null) {
//                 data.tags.addItemTag(`${partData.tag}/${metal.name}`, [`${modid}:metal/${partName}/${metal.name}`]);
//                 data.tags.addItemTag(partData.tag, [`${modid}:metal/${partName}/${metal.name}`]);
//                 items.add(`#${partData.tag}/${metal.name}`);
//             }
//             else {
//                 items.add(`${modid}:metal/${partName}/${metal.name}`);
//             }
//         }
//         data.tags.addItemTag(`${modid}:metal_item/${metal.name}`, items.toArray());
//     }

//     for(let ore of ores) {
//         if(ore.graded) {
//             for(let rock of AllRocks) {
//                 let oreItems = [`tfc_metallum:ore/normal_${ore.name}/${rock.name}`, `tfc_metallum:ore/poor_${ore.name}/${rock.name}`, `tfc_metallum:ore/rich_${ore.name}/${rock.name}`];
//                 data.tags.addItemTag(`forge:ores`, oreItems);
//                 data.tags.addItemTag(`forge:ores/${ore.metal}`, oreItems);
//                 data.tags.addBlockTag(`forge:ores`, oreItems);
//                 data.tags.addBlockTag(`forge:ores/${ore.metal}`, oreItems);
//                 data.tags.addBlockTag('tfc:prospectable', oreItems);
//             }
//         }
//     }
// }

// manager.run((assets, data, modid) => {

//     advancements(modid, data);
//     metallumTags(modid, data);
//     language(modid, assets);

//     let metalParts: string[] = load('./src/datagen/data/metal_parts.json');
//     let toolMetalParts: {name: string, isTool:boolean}[] = load('./src/datagen/data/tool_metal_parts.json');
//     let metals: ExMetal[] = load('./src/datagen/data/metallum_metals.json');
//     let ores: Ore[] = load('./src/datagen/data/ores.json');
//     let stones: Stone[] = load('./src/datagen/data/stones.json');
//     let oreType = ['poor', 'rich', 'normal'];
//     let barMetals: List<Metal> = MetallumMetals.filter(m => ['enderium', 'titanium', 'tungsten', 'tungsten_steel'].includes(m.name));
//     let bellMetals: List<Metal> = MetallumMetals.filter(m => ['beryllium_copper', 'florentine_bronze'].includes(m.name));
//     let models = MetallumModelManager.create(modid);

//     data.tags.addBlockTag('tfc:can_be_snow_piled', ores.filter(ore => ore.isGraded).map(ore => `tfc_metallum:ore/small_${ore.name}`));

//     data.tags.addFluidTag('tfc:usable_in_blue_steel_bucket', metals.map(metal => `tfc_metallum:metal/${metal.name}`));

//     data.pipe_vein('certus_quartz', 30, -20, 100, 40, 0.4, 5, 13, 0, 2, (rock) => {
//         return  [ { block: `tfc_metallum:ore/certus_quartz/${rock.name}` } ];
//     }, AllRocks.filter(rock => rock.name == 'quartzite' || rock.name == 'schist' || rock.name == 'granite' || rock.name == 'gneiss' || rock.name == 'shale'));

//     data.pipe_vein2('deep_native_osmium', 35, -60, -10, 40, 0.4, 5, 15, 0, 3, (rock) => {
//         return  [
//             { weight:10, block:`${modid}:ore/poor_native_osmium/${rock.name}` },
//             { weight:30, block:`${modid}:ore/normal_native_osmium/${rock.name}` },
//             { weight:15, block:`${modid}:ore/rich_native_osmium/${rock.name}` },
//             { weight:10, block:`${modid}:ore/poor_native_iridium/${rock.name}` },
//             { weight:30, block:`${modid}:ore/normal_native_iridium/${rock.name}` },
//             { weight:15, block:`${modid}:ore/rich_native_iridium/${rock.name}` }
//         ];
//     }, List.merge(SedimentaryRocks.filter(rock => rock.name == 'limestone' || rock.name == 'claystone'), MetamorphicRocks), 'tfc_metallum:ore_small_osmium', 'tfc_metallum:ore_small_iridium');

//     data.pipe_vein2('normal_native_osmium', 27, 0, 100, 40, 0.4, 5, 13, 0, 2, (rock) => {
//         return  [
//             { weight:10, block:`${modid}:ore/poor_native_osmium/${rock.name}` },
//             { weight:30, block:`${modid}:ore/normal_native_osmium/${rock.name}` },
//             { weight:15, block:`${modid}:ore/rich_native_osmium/${rock.name}` },
//             { weight:10, block:`${modid}:ore/poor_native_iridium/${rock.name}` },
//             { weight:30, block:`${modid}:ore/normal_native_iridium/${rock.name}` },
//             { weight:15, block:`${modid}:ore/rich_native_iridium/${rock.name}` }
//         ];
//     }, List.merge(SedimentaryRocks.filter(rock => rock.name == 'limestone' || rock.name == 'claystone'), MetamorphicRocks), 'tfc_metallum:ore_small_osmium', 'tfc_metallum:ore_small_iridium');

//     data.cluster_vein('deep_rutile', 10, -70, -15, 19, 0.5, 'tfc_metallum:ore/small_rutile', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_rutile/${rock.name}` },
//         { weight:50, block:`${modid}:ore/normal_rutile/${rock.name}` },
//         { weight:30, block:`${modid}:ore/rich_rutile/${rock.name}` }
//     ] }, SedimentaryRocks, 6);

//     data.cluster_vein('deep_rutile', 10, -70, -15, 19, 0.5, 'tfc_metallum:ore/small_rutile', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_rutile/${rock.name}` },
//         { weight:50, block:`${modid}:ore/normal_rutile/${rock.name}` },
//         { weight:30, block:`${modid}:ore/rich_rutile/${rock.name}` }
//     ] }, SedimentaryRocks);

//     data.cluster_vein('surface_rutile', 21, 65, 100, 10, 0.3, 'tfc_metallum:ore/small_rutile', (rock) => { return [
//         { weight:90, block:`${modid}:ore/poor_rutile/${rock.name}` },
//         { weight:10, block:`${modid}:ore/normal_rutile/${rock.name}` }
//     ] }, SedimentaryRocks, 6);

//     data.cluster_vein('normal_monazite', 13, -50, 40, 12, 0.4, 'tfc_metallum:ore/small_monazite', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_monazite/${rock.name}` },
//         { weight:50, block:`${modid}:ore/normal_monazite/${rock.name}` },
//         { weight:30, block:`${modid}:ore/rich_monazite/${rock.name}` }
//     ] }, List.merge(MetamorphicRocks, IgneousIntrusiveRocks, IgneousExtrusiveRocks));

//     data.cluster_vein('surface_native_platinum', 22, 65, 100, 10, 0.3, 'tfc_metallum:ore/small_native_platinum', (rock) => { return [
//         { weight:90, block:`${modid}:ore/poor_native_platinum/${rock.name}` },
//         { weight:10, block:`${modid}:ore/normal_native_platinum/${rock.name}` }
//     ] }, MetamorphicRocks, 6);

//     data.cluster_vein('normal_native_platinum', 17, -50, 40, 13, 0.4, 'tfc_metallum:ore/small_native_platinum', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_native_platinum/${rock.name}` },
//         { weight:50, block:`${modid}:ore/normal_native_platinum/${rock.name}` },
//         { weight:30, block:`${modid}:ore/rich_native_platinum/${rock.name}` }
//     ] }, MetamorphicRocks);

//     data.cluster_vein('normal_kernite', 21, -20, 70, 12, 0.4, 'tfc_metallum:ore/small_kernite', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_native_platinum/${rock.name}` },
//         { weight:20, block:`${modid}:ore/poor_kernite/${rock.name}` },
//         { weight:40, block:`${modid}:ore/normal_kernite/${rock.name}` },
//         { weight:20, block:`${modid}:ore/rich_kernite/${rock.name}` }
//     ] }, SedimentaryRocks);

//     data.cluster_vein('deep_bertrandite', 15, -64, -15, 7, 0.3, 'tfc_metallum:ore/small_bertrandite', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_bertrandite/${rock.name}` },
//         { weight:50, block:`${modid}:ore/normal_bertrandite/${rock.name}` },
//         { weight:30, block:`${modid}:ore/rich_bertrandite/${rock.name}` }
//     ] }, List.merge(IgneousExtrusiveRocks, IgneousIntrusiveRocks));

//     data.cluster_vein('normal_bertrandite', 12, -10, 60, 15, 0.6, 'tfc_metallum:ore/small_bertrandite', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_bertrandite/${rock.name}` },
//         { weight:50, block:`${modid}:ore/normal_bertrandite/${rock.name}` },
//         { weight:30, block:`${modid}:ore/rich_bertrandite/${rock.name}` }
//     ] }, List.merge(IgneousExtrusiveRocks, IgneousIntrusiveRocks));

//     data.cluster_vein('deep_galena', 21, -50, 0, 15, 0.5, 'tfc_metallum:ore/small_galena', (rock) => { return [
//         { weight:30, block:`tfc:ore/normal_native_silver/${rock.name}` },
//         { weight:30, block:`${modid}:ore/normal_galena/${rock.name}` },
//         { weight:10, block:`${modid}:ore/rich_galena/${rock.name}` }
//     ] }, SedimentaryRocks);

//     data.cluster_vein('surface_galena', 25, 70, 90, 10, 0.3, 'tfc_metallum:ore/small_galena', (rock) => { return [
//         { weight:10, block:`tfc:ore/poor_native_silver/${rock.name}` },
//         { weight:90, block:`${modid}:ore/poor_galena/${rock.name}` }
//     ] }, SedimentaryRocks, 6);

//     data.cluster_vein('normal_galena', 17, -5, 50, 13, 0.6, 'tfc_metallum:ore/small_galena', (rock) => { return [
//         { weight:15, block:`tfc:ore/poor_native_silver/${rock.name}` },
//         { weight:25, block:`${modid}:ore/poor_galena/${rock.name}` },
//         { weight:40, block:`${modid}:ore/normal_galena/${rock.name}` },
//         { weight:20, block:`${modid}:ore/rich_galena/${rock.name}` }
//     ] }, SedimentaryRocks);

//     data.cluster_vein('deep_wolframite', 12, -50, -5, 12, 0.6, 'tfc_metallum:ore/small_wolframite', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_wolframite/${rock.name}` },
//         { weight:50, block:`${modid}:ore/normal_wolframite/${rock.name}` },
//         { weight:30, block:`${modid}:ore/rich_wolframite/${rock.name}` }
//     ] }, List.merge(MetamorphicRocks));

//     data.cluster_vein('normal_wolframite', 15, 0, 47, 13, 0.5, 'tfc_metallum:ore/small_wolframite', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_wolframite/${rock.name}` },
//         { weight:50, block:`${modid}:ore/normal_wolframite/${rock.name}` },
//         { weight:30, block:`${modid}:ore/rich_wolframite/${rock.name}` }
//     ] }, List.merge(SedimentaryRocks, MetamorphicRocks));

//     data.cluster_vein('surface_wolframite', 15, 60, 100, 15, 0.3, 'tfc_metallum:ore/small_wolframite', (rock) => { return [
//         { weight:90, block:`${modid}:ore/poor_wolframite/${rock.name}` },
//         { weight:10, block:`${modid}:ore/normal_wolframite/${rock.name}` }
//     ] }, List.merge(SedimentaryRocks, MetamorphicRocks), 6);

//     data.cluster_vein('surface_bauxite', 27, 55, 90, 15, 0.3, 'tfc_metallum:ore/small_bauxite', (rock) => { return [
//         { weight:90, block:`${modid}:ore/poor_bauxite/${rock.name}` },
//         { weight:10, block:`${modid}:ore/normal_bauxite/${rock.name}` }
//     ] }, SedimentaryRocks, 6);

//     data.cluster_vein('normal_bauxite', 15, -32, 50, 23, 0.5, 'tfc_metallum:ore/small_bauxite', (rock) => { return [
//         { weight:20, block:`${modid}:ore/poor_bauxite/${rock.name}` },
//         { weight:50, block:`${modid}:ore/normal_bauxite/${rock.name}` },
//         { weight:30, block:`${modid}:ore/rich_bauxite/${rock.name}` }
//     ] }, SedimentaryRocks);

//     data.tags.addItemTag('tfc:holds_small_fishing_bait', getItems(metals.filter(metal => metal.hasToolArmor), 'fishing_rod'));

//     for(let metal of MetallumMetals) {
//         let allParts = Object.entries(TFC_Metal_Items);
//         let nonToolParts = allParts.filter(part => part[1].type == 'all' || part[1].type == 'part');

//         data.tags.addFluidTag('tfc:pileable_ingots', [`${modid}:metal/ingot/${metal.name}`]);
//         data.tags.addFluidTag('tfc:pileable_sheets', [`${modid}:metal/sheet/${metal.name}`]);
//         data.tags.addFluidTag('tfc:usable_in_ingot_mold', [`${modid}:metal/${metal.name}`]);

//         data.customRecipe(join('casting', metal.name+'_ingot.json'), {
//             "type": "tfc:casting",
//             "mold": {
//               "item": "tfc:ceramic/ingot_mold"
//             },
//             "fluid": {
//               "ingredient": `tfc_metallum:metal/${metal.name}`,
//               "amount": 100
//             },
//             "result": {
//               "item": `tfc_metallum:metal/ingot/${metal.name}`
//             },
//             "break_chance": 0.1
//         });

//         data.customRecipe(join('casting', metal.name+'_fire_ingot.json'), {
//             "type": "tfc:casting",
//             "mold": {
//               "item": "tfc:ceramic/fire_ingot_mold"
//             },
//             "fluid": {
//               "ingredient": `tfc_metallum:metal/${metal.name}`,
//               "amount": 100
//             },
//             "result": {
//               "item": `tfc_metallum:metal/ingot/${metal.name}`
//             },
//             "break_chance": 0.1
//         });

//         // lang
//         assets.lang.entry(`metal.tfc_metallum.${metal.name}`, cap(metal.name));
//         assets.lang.entry(`fluid.tfc_metallum.metal.${metal.name}`, `Molten ${cap(metal.name)}`);
//         assets.lang.itemEntry(`bucket.metal.${metal.name}`, cap(`molten_${metal.name}_bucket`));

//         if(bellMetals.contain(metal)) {
//             data.tags.addBlockTag('minecraft:mineable/pickaxe', [`${modid}:${metal.name}_bell`]);
//             models.bell(metal);
//             assets.lang.blockEntry(`${metal.name}_bell`, cap(`${metal.name}_bell`));
//             data.loots.dropBlock(`${metal.name}_bell`);
//         }

//         if(barMetals.contain(metal)) {
//             data.tags.addBlockTag('minecraft:mineable/pickaxe', [`${modid}:${metal.name}_bars`]);
//             models.bars(metal);
//             assets.lang.blockEntry(`${metal.name}_bars`, cap(`${metal.name}_bars`));
//             data.loots.dropBlock(`${metal.name}_bars`);
//         }
//         console.log(nonToolParts);

//         for(let [name, data] of nonToolParts) {
//             assets.lang.itemEntry(`metal.${name}.${metal.name}`, cap(`${metal.name}_${name}`));
//         }

//         // tool metal specific data/assets
//         if(metal.types.includes('tool')) {

//             // tool specific tags
//             data.tags.addFluidTag('tfc:usable_in_tool_head_mold', [`${modid}:metal/${metal.name}`]);
//             data.tags.addItemTag('tfc:holds_small_fishing_bait', [`${modid}:metal/fishing_rod/${metal.name}`]);
//             data.tags.addItemTag('tfc:knives', [`${modid}:metal/knife/${metal.name}`]);

//             if(metal.tier > 4) {
//                 data.tags.addItemTag('tfc:holds_large_fishing_bait', [`${modid}:metal/fishing_rod/${metal.name}`])
//             }

//             data.anvilRecipe(join(`${metal.name}_rod`), ['tag', `${modid}:ingots/${metal.name}`], { item: `${modid}:metal/rod/${metal.name}`, count: 2 },metal.tier,  [Rules.bend_last, Rules.draw_second_last, Rules.draw_third_last]);

//             // contain any part that's tool metal related(tool, tool parts, armor, shield)
//             let allToolParts = allParts.filter(metalItem => metalItem[1].durability || metalItem[1].type == 'tool' || metalItem[1].type == 'armor');
            
//             // contain all tool Parts(axe head, etc..)
//             let toolParts = allParts.filter(metalItem => !metalItem[1].durability && metalItem[1].type == 'tool');

//             // contain all tools/armor(axe, sword, shield, etc...)
//             let tools = allParts.filter(metalItem => metalItem[1].durability);

//             for(let [partName, partData] of allToolParts) {
//                 // part lang entry
//                 if(partName == 'propick') {
//                     assets.lang.itemEntry(`metal.${partName}.${metal.name}`, cap(`${metal.name}_prospector's_pickaxe`));
//                 }
//                 else {
//                     assets.lang.itemEntry(`metal.${partName}.${metal.name}`, cap(`${metal.name}_${partName}`));
//                 }
                
//                 // item heat data
//                 data.item_heat(`metal/${metal.name}_${partName}`, `metal/${partName}/${metal.name}`, metal.ingot_heat_capacity, metal.melt_temperature, partData.smelt_amount);
                
//                 let name = partData.tag != null ? `${partData.tag}s/${metal.name}` : `${modid}:metal/${partName}/${metal.name}`
//                 let json = {
//                     "type": "tfc:heating",
//                     "ingredient": {},
//                     "result_fluid": {
//                         "fluid": `${modid}:metal/${metal.name}`,
//                         "amount": partData.smelt_amount
//                     },
//                     "temperature": metal.melt_temperature
//                 }

//                 if(partData.durability) {
//                     json['use_durability'] = true
//                 }
//                 if(partData.tag != null) {
//                     json.ingredient["tag"] = name
//                 }
//                 else {
//                     json.ingredient["item"] = name
//                 }
                
//                 data.customRecipe(join('heating', 'metal', `${metal.name}_${partName}.json`), json);
//             }

//             // tool specific tags and data
//             for(let [partName, partData] of tools) {
//                 if(!(partData.type == 'armor' || partData.type == 'shield')) {
//                     data.tags.addItemTag('tfc:usable_on_tool_rack', [`${modid}:metal/${partName}/${metal.name}`]);
//                 }
//             }
//         }
//     }

//     let heatingRecipes = readdirSync('./recipes');
//     let craftingRecipes = readdirSync('./crafting_recipes');

//     for(let metal of metals) {

//         if(metal.hasToolArmor) {

//             for(let file of craftingRecipes) {
//                 let json = readFileSync(join('.', 'crafting_recipes', file), 'utf8');
//                 while(json.includes('bismuth_bronze') || json.includes('tfc:metal')) {
//                     json = json.replace('tfc:metal', modid+':metal').replace('bismuth_bronze', metal.name);
//                 }
//                 data.customRecipe(join('crafting', 'metal', `${metal.name}_${file}`), JSON.parse(json));
//             }

//             for(let file of heatingRecipes) {
//                 let json = load(join('.', 'recipes', file));
//                 delete json.__comment__
//                 let fluid = `tfc_metallum:metal/${metal.name}`;
//                 let partName = file.replace('.json', '');
//                 let result = `tfc_metallum:metal/${partName}/${metal.name}`
//                 json.fluid.ingredient = fluid
//                 json.result.item = result
//                 data.customRecipe(join('casting', `${metal.name}_${partName}.json`), json);
//             }

//             // tool parts models
//             for(let toolPart of toolMetalParts) {

//                 let parent = toolPart.isTool ? 'item/handheld' : 'item/generated'
//                 if(toolPart.name == 'saw' || toolPart.name == 'knife' || toolPart.name == 'chisel') {
//                     parent = 'tfc:item/handheld_flipped';
//                 }
//                 let name = toolPart.name.includes('propick') ? toolPart.name.replace('propick', 'prospector\'s_pickaxe'): toolPart.name;
//                 assets.lang.itemEntry(`metal.${toolPart.name}.${metal.name}`, cap(`${metal.name}_${name}`));
//                 if(toolPart.name == 'javelin') {
//                     models.javelinItem(metal);
//                 }
//                 else if(toolPart.name == 'fishing_rod') {
//                     models.fishingRodItem(metal);
//                 }
//                 else {
//                     models.itemModel(`metal/${toolPart.name}/${metal.name}`, parent);
//                 }
//             }

//             // models
//             models.anvil(`metal/anvil/${metal.name}`);
//             models.chain(`metal/chain/${metal.name}`);
//             models.lamp(`metal/lamp/${metal.name}`);
//             models.trapdoor(`metal/trapdoor/${metal.name}`);
//             models.shield(metal);

//             // loots
//             data.loots.copyBlockNBTData(`metal/anvil/${metal.name}`);
//             data.loots.dropBlock(`metal/chain/${metal.name}`);
//             data.loots.copyBlockNBTData(`metal/lamp/${metal.name}`);
//             data.loots.dropBlock(`metal/trapdoor/${metal.name}`);
//             assets.lang.blockEntry(`metal.anvil.${metal.name}`, cap(`${metal.name}_anvil`));
//             assets.lang.blockEntry(`metal.chain.${metal.name}`, cap(`${metal.name}_chain`));
//             assets.lang.blockEntry(`metal.lamp.${metal.name}`, cap(`${metal.name}_lamp`));
//             assets.lang.blockEntry(`metal.lamp.${metal.name}_filled`, cap(`filled_${metal.name}_lamp`));
//             assets.lang.blockEntry(`metal.trapdoor.${metal.name}`, cap(`${metal.name}_trapdoor`));
//         }
//         else {
//             for(let part of parts) {
//                 data.item_heat(`metal/${metal.name}_${part.name}`, `metal/${part.name}/${metal.name}`, metal.ingot_heat_capacity, metal.melt_temp, part.meltInto);
//                 let name = part.useForgeTag ? `forge:${part.name}s/${metal.name}` : `${modid}:metal/${part.name}/${metal.name}`
//                 let json = {
//                     "type": "tfc:heating",
//                     "ingredient": {},
//                     "result_fluid": {
//                         "fluid": `${modid}:metal/${metal.name}`,
//                         "amount": part.meltInto
//                     },
//                     "temperature": metal.melt_temp
//                 }

//                 if(part.useDurability) {
//                     json['use_durability'] = true
//                 }
//                 if(part.useForgeTag) {
//                     json.ingredient["tag"] = name
//                 }
//                 else {
//                     json.ingredient["item"] = name
//                 }

//                 data.customRecipe(join('heating', 'metal', `${metal.name}_${part.name}.json`), json);
//             }
//         }
//         // metal parts models
//         for(let toolPart of metalParts) {
//             models.itemModel(`metal/${toolPart}/${metal.name}`);
//         }

//         models.metalFluid(metal);
//     }

//     data.tags.addItemTag('tfc:prospectable', ores.map(ore => {
//         if(ore.isGraded) {
//             return `#forge:ores/${ore.metal}`;
//         }
//         return `#forge:ores/${ore.name}`;
//     }));

//     data.tags.addBlockTag('tfc:prospectable', ores.map(ore => {
//         if(ore.isGraded) {
//             return `#forge:ores/${ore.metal}`;
//         }
//         return `#forge:ores/${ore.name}`;
//     }));

//     data.tags.addItemTag('tfc:rock/ores', ores.map(ore => {
//         if(ore.isGraded) {
//             return `#forge:ores/${ore.metal}`;
//         }
//         return `#forge:ores/${ore.name}`;
//     }));

//     data.tags.addBlockTag('tfc:rock/ores', ores.map(ore => {
//         if(ore.isGraded) {
//             return `#forge:ores/${ore.metal}`;
//         }
//         return `#forge:ores/${ore.name}`;
//     }));

//     data.tags.addBlockTag('minecraft:mineable/pickaxe', ores.map(ore => {
//         if(ore.isGraded) {
//             return `#forge:ores/${ore.metal}`;
//         }
//         return `#forge:ores/${ore.name}`;
//     }));


//     let orePieces = []
//     let smallOrePieces = []
//     ores.forEach(ore => {
//         if(ore.isGraded) {
//             orePieces.push(`${modid}:ore/rich_${ore.name}`, `${modid}:ore/normal_${ore.name}`, `${modid}:ore/poor_${ore.name}`);
//             smallOrePieces.push(`${modid}:ore/small_${ore.name}`);
//         }
//         else {
//             orePieces.push(`${modid}:ore/${ore.name}`);
//         }
//     });

//     data.tags.addItemTag(`tfc:ore_pieces`, orePieces);
//     data.tags.addItemTag(`tfc:small_ore_pieces`, smallOrePieces);

//     for(let ore of ores) {
//         let oreTagData = []
//         if(ore.isGraded) {
//             data.tags.addItemTag('tfc:nuggets', [`tfc_metallum:ore/small_${ore.name}`]);
//             assets.lang.blockEntry(`ore.small_${ore.name}.prospected`, cap(ore.name));

//             let metal: Metal = MetallumMetals.find(metal => metal.name == ore.metal);

//             data.item_heat_ore(`ore/${ore.name}`, [
//                 {
//                   "item": `tfc_metallum:ore/small_${ore.name}`
//                 },
//                 {
//                   "item": `tfc_metallum:ore/normal_${ore.name}`
//                 },
//                 {
//                   "item": `tfc_metallum:ore/poor_${ore.name}`
//                 },
//                 {
//                   "item": `tfc_metallum:ore/rich_${ore.name}`
//                 }
//               ], 1.143, metal.melt_temperature);
//         }

//         for(let stone of stones) {
//             if(ore.isGraded) {

//                 oreTagData.push(`${modid}:ore/rich_${ore.name}/${stone.name}`, `${modid}:ore/poor_${ore.name}/${stone.name}`, `${modid}:ore/normal_${ore.name}/${stone.name}`);
//                 for(let type of oreType) {

//                     let amount = 25;
//                     if(type == 'rich') {
//                         amount = 35;
//                     }
//                     else if(type == 'poor') {
//                         amount = 15;
//                     }

//                     let json = {
//                         "type": "tfc:heating",
//                         "ingredient": {
//                             "item":  `${modid}:ore/${type}_${ore.name}`
//                         },
//                         "result_fluid": {
//                             "fluid": `${modid}:metal/${ore.metal}`,
//                             "amount": amount
//                         },
//                         "temperature": ore.metalTemp
//                     }
    
//                     data.customRecipe(join('heating', 'ore', `${type}_${ore.name}.json`), json);

//                     assets.lang.blockEntry(`ore.${type}_${ore.name}.${stone.name}.prospected`, cap(ore.name));
//                     assets.lang.blockEntry(`ore.${type}_${ore.name}.${stone.name}`, cap(`${type}_${stone.name}_${ore.name}`));
//                     assets.lang.itemEntry(`ore.${type}_${ore.name}`, cap(`${type}_${ore.name}`));
//                     models.ore(`ore/${type}_${ore.name}/${stone.name}`, stone.name, `${type}_${ore.name}`);
//                     models.itemModel(`ore/${type}_${ore.name}`);
//                     data.loots.dropOther(`ore/${type}_${ore.name}/${stone.name}`, `ore/${type}_${ore.name}`);
//                 }

//                 let json = {
//                     "type": "tfc:heating",
//                     "ingredient": {
//                         "item":  `${modid}:ore/small_${ore.name}`
//                     },
//                     "result_fluid": {
//                         "fluid": `${modid}:metal/${ore.metal}`,
//                         "amount": 10
//                     },
//                     "temperature": ore.metalTemp
//                 }

//                 data.customRecipe(join('heating', 'ore', `small_${ore.name}.json`), json);
//             }
//             else {
//                 assets.lang.blockEntry(`ore.${ore.name}.${stone.name}.prospected`, cap(`${stone.name}_${ore.name}`));
//                 assets.lang.blockEntry(`ore.${ore.name}.${stone.name}`, cap(`${stone.name}_${ore.name}`));
//                 assets.lang.itemEntry(`ore.${ore.name}`, cap(ore.name));
//                 oreTagData.push(`${modid}:ore/${ore.name}/${stone.name}`);
//                 models.ore(`ore/${ore.name}/${stone.name}`, stone.name, ore.name);
//                 models.itemModel(`ore/${ore.name}`);
//                 data.loots.dropOther(`ore/${ore.name}/${stone.name}`, `ore/${ore.name}`);
//             }
//         }
//         if(ore.isGraded) {
//             assets.lang.blockEntry(`ore.small_${ore.name}`, cap(`small_${ore.name}`));
//             data.loots.dropBlock(`ore/small_${ore.name}`);
//             oreTagData.push(`${modid}:ore/small_${ore.name}`);
//         }
//     }
//     assets.registerModels(models);
// });