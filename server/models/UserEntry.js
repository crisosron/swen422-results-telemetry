const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attemptType = {
    isAbstractImages: {
        type: Boolean
    },

    isCorrect: {
        type: Boolean,
        default: false
    },

    mouseStillTime: {
        type: Number
    },

    mouseTravelTime: {
        type: Number
    },

    mouseClickTime: {
        type: Number
    },

    mouseTotalTime: {
        type: Number
    },

    startPosToCentreDistance: {
        type: Number
    },

    startPosToPointDistance: {
        type: Number
    },

    travelVelocity: {
        type: Number
    },
};

const userEntrySchema = new Schema({
    attempts: [attemptType]
});

const UserEntry = mongoose.model('UserEntry', userEntrySchema);

module.exports = UserEntry;