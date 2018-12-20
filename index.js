const Field = require('./src/initialize')
const Packages = require('./src/packages')
const Capsulable = require('./src/capsulable')

module.exports = (Origin, inherit)=>{

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
    return Capsulable(Origin, Field())
}