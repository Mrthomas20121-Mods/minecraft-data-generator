import { join } from "path";
import { ModelManager } from "../lib/assets-builders.js";
import { JSObj } from "../lib/types.js";
import { Metal } from "./constants.js";
import { ExMetal } from "./tfc_types.js";

export class MetallumModelManager extends ModelManager {
    public static create(modid: string): MetallumModelManager {
        return new MetallumModelManager(modid);
    };

    fishingRodItem(metal: ExMetal) {
        let modelBase = {
            "parent": "minecraft:item/handheld_rod",
            "textures": {
              "layer0": `tfc_metallum:item/metal/fishing_rod/${metal.name}`
            },
            "overrides": [
              {
                "predicate": {
                  "tfc:cast": 1
                },
                "model": "minecraft:item/fishing_rod_cast"
              }
            ]
        };
        let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(`metal/fishing_rod/${metal.name}`, '.json')));
        this.save(savePath, modelBase)
    };

    javelinItem(metal: ExMetal) {
        let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(`metal/javelin/${metal.name}`, '.json')));
        let modelBase = {
            "loader": "forge:separate-perspective",
            "gui_light": "front",
            "overrides": [
              {
                "predicate": {
                  "tfc:throwing": 1
                },
                "model": `tfc_metallum:item/metal/javelin/${metal.name}_throwing`
              }
            ],
            "base": {
              "parent": `tfc_metallum:item/metal/javelin/${metal.name}_in_hand`
            },
            "perspectives": {
              "none": {
                "parent": `tfc_metallum:item/metal/javelin/${metal.name}_in_gui`
              },
              "fixed": {
                "parent": `tfc_metallum:item/metal/javelin/${metal.name}_in_gui`
              },
              "ground": {
                "parent": `tfc_metallum:item/metal/javelin/${metal.name}_in_gui`
              },
              "gui": {
                "parent": `tfc_metallum:item/metal/javelin/${metal.name}_in_gui`
              }
            }
        }

        this.save(savePath, modelBase);

        // path+item name
        this.itemModelWithParent(`metal/javelin/${metal.name}_in_gui`, `metal/javelin/${metal.name}`);

        // particle models
        this.particleModel(`metal/javelin/${metal.name}_in_hand`, `metal/javelin/${metal.name}`, 'item/trident_in_hand');
        this.particleModel(`metal/javelin/${metal.name}_throwing`, `metal/javelin/${metal.name}`, 'item/trident_throwing');
    }

    metalFluid(metal: ExMetal) {

        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', 'metal', 'fluid', metal.name+'.json'));
        let fullBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'metal', 'fluid', metal.name+'.json'));


        this.save(fullBlockstatePath, {
            "variants": {
              "": {
                "model": `tfc_metallum:block/metal/fluid/${metal.name}`
              }
            }
        });

        this.save(fullBlockPath, {
            "textures": {
              "particle": "block/lava_still"
            }
          })
    }

    shield(metal: ExMetal) {
        let tier = metal.tier;
        let front = `tfc_metallum:item/metal/shield/${metal.name}_front`;
        let back = `tfc_metallum:item/metal/shield/${metal.name}_back`;
        let blocking_model = `tfc_metallum:item/metal/shield/${metal.name}_blocking`;
        
        let shield: JSObj;
        let shield_blocking: JSObj;

        if(tier == 0) {
            return;
        }
        else if(tier == 1) {
            shield = {
                "credit": "Made with Blockbench",
                "textures": {
                    "1": back,
                    "3": front,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#3"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#3"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#3"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#3"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#3"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#3"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#3"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#3"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#3"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#3"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#3"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#3"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#3"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#3"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#3"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#3"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#3"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#3"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#3"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#3"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_0",
                        "from": [6, 2, 6],
                        "to": [10, 14, 7],
                        "faces": {
                            "north": {"uv": [10, 2, 6, 14], "texture": "#3"},
                            "east": {"uv": [9, 2, 10, 14], "texture": "#3"},
                            "south": {"uv": [6, 2, 10, 14], "texture": "#3"},
                            "west": {"uv": [6, 2, 7, 14], "texture": "#3"},
                            "up": {"uv": [6, 2, 10, 3], "texture": "#3"},
                            "down": {"uv": [6, 13, 10, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_1",
                        "from": [4, 3, 6],
                        "to": [6, 13, 7],
                        "faces": {
                            "north": {"uv": [6, 3, 4, 13], "texture": "#3"},
                            "east": {"uv": [5, 3, 6, 13], "texture": "#3"},
                            "south": {"uv": [4, 3, 6, 13], "texture": "#1"},
                            "west": {"uv": [4, 3, 5, 13], "texture": "#3"},
                            "up": {"uv": [4, 3, 6, 4], "texture": "#3"},
                            "down": {"uv": [4, 12, 6, 13], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_2",
                        "from": [10, 3, 6],
                        "to": [12, 13, 7],
                        "faces": {
                            "north": {"uv": [12, 3, 10, 13], "texture": "#3"},
                            "east": {"uv": [11, 3, 12, 13], "texture": "#3"},
                            "south": {"uv": [10, 3, 12, 13], "texture": "#1"},
                            "west": {"uv": [10, 3, 11, 13], "texture": "#3"},
                            "up": {"uv": [10, 3, 12, 4], "texture": "#3"},
                            "down": {"uv": [10, 12, 12, 13], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_3",
                        "from": [3, 4, 6],
                        "to": [4, 12, 7],
                        "faces": {
                            "north": {"uv": [4, 4, 3, 12], "texture": "#3"},
                            "east": {"uv": [3, 4, 4, 12], "texture": "#3"},
                            "south": {"uv": [3, 4, 4, 12], "texture": "#1"},
                            "west": {"uv": [3, 4, 4, 12], "texture": "#3"},
                            "up": {"uv": [3, 4, 4, 5], "texture": "#3"},
                            "down": {"uv": [3, 11, 4, 12], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_4",
                        "from": [12, 4, 6],
                        "to": [13, 12, 7],
                        "faces": {
                            "north": {"uv": [13, 4, 12, 12], "texture": "#3"},
                            "east": {"uv": [12, 4, 13, 12], "texture": "#3"},
                            "south": {"uv": [12, 4, 13, 12], "texture": "#1"},
                            "west": {"uv": [12, 4, 13, 12], "texture": "#3"},
                            "up": {"uv": [12, 4, 13, 5], "texture": "#3"},
                            "down": {"uv": [12, 11, 13, 12], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_5",
                        "from": [2, 6, 6],
                        "to": [3, 10, 7],
                        "faces": {
                            "north": {"uv": [3, 6, 2, 10], "texture": "#3"},
                            "east": {"uv": [2, 6, 3, 10], "texture": "#3"},
                            "south": {"uv": [2, 6, 3, 10], "texture": "#1"},
                            "west": {"uv": [2, 6, 3, 10], "texture": "#3"},
                            "up": {"uv": [2, 6, 3, 7], "texture": "#3"},
                            "down": {"uv": [2, 9, 3, 10], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_6",
                        "from": [13, 6, 6],
                        "to": [14, 10, 7],
                        "faces": {
                            "north": {"uv": [14, 6, 13, 10], "texture": "#3"},
                            "east": {"uv": [13, 6, 14, 10], "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#1"},
                            "west": {"uv": [13, 6, 14, 10], "texture": "#3"},
                            "up": {"uv": [13, 6, 14, 7], "texture": "#3"},
                            "down": {"uv": [13, 9, 14, 10], "texture": "#3"}
                        }
                    }
                ],
                "gui_light": "front",
                "overrides": [
                    {"predicate": {"blocking": 1}, "model": blocking_model}
                ],
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "firstperson_righthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "firstperson_lefthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier1_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11]
                    }
                ]
            };
            shield_blocking = {
                "credit": "Made with Blockbench",
                "textures": {
                    "1": back,
                    "3": front,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#3"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#3"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#3"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#3"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#3"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#3"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#3"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#3"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#3"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#3"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#3"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#3"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#3"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#3"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#3"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#3"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#3"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#3"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#3"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#3"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_0",
                        "from": [6, 2, 6],
                        "to": [10, 14, 7],
                        "faces": {
                            "north": {"uv": [10, 2, 6, 14], "texture": "#3"},
                            "east": {"uv": [9, 2, 10, 14], "texture": "#3"},
                            "south": {"uv": [6, 2, 10, 14], "texture": "#3"},
                            "west": {"uv": [6, 2, 7, 14], "texture": "#3"},
                            "up": {"uv": [6, 2, 10, 3], "texture": "#3"},
                            "down": {"uv": [6, 13, 10, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_1",
                        "from": [4, 3, 6],
                        "to": [6, 13, 7],
                        "faces": {
                            "north": {"uv": [6, 3, 4, 13], "texture": "#3"},
                            "east": {"uv": [5, 3, 6, 13], "texture": "#3"},
                            "south": {"uv": [4, 3, 6, 13], "texture": "#1"},
                            "west": {"uv": [4, 3, 5, 13], "texture": "#3"},
                            "up": {"uv": [4, 3, 6, 4], "texture": "#3"},
                            "down": {"uv": [4, 12, 6, 13], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_2",
                        "from": [10, 3, 6],
                        "to": [12, 13, 7],
                        "faces": {
                            "north": {"uv": [12, 3, 10, 13], "texture": "#3"},
                            "east": {"uv": [11, 3, 12, 13], "texture": "#3"},
                            "south": {"uv": [10, 3, 12, 13], "texture": "#1"},
                            "west": {"uv": [10, 3, 11, 13], "texture": "#3"},
                            "up": {"uv": [10, 3, 12, 4], "texture": "#3"},
                            "down": {"uv": [10, 12, 12, 13], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_3",
                        "from": [3, 4, 6],
                        "to": [4, 12, 7],
                        "faces": {
                            "north": {"uv": [4, 4, 3, 12], "texture": "#3"},
                            "east": {"uv": [3, 4, 4, 12], "texture": "#3"},
                            "south": {"uv": [3, 4, 4, 12], "texture": "#1"},
                            "west": {"uv": [3, 4, 4, 12], "texture": "#3"},
                            "up": {"uv": [3, 4, 4, 5], "texture": "#3"},
                            "down": {"uv": [3, 11, 4, 12], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_4",
                        "from": [12, 4, 6],
                        "to": [13, 12, 7],
                        "faces": {
                            "north": {"uv": [13, 4, 12, 12], "texture": "#3"},
                            "east": {"uv": [12, 4, 13, 12], "texture": "#3"},
                            "south": {"uv": [12, 4, 13, 12], "texture": "#1"},
                            "west": {"uv": [12, 4, 13, 12], "texture": "#3"},
                            "up": {"uv": [12, 4, 13, 5], "texture": "#3"},
                            "down": {"uv": [12, 11, 13, 12], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_5",
                        "from": [2, 6, 6],
                        "to": [3, 10, 7],
                        "faces": {
                            "north": {"uv": [3, 6, 2, 10], "texture": "#3"},
                            "east": {"uv": [2, 6, 3, 10], "texture": "#3"},
                            "south": {"uv": [2, 6, 3, 10], "texture": "#1"},
                            "west": {"uv": [2, 6, 3, 10], "texture": "#3"},
                            "up": {"uv": [2, 6, 3, 7], "texture": "#3"},
                            "down": {"uv": [2, 9, 3, 10], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier1_front_6",
                        "from": [13, 6, 6],
                        "to": [14, 10, 7],
                        "faces": {
                            "north": {"uv": [14, 6, 13, 10], "texture": "#3"},
                            "east": {"uv": [13, 6, 14, 10], "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#1"},
                            "west": {"uv": [13, 6, 14, 10], "texture": "#3"},
                            "up": {"uv": [13, 6, 14, 7], "texture": "#3"},
                            "down": {"uv": [13, 9, 14, 10], "texture": "#3"}
                        }
                    }
                ],
                "gui_light": "front",
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "firstperson_righthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "firstperson_lefthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier1_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11]
                    }
                ]
            };
        }
        else if(tier == 2) {
            shield = {
                "credit": "Made with Blockbench",
                "textures": {
                    "2": front,
                    "4": back
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#2"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#2"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#2"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#2"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#2"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#2"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#2"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#2"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#2"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#2"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#2"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#2"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#2"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#2"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#2"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#2"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#2"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#2"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#2"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#2"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#2"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_0",
                        "from": [6, 1, 6],
                        "to": [10, 15, 7],
                        "faces": {
                            "north": {"uv": [10, 1, 6, 15], "texture": "#2"},
                            "east": {"uv": [9, 1, 10, 15], "texture": "#2"},
                            "south": {"uv": [6, 1, 10, 15], "texture": "#4"},
                            "west": {"uv": [6, 1, 7, 15], "texture": "#2"},
                            "up": {"uv": [6, 1, 10, 2], "texture": "#2"},
                            "down": {"uv": [6, 14, 10, 15], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_1",
                        "from": [4, 2, 6],
                        "to": [6, 14, 7],
                        "faces": {
                            "north": {"uv": [6, 2, 4, 14], "texture": "#2"},
                            "east": {"uv": [5, 2, 6, 14], "texture": "#2"},
                            "south": {"uv": [4, 2, 6, 14], "texture": "#4"},
                            "west": {"uv": [4, 2, 5, 14], "texture": "#2"},
                            "up": {"uv": [4, 2, 6, 3], "texture": "#2"},
                            "down": {"uv": [4, 13, 6, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_2",
                        "from": [10, 2, 6],
                        "to": [12, 14, 7],
                        "faces": {
                            "north": {"uv": [12, 2, 10, 14], "texture": "#2"},
                            "east": {"uv": [11, 2, 12, 14], "texture": "#2"},
                            "south": {"uv": [10, 2, 12, 14], "texture": "#4"},
                            "west": {"uv": [10, 2, 11, 14], "texture": "#2"},
                            "up": {"uv": [10, 2, 12, 3], "texture": "#2"},
                            "down": {"uv": [10, 13, 12, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_3",
                        "from": [3, 3, 6],
                        "to": [4, 13, 7],
                        "faces": {
                            "north": {"uv": [4, 3, 3, 13], "texture": "#2"},
                            "east": {"uv": [3, 3, 4, 13], "texture": "#2"},
                            "south": {"uv": [3, 3, 4, 13], "texture": "#4"},
                            "west": {"uv": [3, 3, 4, 13], "texture": "#2"},
                            "up": {"uv": [3, 3, 4, 4], "texture": "#2"},
                            "down": {"uv": [3, 12, 4, 13], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_4",
                        "from": [12, 3, 6],
                        "to": [13, 13, 7],
                        "faces": {
                            "north": {"uv": [13, 3, 12, 13], "texture": "#2"},
                            "east": {"uv": [12, 3, 13, 13], "texture": "#2"},
                            "south": {"uv": [12, 3, 13, 13], "texture": "#4"},
                            "west": {"uv": [12, 3, 13, 13], "texture": "#2"},
                            "up": {"uv": [12, 3, 13, 4], "texture": "#2"},
                            "down": {"uv": [12, 12, 13, 13], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_5",
                        "from": [2, 4, 6],
                        "to": [3, 12, 7],
                        "faces": {
                            "north": {"uv": [3, 4, 2, 12], "texture": "#2"},
                            "east": {"uv": [2, 4, 3, 12], "texture": "#2"},
                            "south": {"uv": [2, 4, 3, 12], "texture": "#4"},
                            "west": {"uv": [2, 4, 3, 12], "texture": "#2"},
                            "up": {"uv": [2, 4, 3, 5], "texture": "#2"},
                            "down": {"uv": [2, 11, 3, 12], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_6",
                        "from": [13, 4, 6],
                        "to": [14, 12, 7],
                        "faces": {
                            "north": {"uv": [14, 4, 13, 12], "texture": "#2"},
                            "east": {"uv": [13, 4, 14, 12], "texture": "#2"},
                            "south": {"uv": [13, 4, 14, 12], "texture": "#4"},
                            "west": {"uv": [13, 4, 14, 12], "texture": "#2"},
                            "up": {"uv": [13, 4, 14, 5], "texture": "#2"},
                            "down": {"uv": [13, 11, 14, 12], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_7",
                        "from": [1, 6, 6],
                        "to": [2, 10, 7],
                        "faces": {
                            "north": {"uv": [2, 6, 1, 10], "texture": "#2"},
                            "east": {"uv": [1, 6, 2, 10], "texture": "#2"},
                            "south": {"uv": [1, 6, 2, 10], "texture": "#4"},
                            "west": {"uv": [1, 6, 2, 10], "texture": "#2"},
                            "up": {"uv": [1, 6, 2, 7], "texture": "#2"},
                            "down": {"uv": [1, 9, 2, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_8",
                        "from": [14, 6, 6],
                        "to": [15, 10, 7],
                        "faces": {
                            "north": {"uv": [15, 6, 14, 10], "texture": "#2"},
                            "east": {"uv": [14, 6, 15, 10], "texture": "#2"},
                            "south": {"uv": [14, 6, 15, 10], "texture": "#4"},
                            "west": {"uv": [14, 6, 15, 10], "texture": "#2"},
                            "up": {"uv": [14, 6, 15, 7], "texture": "#2"},
                            "down": {"uv": [14, 9, 15, 10], "texture": "#2"}
                        }
                    }
                ],
                "gui_light": "front",
                "overrides": [
                    {"predicate": {"blocking": 1}, "model": blocking_model}
                ],
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "firstperson_righthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "firstperson_lefthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier2_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13]
                    }
                ]
            };
            shield_blocking = {
                "credit": "Made with Blockbench",
                "textures": {
                    "2": front,
                    "4": back
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#2"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#2"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#2"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#2"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#2"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#2"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#2"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#2"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#2"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#2"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#2"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#2"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#2"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#2"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#2"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#2"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#2"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#2"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#2"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#2"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#2"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_0",
                        "from": [6, 1, 6],
                        "to": [10, 15, 7],
                        "faces": {
                            "north": {"uv": [10, 1, 6, 15], "texture": "#2"},
                            "east": {"uv": [9, 1, 10, 15], "texture": "#2"},
                            "south": {"uv": [6, 1, 10, 15], "texture": "#4"},
                            "west": {"uv": [6, 1, 7, 15], "texture": "#2"},
                            "up": {"uv": [6, 1, 10, 2], "texture": "#2"},
                            "down": {"uv": [6, 14, 10, 15], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_1",
                        "from": [4, 2, 6],
                        "to": [6, 14, 7],
                        "faces": {
                            "north": {"uv": [6, 2, 4, 14], "texture": "#2"},
                            "east": {"uv": [5, 2, 6, 14], "texture": "#2"},
                            "south": {"uv": [4, 2, 6, 14], "texture": "#4"},
                            "west": {"uv": [4, 2, 5, 14], "texture": "#2"},
                            "up": {"uv": [4, 2, 6, 3], "texture": "#2"},
                            "down": {"uv": [4, 13, 6, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_2",
                        "from": [10, 2, 6],
                        "to": [12, 14, 7],
                        "faces": {
                            "north": {"uv": [12, 2, 10, 14], "texture": "#2"},
                            "east": {"uv": [11, 2, 12, 14], "texture": "#2"},
                            "south": {"uv": [10, 2, 12, 14], "texture": "#4"},
                            "west": {"uv": [10, 2, 11, 14], "texture": "#2"},
                            "up": {"uv": [10, 2, 12, 3], "texture": "#2"},
                            "down": {"uv": [10, 13, 12, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_3",
                        "from": [3, 3, 6],
                        "to": [4, 13, 7],
                        "faces": {
                            "north": {"uv": [4, 3, 3, 13], "texture": "#2"},
                            "east": {"uv": [3, 3, 4, 13], "texture": "#2"},
                            "south": {"uv": [3, 3, 4, 13], "texture": "#4"},
                            "west": {"uv": [3, 3, 4, 13], "texture": "#2"},
                            "up": {"uv": [3, 3, 4, 4], "texture": "#2"},
                            "down": {"uv": [3, 12, 4, 13], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_4",
                        "from": [12, 3, 6],
                        "to": [13, 13, 7],
                        "faces": {
                            "north": {"uv": [13, 3, 12, 13], "texture": "#2"},
                            "east": {"uv": [12, 3, 13, 13], "texture": "#2"},
                            "south": {"uv": [12, 3, 13, 13], "texture": "#4"},
                            "west": {"uv": [12, 3, 13, 13], "texture": "#2"},
                            "up": {"uv": [12, 3, 13, 4], "texture": "#2"},
                            "down": {"uv": [12, 12, 13, 13], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_5",
                        "from": [2, 4, 6],
                        "to": [3, 12, 7],
                        "faces": {
                            "north": {"uv": [3, 4, 2, 12], "texture": "#2"},
                            "east": {"uv": [2, 4, 3, 12], "texture": "#2"},
                            "south": {"uv": [2, 4, 3, 12], "texture": "#4"},
                            "west": {"uv": [2, 4, 3, 12], "texture": "#2"},
                            "up": {"uv": [2, 4, 3, 5], "texture": "#2"},
                            "down": {"uv": [2, 11, 3, 12], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_6",
                        "from": [13, 4, 6],
                        "to": [14, 12, 7],
                        "faces": {
                            "north": {"uv": [14, 4, 13, 12], "texture": "#2"},
                            "east": {"uv": [13, 4, 14, 12], "texture": "#2"},
                            "south": {"uv": [13, 4, 14, 12], "texture": "#4"},
                            "west": {"uv": [13, 4, 14, 12], "texture": "#2"},
                            "up": {"uv": [13, 4, 14, 5], "texture": "#2"},
                            "down": {"uv": [13, 11, 14, 12], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_7",
                        "from": [1, 6, 6],
                        "to": [2, 10, 7],
                        "faces": {
                            "north": {"uv": [2, 6, 1, 10], "texture": "#2"},
                            "east": {"uv": [1, 6, 2, 10], "texture": "#2"},
                            "south": {"uv": [1, 6, 2, 10], "texture": "#4"},
                            "west": {"uv": [1, 6, 2, 10], "texture": "#2"},
                            "up": {"uv": [1, 6, 2, 7], "texture": "#2"},
                            "down": {"uv": [1, 9, 2, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier2_front_8",
                        "from": [14, 6, 6],
                        "to": [15, 10, 7],
                        "faces": {
                            "north": {"uv": [15, 6, 14, 10], "texture": "#2"},
                            "east": {"uv": [14, 6, 15, 10], "texture": "#2"},
                            "south": {"uv": [14, 6, 15, 10], "texture": "#4"},
                            "west": {"uv": [14, 6, 15, 10], "texture": "#2"},
                            "up": {"uv": [14, 6, 15, 7], "texture": "#2"},
                            "down": {"uv": [14, 9, 15, 10], "texture": "#2"}
                        }
                    }
                ],
                "gui_light": "front",
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "firstperson_righthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "firstperson_lefthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier2_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13]
                    }
                ]
            };
        }
        else if(tier == 3) {
            shield = {
                "credit": "Made with Blockbench",
                "textures": {
                    "1": back,
                    "3": front,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#3"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#3"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#3"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#3"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#3"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#3"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#3"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#3"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#3"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#3"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#3"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#3"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#3"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#3"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#3"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#3"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#3"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#3"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#3"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#3"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_0",
                        "from": [5, 1, 6],
                        "to": [11, 15, 7],
                        "faces": {
                            "north": {"uv": [11, 1, 5, 15], "texture": "#3"},
                            "east": {"uv": [10, 1, 11, 15], "texture": "#3"},
                            "south": {"uv": [5, 1, 11, 15], "texture": "#1"},
                            "west": {"uv": [5, 1, 6, 15], "texture": "#3"},
                            "up": {"uv": [5, 1, 11, 2], "texture": "#3"},
                            "down": {"uv": [5, 14, 11, 15], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_1",
                        "from": [4, 2, 6],
                        "to": [5, 14, 7],
                        "faces": {
                            "north": {"uv": [5, 2, 4, 14], "texture": "#3"},
                            "east": {"uv": [4, 2, 5, 14], "texture": "#3"},
                            "south": {"uv": [4, 2, 5, 14], "texture": "#1"},
                            "west": {"uv": [4, 2, 5, 14], "texture": "#3"},
                            "up": {"uv": [4, 2, 5, 3], "texture": "#3"},
                            "down": {"uv": [4, 13, 5, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_2",
                        "from": [11, 2, 6],
                        "to": [12, 14, 7],
                        "faces": {
                            "north": {"uv": [12, 2, 11, 14], "texture": "#3"},
                            "east": {"uv": [11, 2, 12, 14], "texture": "#3"},
                            "south": {"uv": [11, 2, 12, 14], "texture": "#1"},
                            "west": {"uv": [11, 2, 12, 14], "texture": "#3"},
                            "up": {"uv": [11, 2, 12, 3], "texture": "#3"},
                            "down": {"uv": [11, 13, 12, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_3",
                        "from": [3, 3, 6],
                        "to": [4, 13, 7],
                        "faces": {
                            "north": {"uv": [4, 3, 3, 13], "texture": "#3"},
                            "east": {"uv": [3, 3, 4, 13], "texture": "#3"},
                            "south": {"uv": [3, 3, 4, 13], "texture": "#1"},
                            "west": {"uv": [3, 3, 4, 13], "texture": "#3"},
                            "up": {"uv": [3, 3, 4, 4], "texture": "#3"},
                            "down": {"uv": [3, 12, 4, 13], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_4",
                        "from": [12, 3, 6],
                        "to": [13, 13, 7],
                        "faces": {
                            "north": {"uv": [13, 3, 12, 13], "texture": "#3"},
                            "east": {"uv": [12, 3, 13, 13], "texture": "#3"},
                            "south": {"uv": [12, 3, 13, 13], "texture": "#1"},
                            "west": {"uv": [12, 3, 13, 13], "texture": "#3"},
                            "up": {"uv": [12, 3, 13, 4], "texture": "#3"},
                            "down": {"uv": [12, 12, 13, 13], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_5",
                        "from": [2, 4, 6],
                        "to": [3, 12, 7],
                        "faces": {
                            "north": {"uv": [3, 4, 2, 12], "texture": "#3"},
                            "east": {"uv": [2, 4, 3, 12], "texture": "#3"},
                            "south": {"uv": [2, 4, 3, 12], "texture": "#1"},
                            "west": {"uv": [2, 4, 3, 12], "texture": "#3"},
                            "up": {"uv": [2, 4, 3, 5], "texture": "#3"},
                            "down": {"uv": [2, 11, 3, 12], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_6",
                        "from": [13, 4, 6],
                        "to": [14, 12, 7],
                        "faces": {
                            "north": {"uv": [14, 4, 13, 12], "texture": "#3"},
                            "east": {"uv": [13, 4, 14, 12], "texture": "#3"},
                            "south": {"uv": [13, 4, 14, 12], "texture": "#1"},
                            "west": {"uv": [13, 4, 14, 12], "texture": "#3"},
                            "up": {"uv": [13, 4, 14, 5], "texture": "#3"},
                            "down": {"uv": [13, 11, 14, 12], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_7",
                        "from": [1, 5, 6],
                        "to": [2, 11, 7],
                        "faces": {
                            "north": {"uv": [2, 5, 1, 11], "texture": "#3"},
                            "east": {"uv": [1, 5, 2, 11], "texture": "#3"},
                            "south": {"uv": [1, 5, 2, 11], "texture": "#1"},
                            "west": {"uv": [1, 5, 2, 11], "texture": "#3"},
                            "up": {"uv": [1, 5, 2, 6], "texture": "#3"},
                            "down": {"uv": [1, 10, 2, 11], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_8",
                        "from": [14, 5, 6],
                        "to": [15, 11, 7],
                        "faces": {
                            "north": {"uv": [15, 5, 14, 11], "texture": "#3"},
                            "east": {"uv": [14, 5, 15, 11], "texture": "#3"},
                            "south": {"uv": [14, 5, 15, 11], "texture": "#1"},
                            "west": {"uv": [14, 5, 15, 11], "texture": "#3"},
                            "up": {"uv": [14, 5, 15, 6], "texture": "#3"},
                            "down": {"uv": [14, 10, 15, 11], "texture": "#3"}
                        }
                    }
                ],
                "gui_light": "front",
                "overrides": [
                    {"predicate": {"blocking": 1}, "model": blocking_model}
                ],
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "firstperson_righthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "firstperson_lefthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier3_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13]
                    }
                ]
            };
            shield_blocking = {
                "credit": "Made with Blockbench",
                "textures": {
                    "1": back,
                    "3": front,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#3"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#3"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#3"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#3"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#3"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#3"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#3"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#3"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#3"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#3"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#3"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#3"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#3"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#3"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#3"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#3"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#3"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#3"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#3"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#3"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#3"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#3"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#3"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_0",
                        "from": [5, 1, 6],
                        "to": [11, 15, 7],
                        "faces": {
                            "north": {"uv": [11, 1, 5, 15], "texture": "#3"},
                            "east": {"uv": [10, 1, 11, 15], "texture": "#3"},
                            "south": {"uv": [5, 1, 11, 15], "texture": "#1"},
                            "west": {"uv": [5, 1, 6, 15], "texture": "#3"},
                            "up": {"uv": [5, 1, 11, 2], "texture": "#3"},
                            "down": {"uv": [5, 14, 11, 15], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_1",
                        "from": [4, 2, 6],
                        "to": [5, 14, 7],
                        "faces": {
                            "north": {"uv": [5, 2, 4, 14], "texture": "#3"},
                            "east": {"uv": [4, 2, 5, 14], "texture": "#3"},
                            "south": {"uv": [4, 2, 5, 14], "texture": "#1"},
                            "west": {"uv": [4, 2, 5, 14], "texture": "#3"},
                            "up": {"uv": [4, 2, 5, 3], "texture": "#3"},
                            "down": {"uv": [4, 13, 5, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_2",
                        "from": [11, 2, 6],
                        "to": [12, 14, 7],
                        "faces": {
                            "north": {"uv": [12, 2, 11, 14], "texture": "#3"},
                            "east": {"uv": [11, 2, 12, 14], "texture": "#3"},
                            "south": {"uv": [11, 2, 12, 14], "texture": "#1"},
                            "west": {"uv": [11, 2, 12, 14], "texture": "#3"},
                            "up": {"uv": [11, 2, 12, 3], "texture": "#3"},
                            "down": {"uv": [11, 13, 12, 14], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_3",
                        "from": [3, 3, 6],
                        "to": [4, 13, 7],
                        "faces": {
                            "north": {"uv": [4, 3, 3, 13], "texture": "#3"},
                            "east": {"uv": [3, 3, 4, 13], "texture": "#3"},
                            "south": {"uv": [3, 3, 4, 13], "texture": "#1"},
                            "west": {"uv": [3, 3, 4, 13], "texture": "#3"},
                            "up": {"uv": [3, 3, 4, 4], "texture": "#3"},
                            "down": {"uv": [3, 12, 4, 13], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_4",
                        "from": [12, 3, 6],
                        "to": [13, 13, 7],
                        "faces": {
                            "north": {"uv": [13, 3, 12, 13], "texture": "#3"},
                            "east": {"uv": [12, 3, 13, 13], "texture": "#3"},
                            "south": {"uv": [12, 3, 13, 13], "texture": "#1"},
                            "west": {"uv": [12, 3, 13, 13], "texture": "#3"},
                            "up": {"uv": [12, 3, 13, 4], "texture": "#3"},
                            "down": {"uv": [12, 12, 13, 13], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_5",
                        "from": [2, 4, 6],
                        "to": [3, 12, 7],
                        "faces": {
                            "north": {"uv": [3, 4, 2, 12], "texture": "#3"},
                            "east": {"uv": [2, 4, 3, 12], "texture": "#3"},
                            "south": {"uv": [2, 4, 3, 12], "texture": "#1"},
                            "west": {"uv": [2, 4, 3, 12], "texture": "#3"},
                            "up": {"uv": [2, 4, 3, 5], "texture": "#3"},
                            "down": {"uv": [2, 11, 3, 12], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_6",
                        "from": [13, 4, 6],
                        "to": [14, 12, 7],
                        "faces": {
                            "north": {"uv": [14, 4, 13, 12], "texture": "#3"},
                            "east": {"uv": [13, 4, 14, 12], "texture": "#3"},
                            "south": {"uv": [13, 4, 14, 12], "texture": "#1"},
                            "west": {"uv": [13, 4, 14, 12], "texture": "#3"},
                            "up": {"uv": [13, 4, 14, 5], "texture": "#3"},
                            "down": {"uv": [13, 11, 14, 12], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_7",
                        "from": [1, 5, 6],
                        "to": [2, 11, 7],
                        "faces": {
                            "north": {"uv": [2, 5, 1, 11], "texture": "#3"},
                            "east": {"uv": [1, 5, 2, 11], "texture": "#3"},
                            "south": {"uv": [1, 5, 2, 11], "texture": "#1"},
                            "west": {"uv": [1, 5, 2, 11], "texture": "#3"},
                            "up": {"uv": [1, 5, 2, 6], "texture": "#3"},
                            "down": {"uv": [1, 10, 2, 11], "texture": "#3"}
                        }
                    },
                    {
                        "name": "tier3_front_8",
                        "from": [14, 5, 6],
                        "to": [15, 11, 7],
                        "faces": {
                            "north": {"uv": [15, 5, 14, 11], "texture": "#3"},
                            "east": {"uv": [14, 5, 15, 11], "texture": "#3"},
                            "south": {"uv": [14, 5, 15, 11], "texture": "#1"},
                            "west": {"uv": [14, 5, 15, 11], "texture": "#3"},
                            "up": {"uv": [14, 5, 15, 6], "texture": "#3"},
                            "down": {"uv": [14, 10, 15, 11], "texture": "#3"}
                        }
                    }
                ],
                "gui_light": "front",
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "firstperson_righthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "firstperson_lefthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier3_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13]
                    }
                ]
            };
        }
        else if(tier == 4) {
            shield = {
                "credit": "Made with Blockbench",
                "textures": {
                    "0": front,
                    "1": back,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#0"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#0"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#0"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#0"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#0"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#0"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#0"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#0"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#0"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#0"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#0"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#0"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#0"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#0"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#0"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#0"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#0"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#0"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#0"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#0"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#0"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_0",
                        "from": [6, 0, 6],
                        "to": [10, 16, 7],
                        "faces": {
                            "north": {"uv": [10, 0, 6, 16], "texture": "#0"},
                            "east": {"uv": [9, 0, 10, 16], "texture": "#0"},
                            "south": {"uv": [6, 0, 10, 16], "texture": "#1"},
                            "west": {"uv": [6, 0, 7, 16], "texture": "#0"},
                            "up": {"uv": [6, 0, 10, 1], "texture": "#0"},
                            "down": {"uv": [6, 15, 10, 16], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_1",
                        "from": [5, 1, 6],
                        "to": [6, 15, 7],
                        "faces": {
                            "north": {"uv": [6, 1, 5, 15], "texture": "#0"},
                            "east": {"uv": [5, 1, 6, 15], "texture": "#0"},
                            "south": {"uv": [5, 1, 6, 15], "texture": "#1"},
                            "west": {"uv": [5, 1, 6, 15], "texture": "#0"},
                            "up": {"uv": [5, 1, 6, 2], "texture": "#0"},
                            "down": {"uv": [5, 14, 6, 15], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_2",
                        "from": [10, 1, 6],
                        "to": [11, 15, 7],
                        "faces": {
                            "north": {"uv": [11, 1, 10, 15], "texture": "#0"},
                            "east": {"uv": [10, 1, 11, 15], "texture": "#0"},
                            "south": {"uv": [10, 1, 11, 15], "texture": "#1"},
                            "west": {"uv": [10, 1, 11, 15], "texture": "#0"},
                            "up": {"uv": [10, 1, 11, 2], "texture": "#0"},
                            "down": {"uv": [10, 14, 11, 15], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_3",
                        "from": [4, 2, 6],
                        "to": [5, 14, 7],
                        "faces": {
                            "north": {"uv": [5, 2, 4, 14], "texture": "#0"},
                            "east": {"uv": [4, 2, 5, 14], "texture": "#0"},
                            "south": {"uv": [4, 2, 5, 14], "texture": "#1"},
                            "west": {"uv": [4, 2, 5, 14], "texture": "#0"},
                            "up": {"uv": [4, 2, 5, 3], "texture": "#0"},
                            "down": {"uv": [4, 13, 5, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_4",
                        "from": [11, 2, 6],
                        "to": [12, 14, 7],
                        "faces": {
                            "north": {"uv": [12, 2, 11, 14], "texture": "#0"},
                            "east": {"uv": [11, 2, 12, 14], "texture": "#0"},
                            "south": {"uv": [11, 2, 12, 14], "texture": "#1"},
                            "west": {"uv": [11, 2, 12, 14], "texture": "#0"},
                            "up": {"uv": [11, 2, 12, 3], "texture": "#0"},
                            "down": {"uv": [11, 13, 12, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_5",
                        "from": [3, 3, 6],
                        "to": [4, 13, 7],
                        "faces": {
                            "north": {"uv": [4, 3, 3, 13], "texture": "#0"},
                            "east": {"uv": [3, 3, 4, 13], "texture": "#0"},
                            "south": {"uv": [3, 3, 4, 13], "texture": "#1"},
                            "west": {"uv": [3, 3, 4, 13], "texture": "#0"},
                            "up": {"uv": [3, 3, 4, 4], "texture": "#0"},
                            "down": {"uv": [3, 12, 4, 13], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_6",
                        "from": [12, 3, 6],
                        "to": [13, 13, 7],
                        "faces": {
                            "north": {"uv": [13, 3, 12, 13], "texture": "#0"},
                            "east": {"uv": [12, 3, 13, 13], "texture": "#0"},
                            "south": {"uv": [12, 3, 13, 13], "texture": "#1"},
                            "west": {"uv": [12, 3, 13, 13], "texture": "#0"},
                            "up": {"uv": [12, 3, 13, 4], "texture": "#0"},
                            "down": {"uv": [12, 12, 13, 13], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_7",
                        "from": [2, 4, 6],
                        "to": [3, 12, 7],
                        "faces": {
                            "north": {"uv": [3, 4, 2, 12], "texture": "#0"},
                            "east": {"uv": [2, 4, 3, 12], "texture": "#0"},
                            "south": {"uv": [2, 4, 3, 12], "texture": "#1"},
                            "west": {"uv": [2, 4, 3, 12], "texture": "#0"},
                            "up": {"uv": [2, 4, 3, 5], "texture": "#0"},
                            "down": {"uv": [2, 11, 3, 12], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_8",
                        "from": [13, 4, 6],
                        "to": [14, 12, 7],
                        "faces": {
                            "north": {"uv": [14, 4, 13, 12], "texture": "#0"},
                            "east": {"uv": [13, 4, 14, 12], "texture": "#0"},
                            "south": {"uv": [13, 4, 14, 12], "texture": "#1"},
                            "west": {"uv": [13, 4, 14, 12], "texture": "#0"},
                            "up": {"uv": [13, 4, 14, 5], "texture": "#0"},
                            "down": {"uv": [13, 11, 14, 12], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_9",
                        "from": [1, 5, 6],
                        "to": [2, 11, 7],
                        "faces": {
                            "north": {"uv": [2, 5, 1, 11], "texture": "#0"},
                            "east": {"uv": [1, 5, 2, 11], "texture": "#0"},
                            "south": {"uv": [1, 5, 2, 11], "texture": "#1"},
                            "west": {"uv": [1, 5, 2, 11], "texture": "#0"},
                            "up": {"uv": [1, 5, 2, 6], "texture": "#0"},
                            "down": {"uv": [1, 10, 2, 11], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_10",
                        "from": [14, 5, 6],
                        "to": [15, 11, 7],
                        "faces": {
                            "north": {"uv": [15, 5, 14, 11], "texture": "#0"},
                            "east": {"uv": [14, 5, 15, 11], "texture": "#0"},
                            "south": {"uv": [14, 5, 15, 11], "texture": "#1"},
                            "west": {"uv": [14, 5, 15, 11], "texture": "#0"},
                            "up": {"uv": [14, 5, 15, 6], "texture": "#0"},
                            "down": {"uv": [14, 10, 15, 11], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_11",
                        "from": [0, 6, 6],
                        "to": [1, 10, 7],
                        "faces": {
                            "north": {"uv": [1, 6, 0, 10], "texture": "#0"},
                            "east": {"uv": [0, 6, 1, 10], "texture": "#0"},
                            "south": {"uv": [0, 6, 1, 10], "texture": "#1"},
                            "west": {"uv": [0, 6, 1, 10], "texture": "#0"},
                            "up": {"uv": [0, 6, 1, 7], "texture": "#0"},
                            "down": {"uv": [0, 9, 1, 10], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_12",
                        "from": [15, 6, 6],
                        "to": [16, 10, 7],
                        "faces": {
                            "north": {"uv": [16, 6, 15, 10], "texture": "#0"},
                            "east": {"uv": [15, 6, 16, 10], "texture": "#0"},
                            "south": {"uv": [15, 6, 16, 10], "texture": "#1"},
                            "west": {"uv": [15, 6, 16, 10], "texture": "#0"},
                            "up": {"uv": [15, 6, 16, 7], "texture": "#0"},
                            "down": {"uv": [15, 9, 16, 10], "texture": "#0"}
                        }
                    }
                ],
                "gui_light": "front",
                "overrides": [
                    {"predicate": {"blocking": 1}, "model": blocking_model}
                ],
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "firstperson_righthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "firstperson_lefthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier4_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
                    }
                ]
            };
            shield_blocking = {
                "credit": "Made with Blockbench",
                "textures": {
                    "0": front,
                    "1": back,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#0"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#0"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#0"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#0"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#0"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#0"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#0"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#0"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#0"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#0"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#0"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#0"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#0"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#0"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#0"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#0"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#0"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#0"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#0"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#0"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#0"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_0",
                        "from": [6, 0, 6],
                        "to": [10, 16, 7],
                        "faces": {
                            "north": {"uv": [10, 0, 6, 16], "texture": "#0"},
                            "east": {"uv": [9, 0, 10, 16], "texture": "#0"},
                            "south": {"uv": [6, 0, 10, 16], "texture": "#1"},
                            "west": {"uv": [6, 0, 7, 16], "texture": "#0"},
                            "up": {"uv": [6, 0, 10, 1], "texture": "#0"},
                            "down": {"uv": [6, 15, 10, 16], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_1",
                        "from": [5, 1, 6],
                        "to": [6, 15, 7],
                        "faces": {
                            "north": {"uv": [6, 1, 5, 15], "texture": "#0"},
                            "east": {"uv": [5, 1, 6, 15], "texture": "#0"},
                            "south": {"uv": [5, 1, 6, 15], "texture": "#1"},
                            "west": {"uv": [5, 1, 6, 15], "texture": "#0"},
                            "up": {"uv": [5, 1, 6, 2], "texture": "#0"},
                            "down": {"uv": [5, 14, 6, 15], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_2",
                        "from": [10, 1, 6],
                        "to": [11, 15, 7],
                        "faces": {
                            "north": {"uv": [11, 1, 10, 15], "texture": "#0"},
                            "east": {"uv": [10, 1, 11, 15], "texture": "#0"},
                            "south": {"uv": [10, 1, 11, 15], "texture": "#1"},
                            "west": {"uv": [10, 1, 11, 15], "texture": "#0"},
                            "up": {"uv": [10, 1, 11, 2], "texture": "#0"},
                            "down": {"uv": [10, 14, 11, 15], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_3",
                        "from": [4, 2, 6],
                        "to": [5, 14, 7],
                        "faces": {
                            "north": {"uv": [5, 2, 4, 14], "texture": "#0"},
                            "east": {"uv": [4, 2, 5, 14], "texture": "#0"},
                            "south": {"uv": [4, 2, 5, 14], "texture": "#1"},
                            "west": {"uv": [4, 2, 5, 14], "texture": "#0"},
                            "up": {"uv": [4, 2, 5, 3], "texture": "#0"},
                            "down": {"uv": [4, 13, 5, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_4",
                        "from": [11, 2, 6],
                        "to": [12, 14, 7],
                        "faces": {
                            "north": {"uv": [12, 2, 11, 14], "texture": "#0"},
                            "east": {"uv": [11, 2, 12, 14], "texture": "#0"},
                            "south": {"uv": [11, 2, 12, 14], "texture": "#1"},
                            "west": {"uv": [11, 2, 12, 14], "texture": "#0"},
                            "up": {"uv": [11, 2, 12, 3], "texture": "#0"},
                            "down": {"uv": [11, 13, 12, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_5",
                        "from": [3, 3, 6],
                        "to": [4, 13, 7],
                        "faces": {
                            "north": {"uv": [4, 3, 3, 13], "texture": "#0"},
                            "east": {"uv": [3, 3, 4, 13], "texture": "#0"},
                            "south": {"uv": [3, 3, 4, 13], "texture": "#1"},
                            "west": {"uv": [3, 3, 4, 13], "texture": "#0"},
                            "up": {"uv": [3, 3, 4, 4], "texture": "#0"},
                            "down": {"uv": [3, 12, 4, 13], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_6",
                        "from": [12, 3, 6],
                        "to": [13, 13, 7],
                        "faces": {
                            "north": {"uv": [13, 3, 12, 13], "texture": "#0"},
                            "east": {"uv": [12, 3, 13, 13], "texture": "#0"},
                            "south": {"uv": [12, 3, 13, 13], "texture": "#1"},
                            "west": {"uv": [12, 3, 13, 13], "texture": "#0"},
                            "up": {"uv": [12, 3, 13, 4], "texture": "#0"},
                            "down": {"uv": [12, 12, 13, 13], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_7",
                        "from": [2, 4, 6],
                        "to": [3, 12, 7],
                        "faces": {
                            "north": {"uv": [3, 4, 2, 12], "texture": "#0"},
                            "east": {"uv": [2, 4, 3, 12], "texture": "#0"},
                            "south": {"uv": [2, 4, 3, 12], "texture": "#1"},
                            "west": {"uv": [2, 4, 3, 12], "texture": "#0"},
                            "up": {"uv": [2, 4, 3, 5], "texture": "#0"},
                            "down": {"uv": [2, 11, 3, 12], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_8",
                        "from": [13, 4, 6],
                        "to": [14, 12, 7],
                        "faces": {
                            "north": {"uv": [14, 4, 13, 12], "texture": "#0"},
                            "east": {"uv": [13, 4, 14, 12], "texture": "#0"},
                            "south": {"uv": [13, 4, 14, 12], "texture": "#1"},
                            "west": {"uv": [13, 4, 14, 12], "texture": "#0"},
                            "up": {"uv": [13, 4, 14, 5], "texture": "#0"},
                            "down": {"uv": [13, 11, 14, 12], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_9",
                        "from": [1, 5, 6],
                        "to": [2, 11, 7],
                        "faces": {
                            "north": {"uv": [2, 5, 1, 11], "texture": "#0"},
                            "east": {"uv": [1, 5, 2, 11], "texture": "#0"},
                            "south": {"uv": [1, 5, 2, 11], "texture": "#1"},
                            "west": {"uv": [1, 5, 2, 11], "texture": "#0"},
                            "up": {"uv": [1, 5, 2, 6], "texture": "#0"},
                            "down": {"uv": [1, 10, 2, 11], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_10",
                        "from": [14, 5, 6],
                        "to": [15, 11, 7],
                        "faces": {
                            "north": {"uv": [15, 5, 14, 11], "texture": "#0"},
                            "east": {"uv": [14, 5, 15, 11], "texture": "#0"},
                            "south": {"uv": [14, 5, 15, 11], "texture": "#1"},
                            "west": {"uv": [14, 5, 15, 11], "texture": "#0"},
                            "up": {"uv": [14, 5, 15, 6], "texture": "#0"},
                            "down": {"uv": [14, 10, 15, 11], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_11",
                        "from": [0, 6, 6],
                        "to": [1, 10, 7],
                        "faces": {
                            "north": {"uv": [1, 6, 0, 10], "texture": "#0"},
                            "east": {"uv": [0, 6, 1, 10], "texture": "#0"},
                            "south": {"uv": [0, 6, 1, 10], "texture": "#1"},
                            "west": {"uv": [0, 6, 1, 10], "texture": "#0"},
                            "up": {"uv": [0, 6, 1, 7], "texture": "#0"},
                            "down": {"uv": [0, 9, 1, 10], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier4_front_12",
                        "from": [15, 6, 6],
                        "to": [16, 10, 7],
                        "faces": {
                            "north": {"uv": [16, 6, 15, 10], "texture": "#0"},
                            "east": {"uv": [15, 6, 16, 10], "texture": "#0"},
                            "south": {"uv": [15, 6, 16, 10], "texture": "#1"},
                            "west": {"uv": [15, 6, 16, 10], "texture": "#0"},
                            "up": {"uv": [15, 6, 16, 7], "texture": "#0"},
                            "down": {"uv": [15, 9, 16, 10], "texture": "#0"}
                        }
                    }
                ],
                "gui_light": "front",
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "firstperson_righthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "firstperson_lefthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier4_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
                    }
                ]
            };
        }
        else if(tier == 5) {
            shield = {
                "credit": "Made with Blockbench",
                "textures": {
                    "0": front,
                    "1": back,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#0"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#0"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#0"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#0"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#0"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#0"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#0"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#0"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#0"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#0"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#0"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#0"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#0"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#0"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#0"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#0"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#0"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#0"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#0"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#0"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#0"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_0",
                        "from": [4, 0, 6],
                        "to": [12, 16, 7],
                        "faces": {
                            "north": {"uv": [12, 0, 4, 16], "texture": "#0"},
                            "east": {"uv": [11, 0, 12, 16], "texture": "#0"},
                            "south": {"uv": [4, 0, 12, 16], "texture": "#1"},
                            "west": {"uv": [4, 0, 5, 16], "texture": "#0"},
                            "up": {"uv": [4, 0, 12, 1], "texture": "#0"},
                            "down": {"uv": [4, 15, 12, 16], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_1",
                        "from": [3, 1, 6],
                        "to": [4, 15, 7],
                        "faces": {
                            "north": {"uv": [4, 1, 3, 15], "texture": "#0"},
                            "east": {"uv": [3, 1, 4, 15], "texture": "#0"},
                            "south": {"uv": [3, 1, 4, 15], "texture": "#1"},
                            "west": {"uv": [3, 1, 4, 15], "texture": "#0"},
                            "up": {"uv": [3, 1, 4, 2], "texture": "#0"},
                            "down": {"uv": [3, 14, 4, 15], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_2",
                        "from": [12, 1, 6],
                        "to": [13, 15, 7],
                        "faces": {
                            "north": {"uv": [13, 1, 12, 15], "texture": "#0"},
                            "east": {"uv": [12, 1, 13, 15], "texture": "#0"},
                            "south": {"uv": [12, 1, 13, 15], "texture": "#1"},
                            "west": {"uv": [12, 1, 13, 15], "texture": "#0"},
                            "up": {"uv": [12, 1, 13, 2], "texture": "#0"},
                            "down": {"uv": [12, 14, 13, 15], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_3",
                        "from": [2, 2, 6],
                        "to": [3, 14, 7],
                        "faces": {
                            "north": {"uv": [3, 2, 2, 14], "texture": "#0"},
                            "east": {"uv": [2, 2, 3, 14], "texture": "#0"},
                            "south": {"uv": [2, 2, 3, 14], "texture": "#1"},
                            "west": {"uv": [2, 2, 3, 14], "texture": "#0"},
                            "up": {"uv": [2, 2, 3, 3], "texture": "#0"},
                            "down": {"uv": [2, 13, 3, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_4",
                        "from": [13, 2, 6],
                        "to": [14, 14, 7],
                        "faces": {
                            "north": {"uv": [14, 2, 13, 14], "texture": "#0"},
                            "east": {"uv": [13, 2, 14, 14], "texture": "#0"},
                            "south": {"uv": [13, 2, 14, 14], "texture": "#1"},
                            "west": {"uv": [13, 2, 14, 14], "texture": "#0"},
                            "up": {"uv": [13, 2, 14, 3], "texture": "#0"},
                            "down": {"uv": [13, 13, 14, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_5",
                        "from": [1, 3, 6],
                        "to": [2, 13, 7],
                        "faces": {
                            "north": {"uv": [2, 3, 1, 13], "texture": "#0"},
                            "east": {"uv": [1, 3, 2, 13], "texture": "#0"},
                            "south": {"uv": [1, 3, 2, 13], "texture": "#1"},
                            "west": {"uv": [1, 3, 2, 13], "texture": "#0"},
                            "up": {"uv": [1, 3, 2, 4], "texture": "#0"},
                            "down": {"uv": [1, 12, 2, 13], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_6",
                        "from": [14, 3, 6],
                        "to": [15, 13, 7],
                        "faces": {
                            "north": {"uv": [15, 3, 14, 13], "texture": "#0"},
                            "east": {"uv": [14, 3, 15, 13], "texture": "#0"},
                            "south": {"uv": [14, 3, 15, 13], "texture": "#1"},
                            "west": {"uv": [14, 3, 15, 13], "texture": "#0"},
                            "up": {"uv": [14, 3, 15, 4], "texture": "#0"},
                            "down": {"uv": [14, 12, 15, 13], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_7",
                        "from": [0, 4, 6],
                        "to": [1, 12, 7],
                        "faces": {
                            "north": {"uv": [1, 4, 0, 12], "texture": "#0"},
                            "east": {"uv": [0, 4, 1, 12], "texture": "#0"},
                            "south": {"uv": [0, 4, 1, 12], "texture": "#1"},
                            "west": {"uv": [0, 4, 1, 12], "texture": "#0"},
                            "up": {"uv": [0, 4, 1, 5], "texture": "#0"},
                            "down": {"uv": [0, 11, 1, 12], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_8",
                        "from": [15, 4, 6],
                        "to": [16, 12, 7],
                        "faces": {
                            "north": {"uv": [16, 4, 15, 12], "texture": "#0"},
                            "east": {"uv": [15, 4, 16, 12], "texture": "#0"},
                            "south": {"uv": [15, 4, 16, 12], "texture": "#1"},
                            "west": {"uv": [15, 4, 16, 12], "texture": "#0"},
                            "up": {"uv": [15, 4, 16, 5], "texture": "#0"},
                            "down": {"uv": [15, 11, 16, 12], "texture": "#0"}
                        }
                    }
                ],
                "gui_light": "front",
                "overrides": [
                    {"predicate": {"blocking": 1}, "model": blocking_model}
                ],
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "firstperson_righthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "firstperson_lefthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier5_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13]
                    }
                ]
            };
            shield_blocking = {
                "credit": "Made with Blockbench",
                "textures": {
                    "0": front,
                    "1": back,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#0"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#0"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#0"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#0"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#0"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#0"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#0"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#0"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#0"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#0"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#0"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#0"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#0"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#0"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#0"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#0"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#0"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#0"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#0"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#0"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#0"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#0"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#0"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_0",
                        "from": [4, 0, 6],
                        "to": [12, 16, 7],
                        "faces": {
                            "north": {"uv": [12, 0, 4, 16], "texture": "#0"},
                            "east": {"uv": [11, 0, 12, 16], "texture": "#0"},
                            "south": {"uv": [4, 0, 12, 16], "texture": "#1"},
                            "west": {"uv": [4, 0, 5, 16], "texture": "#0"},
                            "up": {"uv": [4, 0, 12, 1], "texture": "#0"},
                            "down": {"uv": [4, 15, 12, 16], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_1",
                        "from": [3, 1, 6],
                        "to": [4, 15, 7],
                        "faces": {
                            "north": {"uv": [4, 1, 3, 15], "texture": "#0"},
                            "east": {"uv": [3, 1, 4, 15], "texture": "#0"},
                            "south": {"uv": [3, 1, 4, 15], "texture": "#1"},
                            "west": {"uv": [3, 1, 4, 15], "texture": "#0"},
                            "up": {"uv": [3, 1, 4, 2], "texture": "#0"},
                            "down": {"uv": [3, 14, 4, 15], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_2",
                        "from": [12, 1, 6],
                        "to": [13, 15, 7],
                        "faces": {
                            "north": {"uv": [13, 1, 12, 15], "texture": "#0"},
                            "east": {"uv": [12, 1, 13, 15], "texture": "#0"},
                            "south": {"uv": [12, 1, 13, 15], "texture": "#1"},
                            "west": {"uv": [12, 1, 13, 15], "texture": "#0"},
                            "up": {"uv": [12, 1, 13, 2], "texture": "#0"},
                            "down": {"uv": [12, 14, 13, 15], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_3",
                        "from": [2, 2, 6],
                        "to": [3, 14, 7],
                        "faces": {
                            "north": {"uv": [3, 2, 2, 14], "texture": "#0"},
                            "east": {"uv": [2, 2, 3, 14], "texture": "#0"},
                            "south": {"uv": [2, 2, 3, 14], "texture": "#1"},
                            "west": {"uv": [2, 2, 3, 14], "texture": "#0"},
                            "up": {"uv": [2, 2, 3, 3], "texture": "#0"},
                            "down": {"uv": [2, 13, 3, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_4",
                        "from": [13, 2, 6],
                        "to": [14, 14, 7],
                        "faces": {
                            "north": {"uv": [14, 2, 13, 14], "texture": "#0"},
                            "east": {"uv": [13, 2, 14, 14], "texture": "#0"},
                            "south": {"uv": [13, 2, 14, 14], "texture": "#1"},
                            "west": {"uv": [13, 2, 14, 14], "texture": "#0"},
                            "up": {"uv": [13, 2, 14, 3], "texture": "#0"},
                            "down": {"uv": [13, 13, 14, 14], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_5",
                        "from": [1, 3, 6],
                        "to": [2, 13, 7],
                        "faces": {
                            "north": {"uv": [2, 3, 1, 13], "texture": "#0"},
                            "east": {"uv": [1, 3, 2, 13], "texture": "#0"},
                            "south": {"uv": [1, 3, 2, 13], "texture": "#1"},
                            "west": {"uv": [1, 3, 2, 13], "texture": "#0"},
                            "up": {"uv": [1, 3, 2, 4], "texture": "#0"},
                            "down": {"uv": [1, 12, 2, 13], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_6",
                        "from": [14, 3, 6],
                        "to": [15, 13, 7],
                        "faces": {
                            "north": {"uv": [15, 3, 14, 13], "texture": "#0"},
                            "east": {"uv": [14, 3, 15, 13], "texture": "#0"},
                            "south": {"uv": [14, 3, 15, 13], "texture": "#1"},
                            "west": {"uv": [14, 3, 15, 13], "texture": "#0"},
                            "up": {"uv": [14, 3, 15, 4], "texture": "#0"},
                            "down": {"uv": [14, 12, 15, 13], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_7",
                        "from": [0, 4, 6],
                        "to": [1, 12, 7],
                        "faces": {
                            "north": {"uv": [1, 4, 0, 12], "texture": "#0"},
                            "east": {"uv": [0, 4, 1, 12], "texture": "#0"},
                            "south": {"uv": [0, 4, 1, 12], "texture": "#1"},
                            "west": {"uv": [0, 4, 1, 12], "texture": "#0"},
                            "up": {"uv": [0, 4, 1, 5], "texture": "#0"},
                            "down": {"uv": [0, 11, 1, 12], "texture": "#0"}
                        }
                    },
                    {
                        "name": "tier5_front_8",
                        "from": [15, 4, 6],
                        "to": [16, 12, 7],
                        "faces": {
                            "north": {"uv": [16, 4, 15, 12], "texture": "#0"},
                            "east": {"uv": [15, 4, 16, 12], "texture": "#0"},
                            "south": {"uv": [15, 4, 16, 12], "texture": "#1"},
                            "west": {"uv": [15, 4, 16, 12], "texture": "#0"},
                            "up": {"uv": [15, 4, 16, 5], "texture": "#0"},
                            "down": {"uv": [15, 11, 16, 12], "texture": "#0"}
                        }
                    }
                ],
                "gui_light": "front",
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "firstperson_righthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "firstperson_lefthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier5_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13]
                    }
                ]
            };
        }
        else if(tier == 6) {
            shield = {
                "credit": "Made with Blockbench",
                "textures": {
                    "1": back,
                    "2": front,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#2"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#2"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#2"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#2"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#2"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#2"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#2"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#2"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#2"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#2"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#2"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#2"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#2"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#2"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#2"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#2"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#2"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#2"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#2"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#2"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#2"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_0",
                        "from": [5, 0, 6],
                        "to": [11, 16, 7],
                        "faces": {
                            "north": {"uv": [11, 0, 5, 16], "texture": "#2"},
                            "east": {"uv": [10, 0, 11, 16], "texture": "#2"},
                            "south": {"uv": [5, 0, 11, 16], "texture": "#1"},
                            "west": {"uv": [5, 0, 6, 16], "texture": "#2"},
                            "up": {"uv": [5, 0, 11, 1], "texture": "#2"},
                            "down": {"uv": [5, 15, 11, 16], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_1",
                        "from": [3, 1, 6],
                        "to": [5, 15, 7],
                        "faces": {
                            "north": {"uv": [5, 1, 3, 15], "texture": "#2"},
                            "east": {"uv": [4, 1, 5, 15], "texture": "#2"},
                            "south": {"uv": [3, 1, 5, 15], "texture": "#1"},
                            "west": {"uv": [3, 1, 4, 15], "texture": "#2"},
                            "up": {"uv": [3, 1, 5, 2], "texture": "#2"},
                            "down": {"uv": [3, 14, 5, 15], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_2",
                        "from": [11, 1, 6],
                        "to": [13, 15, 7],
                        "faces": {
                            "north": {"uv": [13, 1, 11, 15], "texture": "#2"},
                            "east": {"uv": [12, 1, 13, 15], "texture": "#2"},
                            "south": {"uv": [11, 1, 13, 15], "texture": "#1"},
                            "west": {"uv": [11, 1, 12, 15], "texture": "#2"},
                            "up": {"uv": [11, 1, 13, 2], "texture": "#2"},
                            "down": {"uv": [11, 14, 13, 15], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_3",
                        "from": [2, 2, 6],
                        "to": [3, 14, 7],
                        "faces": {
                            "north": {"uv": [3, 2, 2, 14], "texture": "#2"},
                            "east": {"uv": [2, 2, 3, 14], "texture": "#2"},
                            "south": {"uv": [2, 2, 3, 14], "texture": "#1"},
                            "west": {"uv": [2, 2, 3, 14], "texture": "#2"},
                            "up": {"uv": [2, 2, 3, 3], "texture": "#2"},
                            "down": {"uv": [2, 13, 3, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_4",
                        "from": [13, 2, 6],
                        "to": [14, 14, 7],
                        "faces": {
                            "north": {"uv": [14, 2, 13, 14], "texture": "#2"},
                            "east": {"uv": [13, 2, 14, 14], "texture": "#2"},
                            "south": {"uv": [13, 2, 14, 14], "texture": "#1"},
                            "west": {"uv": [13, 2, 14, 14], "texture": "#2"},
                            "up": {"uv": [13, 2, 14, 3], "texture": "#2"},
                            "down": {"uv": [13, 13, 14, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_5",
                        "from": [1, 3, 6],
                        "to": [2, 13, 7],
                        "faces": {
                            "north": {"uv": [2, 3, 1, 13], "texture": "#2"},
                            "east": {"uv": [1, 3, 2, 13], "texture": "#2"},
                            "south": {"uv": [1, 3, 2, 13], "texture": "#1"},
                            "west": {"uv": [1, 3, 2, 13], "texture": "#2"},
                            "up": {"uv": [1, 3, 2, 4], "texture": "#2"},
                            "down": {"uv": [1, 12, 2, 13], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_6",
                        "from": [14, 3, 6],
                        "to": [15, 13, 7],
                        "faces": {
                            "north": {"uv": [15, 3, 14, 13], "texture": "#2"},
                            "east": {"uv": [14, 3, 15, 13], "texture": "#2"},
                            "south": {"uv": [14, 3, 15, 13], "texture": "#1"},
                            "west": {"uv": [14, 3, 15, 13], "texture": "#2"},
                            "up": {"uv": [14, 3, 15, 4], "texture": "#2"},
                            "down": {"uv": [14, 12, 15, 13], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_7",
                        "from": [0, 5, 6],
                        "to": [1, 11, 7],
                        "faces": {
                            "north": {"uv": [1, 5, 0, 11], "texture": "#2"},
                            "east": {"uv": [0, 5, 1, 11], "texture": "#2"},
                            "south": {"uv": [0, 5, 1, 11], "texture": "#1"},
                            "west": {"uv": [0, 5, 1, 11], "texture": "#2"},
                            "up": {"uv": [0, 5, 1, 6], "texture": "#2"},
                            "down": {"uv": [0, 10, 1, 11], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_8",
                        "from": [15, 5, 6],
                        "to": [16, 11, 7],
                        "faces": {
                            "north": {"uv": [16, 5, 15, 11], "texture": "#2"},
                            "east": {"uv": [15, 5, 16, 11], "texture": "#2"},
                            "south": {"uv": [15, 5, 16, 11], "texture": "#1"},
                            "west": {"uv": [15, 5, 16, 11], "texture": "#2"},
                            "up": {"uv": [15, 5, 16, 6], "texture": "#2"},
                            "down": {"uv": [15, 10, 16, 11], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_109",
                        "from": [5, 7, 5],
                        "to": [6, 8, 6],
                        "faces": {
                            "north": {"uv": [6, 8, 5, 9], "texture": "#2"},
                            "east": {"uv": [5, 8, 6, 9], "texture": "#2"},
                            "south": {"uv": [5, 8, 6, 9], "texture": "#2"},
                            "west": {"uv": [5, 8, 6, 9], "texture": "#2"},
                            "up": {"uv": [5, 8, 6, 9], "texture": "#2"},
                            "down": {"uv": [5, 8, 6, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_93",
                        "from": [5, 8, 5],
                        "to": [6, 9, 6],
                        "faces": {
                            "north": {"uv": [6, 7, 5, 8], "texture": "#2"},
                            "east": {"uv": [5, 7, 6, 8], "texture": "#2"},
                            "south": {"uv": [5, 7, 6, 8], "texture": "#2"},
                            "west": {"uv": [5, 7, 6, 8], "texture": "#2"},
                            "up": {"uv": [5, 7, 6, 8], "texture": "#2"},
                            "down": {"uv": [5, 7, 6, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_78",
                        "from": [6, 9, 5],
                        "to": [7, 10, 6],
                        "faces": {
                            "north": {"uv": [7, 6, 6, 7], "texture": "#2"},
                            "east": {"uv": [6, 6, 7, 7], "texture": "#2"},
                            "south": {"uv": [6, 6, 7, 7], "texture": "#2"},
                            "west": {"uv": [6, 6, 7, 7], "texture": "#2"},
                            "up": {"uv": [6, 6, 7, 7], "texture": "#2"},
                            "down": {"uv": [6, 6, 7, 7], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_63",
                        "from": [7, 10, 5],
                        "to": [8, 11, 6],
                        "faces": {
                            "north": {"uv": [8, 5, 7, 6], "texture": "#2"},
                            "east": {"uv": [7, 5, 8, 6], "texture": "#2"},
                            "south": {"uv": [7, 5, 8, 6], "texture": "#2"},
                            "west": {"uv": [7, 5, 8, 6], "texture": "#2"},
                            "up": {"uv": [7, 5, 8, 6], "texture": "#2"},
                            "down": {"uv": [7, 5, 8, 6], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_64",
                        "from": [8, 10, 5],
                        "to": [9, 11, 6],
                        "faces": {
                            "north": {"uv": [9, 5, 8, 6], "texture": "#2"},
                            "east": {"uv": [8, 5, 9, 6], "texture": "#2"},
                            "south": {"uv": [8, 5, 9, 6], "texture": "#2"},
                            "west": {"uv": [8, 5, 9, 6], "texture": "#2"},
                            "up": {"uv": [8, 5, 9, 6], "texture": "#2"},
                            "down": {"uv": [8, 5, 9, 6], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_81",
                        "from": [9, 9, 5],
                        "to": [10, 10, 6],
                        "faces": {
                            "north": {"uv": [10, 6, 9, 7], "texture": "#2"},
                            "east": {"uv": [9, 6, 10, 7], "texture": "#2"},
                            "south": {"uv": [9, 6, 10, 7], "texture": "#2"},
                            "west": {"uv": [9, 6, 10, 7], "texture": "#2"},
                            "up": {"uv": [9, 6, 10, 7], "texture": "#2"},
                            "down": {"uv": [9, 6, 10, 7], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_98",
                        "from": [10, 8, 5],
                        "to": [11, 9, 6],
                        "faces": {
                            "north": {"uv": [11, 7, 10, 8], "texture": "#2"},
                            "east": {"uv": [10, 7, 11, 8], "texture": "#2"},
                            "south": {"uv": [10, 7, 11, 8], "texture": "#2"},
                            "west": {"uv": [10, 7, 11, 8], "texture": "#2"},
                            "up": {"uv": [10, 7, 11, 8], "texture": "#2"},
                            "down": {"uv": [10, 7, 11, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_114",
                        "from": [10, 7, 5],
                        "to": [11, 8, 6],
                        "faces": {
                            "north": {"uv": [11, 8, 10, 9], "texture": "#2"},
                            "east": {"uv": [10, 8, 11, 9], "texture": "#2"},
                            "south": {"uv": [10, 8, 11, 9], "texture": "#2"},
                            "west": {"uv": [10, 8, 11, 9], "texture": "#2"},
                            "up": {"uv": [10, 8, 11, 9], "texture": "#2"},
                            "down": {"uv": [10, 8, 11, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_129",
                        "from": [9, 6, 5],
                        "to": [10, 7, 6],
                        "faces": {
                            "north": {"uv": [10, 9, 9, 10], "texture": "#2"},
                            "east": {"uv": [9, 9, 10, 10], "texture": "#2"},
                            "south": {"uv": [9, 9, 10, 10], "texture": "#2"},
                            "west": {"uv": [9, 9, 10, 10], "texture": "#2"},
                            "up": {"uv": [9, 9, 10, 10], "texture": "#2"},
                            "down": {"uv": [9, 9, 10, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_144",
                        "from": [8, 5, 5],
                        "to": [9, 6, 6],
                        "faces": {
                            "north": {"uv": [9, 10, 8, 11], "texture": "#2"},
                            "east": {"uv": [8, 10, 9, 11], "texture": "#2"},
                            "south": {"uv": [8, 10, 9, 11], "texture": "#2"},
                            "west": {"uv": [8, 10, 9, 11], "texture": "#2"},
                            "up": {"uv": [8, 10, 9, 11], "texture": "#2"},
                            "down": {"uv": [8, 10, 9, 11], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_143",
                        "from": [7, 5, 5],
                        "to": [8, 6, 6],
                        "faces": {
                            "north": {"uv": [8, 10, 7, 11], "texture": "#2"},
                            "east": {"uv": [7, 10, 8, 11], "texture": "#2"},
                            "south": {"uv": [7, 10, 8, 11], "texture": "#2"},
                            "west": {"uv": [7, 10, 8, 11], "texture": "#2"},
                            "up": {"uv": [7, 10, 8, 11], "texture": "#2"},
                            "down": {"uv": [7, 10, 8, 11], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_126",
                        "from": [6, 6, 5],
                        "to": [7, 7, 6],
                        "faces": {
                            "north": {"uv": [7, 9, 6, 10], "texture": "#2"},
                            "east": {"uv": [6, 9, 7, 10], "texture": "#2"},
                            "south": {"uv": [6, 9, 7, 10], "texture": "#2"},
                            "west": {"uv": [6, 9, 7, 10], "texture": "#2"},
                            "up": {"uv": [6, 9, 7, 10], "texture": "#2"},
                            "down": {"uv": [6, 9, 7, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_127",
                        "from": [7, 6, 4],
                        "to": [8, 7, 5],
                        "faces": {
                            "north": {"uv": [8, 9, 7, 10], "texture": "#2"},
                            "east": {"uv": [7, 9, 8, 10], "texture": "#2"},
                            "south": {"uv": [7, 9, 8, 10], "texture": "#2"},
                            "west": {"uv": [7, 9, 8, 10], "texture": "#2"},
                            "up": {"uv": [7, 9, 8, 10], "texture": "#2"},
                            "down": {"uv": [7, 9, 8, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_128",
                        "from": [8, 6, 4],
                        "to": [9, 7, 5],
                        "faces": {
                            "north": {"uv": [9, 9, 8, 10], "texture": "#2"},
                            "east": {"uv": [8, 9, 9, 10], "texture": "#2"},
                            "south": {"uv": [8, 9, 9, 10], "texture": "#2"},
                            "west": {"uv": [8, 9, 9, 10], "texture": "#2"},
                            "up": {"uv": [8, 9, 9, 10], "texture": "#2"},
                            "down": {"uv": [8, 9, 9, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_113",
                        "from": [9, 7, 4],
                        "to": [10, 8, 5],
                        "faces": {
                            "north": {"uv": [10, 8, 9, 9], "texture": "#2"},
                            "east": {"uv": [9, 8, 10, 9], "texture": "#2"},
                            "south": {"uv": [9, 8, 10, 9], "texture": "#2"},
                            "west": {"uv": [9, 8, 10, 9], "texture": "#2"},
                            "up": {"uv": [9, 8, 10, 9], "texture": "#2"},
                            "down": {"uv": [9, 8, 10, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_112",
                        "from": [8, 7, 4],
                        "to": [9, 8, 5],
                        "faces": {
                            "north": {"uv": [9, 8, 8, 9], "texture": "#2"},
                            "east": {"uv": [8, 8, 9, 9], "texture": "#2"},
                            "south": {"uv": [8, 8, 9, 9], "texture": "#2"},
                            "west": {"uv": [8, 8, 9, 9], "texture": "#2"},
                            "up": {"uv": [8, 8, 9, 9], "texture": "#2"},
                            "down": {"uv": [8, 8, 9, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_111",
                        "from": [7, 7, 4],
                        "to": [8, 8, 5],
                        "faces": {
                            "north": {"uv": [8, 8, 7, 9], "texture": "#2"},
                            "east": {"uv": [7, 8, 8, 9], "texture": "#2"},
                            "south": {"uv": [7, 8, 8, 9], "texture": "#2"},
                            "west": {"uv": [7, 8, 8, 9], "texture": "#2"},
                            "up": {"uv": [7, 8, 8, 9], "texture": "#2"},
                            "down": {"uv": [7, 8, 8, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_110",
                        "from": [6, 7, 4],
                        "to": [7, 8, 5],
                        "faces": {
                            "north": {"uv": [7, 8, 6, 9], "texture": "#2"},
                            "east": {"uv": [6, 8, 7, 9], "texture": "#2"},
                            "south": {"uv": [6, 8, 7, 9], "texture": "#2"},
                            "west": {"uv": [6, 8, 7, 9], "texture": "#2"},
                            "up": {"uv": [6, 8, 7, 9], "texture": "#2"},
                            "down": {"uv": [6, 8, 7, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_94",
                        "from": [6, 8, 4],
                        "to": [7, 9, 5],
                        "faces": {
                            "north": {"uv": [7, 7, 6, 8], "texture": "#2"},
                            "east": {"uv": [6, 7, 7, 8], "texture": "#2"},
                            "south": {"uv": [6, 7, 7, 8], "texture": "#2"},
                            "west": {"uv": [6, 7, 7, 8], "texture": "#2"},
                            "up": {"uv": [6, 7, 7, 8], "texture": "#2"},
                            "down": {"uv": [6, 7, 7, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_80",
                        "from": [8, 9, 4],
                        "to": [9, 10, 5],
                        "faces": {
                            "north": {"uv": [9, 6, 8, 7], "texture": "#2"},
                            "east": {"uv": [8, 6, 9, 7], "texture": "#2"},
                            "south": {"uv": [8, 6, 9, 7], "texture": "#2"},
                            "west": {"uv": [8, 6, 9, 7], "texture": "#2"},
                            "up": {"uv": [8, 6, 9, 7], "texture": "#2"},
                            "down": {"uv": [8, 6, 9, 7], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_79",
                        "from": [7, 9, 4],
                        "to": [8, 10, 5],
                        "faces": {
                            "north": {"uv": [8, 6, 7, 7], "texture": "#2"},
                            "east": {"uv": [7, 6, 8, 7], "texture": "#2"},
                            "south": {"uv": [7, 6, 8, 7], "texture": "#2"},
                            "west": {"uv": [7, 6, 8, 7], "texture": "#2"},
                            "up": {"uv": [7, 6, 8, 7], "texture": "#2"},
                            "down": {"uv": [7, 6, 8, 7], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_95",
                        "from": [7, 8, 4],
                        "to": [8, 9, 5],
                        "faces": {
                            "north": {"uv": [8, 7, 7, 8], "texture": "#2"},
                            "east": {"uv": [7, 7, 8, 8], "texture": "#2"},
                            "south": {"uv": [7, 7, 8, 8], "texture": "#2"},
                            "west": {"uv": [7, 7, 8, 8], "texture": "#2"},
                            "up": {"uv": [7, 7, 8, 8], "texture": "#2"},
                            "down": {"uv": [7, 7, 8, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_96",
                        "from": [8, 8, 4],
                        "to": [9, 9, 5],
                        "faces": {
                            "north": {"uv": [9, 7, 8, 8], "texture": "#2"},
                            "east": {"uv": [8, 7, 9, 8], "texture": "#2"},
                            "south": {"uv": [8, 7, 9, 8], "texture": "#2"},
                            "west": {"uv": [8, 7, 9, 8], "texture": "#2"},
                            "up": {"uv": [8, 7, 9, 8], "texture": "#2"},
                            "down": {"uv": [8, 7, 9, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_97",
                        "from": [9, 8, 4],
                        "to": [10, 9, 5],
                        "faces": {
                            "north": {"uv": [10, 7, 9, 8], "texture": "#2"},
                            "east": {"uv": [9, 7, 10, 8], "texture": "#2"},
                            "south": {"uv": [9, 7, 10, 8], "texture": "#2"},
                            "west": {"uv": [9, 7, 10, 8], "texture": "#2"},
                            "up": {"uv": [9, 7, 10, 8], "texture": "#2"},
                            "down": {"uv": [9, 7, 10, 8], "texture": "#2"}
                        }
                    }
                ],
                "gui_light": "front",
                "overrides": [
                    {"predicate": {"blocking": 1}, "model": blocking_model}
                ],
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [0, -90, 0],
                        "translation": [2.3, -2, 5]
                    },
                    "firstperson_righthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "firstperson_lefthand": {
                        "rotation": [0, -75, 15],
                        "translation": [4, -3, 0]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier6_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]
                    }
                ]
            };
            shield_blocking = {
                "credit": "Made with Blockbench",
                "textures": {
                    "1": back,
                    "2": front,
                    "particle": front
                },
                "elements": [
                    {
                        "from": [7, 10, 8],
                        "to": [8, 11, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "south": {"uv": [13, 6, 14, 7], "texture": "#2"},
                            "west": {"uv": [5, 12, 10, 13], "texture": "#2"},
                            "up": {"uv": [12, 5, 13, 10], "texture": "#2"},
                            "down": {"uv": [12, 6, 13, 11], "texture": "#2"}
                        }
                    },
                    {
                        "from": [7, 6, 12],
                        "to": [8, 10, 13],
                        "faces": {
                            "north": {"uv": [2, 6, 3, 10], "texture": "#2"},
                            "east": {"uv": [6, 2, 10, 3], "rotation": 90, "texture": "#2"},
                            "south": {"uv": [13, 6, 14, 10], "texture": "#2"},
                            "west": {"uv": [6, 13, 10, 14], "rotation": 90, "texture": "#2"},
                            "up": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "down": {"uv": [0, 0, 0, 0], "texture": "#2"}
                        }
                    },
                    {
                        "from": [7, 5, 8],
                        "to": [8, 6, 13],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "south": {"uv": [6, 2, 7, 3], "texture": "#2"},
                            "west": {"uv": [6, 3, 11, 4], "texture": "#2"},
                            "up": {"uv": [12, 6, 13, 11], "texture": "#2"},
                            "down": {"uv": [3, 6, 4, 11], "texture": "#2"}
                        }
                    },
                    {
                        "from": [6, 5, 7],
                        "to": [9, 6, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [4, 3, 5, 4], "texture": "#2"},
                            "south": {"uv": [6, 13, 9, 14], "texture": "#2"},
                            "west": {"uv": [13, 7, 14, 8], "texture": "#2"},
                            "up": {"uv": [6, 2, 9, 3], "texture": "#2"},
                            "down": {"uv": [6, 2, 9, 3], "texture": "#2"}
                        }
                    },
                    {
                        "from": [6, 10, 7],
                        "to": [9, 11, 8],
                        "faces": {
                            "north": {"uv": [0, 0, 0, 0], "texture": "#2"},
                            "east": {"uv": [5, 3, 6, 4], "texture": "#2"},
                            "south": {"uv": [6, 2, 9, 3], "texture": "#2"},
                            "west": {"uv": [4, 3, 5, 4], "texture": "#2"},
                            "up": {"uv": [7, 2, 10, 3], "texture": "#2"},
                            "down": {"uv": [7, 13, 10, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_0",
                        "from": [5, 0, 6],
                        "to": [11, 16, 7],
                        "faces": {
                            "north": {"uv": [11, 0, 5, 16], "texture": "#2"},
                            "east": {"uv": [10, 0, 11, 16], "texture": "#2"},
                            "south": {"uv": [5, 0, 11, 16], "texture": "#1"},
                            "west": {"uv": [5, 0, 6, 16], "texture": "#2"},
                            "up": {"uv": [5, 0, 11, 1], "texture": "#2"},
                            "down": {"uv": [5, 15, 11, 16], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_1",
                        "from": [3, 1, 6],
                        "to": [5, 15, 7],
                        "faces": {
                            "north": {"uv": [5, 1, 3, 15], "texture": "#2"},
                            "east": {"uv": [4, 1, 5, 15], "texture": "#2"},
                            "south": {"uv": [3, 1, 5, 15], "texture": "#1"},
                            "west": {"uv": [3, 1, 4, 15], "texture": "#2"},
                            "up": {"uv": [3, 1, 5, 2], "texture": "#2"},
                            "down": {"uv": [3, 14, 5, 15], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_2",
                        "from": [11, 1, 6],
                        "to": [13, 15, 7],
                        "faces": {
                            "north": {"uv": [13, 1, 11, 15], "texture": "#2"},
                            "east": {"uv": [12, 1, 13, 15], "texture": "#2"},
                            "south": {"uv": [11, 1, 13, 15], "texture": "#1"},
                            "west": {"uv": [11, 1, 12, 15], "texture": "#2"},
                            "up": {"uv": [11, 1, 13, 2], "texture": "#2"},
                            "down": {"uv": [11, 14, 13, 15], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_3",
                        "from": [2, 2, 6],
                        "to": [3, 14, 7],
                        "faces": {
                            "north": {"uv": [3, 2, 2, 14], "texture": "#2"},
                            "east": {"uv": [2, 2, 3, 14], "texture": "#2"},
                            "south": {"uv": [2, 2, 3, 14], "texture": "#1"},
                            "west": {"uv": [2, 2, 3, 14], "texture": "#2"},
                            "up": {"uv": [2, 2, 3, 3], "texture": "#2"},
                            "down": {"uv": [2, 13, 3, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_4",
                        "from": [13, 2, 6],
                        "to": [14, 14, 7],
                        "faces": {
                            "north": {"uv": [14, 2, 13, 14], "texture": "#2"},
                            "east": {"uv": [13, 2, 14, 14], "texture": "#2"},
                            "south": {"uv": [13, 2, 14, 14], "texture": "#1"},
                            "west": {"uv": [13, 2, 14, 14], "texture": "#2"},
                            "up": {"uv": [13, 2, 14, 3], "texture": "#2"},
                            "down": {"uv": [13, 13, 14, 14], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_5",
                        "from": [1, 3, 6],
                        "to": [2, 13, 7],
                        "faces": {
                            "north": {"uv": [2, 3, 1, 13], "texture": "#2"},
                            "east": {"uv": [1, 3, 2, 13], "texture": "#2"},
                            "south": {"uv": [1, 3, 2, 13], "texture": "#1"},
                            "west": {"uv": [1, 3, 2, 13], "texture": "#2"},
                            "up": {"uv": [1, 3, 2, 4], "texture": "#2"},
                            "down": {"uv": [1, 12, 2, 13], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_6",
                        "from": [14, 3, 6],
                        "to": [15, 13, 7],
                        "faces": {
                            "north": {"uv": [15, 3, 14, 13], "texture": "#2"},
                            "east": {"uv": [14, 3, 15, 13], "texture": "#2"},
                            "south": {"uv": [14, 3, 15, 13], "texture": "#1"},
                            "west": {"uv": [14, 3, 15, 13], "texture": "#2"},
                            "up": {"uv": [14, 3, 15, 4], "texture": "#2"},
                            "down": {"uv": [14, 12, 15, 13], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_7",
                        "from": [0, 5, 6],
                        "to": [1, 11, 7],
                        "faces": {
                            "north": {"uv": [1, 5, 0, 11], "texture": "#2"},
                            "east": {"uv": [0, 5, 1, 11], "texture": "#2"},
                            "south": {"uv": [0, 5, 1, 11], "texture": "#1"},
                            "west": {"uv": [0, 5, 1, 11], "texture": "#2"},
                            "up": {"uv": [0, 5, 1, 6], "texture": "#2"},
                            "down": {"uv": [0, 10, 1, 11], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_8",
                        "from": [15, 5, 6],
                        "to": [16, 11, 7],
                        "faces": {
                            "north": {"uv": [16, 5, 15, 11], "texture": "#2"},
                            "east": {"uv": [15, 5, 16, 11], "texture": "#2"},
                            "south": {"uv": [15, 5, 16, 11], "texture": "#1"},
                            "west": {"uv": [15, 5, 16, 11], "texture": "#2"},
                            "up": {"uv": [15, 5, 16, 6], "texture": "#2"},
                            "down": {"uv": [15, 10, 16, 11], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_109",
                        "from": [5, 7, 5],
                        "to": [6, 8, 6],
                        "faces": {
                            "north": {"uv": [6, 8, 5, 9], "texture": "#2"},
                            "east": {"uv": [5, 8, 6, 9], "texture": "#2"},
                            "south": {"uv": [5, 8, 6, 9], "texture": "#2"},
                            "west": {"uv": [5, 8, 6, 9], "texture": "#2"},
                            "up": {"uv": [5, 8, 6, 9], "texture": "#2"},
                            "down": {"uv": [5, 8, 6, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_93",
                        "from": [5, 8, 5],
                        "to": [6, 9, 6],
                        "faces": {
                            "north": {"uv": [6, 7, 5, 8], "texture": "#2"},
                            "east": {"uv": [5, 7, 6, 8], "texture": "#2"},
                            "south": {"uv": [5, 7, 6, 8], "texture": "#2"},
                            "west": {"uv": [5, 7, 6, 8], "texture": "#2"},
                            "up": {"uv": [5, 7, 6, 8], "texture": "#2"},
                            "down": {"uv": [5, 7, 6, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_78",
                        "from": [6, 9, 5],
                        "to": [7, 10, 6],
                        "faces": {
                            "north": {"uv": [7, 6, 6, 7], "texture": "#2"},
                            "east": {"uv": [6, 6, 7, 7], "texture": "#2"},
                            "south": {"uv": [6, 6, 7, 7], "texture": "#2"},
                            "west": {"uv": [6, 6, 7, 7], "texture": "#2"},
                            "up": {"uv": [6, 6, 7, 7], "texture": "#2"},
                            "down": {"uv": [6, 6, 7, 7], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_63",
                        "from": [7, 10, 5],
                        "to": [8, 11, 6],
                        "faces": {
                            "north": {"uv": [8, 5, 7, 6], "texture": "#2"},
                            "east": {"uv": [7, 5, 8, 6], "texture": "#2"},
                            "south": {"uv": [7, 5, 8, 6], "texture": "#2"},
                            "west": {"uv": [7, 5, 8, 6], "texture": "#2"},
                            "up": {"uv": [7, 5, 8, 6], "texture": "#2"},
                            "down": {"uv": [7, 5, 8, 6], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_64",
                        "from": [8, 10, 5],
                        "to": [9, 11, 6],
                        "faces": {
                            "north": {"uv": [9, 5, 8, 6], "texture": "#2"},
                            "east": {"uv": [8, 5, 9, 6], "texture": "#2"},
                            "south": {"uv": [8, 5, 9, 6], "texture": "#2"},
                            "west": {"uv": [8, 5, 9, 6], "texture": "#2"},
                            "up": {"uv": [8, 5, 9, 6], "texture": "#2"},
                            "down": {"uv": [8, 5, 9, 6], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_81",
                        "from": [9, 9, 5],
                        "to": [10, 10, 6],
                        "faces": {
                            "north": {"uv": [10, 6, 9, 7], "texture": "#2"},
                            "east": {"uv": [9, 6, 10, 7], "texture": "#2"},
                            "south": {"uv": [9, 6, 10, 7], "texture": "#2"},
                            "west": {"uv": [9, 6, 10, 7], "texture": "#2"},
                            "up": {"uv": [9, 6, 10, 7], "texture": "#2"},
                            "down": {"uv": [9, 6, 10, 7], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_98",
                        "from": [10, 8, 5],
                        "to": [11, 9, 6],
                        "faces": {
                            "north": {"uv": [11, 7, 10, 8], "texture": "#2"},
                            "east": {"uv": [10, 7, 11, 8], "texture": "#2"},
                            "south": {"uv": [10, 7, 11, 8], "texture": "#2"},
                            "west": {"uv": [10, 7, 11, 8], "texture": "#2"},
                            "up": {"uv": [10, 7, 11, 8], "texture": "#2"},
                            "down": {"uv": [10, 7, 11, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_114",
                        "from": [10, 7, 5],
                        "to": [11, 8, 6],
                        "faces": {
                            "north": {"uv": [11, 8, 10, 9], "texture": "#2"},
                            "east": {"uv": [10, 8, 11, 9], "texture": "#2"},
                            "south": {"uv": [10, 8, 11, 9], "texture": "#2"},
                            "west": {"uv": [10, 8, 11, 9], "texture": "#2"},
                            "up": {"uv": [10, 8, 11, 9], "texture": "#2"},
                            "down": {"uv": [10, 8, 11, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_129",
                        "from": [9, 6, 5],
                        "to": [10, 7, 6],
                        "faces": {
                            "north": {"uv": [10, 9, 9, 10], "texture": "#2"},
                            "east": {"uv": [9, 9, 10, 10], "texture": "#2"},
                            "south": {"uv": [9, 9, 10, 10], "texture": "#2"},
                            "west": {"uv": [9, 9, 10, 10], "texture": "#2"},
                            "up": {"uv": [9, 9, 10, 10], "texture": "#2"},
                            "down": {"uv": [9, 9, 10, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_144",
                        "from": [8, 5, 5],
                        "to": [9, 6, 6],
                        "faces": {
                            "north": {"uv": [9, 10, 8, 11], "texture": "#2"},
                            "east": {"uv": [8, 10, 9, 11], "texture": "#2"},
                            "south": {"uv": [8, 10, 9, 11], "texture": "#2"},
                            "west": {"uv": [8, 10, 9, 11], "texture": "#2"},
                            "up": {"uv": [8, 10, 9, 11], "texture": "#2"},
                            "down": {"uv": [8, 10, 9, 11], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_143",
                        "from": [7, 5, 5],
                        "to": [8, 6, 6],
                        "faces": {
                            "north": {"uv": [8, 10, 7, 11], "texture": "#2"},
                            "east": {"uv": [7, 10, 8, 11], "texture": "#2"},
                            "south": {"uv": [7, 10, 8, 11], "texture": "#2"},
                            "west": {"uv": [7, 10, 8, 11], "texture": "#2"},
                            "up": {"uv": [7, 10, 8, 11], "texture": "#2"},
                            "down": {"uv": [7, 10, 8, 11], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_126",
                        "from": [6, 6, 5],
                        "to": [7, 7, 6],
                        "faces": {
                            "north": {"uv": [7, 9, 6, 10], "texture": "#2"},
                            "east": {"uv": [6, 9, 7, 10], "texture": "#2"},
                            "south": {"uv": [6, 9, 7, 10], "texture": "#2"},
                            "west": {"uv": [6, 9, 7, 10], "texture": "#2"},
                            "up": {"uv": [6, 9, 7, 10], "texture": "#2"},
                            "down": {"uv": [6, 9, 7, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_127",
                        "from": [7, 6, 4],
                        "to": [8, 7, 5],
                        "faces": {
                            "north": {"uv": [8, 9, 7, 10], "texture": "#2"},
                            "east": {"uv": [7, 9, 8, 10], "texture": "#2"},
                            "south": {"uv": [7, 9, 8, 10], "texture": "#2"},
                            "west": {"uv": [7, 9, 8, 10], "texture": "#2"},
                            "up": {"uv": [7, 9, 8, 10], "texture": "#2"},
                            "down": {"uv": [7, 9, 8, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_128",
                        "from": [8, 6, 4],
                        "to": [9, 7, 5],
                        "faces": {
                            "north": {"uv": [9, 9, 8, 10], "texture": "#2"},
                            "east": {"uv": [8, 9, 9, 10], "texture": "#2"},
                            "south": {"uv": [8, 9, 9, 10], "texture": "#2"},
                            "west": {"uv": [8, 9, 9, 10], "texture": "#2"},
                            "up": {"uv": [8, 9, 9, 10], "texture": "#2"},
                            "down": {"uv": [8, 9, 9, 10], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_113",
                        "from": [9, 7, 4],
                        "to": [10, 8, 5],
                        "faces": {
                            "north": {"uv": [10, 8, 9, 9], "texture": "#2"},
                            "east": {"uv": [9, 8, 10, 9], "texture": "#2"},
                            "south": {"uv": [9, 8, 10, 9], "texture": "#2"},
                            "west": {"uv": [9, 8, 10, 9], "texture": "#2"},
                            "up": {"uv": [9, 8, 10, 9], "texture": "#2"},
                            "down": {"uv": [9, 8, 10, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_112",
                        "from": [8, 7, 4],
                        "to": [9, 8, 5],
                        "faces": {
                            "north": {"uv": [9, 8, 8, 9], "texture": "#2"},
                            "east": {"uv": [8, 8, 9, 9], "texture": "#2"},
                            "south": {"uv": [8, 8, 9, 9], "texture": "#2"},
                            "west": {"uv": [8, 8, 9, 9], "texture": "#2"},
                            "up": {"uv": [8, 8, 9, 9], "texture": "#2"},
                            "down": {"uv": [8, 8, 9, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_111",
                        "from": [7, 7, 4],
                        "to": [8, 8, 5],
                        "faces": {
                            "north": {"uv": [8, 8, 7, 9], "texture": "#2"},
                            "east": {"uv": [7, 8, 8, 9], "texture": "#2"},
                            "south": {"uv": [7, 8, 8, 9], "texture": "#2"},
                            "west": {"uv": [7, 8, 8, 9], "texture": "#2"},
                            "up": {"uv": [7, 8, 8, 9], "texture": "#2"},
                            "down": {"uv": [7, 8, 8, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_110",
                        "from": [6, 7, 4],
                        "to": [7, 8, 5],
                        "faces": {
                            "north": {"uv": [7, 8, 6, 9], "texture": "#2"},
                            "east": {"uv": [6, 8, 7, 9], "texture": "#2"},
                            "south": {"uv": [6, 8, 7, 9], "texture": "#2"},
                            "west": {"uv": [6, 8, 7, 9], "texture": "#2"},
                            "up": {"uv": [6, 8, 7, 9], "texture": "#2"},
                            "down": {"uv": [6, 8, 7, 9], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_94",
                        "from": [6, 8, 4],
                        "to": [7, 9, 5],
                        "faces": {
                            "north": {"uv": [7, 7, 6, 8], "texture": "#2"},
                            "east": {"uv": [6, 7, 7, 8], "texture": "#2"},
                            "south": {"uv": [6, 7, 7, 8], "texture": "#2"},
                            "west": {"uv": [6, 7, 7, 8], "texture": "#2"},
                            "up": {"uv": [6, 7, 7, 8], "texture": "#2"},
                            "down": {"uv": [6, 7, 7, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_80",
                        "from": [8, 9, 4],
                        "to": [9, 10, 5],
                        "faces": {
                            "north": {"uv": [9, 6, 8, 7], "texture": "#2"},
                            "east": {"uv": [8, 6, 9, 7], "texture": "#2"},
                            "south": {"uv": [8, 6, 9, 7], "texture": "#2"},
                            "west": {"uv": [8, 6, 9, 7], "texture": "#2"},
                            "up": {"uv": [8, 6, 9, 7], "texture": "#2"},
                            "down": {"uv": [8, 6, 9, 7], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_79",
                        "from": [7, 9, 4],
                        "to": [8, 10, 5],
                        "faces": {
                            "north": {"uv": [8, 6, 7, 7], "texture": "#2"},
                            "east": {"uv": [7, 6, 8, 7], "texture": "#2"},
                            "south": {"uv": [7, 6, 8, 7], "texture": "#2"},
                            "west": {"uv": [7, 6, 8, 7], "texture": "#2"},
                            "up": {"uv": [7, 6, 8, 7], "texture": "#2"},
                            "down": {"uv": [7, 6, 8, 7], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_95",
                        "from": [7, 8, 4],
                        "to": [8, 9, 5],
                        "faces": {
                            "north": {"uv": [8, 7, 7, 8], "texture": "#2"},
                            "east": {"uv": [7, 7, 8, 8], "texture": "#2"},
                            "south": {"uv": [7, 7, 8, 8], "texture": "#2"},
                            "west": {"uv": [7, 7, 8, 8], "texture": "#2"},
                            "up": {"uv": [7, 7, 8, 8], "texture": "#2"},
                            "down": {"uv": [7, 7, 8, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_96",
                        "from": [8, 8, 4],
                        "to": [9, 9, 5],
                        "faces": {
                            "north": {"uv": [9, 7, 8, 8], "texture": "#2"},
                            "east": {"uv": [8, 7, 9, 8], "texture": "#2"},
                            "south": {"uv": [8, 7, 9, 8], "texture": "#2"},
                            "west": {"uv": [8, 7, 9, 8], "texture": "#2"},
                            "up": {"uv": [8, 7, 9, 8], "texture": "#2"},
                            "down": {"uv": [8, 7, 9, 8], "texture": "#2"}
                        }
                    },
                    {
                        "name": "tier6_front_97",
                        "from": [9, 8, 4],
                        "to": [10, 9, 5],
                        "faces": {
                            "north": {"uv": [10, 7, 9, 8], "texture": "#2"},
                            "east": {"uv": [9, 7, 10, 8], "texture": "#2"},
                            "south": {"uv": [9, 7, 10, 8], "texture": "#2"},
                            "west": {"uv": [9, 7, 10, 8], "texture": "#2"},
                            "up": {"uv": [9, 7, 10, 8], "texture": "#2"},
                            "down": {"uv": [9, 7, 10, 8], "texture": "#2"}
                        }
                    }
                ],
                "gui_light": "front",
                "display": {
                    "thirdperson_righthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "thirdperson_lefthand": {
                        "rotation": [
                            0,
                            -90,
                            0
                        ],
                        "translation": [
                            2.3,
                            -2,
                            5
                        ]
                    },
                    "firstperson_righthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "firstperson_lefthand": {
                        "rotation": [
                            0,
                            -15,
                            15
                        ],
                        "translation": [
                            2,
                            -2.5,
                            0
                        ]
                    },
                    "ground": {
                        "translation": [0, 2, 0],
                        "scale": [0.5, 0.5, 0.5]
                    },
                    "gui": {
                        "rotation": [0, 180, 0]
                    },
                    "head": {
                        "translation": [0, 0, -7.56]
                    },
                    "fixed": {
                        "translation": [0, 0, -0.38],
                        "scale": [2, 2, 2]
                    }
                },
                "groups": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    {
                        "name": "tier6_front",
                        "origin": [8, 8, 8],
                        "color": 0,
                        "children": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]
                    }
                ]
            };
        }

        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(`metal/shield/${metal.name}`, '.json')));
        let fullBlockingPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(`metal/shield/${metal.name}_blocking`, '.json')));
        
        this.save(fullItemBlockPath, shield);
        this.save(fullBlockingPath, shield_blocking);
    }

    ore(blockName: string, texture1: string, texture2: string): void {
      let fullBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
      let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
      let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
      
      //console.log(fullBlockPath, fullItemBlockPath, fullBlockstatePath);

      this.save(fullBlockstatePath, {
          "variants": {
              "": {
                  "model": `${this.modid}:block/${blockName}`
              }
          }
      });

      this.save(fullBlockPath, {
        "parent": "tfc:block/ore",
        "textures": {
          "all": `tfc:block/rock/raw/${texture1}`,
          "particle": `tfc:block/rock/raw/${texture1}`,
          "overlay": `tfc_metallum:block/ore/${texture2}`
        }
      });

      this.save(fullItemBlockPath,  {
          parent: `${this.modid}:block/${blockName}`
      });

      // this.map.forEach((value, key) => {
      //     console.log(key, value)
      // })
  }

    public anvil(blockName: string) {
        let metal = blockName.split('/')[2]
        let fullBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));

        this.save(fullBlockstatePath, {
            "variants": {
                "facing=north": {
                    "model": `${this.modid}:block/${blockName}`,
                    "y": 90
                },
                "facing=east": {
                    "model": `${this.modid}:block/${blockName}`,
                    "y": 180
                },
                "facing=south": {
                    "model": `${this.modid}:block/${blockName}`,
                    "y": 270
                },
                "facing=west": {
                    "model": `${this.modid}:block/${blockName}`
                }
            }
        });

        this.save(fullBlockPath, {
            "parent": "tfc:block/anvil",
            "textures": {
                "all": `${this.modid}:block/metal/anvil/${metal}`,
                "particle": `${this.modid}:block/metal/anvil/${metal}`
            }
        });

        this.save(fullItemBlockPath, {
            parent:`${this.modid}:block/${blockName}`
        });
    }

    public chain(blockName: string) {
        let metal = blockName.split('/')[2]
        let fullBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));

        this.save(fullBlockstatePath, {
            "variants": {
              "axis=x": {
                "model": `${this.modid}:block/${blockName}`,
                "x": 90,
                "y": 90
              },
              "axis=y": {
                "model": `${this.modid}:block/${blockName}`
              },
              "axis=z": {
                "model": `${this.modid}:block/${blockName}`,
                "x": 90
              }
            }
        });

        this.save(fullBlockPath, {
            "parent": "minecraft:block/chain",
            "textures": {
                "all": `${this.modid}:block/${blockName}`,
                "particle": `${this.modid}:block/metal/full/${metal}`
            }
        });

        this.save(fullItemBlockPath, {
            "parent": "item/generated",
            "textures": {
              "layer0": `${this.modid}:item/${blockName}`
            }
          });
    }

    public bell(metal: Metal) {
        let blockName = `${metal.name}_bell`;
        let fullMetal = `${this.modid}:block/full/${metal.name}`;

        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
        let itemBlock1 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bell', this.joinString(blockName, '_ceiling',  '.json')));
        let itemBlock2 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bell', this.joinString(blockName, '_double_wall',  '.json')));
        let itemBlock3 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bell', this.joinString(blockName, '_floor',  '.json')));
        let itemBlock4 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bell', this.joinString(blockName, '_single_wall',  '.json')));

        this.save(fullBlockstatePath, {
            "variants": {
              "attachment=ceiling,facing=east": {
                "model": `${this.modid}:block/bell/${metal.name}_ceiling`,
                "y": 90
              },
              "attachment=ceiling,facing=north": {
                "model": `${this.modid}:block/bell/${metal.name}_ceiling`,
                "y": 0
              },
              "attachment=ceiling,facing=south": {
                "model": `${this.modid}:block/bell/${metal.name}_ceiling`,
                "y": 180
              },
              "attachment=ceiling,facing=west": {
                "model": `${this.modid}:block/bell/${metal.name}_ceiling`,
                "y": 270
              },
              "attachment=double_wall,facing=east": {
                "model": `${this.modid}:block/bell/${metal.name}_double_wall`,
                "y": 90
              },
              "attachment=double_wall,facing=north": {
                "model": `${this.modid}:block/bell/${metal.name}_double_wall`,
                "y": 0
              },
              "attachment=double_wall,facing=south": {
                "model": `${this.modid}:block/bell/${metal.name}_double_wall`,
                "y": 180
              },
              "attachment=double_wall,facing=west": {
                "model": `${this.modid}:block/bell/${metal.name}_double_wall`,
                "y": 270
              },
              "attachment=floor,facing=east": {
                "model": `${this.modid}:block/bell/${metal.name}_floor`,
                "y": 90
              },
              "attachment=floor,facing=north": {
                "model": `${this.modid}:block/bell/${metal.name}_floor`,
                "y": 0
              },
              "attachment=floor,facing=south": {
                "model": `${this.modid}:block/bell/${metal.name}_floor`,
                "y": 180
              },
              "attachment=floor,facing=west": {
                "model": `${this.modid}:block/bell/${metal.name}_floor`,
                "y": 270
              },
              "attachment=single_wall,facing=east": {
                "model": `${this.modid}:block/bell/${metal.name}_single_wall`,
                "y": 0
              },
              "attachment=single_wall,facing=north": {
                "model": `${this.modid}:block/bell/${metal.name}_single_wall`,
                "y": 270
              },
              "attachment=single_wall,facing=south": {
                "model": `${this.modid}:block/bell/${metal.name}_single_wall`,
                "y": 90
              },
              "attachment=single_wall,facing=west": {
                "model": `${this.modid}:block/bell/${metal.name}_single_wall`,
                "y": 180
              }
            }
        });

        this.save(itemBlock1, {
            "parent": "minecraft:block/bell_ceiling",
            "textures": {
              "bar": "tfc:block/rock/raw/dolomite",
              "post": "tfc:block/wood/planks/ash",
              "particle": `${this.modid}:block/metal/full/${metal.name}`
            }
        });

        this.save(itemBlock2, {
            "parent": "minecraft:block/bell_between_walls",
            "textures": {
              "bar": "tfc:block/rock/raw/dolomite",
              "post": "tfc:block/wood/planks/ash",
              "particle": `${this.modid}:block/metal/full/${metal.name}`
            }
        });

        this.save(itemBlock3, {
            "parent": "minecraft:block/bell_floor",
            "textures": {
              "bar": "tfc:block/rock/raw/dolomite",
              "post": "tfc:block/wood/planks/ash",
              "particle": `${this.modid}:block/metal/full/${metal.name}`
            }
        });

        this.save(itemBlock4, {
            "parent": "minecraft:block/bell_wall",
            "textures": {
              "bar": "tfc:block/rock/raw/dolomite",
              "post": "tfc:block/wood/planks/ash",
              "particle": `${this.modid}:block/metal/full/${metal.name}`
            }
        });

        this.itemModel(`${this.modid}:${metal.name}_bell`);
    }

    public bars(metal: Metal) {
        let blockName = `${metal.name}_bars`;
        let itemName = `${this.modid}:block/${blockName}`;
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));

        let itemBlock1 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bars', this.joinString(blockName, '_caps',  '.json')));
        let itemBlock2 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bars', this.joinString(blockName, '_caps_alt',  '.json')));
        let itemBlock3 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bars', this.joinString(blockName, '_post',  '.json')));
        let itemBlock4 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bars', this.joinString(blockName, '_post_ends',  '.json')));
        let itemBlock5 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bars', this.joinString(blockName, '_side',  '.json')));
        let itemBlock6 = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', 'bars', this.joinString(blockName, '_side_alt',  '.json')));

        this.save(fullBlockstatePath, {
            "multipart": [
              {
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_post_ends`
                }
              },
              {
                "when": {
                  "north": false,
                  "south": false,
                  "east": false,
                  "west": false
                },
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_post`
                }
              },
              {
                "when": {
                  "north": true,
                  "south": false,
                  "east": false,
                  "west": false
                },
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_cap`
                }
              },
              {
                "when": {
                  "north": false,
                  "south": false,
                  "east": true,
                  "west": false
                },
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_cap`,
                  "y": 90
                }
              },
              {
                "when": {
                  "north": false,
                  "south": true,
                  "east": false,
                  "west": false
                },
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_cap_alt`
                }
              },
              {
                "when": {
                  "north": false,
                  "south": false,
                  "east": false,
                  "west": true
                },
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_cap_alt`,
                  "y": 90
                }
              },
              {
                "when": {
                  "north": true
                },
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_side`
                }
              },
              {
                "when": {
                  "east": true
                },
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_side`,
                  "y": 90
                }
              },
              {
                "when": {
                  "south": true
                },
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_side_alt`
                }
              },
              {
                "when": {
                  "west": true
                },
                "apply": {
                  "model": `${this.modid}:block/bars/${blockName}_side_alt`,
                  "y": 90
                }
              }
            ]
        });
        
        this.save(itemBlock1, {
            "parent": "minecraft:block/iron_bars_cap",
            "textures": {
              "particle": itemName,
              "bars": itemName,
              "edge": itemName
            }
        });

        this.save(itemBlock2, {
            "parent": "minecraft:block/iron_bars_cap_alt",
            "textures": {
              "particle": itemName,
              "bars": itemName,
              "edge": itemName
            }
        });

        this.save(itemBlock3, {
            "parent": "minecraft:block/iron_bars_post",
            "textures": {
              "particle": itemName,
              "bars": itemName,
              "edge": itemName
            }
        });

        this.save(itemBlock4, {
            "parent": "minecraft:block/iron_bars_post_ends",
            "textures": {
              "particle": itemName,
              "bars": itemName,
              "edge": itemName
            }
        });

        this.save(itemBlock5, {
            "parent": "minecraft:block/iron_bars_side",
            "textures": {
              "particle": itemName,
              "bars": itemName,
              "edge": itemName
            }
        });

        this.save(itemBlock6, {
            "parent": "minecraft:block/iron_bars_side_alt",
            "textures": {
              "particle": itemName,
              "bars": itemName,
              "edge": itemName
            }
        });

        this.itemModel(`${this.modid}:${metal.name}_bars`);
    }

    public lamp(blockName: string) {
        let metal = blockName.split('/')[2];
        let off = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_off.json')));
        let hangingOff = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_hanging_off.json')));
        let on = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_on.json')));
        let hangingOn = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_hanging_on.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));

        this.save(fullBlockstatePath, {
            "variants": {
              "hanging=false,lit=false": {
                "model": `${this.modid}:block/${blockName}_off`
              },
              "hanging=true,lit=false": {
                "model": `${this.modid}:block/${blockName}_hanging_off`
              },
              "hanging=false,lit=true": {
                "model": `${this.modid}:block/${blockName}_on`
              },
              "hanging=true,lit=true": {
                "model": `${this.modid}:block/${blockName}_hanging_on`
              }
            }
        });

        this.save(off, {
            "parent": "tfc:block/lamp",
            "textures": {
              "metal": `${this.modid}:block/metal/full/${metal}`,
              "lamp": "tfc:block/lamp_off"
            }
        });

        this.save(on, {
            "parent": "tfc:block/lamp",
            "textures": {
              "metal": `${this.modid}:block/metal/full/${metal}`,
              "lamp": "tfc:block/lamp"
            }
        });

        this.save(hangingOn, {
            "parent": "tfc:block/lamp_hanging",
            "textures": {
              "metal": `${this.modid}:block/metal/full/${metal}`,
              "chain": `${this.modid}:block/metal/chain/${metal}`,
              "lamp": "tfc:block/lamp"
            }
        });

        this.save(hangingOff, {
            "parent": "tfc:block/lamp_hanging",
            "textures": {
              "metal": `${this.modid}:block/metal/full/${metal}`,
              "chain": `${this.modid}:block/metal/chain/${metal}`,
              "lamp": "tfc:block/lamp_off"
            }
        });

        this.save(fullItemBlockPath, {
            "parent": `${this.modid}:block/${blockName}_off`
        });
    }

    public trapdoor(blockName: string) {
        let metal = blockName.split('/')[2]
        let trapdoorTop = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_top.json')));
        let trapdoorOpen = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_open.json')));
        let trapdoorBottom = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_bottom.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));

        this.save(fullBlockstatePath, {
            "__comment__": "This file was automatically created by mcresources",
            "variants": {
              "facing=north,half=bottom,open=false": {
                "model": `${this.modid}:block/${blockName}_bottom`
              },
              "facing=south,half=bottom,open=false": {
                "model": `${this.modid}:block/${blockName}_bottom`,
                "y": 180
              },
              "facing=east,half=bottom,open=false": {
                "model": `${this.modid}:block/${blockName}_bottom`,
                "y": 90
              },
              "facing=west,half=bottom,open=false": {
                "model": `${this.modid}:block/${blockName}_bottom`,
                "y": 270
              },
              "facing=north,half=top,open=false": {
                "model": `${this.modid}:block/${blockName}_top`
              },
              "facing=south,half=top,open=false": {
                "model": `${this.modid}:block/${blockName}_top`,
                "y": 180
              },
              "facing=east,half=top,open=false": {
                "model": `${this.modid}:block/${blockName}_top`,
                "y": 90
              },
              "facing=west,half=top,open=false": {
                "model": `${this.modid}:block/${blockName}_top`,
                "y": 270
              },
              "facing=north,half=bottom,open=true": {
                "model": `${this.modid}:block/${blockName}_open`
              },
              "facing=south,half=bottom,open=true": {
                "model": `${this.modid}:block/${blockName}_open`,
                "y": 180
              },
              "facing=east,half=bottom,open=true": {
                "model": `${this.modid}:block/${blockName}_open`,
                "y": 90
              },
              "facing=west,half=bottom,open=true": {
                "model": `${this.modid}:block/${blockName}_open`,
                "y": 270
              },
              "facing=north,half=top,open=true": {
                "model": `${this.modid}:block/${blockName}_open`,
                "x": 180,
                "y": 180
              },
              "facing=south,half=top,open=true": {
                "model": `${this.modid}:block/${blockName}_open`,
                "x": 180,
                "y": 0
              },
              "facing=east,half=top,open=true": {
                "model": `${this.modid}:block/${blockName}_open`,
                "x": 180,
                "y": 270
              },
              "facing=west,half=top,open=true": {
                "model": `${this.modid}:block/${blockName}_open`,
                "x": 180,
                "y": 90
              }
            }
          });

        this.save(trapdoorTop, {
            "parent": "block/template_orientable_trapdoor_top",
            "textures": {
              "texture": `${this.modid}:block/${blockName}`
            }
        });

        this.save(trapdoorOpen, {
            "parent": "block/template_orientable_trapdoor_open",
            "textures": {
              "texture": `${this.modid}:block/${blockName}`
            }
        });

        this.save(trapdoorBottom, {
            "parent": "block/template_orientable_trapdoor_bottom",
            "textures": {
              "texture": `${this.modid}:block/${blockName}`
            }
        });

        this.save(fullItemBlockPath, {
            parent:`${this.modid}:block/${blockName}_bottom`
        });
    }
}