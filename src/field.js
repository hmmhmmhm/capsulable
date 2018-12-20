/**
 * @returns {Field}
 */
module.exports = (_private, _protected, _protectedStatic)=>{
    /**
     * @description
     * Field()
     * All the space, such as Private, Protected,
     * and ProtectedStatic, is provided in a single field.
     */
    return class Field {
        /**
         * @returns {Private}
         */
        static get private(){
            return _private
        }
        /**
         * @returns {Protected}
         */
        static get protected(){
            return _protected
        }
        /**
         * @returns {ProtectedStatic}
         */
        static get protectedStatic(){
            return _protectedStatic
        }
    }
}