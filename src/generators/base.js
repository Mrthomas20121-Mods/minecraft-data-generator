const fs = require('fs')
const path = require('path')

/**
 * Create the path if it doesn't exist
 * @param {string} pathTo 
 * @returns {string}
 */
let createPath = (pathTo) => {
    if(!fs.existsSync(pathTo)) {
        fs.mkdirSync(pathTo, { recursive:true })
    }
    return pathTo
}

/**
 * create the path to a folder based on the type
 * @param {string} name
 * @param {'blockstate'|'block'|'item'|'lang'|'loot'} type 
 * @returns {string}
*/
let pathFromLoc = (name, type) => {
   let loc = name.split(':')

   let result = ''

   // based on the type the folder is not the same
    switch (type) {
        case 'loot':
            result = path.join('data', loc[0], 'loot_tables', 'blocks')
            break
        case 'lang':
            result = path.join('assets', loc[0], 'lang')
            break
        case 'blockstate': 
            result = path.join('assets', loc[0], 'blockstates')
            break
        case 'block': 
            result = path.join('assets', loc[0], 'models', 'block')
            break
        case 'item' :
            result = path.join('assets', loc[0], 'models', 'item')
            break
    }
    
    if(loc[1].includes('/')) {
        // split the other location then remove the last part.
        let otherLoc = loc[1].split('/')
        otherLoc.pop()
        createPath(path.join(result, otherLoc.join('/')))
        return path.join(result, loc[1])
    }
    else {
        // create the path if it doesn't exist
        createPath(result)
        return path.join(result, loc[1])
    }
}

let blockFromLoc = (location) => {
    let loc = location.split(':')

    return loc[0]+':block/'+loc[1]
}

/**
 * Save a json file
 * @param {Object<string, any>} json 
 * @param {string} filePath
 */
let saveJson = (json, filePath) => {
    fs.writeFileSync(filePath+'.json', JSON.stringify(json, null, 2), 'utf8')
}

/**
 * base.js contain the base methods used by all the scripts
 */
module.exports = {
    fs,
    path,
    createPath,
    pathFromLoc,
    blockFromLoc,
    saveJson
}