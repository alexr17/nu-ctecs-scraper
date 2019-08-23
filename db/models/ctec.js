const Generic = require('./generic')

class Ctec extends Generic {
    constructor(name, course, instructor) {
        super(name);
        this.course_id = course;
        this.instructor_id = instructor;
    }
}

module.exports = Ctec