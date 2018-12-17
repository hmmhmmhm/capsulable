const assert  = require('assert')

const Capsulable = require('../../capsulable')
const A = require('./a')
const B = require('./b')

module.exports = ()=>{

    // Test single-class
    let sharedA = Capsulable(A)
    let a1 = new sharedA()
    let a2 = new sharedA()

    //Test multiple-class package
    let packages = Capsulable([A, B])
    console.log(packages)
}