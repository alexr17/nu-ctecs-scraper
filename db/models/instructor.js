const Generic = require('./generic')
const Department = require('./department')
class Instructor extends Generic {
    constructor(name, department) {
        // console.log(`Creating instructor: ${name}, ${department}`)
        super(name);
        return (async () => {
            this.department_id = (await new Department(department)).id;
            this.id = (await this.find_or_create()).id;
            return this;
        })();
    }
}

module.exports = Instructor