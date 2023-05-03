import List from 'void-list';
import { ResourceManager } from '../index.js';
import { AssetManager } from '../lib/managers.js';
import { TFCDataManager } from "./TFCDataManager.js";
import { ModelManager } from '../lib/assets-builders.js';
import { upper } from 'void-supper';

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
    for(let color of colors) {
        let altName = `wood/${color}_terracotta`;
        let name = `wood/${color}`;
        
        models.woodDecorativeBlocks(name);
        models.woodDecorativeBlocks(altName);
        models.itemModel(`${name}/lumber`);
        models.itemModel(`${altName}/lumber`);

        assets.lang.blockEntry(`wood.${color}_terracotta.planks`, `${upper(color)} Terracotta Planks`);
        assets.lang.blockEntry(`wood.${color}_terracotta.planks_stairs`, `${upper(color)} Terracotta Planks Stairs`);
        assets.lang.blockEntry(`wood.${color}_terracotta.planks_slab`, `${upper(color)} Terracotta Planks Slab`);
        assets.lang.itemEntry(`wood.${color}_terracotta.lumber`, `${upper(color)} Terracotta Lumber`);
        assets.lang.blockEntry(`wood.${color}.planks`, `${upper(color)} Planks`);
        assets.lang.blockEntry(`wood.${color}.planks_stairs`, `${upper(color)} Planks Stairs`);
        assets.lang.blockEntry(`wood.${color}.planks_slab`, `${upper(color)} Planks Slab`);
        assets.lang.itemEntry(`wood.${color}.lumber`, `${upper(color)} Lumber`);
    }

    assets.registerModels(models);
});