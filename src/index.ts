import { AssetManager, DataManager} from "./lib/managers.js";

export class ResourceManager<T extends DataManager> {

    public modid: string;
    public assets: AssetManager;
    public data: T;

    /**
     * @param {string} modid
     * @param {(modid: string) => T} predicate
     */
    constructor(modid: string, predicate: (modid: string) => T) {
        this.modid = modid;
        this.assets = new AssetManager(modid);
        this.data = predicate(this.modid);
    }

    run(predicate: (assets: AssetManager, data: T, modid: string) => void) {
        predicate(this.assets, this.data, this.modid);
        this.data.run();
        this.assets.run();
    }
}
