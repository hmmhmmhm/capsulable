const Capsulable = require('../../')
const Field = Capsulable()
const A = require('./a')

class B extends A{
    constructor(_field){
        super(_field)
        Field(this, _field)
    }
}

module.exports = B