import { upper } from "void-supper";
import { ResourceManager } from "../index.js";
import { ModelManager } from "../lib/assets-builders.js";
import { DefaultDataManager } from "../lib/managers.js";

let manager = new ResourceManager('ae2_tools', (modid) => new DefaultDataManager(modid));

manager.run((assets, data, modid) => {
    let models = ModelManager.create(modid);

    let tiers: string[] = ['certus_quartz', 'fluix', 'nether_quartz'];

    for(let tier of tiers) {
        models.itemModel(`${tier}_excavator`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_hammer`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_knife`, 'minecraft:item/handheld');
        models.itemModel(`${tier}_sickle`, 'minecraft:item/handheld');

        assets.lang.itemEntry(`${tier}_excavator`, upper(`${tier}_excavator`));
        assets.lang.itemEntry(`${tier}_hammer`, upper(`${tier}_hammer`));
        assets.lang.itemEntry(`${tier}_knife`, upper(`${tier}_knife`));
        assets.lang.itemEntry(`${tier}_sickle`, upper(`${tier}_sickle`));
    }

    assets.registerModels(models);
});