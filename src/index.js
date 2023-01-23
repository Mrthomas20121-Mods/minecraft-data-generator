import { AssetManager } from "./lib/managers.js";
export class ResourceManager {
    modid;
    assets;
    data;
    /**
     * @param {string} modid
     * @param {(modid: string) => T} predicate
     */
    constructor(modid, predicate) {
        this.modid = modid;
        this.assets = new AssetManager(modid);
        this.data = predicate(this.modid);
    }
    run(predicate) {
        predicate(this.assets, this.data, this.modid);
        this.data.run();
        this.assets.run();
    }
}
