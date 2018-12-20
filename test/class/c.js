var field = null

class C {
    constructor(_field){
        if(!field)
            field = _field(C)
    }
}

module.exports = C