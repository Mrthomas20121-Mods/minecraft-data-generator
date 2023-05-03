import { join } from "path"
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { Ingredient, ItemStack, JSObj } from "./types.js";
import List from "void-list";
import { ModelManager } from "./assets-builders.js";
import { VoidMap } from "void-map";

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

    public lang: LangManager;
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

    itemEntry(item: string, custom: string): void {
        this.entry(`item.${this.modid}.${item}`, custom);
    }

    blockEntry(block: string, custom: string): void {
        this.entry(`block.${this.modid}.${block}`, custom);
    }

    entry(name: string, custom: string): void {
        if(!this.json.hasOwnProperty(name)) {
            this.json[name] = custom;
        }
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
    private tags: VoidMap<string, List<string>> = new VoidMap();

    public addBlockTag(tagName: string, values: string[], replace: boolean=false) {
        this.addTag('blocks', tagName, values)
    }

    public addItemTag(tagName: string, values: string[], replace: boolean=false) {
        this.addTag('items', tagName, values)
    }

    public addFluidTag(tagName: string, values: string[], replace: boolean=false) {
        this.addTag('fluids', tagName, values)
    }

    public addWorldgenTag(tagName: string, values: string[], replace: boolean=false) {
        this.addTag('worldgen', tagName, values)
    }

    public addTag(tagType: string, tagName: string, values: string[]) {
        let finalKey = `${tagType}-${tagName}`;

        if(this.tags.containKey(finalKey)) {
            let list = this.tags.get(finalKey);
            list.fromArray(values);
            this.tags.put(finalKey, list);
        }
        else {
            this.tags.put(finalKey, List.fromArray(values));
        }
    }
    
    public run(): void {
        for(let [tag, values] of this.tags.entries()) {
            let s = tag.split('-');
            let tagName = s[1];
            let tagType = s[0];

            let split = tagName.split(':');
            let p = this.createTagPath(join('.', 'generated', this.modid, 'data', split[0], 'tags', tagType, split[1]+'.json'));
            writeFileSync(p, JSON.stringify({ replace:false, values:values.toArray()}, null, 2), 'utf8');
        }
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

    recipe(path: string, recipeType: string, json: object) {
        let output = {
            type:recipeType
        }

        for(let index in json) {
            output[index] = json[index]
        }

        this.customRecipe(path, output);
    }

    public run(): void {
        super.run();
        this.loots.run();
        this.tags.run();
    }

    shapedRecipe(name: string, pattern: string[], key: JSObj, result: ItemStack) {
        this.recipe(name+'.json', 'minecraft:crafting_shaped', {
            pattern: pattern,
            key: key,
            result: result
        });
    }

    /**
     * A recipe with a mod required condition
     * @param name 
     * @param pattern 
     * @param key 
     * @param result 
     * @param condition 
     */
    conditionalShapedRecipe(name: string, pattern: string[], key: JSObj, result: ItemStack, condition: string) {
        this.recipe(name+'.json', 'minecraft:crafting_shaped', {
            pattern: pattern,
            key: key,
            result: result,
            conditions: [
                {
                    type: 'forge:mod_loaded',
                    modid: condition
                }
            ]
        });
    }
}

export class DefaultDataManager extends DataManager {
    public static create(modid: string) {
        return new DefaultDataManager(modid);
    }
}