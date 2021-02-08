var mongoose = require('mongoose');

const Assign = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        hours: {
            type: Number,
            default: 0
        },
    },
    { strict: false }
);

const CourseSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        instructors: {
            type: [String],
            default: null
        },
        ta_hours_old: {
            type: Number,
            default: 0
        },
        ta_hours_new: {
            type: Number,
            default: 0
        },
        enroll_old: {
            type: Number,
            default: 0
        },
        enroll_new: {
            type: Number,
            default: 0
        },
        questions: {
            type: [String],
            default: 0
        },
        assigned: {
            type: [Assign],
            default: null
        }
    },
    { strict: false }
);

module.exports = courses = mongoose.model("Courses", CourseSchema);