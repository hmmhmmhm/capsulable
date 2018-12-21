const Capsulable = require('../../index')

module.exports = (Origin)=>{
    const Field = Capsulable()

    return class Expanded extends Origin{
        constructor(inherit){
            let hook = {}
            super(hook)
            Field(this, hook.field)

            if(inherit) Capsulable(hook, inherit)
        }
    }
}