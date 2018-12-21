const _private = require('./private')

module.exports = () => {
    const store = _private()

    /**
     * @param {function} instance 
     * @param {*} _field 
     */
    function Helper (instance, _field){
        if(_field === undefined)
            return store.get(instance, 'field')

        let field = _field(instance)
        store.set(instance, 'field', field)
    }
    return Helper
}