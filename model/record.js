const mongoose = require('mongoose');


const recordSchema = mongoose.Schema({
    userid: String,
    excercises: {
        set: Array,
        name : { type: String, lowercase: true, trim: true},
        weight : { type:Number }
    },
    conductedAt: { type:Date, default: Date.now }
}, {
    virtuals: {
        toObject : true,
        toJSON : true
    }
});

recordSchema.virtual('formattedDate').get(function() {
    return moment(this.conductedAt).format('YYYY-MM-DD');
});

module.exports = mongoose.model("record", recordSchema);