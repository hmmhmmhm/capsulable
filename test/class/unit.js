const assert = require('assert')

module.exports = (a1, a2)=>{
    // Private Test
    a1.setPrivate('A1')
    assert(a1.getPrivate() == 'A1')
    assert(a2.getPrivate() === undefined)

    a2.setPrivate('A2')
    assert(a1.getPrivate() == 'A1')
    assert(a2.getPrivate() == 'A2')

    // Protected Test
    a1.setProtected(24)
    assert(a1.getProtected() == 24)
    assert(a2.getProtected() === undefined)
    a2.setProtected(25)
    assert(a1.getProtected() == 24)
    assert(a2.getProtected() == 25)

    // Protected Static Test
    a1.setProtectedStatic('12.0.0')
    assert(a1.getProtectedStatic() == '12.0.0')
    assert(a2.getProtectedStatic() == '12.0.0')
    a2.setProtectedStatic('13.0.0')
    assert(a1.getProtectedStatic() == '13.0.0')
    assert(a2.getProtectedStatic() == '13.0.0')
}