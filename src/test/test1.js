const models = require('../generators/models')

models.slab('tfc_decoration:bamboo_bricks', {
    bottom:'tfc_decoration:block/bamboo_bricks',
    top:'tfc_decoration:block/bamboo_bricks',
    side:'tfc_decoration:block/bamboo_bricks'
})

models.wall('tfc_decoration:bamboo_bricks', 'tfc_decoration:block/bamboo_bricks')
models.wall('tfc_decoration:raw/bamboo', 'tfc_decoration:block/raw/bamboo')
models.block('tfc_decoration:raw/bamboo', 'tfc_decoration:block/raw/bamboo')