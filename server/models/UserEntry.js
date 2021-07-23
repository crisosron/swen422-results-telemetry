const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEntrySchema = new Schema({
    attempts: {
        type: [Number],
        required: true
    },
});

const UserEntry = mongoose.model('UserEntry', userEntrySchema);

module.exports = UserEntry;