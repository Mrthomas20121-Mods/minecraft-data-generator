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
 * @param {string} layer
 */
let itemModel = (filePath, layer, parent='item/generated') => {
    let json = {
        parent,
        textures:{
            layer0:layer
        }
    }
    base.saveJson(json, filePath)
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
 * 
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

module.exports = {
    blockItemModel,
    itemModel,
    basicBlockstate,
    block,
    slab,
    wall
}