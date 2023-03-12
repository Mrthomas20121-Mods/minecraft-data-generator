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

export class DoubleKeyMap<A, B, C> {
    private keys1: List<A> = new List();
    private keys2: List<B> = new List();
    private values: List<List<C>> = new List();

    put(key1: A, key2: B, value: C[]) {

        this.keys1.add(key1);
        this.keys2.add(key2);
        this.values.add(List.fromArray(value));
    }

    containKeys(key1: A, key2: B): boolean {
        return this.keys1.contain(key1) && this.keys2.contain(key2);
    }

    indexOf(key1: A, key2: B): number {
        if(this.containKeys(key1, key2)) {
            return this.keys1.indexOf(key1);
        }
    }

    updateValue(key1: A, key2: B, elementsToAdd: C[]) {
        let index = this.indexOf(key1, key2);
        this.values.get(index).fromArray(elementsToAdd);
    }

    public forEach(predicate: (key1:A, key2: B, value: List<C>) => void): void {
        for(let i = 0; i<this.keys1.size(); i++) {
            let key1 = this.keys1.get(i);
            let key2 = this.keys2.get(i);
            let value = this.values.get(i);
            predicate(key1, key2, value);
        }
    }
}

export class TagManager extends Manager {

    private tagMap: DoubleKeyMap<string, string, string> = new DoubleKeyMap();

    public addBlockTag(tagName: string, values: string[], replace: boolean=false) {
        this.addTag('blocks', tagName, values)
    }

    public addItemTag(tagName: string, values: string[], replace: boolean=false) {
        this.addTag('items', tagName, values)
    }

    public addFluidTag(tagName: string, values: string[], replace: boolean=false) {
        this.addTag('fluids', tagName, values)
    }

    public addTag(tagType: string, tagName: string, values: string[]) {
        // if the tag exists add the existing values to the tag
        if(this.tagMap.containKeys(tagName, tagType)) {
            this.tagMap.updateValue(tagName, tagType, values);
        }
        else {
            this.tagMap.put(tagName, tagType, values);
        }
    }
    
    public run(): void {
        this.tagMap.forEach((tagName, tagType, values) => {
            let split = tagName.split(':');
            let p = this.createTagPath(join('.', 'generated', this.modid, 'data', split[0], 'tags', tagType, split[1]+'.json'));
            writeFileSync(p, JSON.stringify({ replace:false, values:values.toArray()}, null, 2), 'utf8');
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