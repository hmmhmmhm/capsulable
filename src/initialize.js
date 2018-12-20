const Private = require('./private')
const Protected = require('./protected')
const ProtectedStatic = require('./protected-static')

const Field = require('./field')

/**
 * @description
 * Access restricted space is
 * organized by three initialization processes.
 */
/**
 * @description
 * ProtectedStatic()
 * Protected field is created for each package.
 * 
 * @returns {function} Protected()
 */
module.exports = ()=>{
    const _protectedStatic = ProtectedStatic()

    /**
     * @description
     * Protected()
     * Protected field is created in the Capsulable constructor.
     * 
     * @returns {function} Private()
     */
    return ()=>{
        const _protected = Protected()

        /**
         * @description
         * Private()
         * Private field is created for each class.
         * 
         * @param {function} Origin
         * @returns {Field}
         */
        return (Origin)=>{

            const _private = Private()
            if(Origin !== undefined) _private.register(Origin)

            /**
             * @description
             * Field()
             * All the space, such as Private, Protected,
             * and ProtectedStatic, is provided in a single field.
             */
            return Field(
                _private,
                _protected,
                _protectedStatic)
        }
    }
}