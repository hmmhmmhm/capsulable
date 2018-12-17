class Packages {
    _load(Origin){
        if(typeof this[Origin.prototype.constructor.name] != 'undefined')
            throw new Error('Class with the same name cannot exist within the same package.')

        this[Origin.prototype.constructor.name] = 
            class Capsulable extends Origin {
                constructor(){
                    super(field)
                }
            }
    }
    _unload(Origin){
        if(typeof this[Origin.prototype.constructor.name] == 'undefined')
            throw new Error('Package does not have a matching class.')

        delete(this[Origin.prototype.constructor.name])
    }
}

module.exports = Packages