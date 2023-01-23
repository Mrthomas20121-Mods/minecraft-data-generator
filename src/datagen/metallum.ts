import { readFileSync } from 'fs';
import { ResourceManager } from '../index.js';
import { DefaultDataManager } from '../lib/managers.js';
import { MetallumModelManager } from './metallum-assets.js';
import { tags } from './tagParts.js';
import { Metal, Ore, Stone } from './tfc_types.js';

let manager = new ResourceManager('tfc_metallum', DefaultDataManager.create);

function load(e: string): any[] {
    return JSON.parse(readFileSync(e, 'utf8'));
}

function getItems(metal: Metal[], partName: string): string[] {
    return metal.map(metal => `tfc_metallum:metal/${partName}/${metal.name}`);
}

manager.run((assets, data, modid) => {
    let metalParts: string[] = load('./src/datagen/metal_parts.json');
    let toolMetalParts: string[] = load('./src/datagen/tool_metal_parts.json');
    let metals: Metal[] = load('./src/datagen/metals.json');
    let toolMetals = metals.filter(metal => metal.hasToolArmor)
    let ores: Ore[] = load('./src/datagen/ores.json');
    let stones: Stone[] = load('./src/datagen/stones.json');
    let oreType = ['poor', 'rich', 'normal'];
    let models = MetallumModelManager.create(modid);

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

    //data.tags.addItemTag('tfc:axes_that_log', )
    
    for(let metal of metals) {

        data.tags.addItemTag(`forge:ingots/${metal.name}`, [`${modid}::metal/ingot/${metal.name}`]);
        data.tags.addItemTag(`forge:double_ingots/${metal.name}`, [`${modid}::metal/double_ingot/${metal.name}`]);
        data.tags.addItemTag(`forge:sheets/${metal.name}`, [`${modid}::metal/sheet/${metal.name}`]);
        data.tags.addItemTag(`forge:double_sheets/${metal.name}`, [`${modid}::metal/double_sheet/${metal.name}`]);
        data.tags.addItemTag(`forge:rods/${metal.name}`, [`${modid}::metal/rod/${metal.name}`]);

        if(metal.hasToolArmor) {

            // tool parts models
            for(let toolPart of toolMetalParts) {
                models.itemModel(`${modid}:metal/${toolPart}/metal`);
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
        }
        // metal parts models
        for(let toolPart of metalParts) {
            models.itemModel(`${modid}:metal/${toolPart}/metal`);
        }
    }

    data.tags.addItemTag('forge:ores', ores.map(ore => {
        if(ore.isGraded) {
            return `#forge:ores/${ore.metal}`;
        }
        return `#forge:ores/${ore.name}`;
    }));

    for(let ore of ores) {
        let oreTagData = []
        data.loots.dropBlock(`ore/small_${ore.name}`);
        for(let stone of stones) {
            if(ore.isGraded) {
                oreTagData.push(`${modid}:ore/rich_${ore.name}/${stone.name}`, `${modid}:ore/poor_${ore.name}/${stone.name}`, `${modid}:ore/normal_${ore.name}/${stone.name}`);
                for(let type of oreType) {
                    models.ore(`ore/${type}_${ore.name}/${stone.name}`, stone.name, `${type}_${ore.name}`);
                    models.itemModel(`ore/${type}_${ore.name}`);
                    data.loots.dropOther(`ore/${type}_${ore.name}/${stone.name}`, `ore/${type}_${ore.name}`);
                }
            }
            else {
                oreTagData.push(`ore/${ore.name}/${stone.name}`);
                models.ore(`ore/${ore.name}/${stone.name}`, stone.name, ore.name);
                models.itemModel(`ore/${ore.name}`);
                data.loots.dropOther(`ore/${ore.name}/${stone.name}`, `ore/${ore.name}`);
            }
        }
        if(ore.isGraded) {
            oreTagData.push(`${modid}:ore/small_${ore.name}`);
            data.tags.addItemTag(`forge:ores/${ore.metal}`, oreTagData);
        }
        else {
            data.tags.addItemTag(`forge:ores/${ore.name}`, oreTagData);
        }
    }
    assets.registerModels(models);
});