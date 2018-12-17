const Account = require('./account')
class Group extends Account{
    constructor(){
        let _inherit = {}
        super(_inherit)

        let _protected = _inherit._protected
        console.log(_protected)
    }
}
module.exports = Group