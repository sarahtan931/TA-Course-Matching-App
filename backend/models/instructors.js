var mongoose = require('mongoose');

const Prefer = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    }
);

const InstructorSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        preference: {
            type: [Prefer],
            default: null
        }
    },
    { strict: false }
);

module.exports = instructors = mongoose.model("Instructors", InstructorSchema);