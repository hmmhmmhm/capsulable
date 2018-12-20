const Capsulable = require('./capsulable')

/**
 * @returns {Packages} instance
 */
module.exports = (Field)=>{
    class Packages {
        /**
         * @param {function} Origin
         * @returns {Capsulable} instance
         */
        _load(Origin){
            if(typeof this[Origin.prototype.constructor.name] != 'undefined')
                throw new Error('Class with the same name cannot exist within the same package.')

            let capsulated = Capsulable(Origin, Field)
            this[Origin.prototype.constructor.name] = capsulated
            return capsulated
        }
        /**
         * @param {function} Origin
         */
        _unload(Origin){
            if(typeof this[Origin.prototype.constructor.name] == 'undefined')
                throw new Error('Package does not have a matching class.')
    
            delete(this[Origin.prototype.constructor.name])
        }
    }
    return new Packages()
}