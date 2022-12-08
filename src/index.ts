import { AssetManager, DataManager } from "./lib/managers.js";

export class ResourceManager {

    public modid: string;
    public assets: AssetManager;
    public data: DataManager;

    /**
     * @param {string} modid
     */
    constructor(modid: string) {
        this.modid = modid;
        this.assets = new AssetManager(modid);
        this.data = new DataManager(modid);
    }

    run(predicate: (assets: AssetManager, data: DataManager, modid: string) => void) {
        predicate(this.assets, this.data, this.modid);
    }
}
