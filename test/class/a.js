const Capsulable = require('../../capsulable')

class A extends Capsulable {
    constructor(inherit={}){
        let store = eval(Capsulable.init())
        console.log(store)
    }
}

module.exports = A