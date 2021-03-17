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
        },
        accepted: {
            type: Boolean,
            default: false
        }
    },
    { strict: false }
);

module.exports = applicants = mongoose.model("TA_Applicants", TASchema);