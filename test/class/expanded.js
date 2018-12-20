const Capsulable = require('../../index')

module.exports = (Origin)=>{
    var field = null

    return class Expanded extends Origin{
        constructor(inherit){
            let hook = {}
            super(hook)
            field = hook.field(Expanded)

            if(inherit) Capsulable(hook, inherit)
        }
    }
}