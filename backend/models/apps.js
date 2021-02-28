var mongoose = require('mongoose');

const AppSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true
        },
        answers: {
            type: [String],
            default: null
        },
        name: {
            type: String,
            required: true
        }
    },
    { strict: false }
);

module.exports = applications = mongoose.model("applications", AppSchema);
