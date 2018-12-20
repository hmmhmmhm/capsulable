/**
 * @returns {Protected}
 */
module.exports = ()=>{
    var store = {}

    class Protected {
        /**
         * @param {string} key
         */
        get(key){
            if(key === undefined)
                return undefined
            if(typeof store[key] === 'undefined')
                return undefined

            return store[key]
        }
        getAll(){
            return store
        }
        /**
         * @param {string} key
         * @param {*} data
         * @returns {boolean} isSuccess
         */
        set(key, data){
            // Prevents storing self instance within variables.
            if(data instanceof Protected)
                return false

            if(key === undefined)
                return false

            if(data === undefined)
                return this.remove(key)

            store[key] = data
            return true
        }
        /**
         * @param {string} key
         * @returns {boolean} isSuccess
         */
        remove(key){
            if(key === undefined)
                return false

            if(typeof store[key] == 'undefined')
                return false

            delete(store[key])
            return true
        }
        removeAll(){
            store = {}
            return true
        }
        /**
         * @param {string} key
         * @returns {boolean}
         */
        exist(key){
            if(key === undefined)
                return false

            return this.get(key) !== undefined
        }
    }
    return new Protected()
}