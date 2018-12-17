// Codes that access store variables
// should not be shared different class.
const capsulable = require('../../src/capsule')
const _private = capsulable('private')

// It is dangerous to create a function
// in which the private variable is
// freely accessible from the outside as a sample for testing.
class Account {
    /*
    constructor(_inherit){
        const _protected = capsulable('protected')
        if(new.target != Account){
            if(typeof _inherit === 'object')
                _inherit._protected = _protected
        }
    }
    */
    get(userName){
        return _private.get(this, userName)
    }
    getAll(){
        return _private.getAll(this)
    }
    set(userName, data){
        return _private.set(this, userName, data)
    }
    exist(userName){
        return _private.exist(this, userName)
    }
    remove(userName){
        return _private.remove(this, userName)
    }
    removeAll(){
        return _private.removeAll(this)
    }

    wrongReference(){
        return _private.set(null, 'wrong', 'ref')
    }
    vulnerable1(callback){
        if(typeof callback === 'function')
        callback()
    }
    vulnerable2(){
        return _private.set(this, 'vulnerable2', _private)
    }
}

// Using the register function on private storage is not mandatory.
// It's prevent misusing instances of different classes.
_private.register(Account)
// _protected.register(Account)

module.exports = Account