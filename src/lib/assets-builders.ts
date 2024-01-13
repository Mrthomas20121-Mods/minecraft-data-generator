import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { JSObj } from "./types.js";

export class ModelManager {

    protected modid: string;

    private map: Map<string, JSObj> = new Map();

    static create(modid: string): ModelManager {
        return new ModelManager(modid);
    }

    protected constructor(modid: string) {
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

    protected joinString(...s : string[]): string {
        return s.join('');
    }

    protected save(savePath: string, obj: JSObj): void {
        this.map.set(savePath, obj);
    }

    public particleModel(p: string, itemName: string, parent='item/generated'): void {
        let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(p, '.json')));
        let obj = {
            parent: parent,
            textures:{
                particle: `${this.modid}:item/${itemName}`
            }
        };
        this.map.set(savePath, obj);
    }

    public itemModelWithParent(p: string, itemName: string, parent='item/generated'): void {
        let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(p, '.json')));
        let obj = {
            parent: parent,
            textures:{
                layer0: `${this.modid}:item/${itemName}`
            }
        };
        this.map.set(savePath, obj);
    }

    public dartShooter(itemName: string) {
      let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(itemName, '.json')));
        let obj = {
            parent: 'minecraft:item/handheld',
            display: {
              "thirdperson_lefthand": {
                "rotation": [
                  0,
                  90,
                  -45
                ],
                "scale": [
                  0.85,
                  0.85,
                  0.85
                ],
                "translation": [
                  0,
                  1.5,
                  -1
                ]
              },
              "thirdperson_righthand": {
                "rotation": [
                  0,
                  -90,
                  45
                ],
                "scale": [
                  0.85,
                  0.85,
                  0.85
                ],
                "translation": [
                  0,
                  1.5,
                  -1
                ]
              }
            },
            textures:{
                layer0: `${this.modid}:item/${itemName}`
            }
        };
        this.map.set(savePath, obj);
    }

    public itemModel(itemName: string, parent='item/generated'): void {
        let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(itemName, '.json')));
        let obj = {
            parent: parent,
            textures:{
                layer0: `${this.modid}:item/${itemName}`
            }
        };
        this.map.set(savePath, obj);
    }

  public itemBlock(itemName: string): void {
      let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(itemName, '.json')));
      let obj = {
          parent: `${this.modid}:block/${itemName}`
      };
      this.map.set(savePath, obj);
  }

  public itemBlockModel(itemName: string): void {
      let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(itemName, '.json')));
      let obj = {
          parent: 'item/generated',
          textures:{
              layer0: `${this.modid}:block/${itemName}`
          }
      };
      this.map.set(savePath, obj);
  }

  public fence(blockName: string) {
    // fence inventory
    this.itemBlock(blockName+'_fence_inventory');

    this.save(this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_fence.json'))), {
      parent:'minecraft:block/fence_inventory',
      textures: {
        texture: `${this.modid}:block/${blockName}_planks`
      }
    });

    this.save(this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_fence_post.json'))), {
      parent:'minecraft:block/fence_post',
      textures: {
        texture: `${this.modid}:block/${blockName}_planks`
      }
    });

    this.save(this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_fence_side.json'))), {
      parent:'minecraft:block/fence_side',
      textures: {
        texture: `${this.modid}:block/${blockName}_planks`
      }
    });

    this.save(this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '_fence.json'))), {
      "multipart": [
        {
          "apply": {
            "model": `${this.modid}:block/${blockName}_fence_post`
          }
        },
        {
          "when": {
            "north": "true"
          },
          "apply": {
            "model": `${this.modid}:block/${blockName}_fence_side`,
            "uvlock": true
          }
        },
        {
          "when": {
            "east": "true"
          },
          "apply": {
            "model": `${this.modid}:block/${blockName}_fence_side`,
            "y": 90,
            "uvlock": true
          }
        },
        {
          "when": {
            "south": "true"
          },
          "apply": {
            "model": `${this.modid}:block/${blockName}_fence_side`,
            "y": 180,
            "uvlock": true
          }
        },
        {
          "when": {
            "west": "true"
          },
          "apply": {
            "model": `${this.modid}:block/${blockName}_fence_side`,
            "y": 270,
            "uvlock": true
          }
        }
      ]
    });
  }

  public fenceGate(blockName: string) {
    this.itemBlock(blockName+'_fence_gate');

    this.save(this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_fence_gate.json'))), {
      parent:'minecraft:block/template_fence_gate',
      textures: {
        texture: `${this.modid}:block/${blockName}_planks`
      }
    });

    this.save(this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_fence_gate_open.json'))), {
      parent:'minecraft:block/template_fence_gate_wall',
      textures: {
        texture: `${this.modid}:block/${blockName}_planks`
      }
    });

    this.save(this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_fence_gate_wall.json'))), {
      parent:'minecraft:block/template_fence_gate_open',
      textures: {
        texture: `${this.modid}:block/${blockName}_planks`
      }
    });

    this.save(this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_fence_gate_wall_open.json'))), {
      parent:'minecraft:block/template_fence_gate_wall_open',
      textures: {
        texture: `${this.modid}:block/${blockName}_planks`
      }
    });

    this.save(this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '_fence_gate.json'))), {
      "variants": {
        "facing=east,in_wall=false,open=false": {
          "uvlock": true,
          "y": 270,
          "model": `${this.modid}:block/${blockName}_fence_gate`
        },
        "facing=east,in_wall=false,open=true": {
          "uvlock": true,
          "y": 270,
          "model": `${this.modid}:block/${blockName}_fence_gate_open`
        },
        "facing=east,in_wall=true,open=false": {
          "uvlock": true,
          "y": 270,
          "model": `${this.modid}:block/${blockName}_fence_gate_wall`
        },
        "facing=east,in_wall=true,open=true": {
          "uvlock": true,
          "y": 270,
          "model": `${this.modid}:block/${blockName}_fence_gate_wall_open`
        },
        "facing=north,in_wall=false,open=false": {
          "uvlock": true,
          "y": 180,
          "model": `${this.modid}:block/${blockName}_fence_gate`
        },
        "facing=north,in_wall=false,open=true": {
          "uvlock": true,
          "y": 180,
          "model": `${this.modid}:block/${blockName}_fence_gate_open`
        },
        "facing=north,in_wall=true,open=false": {
          "uvlock": true,
          "y": 180,
          "model": `${this.modid}:block/${blockName}_fence_gate_wall`
        },
        "facing=north,in_wall=true,open=true": {
          "uvlock": true,
          "y": 180,
          "model": `${this.modid}:block/${blockName}_fence_gate_wall_open`
        },
        "facing=south,in_wall=false,open=false": {
          "uvlock": true,
          "model": `${this.modid}:block/${blockName}_fence_gate`
        },
        "facing=south,in_wall=false,open=true": {
          "uvlock": true,
          "model": `${this.modid}:block/${blockName}_fence_gate_open`
        },
        "facing=south,in_wall=true,open=false": {
          "uvlock": true,
          "model": `${this.modid}:block/${blockName}_fence_gate_wall`
        },
        "facing=south,in_wall=true,open=true": {
          "uvlock": true,
          "model": `${this.modid}:block/${blockName}_fence_gate_wall_open`
        },
        "facing=west,in_wall=false,open=false": {
          "uvlock": true,
          "y": 90,
          "model": `${this.modid}:block/${blockName}_fence_gate`
        },
        "facing=west,in_wall=false,open=true": {
          "uvlock": true,
          "y": 90,
          "model": `${this.modid}:block/${blockName}_fence_gate_open`
        },
        "facing=west,in_wall=true,open=false": {
          "uvlock": true,
          "y": 90,
          "model": `${this.modid}:block/${blockName}_fence_gate_wall`
        },
        "facing=west,in_wall=true,open=true": {
          "uvlock": true,
          "y": 90,
          "model": `${this.modid}:block/${blockName}_fence_gate_wall_open`
        }
      }
    });
  }

  public woodDecorativeBlocks(blockName: string) {
    this.block(blockName+'_planks');
    this.stairs(blockName, blockName+'_planks');
    this.slab(blockName+'_slab', blockName+'_planks');
  }

  public decorativeBlocks(blockName: string) {
      this.block(blockName);
      this.stairs(blockName, blockName);
      this.slab(blockName+'_slab', blockName);
      this.wall(blockName+'_wall', blockName);
  }

    stairs(blockName: string, otherBlockName: string): void {
        let stairs = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_stairs.json')));
        let innerStairs = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_stairs_inner.json')));
        let outerStairs = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_stairs_outer.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '_stairs.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '_stairs.json')));

        this.save(fullBlockstatePath, {
            "variants": {
              "facing=east,half=bottom,shape=straight": {
                "model": `${this.modid}:block/${blockName}_stairs`
              },
              "facing=west,half=bottom,shape=straight": {
                "model": `${this.modid}:block/${blockName}_stairs`,
                "y": 180,
                "uvlock": true
              },
              "facing=south,half=bottom,shape=straight": {
                "model": `${this.modid}:block/${blockName}_stairs`,
                "y": 90,
                "uvlock": true
              },
              "facing=north,half=bottom,shape=straight": {
                "model": `${this.modid}:block/${blockName}_stairs`,
                "y": 270,
                "uvlock": true
              },
              "facing=east,half=bottom,shape=outer_right": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`
              },
              "facing=west,half=bottom,shape=outer_right": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "y": 180,
                "uvlock": true
              },
              "facing=south,half=bottom,shape=outer_right": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "y": 90,
                "uvlock": true
              },
              "facing=north,half=bottom,shape=outer_right": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "y": 270,
                "uvlock": true
              },
              "facing=east,half=bottom,shape=outer_left": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "y": 270,
                "uvlock": true
              },
              "facing=west,half=bottom,shape=outer_left": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "y": 90,
                "uvlock": true
              },
              "facing=south,half=bottom,shape=outer_left": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`
              },
              "facing=north,half=bottom,shape=outer_left": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "y": 180,
                "uvlock": true
              },
              "facing=east,half=bottom,shape=inner_right": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`
              },
              "facing=west,half=bottom,shape=inner_right": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "y": 180,
                "uvlock": true
              },
              "facing=south,half=bottom,shape=inner_right": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "y": 90,
                "uvlock": true
              },
              "facing=north,half=bottom,shape=inner_right": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "y": 270,
                "uvlock": true
              },
              "facing=east,half=bottom,shape=inner_left": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "y": 270,
                "uvlock": true
              },
              "facing=west,half=bottom,shape=inner_left": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "y": 90,
                "uvlock": true
              },
              "facing=south,half=bottom,shape=inner_left": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`
              },
              "facing=north,half=bottom,shape=inner_left": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "y": 180,
                "uvlock": true
              },
              "facing=east,half=top,shape=straight": {
                "model": `${this.modid}:block/${blockName}_stairs`,
                "x": 180,
                "uvlock": true
              },
              "facing=west,half=top,shape=straight": {
                "model": `${this.modid}:block/${blockName}_stairs`,
                "x": 180,
                "y": 180,
                "uvlock": true
              },
              "facing=south,half=top,shape=straight": {
                "model": `${this.modid}:block/${blockName}_stairs`,
                "x": 180,
                "y": 90,
                "uvlock": true
              },
              "facing=north,half=top,shape=straight": {
                "model": `${this.modid}:block/${blockName}_stairs`,
                "x": 180,
                "y": 270,
                "uvlock": true
              },
              "facing=east,half=top,shape=outer_right": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "x": 180,
                "y": 90,
                "uvlock": true
              },
              "facing=west,half=top,shape=outer_right": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "x": 180,
                "y": 270,
                "uvlock": true
              },
              "facing=south,half=top,shape=outer_right": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "x": 180,
                "y": 180,
                "uvlock": true
              },
              "facing=north,half=top,shape=outer_right": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "x": 180,
                "uvlock": true
              },
              "facing=east,half=top,shape=outer_left": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "x": 180,
                "uvlock": true
              },
              "facing=west,half=top,shape=outer_left": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "x": 180,
                "y": 180,
                "uvlock": true
              },
              "facing=south,half=top,shape=outer_left": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "x": 180,
                "y": 90,
                "uvlock": true
              },
              "facing=north,half=top,shape=outer_left": {
                "model": `${this.modid}:block/${blockName}_stairs_outer`,
                "x": 180,
                "y": 270,
                "uvlock": true
              },
              "facing=east,half=top,shape=inner_right": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "x": 180,
                "y": 90,
                "uvlock": true
              },
              "facing=west,half=top,shape=inner_right": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "x": 180,
                "y": 270,
                "uvlock": true
              },
              "facing=south,half=top,shape=inner_right": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "x": 180,
                "y": 180,
                "uvlock": true
              },
              "facing=north,half=top,shape=inner_right": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "x": 180,
                "uvlock": true
              },
              "facing=east,half=top,shape=inner_left": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "x": 180,
                "uvlock": true
              },
              "facing=west,half=top,shape=inner_left": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "x": 180,
                "y": 180,
                "uvlock": true
              },
              "facing=south,half=top,shape=inner_left": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "x": 180,
                "y": 90,
                "uvlock": true
              },
              "facing=north,half=top,shape=inner_left": {
                "model": `${this.modid}:block/${blockName}_stairs_inner`,
                "x": 180,
                "y": 270,
                "uvlock": true
              }
            }
        });

        this.save(stairs, {
            "parent": "block/stairs",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });

        this.save(innerStairs, {
            "parent": "block/inner_stairs",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });

        this.save(outerStairs, {
            "parent": "block/outer_stairs",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });

        this.save(fullItemBlockPath,  {
            parent: `${this.modid}:block/${blockName}_stairs`
        });
    }

    slab(blockName: string, otherBlockName: string): void {
        let topSlab = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_top.json')));
        let slab = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
        
        this.save(fullBlockstatePath, {
            "variants": {
              "type=bottom": {
                "model": `${this.modid}:block/${blockName}`
              },
              "type=top": {
                "model": `${this.modid}:block/${blockName}_top`
              },
              "type=double": {
                "model": `${this.modid}:block/${otherBlockName}`
              }
            }
        });

        this.save(slab, {
            "parent": "block/slab",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });

        this.save(topSlab, {
            "parent": "block/slab_top",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });

        this.save(fullItemBlockPath,  {
            parent: `${this.modid}:block/${blockName}`
        })
    }

    wall(blockName: string, otherBlockName: string): void {
        let inventory = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_inventory.json')));
        let post = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_post.json')));
        let side = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_side.json')));
        let sideTall = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_side_tall.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
        
        this.save(fullBlockstatePath, {
            "multipart": [
              {
                "when": {
                  "up": "true"
                },
                "apply": {
                  "model": `${this.modid}:block/${blockName}_post`
                }
              },
              {
                "when": {
                  "north": "low"
                },
                "apply": {
                  "model": `${this.modid}:block/${blockName}_post`,
                  "uvlock": true
                }
              },
              {
                "when": {
                  "east": "low"
                },
                "apply": {
                  "model": `${this.modid}:block/${blockName}_post`,
                  "y": 90,
                  "uvlock": true
                }
              },
              {
                "when": {
                  "south": "low"
                },
                "apply": {
                  "model": `${this.modid}:block/${blockName}_post`,
                  "y": 180,
                  "uvlock": true
                }
              },
              {
                "when": {
                  "west": "low"
                },
                "apply": {
                  "model": `${this.modid}:block/${blockName}_post`,
                  "y": 270,
                  "uvlock": true
                }
              },
              {
                "when": {
                  "north": "tall"
                },
                "apply": {
                  "model": `${this.modid}:block/${blockName}_side_tall`,
                  "uvlock": true
                }
              },
              {
                "when": {
                  "east": "tall"
                },
                "apply": {
                  "model": `${this.modid}:block/${blockName}_side_tall`,
                  "y": 90,
                  "uvlock": true
                }
              },
              {
                "when": {
                  "south": "tall"
                },
                "apply": {
                  "model": `${this.modid}:block/${blockName}_side_tall`,
                  "y": 180,
                  "uvlock": true
                }
              },
              {
                "when": {
                  "west": "tall"
                },
                "apply": {
                  "model": `${this.modid}:block/${blockName}_side_tall`,
                  "y": 270,
                  "uvlock": true
                }
              }
            ]
        });

        this.save(inventory, {
            "parent": "block/wall_inventory",
            "textures": {
              "wall": `${this.modid}:block/${otherBlockName}`
            }
        });

        this.save(post, {
            "parent": "block/template_wall_post",
            "textures": {
              "wall": `${this.modid}:block/${otherBlockName}`
            }
        });

        this.save(side, {
            "parent": "block/template_wall_side",
            "textures": {
              "wall": `${this.modid}:block/${otherBlockName}`
            }
        });

        this.save(sideTall, {
            "parent": "block/template_wall_side_tall",
            "textures": {
              "wall": `${this.modid}:block/${otherBlockName}`
            }
        });

        this.save(fullItemBlockPath,  {
            parent: `${this.modid}:block/${blockName}_inventory`
        });
    }

    woodWall(blockName: string, otherBlockName: string, mod: string): void {
      let blockModel = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
      let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
      let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
      
      this.save(fullBlockstatePath, {
        "variants": {
          "": {
              "model": `${this.modid}:block/${blockName}`
          }
        }
      });

      this.save(blockModel, {
        "textures": {
          "0": `${mod}:block/${otherBlockName}`,
          "particle": `${mod}:block/${otherBlockName}`
        },
        "elements": [
          {
            "name": "log",
            "from": [4, 0, 4],
            "to": [12, 16, 12],
            "faces": {
              "north": {"uv": [4, 0, 12, 16], "texture": "#0"},
              "east": {"uv": [4, 0, 12, 16], "texture": "#0"},
              "south": {"uv": [4, 0, 12, 16], "texture": "#0"},
              "west": {"uv": [4, 0, 12, 16], "texture": "#0"},
              "up": {"uv": [8, 8, 16, 16], "texture": "#0"},
              "down": {"uv": [0, 8, 8, 16], "texture": "#0"}
            }
          }
        ]
      });

      this.itemBlock(blockName);
  }

    bucket(itemPath: string, fluidPath: string) {
      let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(itemPath, '.json')));
      this.save(fullItemBlockPath, {
        "parent": "forge:item/bucket_drip",
        "loader": "forge:bucket",
        "fluid": `${this.modid}:${fluidPath}`
      });
    }

    ladder(blockName: string): void {
      let fullBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
      let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
      this.save(fullBlockstatePath, {
        "variants": {
          "facing=east": {
            "model": `${this.modid}:block/${blockName}`,
            "y": 90
          },
          "facing=north": {
            "model": `${this.modid}:block/${blockName}`
          },
          "facing=south": {
            "model": `${this.modid}:block/${blockName}`,
            "y": 180
          },
          "facing=west": {
            "model": `${this.modid}:block/${blockName}`,
            "y": 270
          }
        }
      });

      this.save(fullBlockPath, {
        "ambientocclusion": false,
        "textures": {
            "particle": `${this.modid}:block/${blockName}`,
            "texture": `${this.modid}:block/${blockName}`
        },
        "elements": [{   
            "from": [ 0, 0, 15.2 ],
              "to": [ 16, 16, 15.2 ],
              "shade": false,
              "faces": {
                  "north": { "uv": [ 0, 0, 16, 16 ], "texture": "#texture" },
                  "south": { "uv": [ 16, 0, 0, 16 ], "texture": "#texture" }
              }
          }]
      });

      this.itemBlockModel(blockName);
    }

    block(blockName: string): void {
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
            "parent": "block/cube_all",
            "textures": {
                "all": `${this.modid}:block/${blockName}`
            }
        });

        this.save(fullItemBlockPath,  {
            parent: `${this.modid}:block/${blockName}`
        });
    }

    horizontalBlock(blockName: string, side: string, top: string): void {
        let normal = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
        let horizontal = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_horizontal.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));

        this.save(fullBlockstatePath, {
            "variants": {
              "axis=x": {
                "model": `${this.modid}:block/${blockName}_horizontal`,
                "x": 90,
                "y": 90
              },
              "axis=y": {
                "model": `${this.modid}:block/${blockName}`
              },
              "axis=z": {
                "model": `${this.modid}:block/${blockName}_horizontal`,
                "x": 90
              }
            }
        });

        this.save(normal, {
            "parent": "minecraft:block/cube_column",
            "textures": {
              "side": side,
              "end": top
            }
        });

        this.save(horizontal, {
            "parent": "minecraft:block/cube_column_horizontal",
            "textures": {
              "side": side,
              "end": top
            }
        });

        this.save(fullItemBlockPath,  {
            parent: `${this.modid}:block/${blockName}`
        });
    }

    build(): void {
        this.map.forEach((value, key) => {
            writeFileSync(key, JSON.stringify(value, null, 2), 'utf8');
        })
    }
}