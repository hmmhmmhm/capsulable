const getUniqueId = (reference, store)=>{
    let index = -1
    for(let storeItemIndex in store){
        let storeItem = store[storeItemIndex]

        if(storeItem['reference'] === reference){ // TODO Symbol Improvement
            index = storeItemIndex
            break
        }
    }
    return index
}

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

module.exports = (limitType = 'private')=>{

    switch(limitType){
        case 'private':
        case 'protected':
        case 'protected-static':
            break
        default:
            limitType = 'private'
            break
    }

    var store = []
    var originInstance = undefined

    class Capsule {
        get(reference, key){
            validate(reference, originInstance)

            let uniqueId = getUniqueId(reference, store)
            if(uniqueId === -1)
                return undefined

            if(key === undefined)
                return undefined

            if(typeof store[uniqueId]['data'][key] === 'undefined')
                return undefined

            return store[uniqueId]['data'][key]
        }
        getAll(reference){
            validate(reference, originInstance)

            let uniqueId = getUniqueId(reference, store)
            if(uniqueId === -1)
                return undefined

            return store[uniqueId]
        }
        set(reference, key, data){
            validate(reference, originInstance)

            // Prevents storing self instance within variables.
            if(data instanceof Capsule)
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
                    reference, // TODO Symbol Improvement
                    data: storedData
                })
            }
            return true
        }
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
        removeAll(reference){
            validate(reference, originInstance)

            let uniqueId = getUniqueId(reference, store)
            if(uniqueId === -1)
                return false

            store.splice(uniqueId, 1)
            return true
        }
        exist(reference, key){
            validate(reference, originInstance)

            let uniqueId = getUniqueId(reference, store)
            if(uniqueId === -1)
                return false

            if(key === undefined) return false

            return this.get(reference, key) !== undefined
        }
        register(instance){
            if(originInstance !== undefined) return false
            originInstance = instance

            return true
        }
    }
    return new Capsule()
}