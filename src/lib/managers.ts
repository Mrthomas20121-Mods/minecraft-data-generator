import { join } from "path"
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { Ingredient, ItemStack } from "./types.js";

abstract class Manager {

    public modid: string;
    private map: Map<string, object> = new Map()

    constructor(modid: string) {
        this.modid = modid;
    }

    private createTagPath(pathTo: string) {
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
        let path = join('.', path1, this.modid, path2);
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

    constructor(modid: string) {
        super(modid)
    }

    customAsset(path: string, json: object) {
        this.custom('assets', path, json)
    }

    customBlockModel(path: string, json: object) {
        this.custom('assets', join('models', 'block', path), json)
    }

    customItemModel(path: string, json: object) {
        this.custom('assets', join('models', 'item', path), json)
    }

    customBlockstate(path: string, json: object) {
        this.custom('assets', join('blockstates', path), json)
    }
}

export class LootManager extends Manager {

    customLootTable(path: string, json: object) {
        this.custom('data', join('loot_tables', path), json)
    }

    customBlockLootTable(path: string, json: object) {
        this.custom('data', join('loot_tables', 'blocks', path), json)
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

    copyBlockNBTData(block: string) {
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

    public loots: LootManager

    constructor(modid: string) {
        super(modid)
        this.loots = new LootManager(this.modid)
    }

    customData(path: string, json: object) {
        this.custom('data', path, json)
    }

    customRecipe(path: string, json: object) {
        this.custom('data', join('recipes', path), json)
    }

    public run(): void {
        super.run();
        this.loots.run();
    }
}