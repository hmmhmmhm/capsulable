/**
 * @description
 * This function finds array index
 * used as store key through reference.
 * 
 * @param {object} reference 
 * @param {object} store 
 */
const getUniqueId = (reference, store)=>{
    let index = -1
    for(let storeItemIndex in store){
        let storeItem = store[storeItemIndex]

        if(storeItem['reference'] === reference){
            index = storeItemIndex
            break
        }
    }
    return index
}

/**
 * @description
 * This function verifies that an
 * instance based on the class
 * prototype is used as a reference.
 * 
 * @param {object} reference
 * @param {function} originInstance
 */
const validate = (reference, originInstance)=>{
    if(originInstance === null || originInstance === undefined)
        return true

    if(reference instanceof originInstance)
        return true

    let yello = String.fromCharCode(0x1b) + '[33;1m'
    let reset = String.fromCharCode(0x1b) + '[39;1m'
    
    throw new Error(`${yello}(capsulable.js:23)\n`
        + `A value different from the class prototype\n`
        + `registered in the repository was used as a reference.${reset}\n`)
}

/**
 * @param {function} _instance
 * @returns {Private} instance
 */
module.exports = (_instance)=>{

    var store = []
    var originInstance = undefined

    class Private {
        /**
         * @param {object} reference 
         * @param {string} key 
         */
        get(reference, key){
            if(key === undefined)
                return undefined

            validate(reference, originInstance)

            let uniqueId = getUniqueId(reference, store)
            if(uniqueId === -1)
                return undefined

            if(typeof store[uniqueId]['data'][key] === 'undefined')
                return undefined

            return store[uniqueId]['data'][key]
        }
        /**
         * @param {object} reference
         */
        getAll(reference){
            validate(reference, originInstance)

            let uniqueId = getUniqueId(reference, store)
            if(uniqueId === -1)
                return undefined

            return store[uniqueId]
        }
        /**
         * @param {object} reference
         * @param {string} key
         * @param {*} data
         * @returns {boolean} isSuccess
         */
        set(reference, key, data){
            validate(reference, originInstance)

            // Prevents storing self instance within variables.
            if(data instanceof Private)
                return false

            let uniqueId = getUniqueId(reference, store)

            if(key === undefined)
                return false

            if(data === undefined)
                return this.remove(reference, key)

            if(uniqueId !== -1){
                store[uniqueId]['data'][key] = data
            }else{
                let storedData = {}
                storedData[key] = data

                store.push({
                    reference,
                    data: storedData
                })
            }
            return true
        }
        /**
         * @param {object} reference
         * @param {string} key
         * @returns {boolean} isSuccess
         */
        remove(reference, key){
            validate(reference, originInstance)

            let uniqueId = getUniqueId(reference, store)
            if(uniqueId === -1)
                return false

            if(key === undefined)
                return false

            if(typeof store[uniqueId]['data'][key] == 'undefined')
                return false

            delete(store[uniqueId]['data'][key])
            
            if(Object.keys(store[uniqueId]['data']).length == 0)
                this.removeAll(reference)
            return true
        }
        /**
         * @param {object} reference
         * @returns {boolean} isSuccess
         */
        removeAll(reference){
            validate(reference, originInstance)

            let uniqueId = getUniqueId(reference, store)
            if(uniqueId === -1)
                return false

            store.splice(uniqueId, 1)
            return true
        }
        /**
         * @param {object} reference
         * @param {string} key
         * @returns {boolean} isExist
         */
        exist(reference, key){
            validate(reference, originInstance)

            let uniqueId = getUniqueId(reference, store)
            if(uniqueId === -1)
                return false

            if(key === undefined) return false

            return this.get(reference, key) !== undefined
        }
        /**
         * @description
         * Registering a class prototype will cause
         * an error if the reference is different from
         * the class prototype when using the store.
         * 
         * @param {function} instance
         * @returns {boolean} isSuccess
         */
        register(instance){
            if(originInstance !== undefined) return false
            originInstance = instance

            return true
        }
    }

    const _private = new Private()

    if(_instance !== undefined){
        class GuidedPrivate{
            /**
             * @param {string} key 
             */
            get(key){
                return _private.get(_instance, key)
            }

            getAll(){
                return _private.getAll(_instance)
            }
            
            /**
             * @param {string} key
             * @param {*} data
             * @returns {boolean} isSuccess
             */
            set(key, data){
                return _private.set(_instance, key, data)
            }
            
            /**
             * @param {string} key
             * @returns {boolean} isSuccess
             */
            remove(key){
                return _private.remove(_instance, key)
            }
            
            /**
             * @returns {boolean} isSuccess
             */
            removeAll(){
                return _private.removeAll(_instance)
            }
            
            /**
             * @param {string} key
             * @returns {boolean} isExist
             */
            exist(key){
                return _private.exist(_instance, key)
            }
        }
        return new GuidedPrivate()
    }
    return _private
}