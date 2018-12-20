/**
 * @description
 * Encapsulates classes created by users.
 * 
 * @returns {function}
 */
module.exports = (Origin, Protect)=>{
    return class Capsulable extends Origin {
        constructor(inherit){
            const Field = Protect()
            super(Field)
            if(typeof inherit === 'object')
                if(new.target != this.constructor.name)
                   inherit.field = Field
        }
    }
}