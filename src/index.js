const List = require('void-list')
const base = require('./generators/base')
const models = require('./generators/models')
const Language = require('./generators/lang')
const tags = require('./generators/tags')

function isTypeDatapackable(type) {
    return type == 'item' || type == 'block'
}

function run(modID, arr=[]) {
    // making sure the length is greater than 0
    if(arr.length > 0) {
        /**
         * @type {List<{type:string, name:string, addToTag?:string, model?: { slab?: {bottom:string, top:string, side:string}, block?:string, item?:string }, customName?:string}>} 
         */
        let data = List.fromArray(arr)

        let lang = new Language(modID)

        /**
         * @type {List<{name:string, type:string, values:string[]}>} 
         */
        let tagList = data.filter(value => isTypeDatapackable(value.type) && value.hasOwnProperty('addToTag')).map(value => {
            return {
                type:value.type,
                name:value.addToTag,
                values:data.filter(v => isTypeDatapackable(v.type) && v.hasOwnProperty('addToTag') && value.addToTag == v.addToTag).map(va => va.name).toArray()
            }
        })

        tagList.forEach((tag) => {
            tags.createTag(tag.type, tag.name, tag.values)
        })

        data.forEach(value => {
            let type = value.type
            let name = value.name
            let customName = value.hasOwnProperty('customName') ? value.customName : value.name
            
            if(type == 'block') {
                lang.addBlock(name, customName)
                if(name.includes('stair')) {
                    models.stairs()
                }
            }
            else if(type == 'item') {
                lang.addItem(name, customName)
                models.itemModel(base.pathFromLoc(name, 'item'), base.pathFromLoc(name, 'item'))
            }
            else {
                console.warn('No valid types found for this entry !')
            }
        })

        lang.build()
    }
}