const Generic = require('./generic');
const Department = require('./department');
const Instructor = require('./instructor');

class Course extends Generic {
    constructor(name, department, instructor) {
        // console.log(`Creating course: ${name}, ${department}, ${instructor}`)
        super(name);
        return (async () => {
            this.department_id = (await new Department(department)).id;
            this.instructor_id = (await new Instructor(instructor, department)).id;
            this.id = (await this.find_or_create()).id;
            return this;
        })();
    }
}

module.exports = Course