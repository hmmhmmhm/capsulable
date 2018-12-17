const assert  = require('assert')
const A = require('./a')

module.exports = ()=>{

    // Direct invoke prevention test
    let invoke = {}
    let a = new A(invoke)
    assert(Object.keys(invoke).length == 0)
}