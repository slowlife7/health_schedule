const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    userid: String,
    excercises: {
        set: [ {
            reps: { type:Number }
        } ],
        name : { type: String, lowercase: true, trim: true},
        weight : { type:Number }
    },
    conductedAt: { type:Date, default: Date.now }
});

module.exports = mongoose.model("record", recordSchema);