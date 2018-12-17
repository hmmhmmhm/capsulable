const A = require('./a')
var field = null

class B extends A{
    constructor(inherit){
        super(inherit)
        field = inherit
    }
}

module.exports = B