const Generic = require('./generic')

class Department extends Generic {
    constructor(name) {
        // console.log(`Creating department: ${name}`)
        super(name)
        return (async () => {
            this.id = (await this.find_or_create()).id;
            return this;
        })();
    }
}

module.exports = Department