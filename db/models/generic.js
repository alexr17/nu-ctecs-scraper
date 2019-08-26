const knex = require('./../knex_helpers')
const pluralize = require('pluralize')

// TODO: Create a static LRU cache for the objects inserted into the DB. DB operations are extremely fast though, so it's not that big a deal.
class Generic {
    constructor(name) {
        if (name !== undefined)
            this.name = name;
    }
    /**
     * Creates or finds the object
     * @returns {Object} the found or created object
     */
    async find_or_create() {
        try {
            await validate();

            let instance = await knex.where(this.table, this);
            if (!instance.length) {
                let id = await knex.insert(this.table, this);
                instance = await knex.find(this.table, id);
            }
            return instance[0];
        }  catch(e) {
            console.log(e);
        } 
    }

    async validate() {
        if (!(await knex.validate_columns(this.table, Object.keys(this)))) {
            throw ('Columns are invalid!')
        }
        for (let col of this.constructor.required_columns()) {
            if (this[col] === undefined) {
                throw (`Missing column: ${col}`)
            }
        }
        return true;
    }

    get table() {
        return pluralize(this.constructor.name.toLowerCase())
    }

    /**
     * List of columns to validate
     */
    static required_columns() {
        return ['name']
    }
}

module.exports = Generic