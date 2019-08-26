const Generic = require('./generic');

class CtecData extends Generic {
    /**
     * Should only be created after creating a ctec instance
     * @param {Number} ctec_id
     * @param {Object} data
     */
    constructor(ctec_id, data) {
        super();
        return (async () => {
            try {
                Object.assign(this, data); // Assigning data to this
                this.ctec_id = ctec_id;
                this.id = (await this.find_or_create()).id
            } catch (e) {
                console.log(e);
            }
            return this;
        })();
    }

    static required_columns() {
        return ["response_ratio","instruction_rating","learn_rating","challenge_rating","interest_rating","time_spent","ctec_id"]
    }
}

module.exports = CtecData