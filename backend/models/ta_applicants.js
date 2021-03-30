var mongoose = require('mongoose');

const PreferCourse = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }, 
        answers: {
            type: [String],
            default: 0
        }
    }
);

const TASchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: false
        },
        experience: {
            type: Boolean,
            default: false
        },
        hours: {
            type: Number,
            default: 0
        },
        priority:{
            type: Number,
            default: 1
        },
        preference: {
            type: [PreferCourse],
            default: null
        }
    },
    { strict: false }
);

module.exports = applicants = mongoose.model("TA_Applicants", TASchema);