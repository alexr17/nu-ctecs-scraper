const Generic = require('./generic');
const Course = require('./course');
const Instructor = require('./instructor');

class Ctec extends Generic {
    constructor(name, course, instructor, department, year, quarter) {
        // console.log(`Creating ctec: ${name}, ${course}, ${department}, ${instructor}`)
        super(name);
        this.year = year;
        this.quarter = quarter;
        return (async () => {
            try {
                this.course_id = (await new Course(course, department, instructor)).id;
                this.instructor_id = (await new Instructor(instructor, department)).id;
                this.id = (await this.find_or_create()).id;
            } catch (e) {
                console.log(e);
            }
            return this;
        })();
    }
}

module.exports = Ctec