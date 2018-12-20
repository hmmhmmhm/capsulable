const assert  = require('assert')

const Capsulable = require('../..')
const A = require('./a')
const B = require('./b')
const Expanded = require('./expanded')
const C = require('./c')

module.exports = ()=>{

    // Test single-class
    let sharedA = Capsulable(A)
    let a1 = new sharedA()
    let a2 = new sharedA()

    // Private Test
    a1.setPrivate('A1')
    assert(a1.getPrivate() == 'A1')
    assert(a2.getPrivate() === undefined)

    a2.setPrivate('A2')
    assert(a1.getPrivate() == 'A1')
    assert(a2.getPrivate() == 'A2')

    // Protected Static Test


    // Test after inherit class
    // (Expanding and inheriting classes after encapsulation)
    let expanded = Expanded(sharedA)
    let expandedA = new expanded()

    let expandedAgain = Expanded(expanded)
    let expandedAgainA = new expandedAgain()


    // Test multiple-class package
    let packages = Capsulable([A, B])

    // Tests to add classes after package configuration.
    packages._load(C)
}