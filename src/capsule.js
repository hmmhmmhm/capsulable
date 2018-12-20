const _private = require('./private')
const _protected = require('./protected')
const _protectedStatic = require('./protected-static')

/**
 * @returns {function} Capsule
 */
module.exports = (limitType = 'private')=>{
    switch(limitType.toLowerCase()){
        case 'protected':
            return _protected()
        case 'protected-static':
            return _protectedStatic()

        case 'private':
        default:
            return _private()
    }
}