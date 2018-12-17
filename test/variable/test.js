const Account = require('./account.js')
const assert = require('assert')

module.exports = ()=>{
    let admin = new Account()
    let guest  = new Account()

    admin.set('admin1Id', 'admin_password1')
    admin.set('admin2Id', 'admin_password2')

    guest.set('guest1Id', 'guest_password1')
    guest.set('guest2Id', 'guest_password2')

    // Data storage check
    assert(admin.getAll() !== undefined)
    assert(guest.getAll() !== undefined)

    // Unique ID collision check
    assert(admin.get('admin1Id') === 'admin_password1')
    assert(guest.get('admin1Id') === undefined)

    // Remove private variables check
    guest.remove('guest1Id')
    assert(!guest.exist('guest1Id'))

    // Remove all private variables check
    admin.removeAll()
    guest.removeAll()

    assert(admin.getAll() === undefined)
    assert(guest.getAll() === undefined)

    // Confirm automatic deletion of
    // unique store remaining directories
    admin.set('1', 'item1')
    admin.set('2', 'item2')
    admin.remove('1')
    admin.remove('2')
    assert(admin.getAll() === undefined)
    admin.set('3', 'item3')
    assert(admin.getAll() !== undefined)
    admin.removeAll()

    // Prevent incorrect instance usage
    try{
        admin.wrongReference()
        assert.fail()
    }catch(e){}

    // Impossible injection check
    admin.inject = ()=>{
        assert(typeof store === 'undefined')
        assert(typeof storage === 'undefined')
    }
    admin.inject()
    admin.vulnerable1(()=>{
        assert(typeof store === 'undefined')
        assert(typeof storage === 'undefined')
    })

    // Abuse prevent check
    assert(!admin.vulnerable2())
}