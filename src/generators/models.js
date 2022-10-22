const List = require('void-list')
const base = require('./base')

/**
 * Create a block item model
 * @param {string} filePath 
 * @param {string} parent 
 */
let blockItemModel = (filePath, parent) => {
    let json = {
        parent
    }
    base.saveJson(json, filePath)
}

/**
 * Create an item model
 * @param {string} filePath 
 * @param {string} parent 
 * @param {string} texture
 */
let itemModel = (filePath, texture, parent='item/generated') => {
    let json = {
        parent,
        textures:{
            layer0:texture
        }
    }
    base.saveJson(json, base.createPath(filePath))
}

/**
 * Create an item model
 * @param {string} filePath 
 * @param {string} parent 
 * @param {string} layers
 */
 let itemModelWithLayers = (filePath, layers, parent='item/generated') => {
    let json = {
        parent,
        textures:layers
    }
    base.saveJson(json, base.createPath(filePath))
}

/**
 * Create a blockstate
 * @param {string} filePath 
 * @param {string} model 
 */
let basicBlockstate = (filePath, model) => {
    let json = {
        variants: {
            "": {
                model: model
            }
        }
    }
    base.saveJson(json, filePath)
}

/**
 * slab model
 * @param {string} loc 
 * @param {{ bottom:string,top:string, side:string}} textures 
 */
let slab = (loc, textures) => {
    let blockstate = {
        variants: {
            "type=bottom": {
                model: base.blockFromLoc(loc+'_slab')
            },
            "type=top": {
                model: base.blockFromLoc(loc+'_slab_top')
            },
            "type=double": {
                model: base.blockFromLoc(loc)
            }
        }
    }

    let blockModel = {
        parent: 'block/slab',
        textures: {
            "bottom": textures.bottom,
            "top": textures.top,
            "side": textures.side
        }
    }

    let blockModelTop = {
        parent: 'block/slab_top',
        textures: {
            "bottom": textures.bottom,
            "top": textures.top,
            "side": textures.side
        }
    }

    blockItemModel(base.pathFromLoc(loc+'_slab', 'item'), base.blockFromLoc(loc+'_slab'))

    base.saveJson(blockstate, base.pathFromLoc(loc+'_slab', 'blockstate'))
    base.saveJson(blockModel, base.pathFromLoc(loc+'_slab', 'block'))
    base.saveJson(blockModelTop, base.pathFromLoc(loc+'_slab_top', 'block'))
}

/**
 * 
 * @param {string} loc 
 * @param {string} tex 
 */
 let wall = (loc, tex) => {
    let blockstate = {
        "multipart": [
            {
                "when": {
                    "up": "true"
                },
                "apply": {
                    "model": base.blockFromLoc(loc+'_wall_post')
                }
            },
            {
                "when": {
                    "north": "low"
                },
                "apply": {
                    "model": base.blockFromLoc(loc+'_wall_side'),
                    "uvlock": true
                }
            },
            {
                "when": {
                    "east": "low"
                },
                "apply": {
                    "model": base.blockFromLoc(loc+'_wall_side'),
                    "y": 90,
                    "uvlock": true
                }
            },
            {
                "when": {
                    "south": "low"
                },
                "apply": {
                    "model": base.blockFromLoc(loc+'_wall_side'),
                    "y": 180,
                    "uvlock": true
                }
            },
            {
                "when": {
                    "west": "low"
                },
                "apply": {
                    "model": base.blockFromLoc(loc+'_wall_side'),
                    "y": 270,
                    "uvlock": true
                }
            },
            {
                "when": {
                    "north": "tall"
                },
                "apply": {
                    "model": base.blockFromLoc(loc+'_wall_side_tall'),
                    "uvlock": true
                }
            },
            {
                "when": {
                    "east": "tall"
                },
                "apply": {
                    "model": base.blockFromLoc(loc+'_wall_side_tall'),
                    "y": 90,
                    "uvlock": true
                }
            },
            {
                "when": {
                    "south": "tall"
                },
                "apply": {
                    "model": base.blockFromLoc(loc+'_wall_side_tall'),
                    "y": 180,
                    "uvlock": true
                }
            },
            {
                "when": {
                    "west": "tall"
                },
                "apply": {
                    "model": base.blockFromLoc(loc+'_wall_side_tall'),
                    "y": 270,
                    "uvlock": true
                }
            }
        ]
    }

    let blockModelInv = {
        "parent": "block/wall_inventory",
        "textures": {
            "wall": tex
        }
    }

    let blockModelPost = {
        "parent": "block/template_wall_post",
        "textures": {
            "wall": tex
        }
    }

    let blockModelSide = {
        "parent": "block/template_wall_side",
        "textures": {
            "wall": tex
        }
    }

    let blockModelSideTall = {
        "parent": "block/template_wall_side_tall",
        "textures": {
            "wall": tex
        }
    }

    blockItemModel(base.pathFromLoc(loc+'_wall', 'item'), base.blockFromLoc(loc+'_wall_inventory'))

    base.saveJson(blockstate, base.pathFromLoc(loc+'_wall', 'blockstate'))
    base.saveJson(blockModelInv, base.pathFromLoc(loc+'_wall_inventory', 'block'))
    base.saveJson(blockModelSide, base.pathFromLoc(loc+'_wall_side', 'block'))
    base.saveJson(blockModelPost, base.pathFromLoc(loc+'_wall_post', 'block'))
    base.saveJson(blockModelSideTall, base.pathFromLoc(loc+'_wall_side_tall', 'block'))
}

/**
 * 
 * @param {string} loc 
 * @param {{ bottom:string,top:string, side:string}} textures
 */
 let stairs = (loc, textures) => {

    let stairs = base.blockFromLoc(loc+'_stairs')
    let stairs_outer = base.blockFromLoc(loc+'_stairs_outer')
    let stairs_inner = base.blockFromLoc(loc+'_stairs_inner')

    let blockstate = {
        "variants": {
            "facing=east,half=bottom,shape=straight": {
                "model": stairs
            },
            "facing=west,half=bottom,shape=straight": {
                "model": stairs,
                "y": 180,
                "uvlock": true
            },
            "facing=south,half=bottom,shape=straight": {
                "model": stairs,
                "y": 90,
                "uvlock": true
            },
            "facing=north,half=bottom,shape=straight": {
                "model": stairs,
                "y": 270,
                "uvlock": true
            },
            "facing=east,half=bottom,shape=outer_right": {
                "model": stairs_outer
            },
            "facing=west,half=bottom,shape=outer_right": {
                "model": stairs_outer,
                "y": 180,
                "uvlock": true
            },
            "facing=south,half=bottom,shape=outer_right": {
                "model": stairs_outer,
                "y": 90,
                "uvlock": true
            },
            "facing=north,half=bottom,shape=outer_right": {
                "model": stairs_outer,
                "y": 270,
                "uvlock": true
            },
            "facing=east,half=bottom,shape=outer_left": {
                "model": stairs_outer,
                "y": 270,
                "uvlock": true
            },
            "facing=west,half=bottom,shape=outer_left": {
                "model": stairs_outer,
                "y": 90,
                "uvlock": true
            },
            "facing=south,half=bottom,shape=outer_left": {
                "model": stairs_outer
            },
            "facing=north,half=bottom,shape=outer_left": {
                "model": stairs_outer,
                "y": 180,
                "uvlock": true
            },
            "facing=east,half=bottom,shape=inner_right": {
                "model": stairs_inner
            },
            "facing=west,half=bottom,shape=inner_right": {
                "model": stairs_inner,
                "y": 180,
                "uvlock": true
            },
            "facing=south,half=bottom,shape=inner_right": {
                "model": stairs_inner,
                "y": 90,
                "uvlock": true
            },
            "facing=north,half=bottom,shape=inner_right": {
                "model": stairs_inner,
                "y": 270,
                "uvlock": true
            },
            "facing=east,half=bottom,shape=inner_left": {
                "model": stairs_inner,
                "y": 270,
                "uvlock": true
            },
            "facing=west,half=bottom,shape=inner_left": {
                "model": stairs_inner,
                "y": 90,
                "uvlock": true
            },
            "facing=south,half=bottom,shape=inner_left": {
                "model": stairs_inner
            },
            "facing=north,half=bottom,shape=inner_left": {
                "model": stairs_inner,
                "y": 180,
                "uvlock": true
            },
            "facing=east,half=top,shape=straight": {
                "model": stairs,
                "x": 180,
                "uvlock": true
            },
            "facing=west,half=top,shape=straight": {
                "model": stairs,
                "x": 180,
                "y": 180,
                "uvlock": true
            },
            "facing=south,half=top,shape=straight": {
                "model": stairs,
                "x": 180,
                "y": 90,
                "uvlock": true
            },
            "facing=north,half=top,shape=straight": {
                "model": stairs,
                "x": 180,
                "y": 270,
                "uvlock": true
            },
            "facing=east,half=top,shape=outer_right": {
                "model": stairs_outer,
                "x": 180,
                "y": 90,
                "uvlock": true
            },
            "facing=west,half=top,shape=outer_right": {
                "model": stairs_outer,
                "x": 180,
                "y": 270,
                "uvlock": true
            },
            "facing=south,half=top,shape=outer_right": {
                "model": stairs_outer,
                "x": 180,
                "y": 180,
                "uvlock": true
            },
            "facing=north,half=top,shape=outer_right": {
                "model": stairs_outer,
                "x": 180,
                "uvlock": true
            },
            "facing=east,half=top,shape=outer_left": {
                "model": stairs_outer,
                "x": 180,
                "uvlock": true
            },
            "facing=west,half=top,shape=outer_left": {
                "model": stairs_outer,
                "x": 180,
                "y": 180,
                "uvlock": true
            },
            "facing=south,half=top,shape=outer_left": {
                "model": stairs_outer,
                "x": 180,
                "y": 90,
                "uvlock": true
            },
            "facing=north,half=top,shape=outer_left": {
                "model": stairs_outer,
                "x": 180,
                "y": 270,
                "uvlock": true
            },
            "facing=east,half=top,shape=inner_right": {
                "model": stairs_inner,
                "x": 180,
                "y": 90,
                "uvlock": true
            },
            "facing=west,half=top,shape=inner_right": {
                "model": stairs_inner,
                "x": 180,
                "y": 270,
                "uvlock": true
            },
            "facing=south,half=top,shape=inner_right": {
                "model": stairs_inner,
                "x": 180,
                "y": 180,
                "uvlock": true
            },
            "facing=north,half=top,shape=inner_right": {
                "model": stairs_inner,
                "x": 180,
                "uvlock": true
            },
            "facing=east,half=top,shape=inner_left": {
                "model": stairs_inner,
                "x": 180,
                "uvlock": true
            },
            "facing=west,half=top,shape=inner_left": {
                "model": stairs_inner,
                "x": 180,
                "y": 180,
                "uvlock": true
            },
            "facing=south,half=top,shape=inner_left": {
                "model": stairs_inner,
                "x": 180,
                "y": 90,
                "uvlock": true
            },
            "facing=north,half=top,shape=inner_left": {
                "model": stairs_inner,
                "x": 180,
                "y": 270,
                "uvlock": true
            }
        }
    }

    let blockModelOuter = {
        "parent": "block/outer_stairs",
        "textures": {
            "bottom": textures.bottom,
            "top": textures.top,
            "side": textures.side
        }
    }

    let blockModelInner = {
        "parent": "block/inner_stairs",
        "textures": {
            "bottom": textures.bottom,
            "top": textures.top,
            "side": textures.side
        }
    }

    let blockModel = {
        "parent": "block/stairs",
        "textures": {
            "bottom": textures.bottom,
            "top": textures.top,
            "side": textures.side
        }
    }

    blockItemModel(base.pathFromLoc(loc+'_stairs', 'item'), base.blockFromLoc(loc+'_stairs'))

    base.saveJson(blockstate, base.pathFromLoc(loc+'_stairs', 'blockstate'))
    base.saveJson(blockModelOuter, base.pathFromLoc(loc+'_stairs_outer', 'block'))
    base.saveJson(blockModelInner, base.pathFromLoc(loc+'_stairs_inner', 'block'))
    base.saveJson(blockModel, base.pathFromLoc(loc+'_stairs', 'block'))
}

/**
 * 
 * @param {string} loc 
 * @param {{end:string, side:string}} textures 
 */
let pillar = (loc, textures) => {

    let blockstate = {
        "variants": {
            "axis=x": {
            "model": base.blockFromLoc(loc+'_horizontal'),
                "x": 90,
                "y": 90
            },
            "axis=y": {
                "model": base.blockFromLoc(loc)
            },
            "axis=z": {
                "model": base.blockFromLoc(loc+'_horizontal'),
                "x": 90
            }
        }
    }

    let blockPart = {
        "parent": "minecraft:block/cube_column",
        "textures": {
            "end": textures.end,
            "side": textures.side
        }
    }

    let blockPartHorizontal = {
        "parent": "minecraft:block/cube_column_horizontal",
        "textures": {
            "end": textures.end,
            "side": textures.side
        }
    }

    base.saveJson(blockPart, base.pathFromLoc(loc, 'block'))
    base.saveJson(blockPartHorizontal, base.pathFromLoc(loc+'_horizontal', 'block'))
    base.saveJson(blockstate, base.pathFromLoc(loc, 'blockstate'))
    blockItemModel(base.pathFromLoc(loc, 'item'), base.blockFromLoc(loc))
}

let block = (loc) => {

    let blockPart = {
        "parent": "block/cube_all",
        "textures": {
            "all": base.blockFromLoc(loc)
        }
    }

    base.saveJson(blockPart, base.pathFromLoc(loc, 'block'))

    basicBlockstate(base.pathFromLoc(loc, 'blockstate'), base.blockFromLoc(loc))
    blockItemModel(base.pathFromLoc(loc, 'item'), base.blockFromLoc(loc))
}


/**
 * slab model
 * @param {string} loc 
 * @param {string} texture
 */
 let ladder = (loc, texture) => {
    let blockstate = {
        "variants": {
            "facing=east": {
                "model": base.blockFromLoc(loc),
                "y": 90
            },
                "facing=north": {
                "model": base.blockFromLoc(loc)
            },
            "facing=south": {
                "model": base.blockFromLoc(loc),
                "y": 180
            },
            "facing=west": {
                "model": base.blockFromLoc(loc),
                "y": 270
            }
        }
    }

    let blockModel = {
        "ambientocclusion": false,
        "textures": {
            "particle": texture,
            "texture": texture
        },
        "elements": [
            {   "from": [ 0, 0, 15.2 ],
                "to": [ 16, 16, 15.2 ],
                "shade": false,
                "faces": {
                    "north": { "uv": [ 0, 0, 16, 16 ], "texture": "#texture" },
                    "south": { "uv": [ 16, 0, 0, 16 ], "texture": "#texture" }
                }
            }
        ]
    }

    itemModel(base.pathFromLoc(loc, 'item'), texture)

    base.saveJson(blockstate, base.pathFromLoc(loc, 'blockstate'))
    base.saveJson(blockModel, base.pathFromLoc(loc, 'block'))
}

/**
 * Anvil model
 * @param {string} loc 
 * @param {string} modID
 * @param {string} metal
 */
 let tfcAnvil = (modID, metal) => {

    let loc = `${modID}:metal/anvil/${metal}`
    let blockstate = {
        "variants": {
            "facing=north": {
                "model": `${modID}:block/metal/anvil/${metal}`,
                "y": 90
            },
            "facing=east": {
                "model":  `${modID}:block/metal/anvil/${metal}`,
                "y": 180
            },
            "facing=south": {
                "model":  `${modID}:block/metal/anvil/${metal}`,
                "y": 270
            },
            "facing=west": {
                "model": `${modID}:block/metal/anvil/${metal}`
            }
        }
    }

    let blockModel = {
        "parent": "tfc:block/anvil",
        "textures": {
            "all":  `${modID}:block/metal/full/${metal}`,
            "particle": `${modID}:block/metal/full/${metal}`
        }
    }

    blockItemModel(base.pathFromLoc(loc, 'item'), `${modID}:block/metal/anvil/${metal}`)

    base.saveJson(blockstate, base.pathFromLoc(loc, 'blockstate'))
    base.saveJson(blockModel, base.pathFromLoc(loc, 'block'))
}

/**
 * Chain model
 * @param {string} loc 
 * @param {string} modID
 * @param {string} metal
 */
 let tfcChain = (modID, metal) => {

    let loc = `${modID}:metal/chain/${metal}`
    let blockstate = {
        "variants": {
            "axis=x": {
                "model": `${modID}:block/metal/chain/${metal}`,
                "x": 90,
                "y": 90
            },
            "axis=y": {
                "model": `${modID}:block/metal/chain/${metal}`
            },
            "axis=z": {
                "model": `${modID}:block/metal/chain/${metal}`,
                "x": 90
            }
        }
    }

    let blockModel = {
        "parent": "minecraft:block/chain",
        "textures": {
            "all":  `${modID}:block/metal/chain/${metal}`,
            "particle": `${modID}:block/metal/chain/${metal}`
        }
    }

    itemModel(base.pathFromLoc(loc, 'item'), `${modID}:block/metal/chain/${metal}`)

    base.saveJson(blockstate, base.pathFromLoc(loc, 'blockstate'))
    base.saveJson(blockModel, base.pathFromLoc(loc, 'block'))
}

/**
 * ^Lamp model
 * @param {string} loc 
 * @param {string} modID
 * @param {string} metal
 */
 let tfcLamp = (modID, metal) => {

    let loc = `${modID}:metal/lamp/${metal}`
    let blockstate = {
        "variants": {
            "hanging=false,lit=false": {
                "model": `${modID}:block/metal/lamp/${metal}_off`
            },
            "hanging=true,lit=false": {
                "model": `${modID}:block/metal/lamp/${metal}_hanging_off`
            },
            "hanging=false,lit=true": {
                "model": `${modID}:block/metal/lamp/${metal}_on`
            },
            "hanging=true,lit=true": {
                "model": `${modID}:block/metal/lamp/${metal}_hanging_on`
            }
        }
    }

    let lampOff = {
        "parent": "tfc:block/lamp",
        "textures": {
            "metal": `${modID}:block/metal/full/${metal}`,
            "lamp": "tfc:block/lamp_off"
        }
    }

    let lampOn = {
        "parent": "tfc:block/lamp",
        "textures": {
            "metal": `${modID}:block/metal/full/${metal}`,
            "lamp": "tfc:block/lamp"
        }
    }

    let lampHangingOn = {
        "parent": "tfc:block/lamp_hanging",
        "textures": {
            "metal": `${modID}:block/metal/full/${metal}`,
            "metal": `${modID}:block/metal/chain/${metal}`,
            "lamp": "tfc:block/lamp"
        }
    }

    let lampHangingOff = {
        "parent": "tfc:block/lamp_hanging",
        "textures": {
            "metal": `${modID}:block/metal/full/${metal}`,
            "metal": `${modID}:block/metal/chain/${metal}`,
            "lamp": "tfc:block/lamp_off"
        }
    }

    itemModel(base.pathFromLoc(loc, 'item'), `${modID}:block/metal/chain/${metal}`)

    base.saveJson(blockstate, base.pathFromLoc(loc, 'blockstate'))
    base.saveJson(lampOff, base.pathFromLoc(`${modID}:metal/lamp/${metal}_off`, 'block'))
    base.saveJson(lampOn, base.pathFromLoc(`${modID}:metal/lamp/${metal}_on`, 'block'))
    base.saveJson(lampHangingOff, base.pathFromLoc(`${modID}:metal/lamp/${metal}_hanging_off`, 'block'))
    base.saveJson(lampHangingOn, base.pathFromLoc(`${modID}:metal/lamp/${metal}_hanging_on`, 'block'))
}

/**
 * Trapdoor model
 * @param {string} loc 
 * @param {string} modID
 * @param {string} metal
 */
 let tfcTrapdoor = (modID, metal) => {

    let loc = `${modID}:metal/trapdoor/${metal}`
    let model = `${modID}:block/metal/trapdoor/${metal}`
    let bottom = model+'_bottom'
    let top = model+'_top'
    let open = model+'_open'
    let blockstate = {
        "variants": {
            "facing=north,half=bottom,open=false": {
                "model": bottom
            },
            "facing=south,half=bottom,open=false": {
                "model": bottom,
                "y": 180
            },
            "facing=east,half=bottom,open=false": {
                "model": bottom,
                "y": 90
            },
            "facing=west,half=bottom,open=false": {
                "model": bottom,
                "y": 270
            },
            "facing=north,half=top,open=false": {
                "model": top
            },
            "facing=south,half=top,open=false": {
                "model": top,
                "y": 180
            },
            "facing=east,half=top,open=false": {
                "model": top,
                "y": 90
            },
            "facing=west,half=top,open=false": {
                "model": top,
                "y": 270
            },
            "facing=north,half=bottom,open=true": {
                "model": open
            },
            "facing=south,half=bottom,open=true": {
                "model": open,
                "y": 180
            },
            "facing=east,half=bottom,open=true": {
                "model": open,
                "y": 90
            },
            "facing=west,half=bottom,open=true": {
                "model": open,
                "y": 270
            },
            "facing=north,half=top,open=true": {
                "model": open,
                "x": 180,
                "y": 180
            },
            "facing=south,half=top,open=true": {
                "model": open,
                "x": 180,
                "y": 0
            },
            "facing=east,half=top,open=true": {
                "model": open,
                "x": 180,
                "y": 270
            },
            "facing=west,half=top,open=true": {
                "model": open,
                "x": 180,
                "y": 90
            }
        }
    }

    let blockBottom = {
        "parent": "block/template_orientable_trapdoor_bottom",
        "textures": {
            "texture": `${modID}:block/metal/trapdoor/${metal}`
        }
    }

    let blockTop = {
        "parent": "block/template_orientable_trapdoor_top",
        "textures": {
            "texture": `${modID}:block/metal/trapdoor/${metal}`
        }
    }

    let blockOpen = {
        "parent": "block/template_orientable_trapdoor_open",
        "textures": {
            "texture": `${modID}:block/metal/trapdoor/${metal}`
        }
    }

    itemModel(base.pathFromLoc(loc, 'item'), bottom)

    base.saveJson(blockstate, base.pathFromLoc(loc, 'blockstate'))
    base.saveJson(blockTop, base.pathFromLoc(`${modID}:metal/trapdoor/${metal}_top`, 'block'))
    base.saveJson(blockOpen, base.pathFromLoc(`${modID}:metal/trapdoor/${metal}_open`, 'block'))
    base.saveJson(blockBottom, base.pathFromLoc(`${modID}:metal/trapdoor/${metal}_bottom`, 'block'))
}

/**
 * 
 * @param {string} modID 
 * @param {string} type 
 * @param {string} metal 
 */
let tfcBlocks = (modID, type, metal) => {
    switch (type) {
        case 'anvil': {
            tfcAnvil(modID, metal)
            break;
        }
        case 'chain': {
            tfcChain(modID, metal)
            break;
        }
        case 'lamp': {
            tfcLamp(modID, metal)
            break;
        }
        case 'trapdoor': {
            tfcTrapdoor(modID, metal)
            break;
        }
    }
}

let tfcMetalItem = (modID, type, metal) => {
    let loc = `${modID}:metal/${type}/${metal}`
    itemModel(base.pathFromLoc(loc, 'item'), base.itemFromLoc(loc))
}

module.exports = {
    blockItemModel,
    itemModel,
    itemModelWithLayers,
    basicBlockstate,
    block,
    slab,
    wall,
    stairs,
    pillar,
    ladder,
    tfcBlocks,
    tfcMetalItem
}