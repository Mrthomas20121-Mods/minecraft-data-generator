import { join } from "path";
import List from "void-list";
import { DataManager } from "../lib/managers.js";
import { JSObj } from "../lib/types.js";
import { Rock, Rules } from "./constants.js";

export class TFCDataManager extends DataManager {

    public static create(modid: string) {
        return new TFCDataManager(modid);
    }

    createIngredient(input: any[]) {
        let ingredient = {};

        if(input[0] == 'tag') {
            ingredient['tag'] = input[1];
            if(input.length == 3) {
                ingredient['count'] = input[2];
            }
        }
        else {
            ingredient['item'] = input[0];
            if(input.length == 2) {
                ingredient['count'] = input[1];
            }
        }
        return ingredient;
    }

    ItemStackProvider(stack: string) {
        return {
            item: stack
        };
    }

    cluster_vein(name: string, rarity: number, minY: number, maxY: number, size: number, density: number, indicator: string, blocks: (rock: Rock) => { weight: number, block: string }[], rockList: List<Rock>) {
        
        let replacer = rockList.map(rock => { return {
            replace:[
                `tfc:rock/raw/${rock.name}`
            ],
            with:blocks(rock)
        } });
        
        this.customData(join('worldgen', 'configured_feature', 'vein', `${name}.json`), {
            "type": "tfc:cluster_vein",
            "config": {
              "rarity": rarity,
              "min_y": {
                "absolute": minY
              },
              "max_y": {
                "absolute": maxY
              },
              "size": size,
              "density": density,
              "blocks": replacer.toArray(),
              "indicator": {
                "rarity": 12,
                "blocks": [
                  {
                    "block": indicator
                  }
                ]
              },
              "random_name": name
            }
        });

        this.customData(join('worldgen', 'placed_feature', 'vein', `${name}.json`), {
            "feature": `${this.modid}:vein/${name}`,
            "placement": []
          });
    }

    heatingRecipe(path: string, ingredient: any[], resultFluid: any[], temperature, useDurability: boolean= false) {
        this.recipe(join('heating', path+'.json'), 'tfc:heating', {
            ingredient: this.createIngredient(ingredient),
            result_fluid: {
                fluid: resultFluid[0],
                amount: resultFluid[1]
            },
            temperature: temperature,
            use_durability: useDurability
        });
    }

    anvilRecipe(path: string, ingredient: any[], result: JSObj, tier: number, rules: Rules[], bonus: boolean=false) {
        this.recipe(join('anvil', path+'.json'), 'tfc:anvil', {
            'input': this.createIngredient(ingredient),
            'result': result,
            'tier': tier,
            'rules': rules,
            'apply_forging_bonus': bonus
        });
    }

    conditionalAnvilRecipe(path: string, ingredient: any[], result: JSObj, tier: number, rules: Rules[], condition: string, bonus: boolean=false) {
        this.recipe(join('anvil', path+'.json'), 'tfc:anvil', {
            'input': this.createIngredient(ingredient),
            'result': result,
            'tier': tier,
            'rules': rules,
            'apply_forging_bonus': bonus,
            'conditions': [
                {
                    "type": "forge:mod_loaded",
                    "modid": condition
                }
            ]
        });
    }

    weldingRecipe(path: string, input1: any[], input2: any[], tier: number, result: string) {
        this.recipe(join('welding', path), 'tfc:welding', {
            'first_input': this.createIngredient(input1),
            'second_input': this.createIngredient(input2),
            'tier': tier,
            'result': this.ItemStackProvider(result)
        });
    }

    conditionalWeldingRecipe(path: string, input1: any[], input2: any[], tier: number, result: string, condition: string) {
        this.recipe(join('welding', path+'.json'), 'tfc:welding', {
            'first_input': this.createIngredient(input1),
            'second_input': this.createIngredient(input2),
            'tier': tier,
            'result': this.ItemStackProvider(result),
            'conditions': [
                {
                    "type": "forge:mod_loaded",
                    "modid": condition
                }
            ]
        });
    }

    quernRecipe(path: string, ingredient: any[], result:any[]) {
        this.recipe(join('quern', path+'.json'), 'tfc:quern', {
            ingredient:this.createIngredient(ingredient),
            result:this.createIngredient(result)
        });
    }

    conditionalQuernRecipe(path: string, ingredient: any[], result:any[], condition: string) {
        this.recipe(join('quern', path+'.json'), 'tfc:quern', {
            'ingredient':this.createIngredient(ingredient),
            'result':this.createIngredient(result),
            'conditions': [
                {
                    "type": "forge:mod_loaded",
                    "modid": condition
                }
            ]
        });
    }

    chiselRecipe(path: string, ingredient: string, result: string, mode: string, condition: string= null) {

        let json = {
            'ingredient': ingredient,
            'result': result,
            mode: mode
        };

        if(mode == 'slab') {
            json["extra_drop"] = {
                "item": result
            };
        }
        if(condition != null) {
            json['conditions'] = [
                {
                    "type": "forge:mod_loaded",
                    "modid": condition
                }
            ]
        }


        this.recipe(join('chisel', path+'.json'), 'tfc:chisel', json);
    }


    item_heat_tag(path: string, ingredient: string, heat_capacity: number, melt_temperature: number = null, mb: number = null) {

        let forging_temp = 0;
        let welding_temp = 0;

        if(melt_temperature != null) {
            forging_temp = Math.round(melt_temperature * 0.6);
            welding_temp = Math.round(melt_temperature * 0.8);
        }

        if(mb != null) {
            heat_capacity = Math.round(10 * heat_capacity * mb) / 1000;
        }

        this.customData(join('tfc', 'item_heats', path+'.json'), {
            'ingredient': {tag: ingredient},
            'heat_capacity': heat_capacity,
            'forging_temperature': forging_temp,
            'welding_tempreture': welding_temp
        });
    }

    item_heat(path: string, ingredient: string, heat_capacity: number, melt_temperature: number = null, mb: number = null) {

        let forging_temp = 0;
        let welding_temp = 0;

        if(melt_temperature != null) {
            forging_temp = Math.round(melt_temperature * 0.6);
            welding_temp = Math.round(melt_temperature * 0.8);
        }

        if(mb != null) {
            heat_capacity = Math.round(10 * heat_capacity * mb) / 1000;
        }

        this.customData(join('tfc', 'item_heats', path+'.json'), {
            'ingredient': {item: this.item(ingredient)},
            'heat_capacity': heat_capacity,
            'forging_temperature': forging_temp,
            'welding_tempreture': welding_temp
        });
    }
} 