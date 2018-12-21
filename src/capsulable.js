/**
 * @description
 * Encapsulates classes created by users.
 * 
 * @returns {function}
 */
module.exports = (Origin, Protect, mode)=>{
    return class Capsulable extends Origin {
        constructor(inherit){
            const Field = Protect()
            super(Field)

            // When in final mode,
            // the data field is
            // not passed to the child class.
            if(typeof mode == 'string'
                && mode.toLowerCase() == 'final')
                return

            if(typeof inherit === 'object')
                if(new.target != this.constructor.name)
                   inherit.field = Field
        }
    }
}