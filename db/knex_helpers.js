const db = require('./knex')

module.exports = {
    /**
     * Checks if the columns exist in the table
     * @param {String} table_name 
     * @param {Array<String>} columns 
     */
    async validate_columns(table_name, columns) {
        for (let col of columns) {
            if (!(await db.schema.hasColumn(table_name, col))) {
                return false
            }
        }
        return true
    },

    /**
     * Checks if the columns exist in the table
     * @param {String} table 
     * @param {Object} object 
     */
    async find(table, object) {
        return await db(table).where(object)
    },

    /**
     * Inserts object into table
     * @param {String} table 
     * @param {Object} object 
     */
    async insert(table, object) {
        return await db(table).insert(object)
    }
}