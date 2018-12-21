const Capsulate = require('../../')
const Field = Capsulate()

class C {
    constructor(_field){
        Field(this, _field)
    }

    getPrivate(){
        return Field(this)
                .private.get('name')
    }
    setPrivate(name){
        return Field(this)
                .private.set('name', name)
    }

    getProtected(){
        return Field(this)
                .protected.get('A', 'age')
    }
    setProtected(age){
        return Field(this)
                .protected.set('A', 'age', age)
    }

    getProtectedStatic(){
        return Field(this)
                .protectedStatic.get('A', 'version')
    }
    setProtectedStatic(version){
        return Field(this)
                .protectedStatic.set('A', 'version', version)
    }
}

module.exports = C