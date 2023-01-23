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
        let path = join('.', 'generated', this.modid, path1, this.modid, path2);
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
    lang;
    assetBuilder;
    constructor(modid) {
        super(modid);
        this.lang = new LangManager(modid);
    }
    customAsset(path, json) {
        this.custom('assets', path + '.json', json);
    }
    registerModels(builder) {
        this.assetBuilder = builder;
    }
    run() {
        this.lang.run();
        this.assetBuilder.build();
    }
}
export class LangManager extends Manager {
    json = {};
    itemEntry(block, custom) {
        this.anyEntry(`item.${this.modid}.${block}`, custom);
    }
    blockEntry(block, custom) {
        this.anyEntry(`block.${this.modid}.${block}`, custom);
    }
    anyEntry(name, custom) {
        this.json[name] = custom;
    }
    run() {
        this.custom('assets', '/lang/en_us.json', this.json);
        super.run();
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
    dropOther(block, item) {
        this.customBlockLootTable(block + '.json', {
            "type": "minecraft:block",
            "pools": [
                {
                    "name": "loot_pool",
                    "rolls": 1,
                    "entries": [
                        {
                            "type": "minecraft:item",
                            "name": this.item(item)
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
        this.customBlockLootTable(block + '.json', {
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
export class TagManager extends Manager {
    addBlockTag(tagName, values, replace = false) {
        this.addTag('blocks', tagName, values, replace);
    }
    addItemTag(tagName, values, replace = false) {
        this.addTag('items', tagName, values, replace);
    }
    addTag(tagType, tagName, values, replace = false) {
        let split = tagName.split(':');
        let path = this.createTagPath(join('.', 'generated', this.modid, 'data', split[0], 'tags', tagType, split[1] + '.json'));
        this.map.set(path, {
            replace: replace,
            values: values
        });
    }
    run() {
        this.map.forEach((v, p) => {
            writeFileSync(p, JSON.stringify(v, null, 2), 'utf8');
        });
    }
}
export class DataManager extends Manager {
    loots;
    tags;
    constructor(modid) {
        super(modid);
        this.loots = new LootManager(this.modid);
        this.tags = new TagManager(modid);
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
        this.tags.run();
    }
}
export class DefaultDataManager extends DataManager {
    static create(modid) {
        return new DefaultDataManager(modid);
    }
}
