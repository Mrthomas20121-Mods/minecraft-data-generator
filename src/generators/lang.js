const base = require('./base')

class Language {

    #obj = {}

    constructor(modID) {
        this.modID = modID
    }

    /**
     * @param {string} key 
     * @param {string} type 
     * @returns 
     */
    #convertKey(key, type='item') {
        if(type == 'item') {
            return `item.${this.modID}.${key.split('/').join('_')}`
        }
        else {
            return `block.${this.modID}.${key.split('/').join('_')}`
        }
    }
    
    add(key, value) {
        this.#obj[key] = value
    }

    addBlock(blockId, blockName) {
        this.add(this.#convertKey(blockId, 'block'), blockName)
    }

    addItem(blockId, blockName) {
        this.add(this.#convertKey(blockId, 'item'), blockName)
    }

    build() {
        base.saveJson(this.#obj, base.path.join(base.createPath(`./assets/${this.modID}/lang/`), 'en_us'))
    }
}

module.exports = Language