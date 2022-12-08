import { join } from "path";
import { existsSync, mkdirSync, writeFileSync } from 'fs';
class Manager {
    modid;
    map = new Map();
    constructor(modid) {
        this.modid = modid;
    }
    createTagPath(pathTo) {
        let split = pathTo.includes('/') ? '/' : '\\';
        let tempPath = pathTo.split(split);
        tempPath.pop();
        let p = tempPath.join(split);
        if (!existsSync(p)) {
            mkdirSync(p, { recursive: true });
        }
        return pathTo;
    }
    custom(path1, path2, json) {
        let path = join('.', path1, this.modid, path2);
        this.map.set(path, json);
    }
    item(name) {
        return `${this.modid}:${name}`;
    }
    itemStack(name, count = 1) {
        return {
            item: this.item(name),
            count: count
        };
    }
    ingredient(name, count = 1) {
        return {
            tag: name,
            count: count
        };
    }
    run() {
        this.map.forEach((value, key) => {
            writeFileSync(this.createTagPath(key), JSON.stringify(value, null, 2), 'utf8');
        });
    }
}
export class AssetManager extends Manager {
    constructor(modid) {
        super(modid);
    }
    customAsset(path, json) {
        this.custom('assets', path, json);
    }
    customBlockModel(path, json) {
        this.custom('assets', join('models', 'block', path), json);
    }
    customItemModel(path, json) {
        this.custom('assets', join('models', 'item', path), json);
    }
    customBlockstate(path, json) {
        this.custom('assets', join('blockstates', path), json);
    }
}
export class LootManager extends Manager {
    customLootTable(path, json) {
        this.custom('data', join('loot_tables', path), json);
    }
    customBlockLootTable(path, json) {
        this.custom('data', join('loot_tables', 'blocks', path), json);
    }
    dropBlock(block) {
        this.customBlockLootTable(block + '.json', {
            "type": "minecraft:block",
            "pools": [
                {
                    "name": "loot_pool",
                    "rolls": 1,
                    "entries": [
                        {
                            "type": "minecraft:item",
                            "name": this.item(block)
                        }
                    ],
                    "conditions": [
                        {
                            "condition": "minecraft:survives_explosion"
                        }
                    ]
                }
            ]
        });
    }
    copyBlockNBTData(block) {
        this.customLootTable(block, {
            "type": "minecraft:block",
            "pools": [
                {
                    "name": "loot_pool",
                    "rolls": 1,
                    "entries": [
                        {
                            "type": "minecraft:item",
                            "name": this.item(block),
                            "functions": [
                                {
                                    "function": "minecraft:copy_name",
                                    "source": "block_entity"
                                },
                                {
                                    "function": "minecraft:copy_nbt",
                                    "source": "block_entity",
                                    "ops": [
                                        {
                                            "source": "",
                                            "target": "BlockEntityTag",
                                            "op": "replace"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "conditions": [
                        {
                            "condition": "minecraft:survives_explosion"
                        }
                    ]
                }
            ]
        });
    }
}
export class DataManager extends Manager {
    loots;
    constructor(modid) {
        super(modid);
        this.loots = new LootManager(this.modid);
    }
    customData(path, json) {
        this.custom('data', path, json);
    }
    customRecipe(path, json) {
        this.custom('data', join('recipes', path), json);
    }
    run() {
        super.run();
        this.loots.run();
    }
}
