const Generic = require('./generic')

class Course extends Generic {
    constructor(name, department, instructor) {
        super(name);
        this.department_id = department;
        this.instructor_id = instructor;
    }
}

module.exports = Course