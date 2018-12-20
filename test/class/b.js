const A = require('./a')
var field = null

class B extends A{
    constructor(_field){
        super(_field)
        if(!field)
            field = _field(B)
    }
}

module.exports = B