const Field = require('./src/initialize')
const Packages = require('./src/packages')
const Capsulable = require('./src/capsulable')
const Helper = require('./src/helper')

/**
 * @param {*} Origin 
 * @param {*} inherit 
 * @returns {Helper}
 */
function Capsulator (Origin, inherit){

    if(Origin === undefined && inherit === undefined)
        return Helper()

    // After class encapsulation, when implementing an
    // inheritance class, it is also available as a
    // function for inheriting objects.
    if((typeof Origin == 'function' || typeof Origin == 'object')
        && !Array.isArray(Origin)
        && typeof inherit == 'object'){

        for(let key of Object.keys(Origin))
            inherit[key] = Origin[key]
        return 
    }

    // Allow multiple classes to have
    // shared protected-static fields.
    // (similar to the Java package concept)
    if(Array.isArray(Origin)){
        let packs = Packages(Field())
        for(let OriginItem of Origin)
            packs._load(OriginItem)
        return packs
    }

    // Configure encapsulated class.
    let mode = undefined
    if(typeof inherit == 'string') mode = inherit
    return Capsulable(Origin, Field(), mode)
}

module.exports = Capsulator