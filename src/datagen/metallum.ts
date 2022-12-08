import { ResourceManager } from '../index.js';

let manager = new ResourceManager('tfc_metallum');

manager.run((assets, data, modid) => {
    data.loots.dropBlock('test');
    data.run();
});