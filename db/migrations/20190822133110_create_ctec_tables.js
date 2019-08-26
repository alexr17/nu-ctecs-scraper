
exports.up = function(knex) {
    return knex.schema.createTable('departments', function (t) {
        t.increments('id').primary()
        t.string('name');
        t.timestamps(true, true)
    }).then(() => {
        return knex.schema.createTable('instructors', function (t) {
            t.increments('id').primary()
            t.string('name');
            t.integer('department_id', 11).unsigned().references('id').inTable('departments');
            t.timestamps(true, true);
        })
    }).then(() => {
        return knex.schema.createTable('courses', function (t) {
            t.increments('id').primary()
            t.string('name');
            t.integer('department_id', 11).unsigned().references('id').inTable('departments');
            t.integer('instructor_id', 11).unsigned().references('id').inTable('instructors');
            t.timestamps(true, true);
        })
    }).then(() => {
        return knex.schema.createTable('ctecs', function (t) {
            t.increments('id').primary();
            t.string('name');
            t.integer('year', 11);
            t.string('quarter');
            t.integer('course_id', 11).unsigned().references('id').inTable('courses');
            t.integer('instructor_id', 11).unsigned().references('id').inTable('instructors');
            t.timestamps(true, true);
        })
    }).then(() => {
        return knex.schema.createTable('ctec_data', function (t) {
            t.increments('id').primary();
            t.json('response_ratio')
            t.json('instruction_rating');
            t.json('learn_rating');
            t.json('challenge_rating');
            t.json('interest_rating');
            t.json('time_spent');
            t.integer('ctec_id', 11).unsigned().references('id').inTable('ctecs');
            t.timestamps(true, true);
        })
    }).catch((err) => {
        console.log(err);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ctec_data').dropTable('ctecs').dropTable('courses').dropTable('instructors').dropTable('departments');
};
