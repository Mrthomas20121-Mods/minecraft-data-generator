import { AssetManager, DataManager } from "./lib/managers.js";
export class ResourceManager {
    modid;
    assets;
    data;
    /**
     * @param {string} modid
     */
    constructor(modid) {
        this.modid = modid;
        this.assets = new AssetManager(modid);
        this.data = new DataManager(modid);
    }
    run(predicate) {
        predicate(this.assets, this.data, this.modid);
    }
}
