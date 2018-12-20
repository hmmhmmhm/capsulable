var field = null

class A {
    constructor(_field){
        if(!field)
            field = _field(A)
    }
    getPrivate(){
        return field.private.get(this, 'name')
    }
    setPrivate(name){
        return field.private.set(this, 'name', name)
    }
}

module.exports = A