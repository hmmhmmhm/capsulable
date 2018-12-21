const assert  = require('assert')

const Capsulable = require('../..')
const A = require('./a')
const B = require('./b')
const Expanded = require('./expanded')
const C = require('./c')
const UnitTest = require('./unit')

module.exports = ()=>{

    /**
     * @description
     * Test single-class
     */
    let sharedA = Capsulable(A)
    let a1 = new sharedA()
    let a2 = new sharedA()

    // Private Test
    // Protected Test
    // Protected Static Test
    UnitTest(a1, a2)

    /**
     * @description
     * Test after inherit class
     * (Expanding and inheriting classes after encapsulation)
     */
    let expanded = Expanded(sharedA)
    let expandedA = new expanded()

    // Individual value Protected Abstraction Test by Child Class
    assert(expandedA.getProtected() == undefined)
    expandedA.setProtected(26)
    assert(a1.getProtected() == 24)
    assert(a2.getProtected() == 25)
    assert(expandedA.getProtected() == 26)

    let expandedAgain = Expanded(expanded)
    let expandedAgainA = new expandedAgain()

    assert(expandedAgainA.getProtected() == undefined)
    expandedAgainA.setProtected(27)
    assert(a1.getProtected() == 24)
    assert(a2.getProtected() == 25)
    assert(expandedA.getProtected() == 26)
    assert(expandedAgainA.getProtected() == 27)


    /**
     * @description
     * Test multiple-class package
     */
    let packages = Capsulable([A, B])

    let packA = new packages.A()
    let packB = new packages.B()

    // Private Test
    // Protected Test
    // Protected Static Test
    UnitTest(packA, packB)


    /**
     * @description
     * Tests to add classes after package configuration.
     */
    packages._load(C)

    // Protected Static Test
    let packC = new packages.C()

    // Private Test
    // Protected Test
    // Protected Static Test
    UnitTest(packB, packC)
}