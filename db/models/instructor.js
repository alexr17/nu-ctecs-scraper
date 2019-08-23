const Generic = require('./generic')

class Instructor extends Generic {
    constructor(name, department) {
        super();
        this.department_id = department;
    }
}

module.exports = Instructor