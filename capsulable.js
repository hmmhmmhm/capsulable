const Field = require('./src/field')
const Packages = require('./src/packages')

module.exports = (Origin)=>{
    const field = Field()

    if(Array.isArray(Origin)){

        let packs = new Packages()
        for(let OriginItem of Origin)
            packs._load(OriginItem)

        return packs
    }

    return class Capsulable extends Origin {
        constructor(){
            super(field)
        }
    }
}