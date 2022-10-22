const List = require('void-list')
const base = require('./base')

class TagBuilder {

    #knownTypes = ['items', 'blocks', 'fluids', 'entity_types']
    #values = new List()

    /**
     * @param {string} type 
     * @param {string} tagName 
     */
    constructor(type, tagName) {
        if(!this.#knownTypes.includes(type)) throw new RangeError('Unknown Tag Type!')

        this.type = type
        this.tagName = tagName
    }

    /**
     * add All elements to the tag
     * @param  {string[]} elements 
     */
    addAll(...elements) {
        this.#values.fromArray(elements)
        return this
    }

    /**
     * add a element to the tag
     * @param {string} element 
     */
    add(element) {
        this.#values.add(element)
        return this
    }

    build() {
        let json = {
            replace:false,
            values:this.#values.toArray()
        }

        let split = this.tagName.split(':')
        let modid = split[0]
        let tagName = split[1]

        console.log('creating tag with name %s', tagName)

        base.saveJson(json, base.createPath(`data/${modid}/tags/${this.type}/${tagName}`))
    }
}

module.exports = TagBuilder