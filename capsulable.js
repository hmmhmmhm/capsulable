const capsule = require('./capsule')

const _private = capsule('private')
const _protectedStatic = capsule('protected-static')

class Capsulable {
    static check(origin){

    }
    static init(){
        return 'let capsule = {};'
            + 'super(capsule);'
            + 'if(new.target != eval(this.constructor.name)) Capsulable.link(capsule, inherit);'
            + 'module.exports = capsule;'
    }
    static link(capsule, inherit){
        if(typeof capsule != 'object'
            || typeof inherit != 'object') return Capsulable

        for(let capsuleIndex of Object.keys(capsule))
            inherit[capsuleIndex] = capsule[capsuleIndex]
    }
    constructor(inherit){
        const _protected = capsule('protected')
        if(typeof inherit === 'object'){
            inherit.private = _private
            inherit.protected = _protected
            inherit.protectedStatic = _protectedStatic
        }
    }
}

module.exports = Capsulable