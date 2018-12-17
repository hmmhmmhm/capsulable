const capsule = require('./capsule')

module.exports = ()=>{
    const _private = capsule('private')
    const _protected = capsule('protected')
    const _protectedStatic = capsule('protected-static')

    class Field {
        static get private(){
            return _private
        }
        static get protected(){
            return _protected
        }
        static get protectedStatic(){
            return _protectedStatic
        }
    }
    return Field
}