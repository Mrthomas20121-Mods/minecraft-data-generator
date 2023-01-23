import { join } from "path"
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { Ingredient, ItemStack, JSObj } from "./types.js";
import List from "void-list";
import { ModelManager } from "./assets-builders.js";

abstract class Manager {

    public modid: string;
    protected map: Map<string, object> = new Map()

    constructor(modid: string) {
        this.modid = modid;
    }

    protected createTagPath(pathTo: string) {
        let split = pathTo.includes('/') ? '/' : '\\';
        let tempPath = pathTo.split(split);
        tempPath.pop();
        let p = tempPath.join(split);
        if(!existsSync(p)) {
            mkdirSync(p, { recursive:true });
        }
        return pathTo;
    }

    protected custom(path1: string, path2: string, json: object) {
        let path = join('.', 'generated', this.modid, path1, this.modid, path2);
        this.map.set(path, json);
    }

    public item(name: string): string {
        return `${this.modid}:${name}`;
    }

    public itemStack(name: string, count: number=1): ItemStack {
        return {
            item: this.item(name),
            count:count
        };
    }

    public ingredient(name: string, count: number=1): Ingredient {
        return {
            tag: name,
            count:count
        };
    }

    public run(): void {
        this.map.forEach((value, key) => {
            writeFileSync(this.createTagPath(key), JSON.stringify(value, null, 2), 'utf8');
        });
    }
}

export class AssetManager extends Manager {

    private lang: LangManager;
    private assetBuilder: ModelManager

    constructor(modid: string) {
        super(modid);
        this.lang = new LangManager(modid);
    }

    customAsset(path: string, json: object) {
        this.custom('assets', path+'.json', json);
    }

    registerModels(builder: ModelManager) {
        this.assetBuilder = builder;
    }

    public run(): void {
        this.lang.run();
        this.assetBuilder.build();
    }
}

export class LangManager extends Manager {

    private json: JSObj = {}

    itemEntry(block: string, custom: string): void {
        this.entry(`item.${this.modid}.${block}`, custom);
    }

    blockEntry(block: string, custom: string): void {
        this.entry(`block.${this.modid}.${block}`, custom);
    }

    entry(name: string, custom: string): void {
        this.json[name] = custom;
    }

    public run(): void {
        this.custom('assets', '/lang/en_us.json', this.json);
        super.run();
    }
}

export class LootManager extends Manager {

    customLootTable(path: string, json: object) {
        this.custom('data', join('loot_tables', path), json);
    }

    customBlockLootTable(path: string, json: object) {
        this.custom('data', join('loot_tables', 'blocks', path), json);
    }

    dropBlock(block: string) {
        this.customBlockLootTable(block+'.json', {
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

    dropOther(block: string, item: string) {
        this.customBlockLootTable(block+'.json', {
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

    copyBlockNBTData(block: string) {
        this.customBlockLootTable(block+'.json', {
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

    public addBlockTag(tagName: string, values: string[], replace: boolean=false) {
        this.addTag('blocks', tagName, values, replace)
    }

    public addItemTag(tagName: string, values: string[], replace: boolean=false) {
        this.addTag('items', tagName, values, replace)
    }

    public addTag(tagType: string, tagName: string, values: string[], replace: boolean=false) {
        let split = tagName.split(':');
        let path = this.createTagPath(join('.', 'generated', this.modid, 'data', split[0], 'tags', tagType, split[1]+'.json'));
        this.map.set(path, {
            replace:replace,
            values:values
        });
    }
    
    public run(): void {
        this.map.forEach((v, p) => {
            writeFileSync(p, JSON.stringify(v, null, 2), 'utf8');
        })
    }
}

export abstract class DataManager extends Manager {

    public loots: LootManager;
    public tags: TagManager;

    constructor(modid: string) {
        super(modid);
        this.loots = new LootManager(this.modid);
        this.tags = new TagManager(modid);
    }

    customData(path: string, json: object) {
        this.custom('data', path, json);
    }

    customRecipe(path: string, json: object) {
        this.custom('data', join('recipes', path), json);
    }

    public run(): void {
        super.run();
        this.loots.run();
        this.tags.run();
    }
}

export class DefaultDataManager extends DataManager {
    public static create(modid: string) {
        return new DefaultDataManager(modid);
    }
}