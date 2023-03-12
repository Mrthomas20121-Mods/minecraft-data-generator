import { join } from "path";
import { DataManager } from "../lib/managers.js";
export class TFCDataManager extends DataManager {
    static create(modid) {
        return new TFCDataManager(modid);
    }
    createIngredient(input) {
        let ingredient = {};
        if (input[0] == 'tag') {
            ingredient['tag'] = input[1];
            if (input.length == 3) {
                ingredient['count'] = input[2];
            }
        }
        else {
            ingredient['item'] = input[0];
            if (input.length == 2) {
                ingredient['count'] = input[1];
            }
        }
        return ingredient;
    }
    ItemStackProvider(stack) {
        return {
            item: stack
        };
    }
    cluster_vein(name, rarity, minY, maxY, size, density, indicator, blocks, rockList) {
        let replacer = rockList.map(rock => {
            return {
                replace: [
                    `tfc:rock/raw/${rock.name}`
                ],
                with: blocks(rock)
            };
        });
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
    heatingRecipe(path, ingredient, resultFluid, temperature, useDurability = false) {
        this.recipe(join('heating', path + '.json'), 'tfc:heating', {
            ingredient: this.createIngredient(ingredient),
            result_fluid: {
                fluid: resultFluid[0],
                amount: resultFluid[1]
            },
            temperature: temperature,
            use_durability: useDurability
        });
    }
    anvilRecipe(path, ingredient, result, tier, rules, bonus = false) {
        this.recipe(join('anvil', path + '.json'), 'tfc:anvil', {
            'input': this.createIngredient(ingredient),
            'result': result,
            'tier': tier,
            'rules': rules,
            'apply_forging_bonus': bonus
        });
    }
    conditionalAnvilRecipe(path, ingredient, result, tier, rules, condition, bonus = false) {
        this.recipe(join('anvil', path + '.json'), 'tfc:anvil', {
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
    weldingRecipe(path, input1, input2, tier, result) {
        this.recipe(join('welding', path), 'tfc:welding', {
            'first_input': this.createIngredient(input1),
            'second_input': this.createIngredient(input2),
            'tier': tier,
            'result': this.ItemStackProvider(result)
        });
    }
    conditionalWeldingRecipe(path, input1, input2, tier, result, condition) {
        this.recipe(join('welding', path + '.json'), 'tfc:welding', {
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
    quernRecipe(path, ingredient, result) {
        this.recipe(join('quern', path + '.json'), 'tfc:quern', {
            ingredient: this.createIngredient(ingredient),
            result: this.createIngredient(result)
        });
    }
    conditionalQuernRecipe(path, ingredient, result, condition) {
        this.recipe(join('quern', path + '.json'), 'tfc:quern', {
            'ingredient': this.createIngredient(ingredient),
            'result': this.createIngredient(result),
            'conditions': [
                {
                    "type": "forge:mod_loaded",
                    "modid": condition
                }
            ]
        });
    }
    chiselRecipe(path, ingredient, result, mode, condition = null) {
        let json = {
            'ingredient': ingredient,
            'result': result,
            mode: mode
        };
        if (mode == 'slab') {
            json["extra_drop"] = {
                "item": result
            };
        }
        if (condition != null) {
            json['conditions'] = [
                {
                    "type": "forge:mod_loaded",
                    "modid": condition
                }
            ];
        }
        this.recipe(join('chisel', path + '.json'), 'tfc:chisel', json);
    }
    item_heat_tag(path, ingredient, heat_capacity, melt_temperature = null, mb = null) {
        let forging_temp = 0;
        let welding_temp = 0;
        if (melt_temperature != null) {
            forging_temp = Math.round(melt_temperature * 0.6);
            welding_temp = Math.round(melt_temperature * 0.8);
        }
        if (mb != null) {
            heat_capacity = Math.round(10 * heat_capacity * mb) / 1000;
        }
        this.customData(join('tfc', 'item_heats', path + '.json'), {
            'ingredient': { tag: ingredient },
            'heat_capacity': heat_capacity,
            'forging_temperature': forging_temp,
            'welding_tempreture': welding_temp
        });
    }
    item_heat(path, ingredient, heat_capacity, melt_temperature = null, mb = null) {
        let forging_temp = 0;
        let welding_temp = 0;
        if (melt_temperature != null) {
            forging_temp = Math.round(melt_temperature * 0.6);
            welding_temp = Math.round(melt_temperature * 0.8);
        }
        if (mb != null) {
            heat_capacity = Math.round(10 * heat_capacity * mb) / 1000;
        }
        this.customData(join('tfc', 'item_heats', path + '.json'), {
            'ingredient': { item: this.item(ingredient) },
            'heat_capacity': heat_capacity,
            'forging_temperature': forging_temp,
            'welding_tempreture': welding_temp
        });
    }
}
