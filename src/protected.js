/**
 * @returns {ProtectedStatic} instance
 */
module.exports = ()=>{
    var store = {}

    class ProtectedStatic {
        /**
         * @param {string} className
         * @param {string} key
         */
        get(className, key){
            if(key === undefined)
                return undefined

            if(typeof store[className] === 'undefined')
                return undefined

            if(typeof store[className][key] === 'undefined')
                return undefined

            return store[className][key]
        }
        /**
         * @param {string} className
         */
        getAll(className){
            return store[className]
        }
        /**
         * @param {string} className
         * @param {string} key
         * @param {*} data
         * @returns {boolean} isSuccess
         */
        set(className, key, data){
            // Prevents storing self instance within variables.
            if(data instanceof ProtectedStatic)
                return false

            if(key === undefined)
                return false

            if(data === undefined)
                return this.remove(className, key)

            if(typeof store[className] != 'undefined'){
                store[className][key] = data
            }else{
                store[className] = {}
                store[className][key] = data
            }
            return true
        }
        /**
         * @param {string} className
         * @param {string} key
         * @returns {boolean} isSuccess
         */
        remove(className, key){
            if(key === undefined)
                return false

            if(typeof store[className][key] == 'undefined')
                return false

            delete(store[className][key])
            
            if(Object.keys(store[className]).length == 0)
                this.removeAll(className)
            return true
        }
        /**
         * @param {string} className
         * @returns {boolean} isSuccess
         */
        removeAll(className){
            if(typeof store[className] == 'undefined')
                return false
            delete(store[className])
            return true
        }
        /**
         * @param {string} className
         * @param {string} key
         * @returns {boolean} isExist
         */
        exist(className, key){
            if(key === undefined) return false
            return this.get(className, key) !== undefined
        }
    }
    return new ProtectedStatic()
}