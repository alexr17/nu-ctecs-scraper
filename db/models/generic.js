const knex = require('./../knex_helpers')
const pluralize = require('pluralize')

class Generic {
    constructor(name) {
        this.name = name;
    }
    /**
     * Creates the object
     */
    async create() {
        try {
            if (!(await knex.validate_columns(this.table, Object.keys(this)))) {
                throw ('Columns are invalid!')
            }

            let instance = await knex.find(this.table, this);
            if (!instance.length) {
                await knex.insert(this.table, this)
            } else {
                console.log('Record already exists in database')
            }
        }  catch(e) {
            console.log(e)
        } 
    }

    get table() {
        return pluralize(this.constructor.name.toLowerCase())
    }
}

module.exports = Generic