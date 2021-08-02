const ss = require('simple-statistics');
const UserEntry = require('../models/UserEntry');

// ------------- Management of Participants and UserEntries ------------- //
/*
    How it all works:
    Each participant gets 2 game sessions. The first session is coined as a  'training' session,
    where the participant plays through an entire session under the impression that its purpose
    is to familiarise themselves with the mechanics of the game before the actual session. The
    second session is the 'actual' attempt.

    In terms of the program, the exact same data is recorded and stored for both sessions. The code
    in this section is responsible for associating the correct game sessions with the correct
    user.

    In the program domain, a UserEntry document in the MongoDB database represents a single game
    session. Participant's aren't actually stored in the database, just their UserEntry instances.
    (Yes it would make sense for participants to be stored, its just the time constraints at the
    time of writing forced me to do it this way D:)
*/

let participants;

// Every participant gets 2 consecutive game sessions. This means participants gets 2 UserEntry
// documents associated with them in the UserEntry collection
const updateParticipantEntries = async () => {
    UserEntry.find()
    .then((result) => {

        // This generates the following structure
        // [[{}...n], [{}...m]]
        // Each array should have 2 entries, where the first one is the 'training' entry, and the
        // second one is the 'actual' entry
        participants = result.reduce((result, _, index, array) => {
            if(index % 2 === 0) result.push(array.slice(index, index + 2));
            return result;
        }, []);

    })
    .catch((err) => {
        console.error('Error fetching all user entries for forming participants: ', err);
    });
}

updateParticipantEntries();

// ------------- Helpers ------------- //

const mapAttemptsToFieldValue = (field, entry) => {
    return entry.map((attempt) => attempt[field]);
}

// field: mouseStillTime | mouseTravelTime | mouseClickTime | mouseTotalTime
// entries - A 2d array of attempts, where the outer layer corresponds to a single entry/game session
//
// This returns the following
// { values: [[numbers], [numbers]...], overallStats: { stats of ALL numbers combined } }
const buildDataForField = (field, entries) => {
    const valueArrays = entries.map((entry) => mapAttemptsToFieldValue(field, entry));
    const mergedArrays = valueArrays.flatMap((arr) => arr);
    const stats = buildStatistics(mergedArrays);
    return {
        values: valueArrays,
        overallStats: stats
    }
}

const buildStatistics = (values) => {
    if(values.length === 0) return;
    return {
        min: ss.min(values),
        max: ss.max(values),
        mean: ss.mean(values),
        median: ss.median(values),
        sd: ss.standardDeviation(values)
    }
}

// Builds a string that represents the title of the data to be sent to the client
const titleBuilder = (metric, options) => {
    let title = metric;
    console.log('In title builder with options: ', options);

    if(options.forTraining) title += " - Training"
    else title += " - Actual"

    if(options.forAbstractImages) title += " - Abstract Images"
    else title += " - No Abstract Images"

    console.log(title);

    return title;
}

// The following functions is like a jank version of the builder pattern
// Example usage:
// filterForAbstractImages(filterForTrainingEntries()) -> Returns an array of training entries for
// abstract image participants

// The following 2 functions assumes that each participant has exactly 2 attempts
const filterForTrainingEntries = () => {
    return participants.map(participantEntries => participantEntries[0]);
}

const filterForActualEntries = () => {
    return participants.map(participantEntries => participantEntries[1]);
}

// These 2 functions receive an array of entries that have been filtered for either training
// or actual entries, and return an array of attempts that match the criteria described by the
// method name
//
// FIXME: In retrospect, isAbstractImage should have been passed in per entry, instead of per 
// attempt
const filterForAbstractImages = (entries) => {
    return entries.map((entry) => {
        return entry.attempts.filter((attempt) => attempt.isAbstractImages);
    });
}

const filterForNonAbstractImages = (entries) => {
    return entries.map((entry) => {
        return entry.attempts.filter((attempt) => !attempt.isAbstractImages);
    });
}

const filterRequiredAttempts = (options) => {
    const intermediateEntries = 
        options.forTraining ? filterForTrainingEntries() : filterForActualEntries();
    
    const entriesWithImageType = 
        options.forAbstractImages ? filterForAbstractImages(intermediateEntries) :
            filterForNonAbstractImages(intermediateEntries)

    return entriesWithImageType;
}

// ------------- Endpoints ------------- //

// Route: /user-entries/
// Functionality: Creates a user entry using the model UserEntry
exports.userEntryIndex = (req, res) => {
    UserEntry.find().limit(15)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.error('Error on fetching all user entries: ', err)
    });
}

// Route: /user-entries/create
// Functionality: Creates a user entry using the model UserEntry
exports.createUserEntry = async (req, res) => {
    if(!req.body.attempts || req.body.attempts === 0) return;

    const sanitizedAttempts = [];

    // We need this to handle the supposedly boolean props whose value is representing by a string
    // that is either "True" or "False"
    req.body.attempts.forEach((attempt) => {
        sanitizedAttempts.push({
            isAbstractImages: attempt.isAbstractImages === "True",
            isCorrect: attempt.isCorrect === "True",
            mouseStillTime: attempt.mouseStillTime,
            mouseTravelTime: attempt.mouseTravelTime,
            mouseClickTime: attempt.mouseClickTime,
            mouseTotalTime: attempt.mouseTotalTime,
            startPosToCentreDistance: attempt.startPosToCentreDistance,
            startPosToPointDistance: attempt.startPosToPointDistance,
            travelVelocity: attempt.travelVelocity
        });
    })

    const userEntry = new UserEntry({
        attempts: sanitizedAttempts
    })

    userEntry.save()
    .then(async () => {
        const numDocs = await UserEntry.count({});
        if(numDocs % 2 === 0) updateParticipantEntries();
        res.send("Successfully logged entry");
        res.status(200);
    })
    .catch((err) => {
        console.log('Error on creating user entry: ', err);
        res.status(500);
    });
}

// Route: /user-entries/seed-user-entry
// Functionality: Creates a randomly generated user entry using the model UserEntry
exports.seedUserEntry = (req, res) => {
    const numAttempts = 10;
    let attempts = [];
    for(let i = 0; i < numAttempts; i++){
        attempts.push({
            isAbstractImages: true,
            isCorrect: true,
            mouseStillTime: Math.random() * 10,
            mouseTravelTime: Math.random() * 10,
            mouseClickTime: Math.random() * 2,
            mouseTotalTime: Math.random() * 10,
            startPosToCentreDistance: Math.random() * 10,
            startPosToPointDistance: Math.random() * 10,
            travelVelocity: Math.random() * 10,
        });
    }

    const userEntry = new UserEntry({
        attempts,
    })

    userEntry.save()
    .then(async (result) => {
        const numDocs = await UserEntry.count({});
        if(numDocs % 2 === 0) updateParticipantEntries();
        res.send(result)
    })
    .catch((err) => {
        console.log("Error on seeding user entry: ", err);
    });
}

// TODO: There's a lot of room for DRY here - Maybe use singleton pattern and parameterize options?

exports.getAllMouseStillTime = async (req, res) => {
    console.log("----------- GETTING ALL MOUSE STILL TIME -----------");
    const options = {
        forTraining: req.query.forTraining === 'true',
        forAbstractImages: req.query.forAbstractImages === 'true'
    }

    const attempts = filterRequiredAttempts(options);
    
    const graphData = { 
        data: buildDataForField('mouseStillTime', attempts),
        title: titleBuilder('Mouse Still Time', options) 
    };

    if(!graphData.data.values.length){
        res.send({
            invalidFetchMessage: "Invalid data to display"
        });
        return;
    }
    res.send(graphData)
}

exports.getAllMouseTravelTime = async (req, res) => {
    console.log("----------- GETTING ALL MOUSE TRAVEL TIME -----------");
    const options = {
        forTraining: req.query.forTraining === 'true',
        forAbstractImages: req.query.forAbstractImages === 'true'
    }

    const attempts = filterRequiredAttempts(options);
    
    const graphData = { 
        data: buildDataForField('mouseTravelTime', attempts), 
        title: titleBuilder('Mouse Travel Time', options) 
    };

    if(!graphData.data.values.length){
        res.send({
            invalidFetchMessage: "Invalid data to display"
        });
        return;
    }
    res.send(graphData)

}

exports.getAllMouseClickTime = async (req, res) => {
    console.log("----------- GETTING ALL MOUSE CLICK TIME -----------");
    const options = {
        forTraining: req.query.forTraining === 'true',
        forAbstractImages: req.query.forAbstractImages === 'true'
    }

    const attempts = filterRequiredAttempts(options);
    
    const graphData = { 
        data: buildDataForField('mouseClickTime', attempts), 
        title: titleBuilder('Mouse Click Time', options) 
    };

    if(!graphData.data.values.length){
        res.send({
            invalidFetchMessage: "Invalid data to display"
        });
        return;
    }
    res.send(graphData)
}

exports.getAllMouseTotalTime = async (req, res) => {
    console.log("----------- GETTING ALL MOUSE TOTAL TIME -----------");
    console.log(req.query);

    // We have to do this because the data being sent is json, and the boolean primitives set
    // in the FE gets turned into strings...
    const options = {
        forTraining: req.query.forTraining === 'true',
        forAbstractImages: req.query.forAbstractImages === 'true'
    }

    const attempts = filterRequiredAttempts(options);
    
    const graphData = { 
        data: buildDataForField('mouseTotalTime', attempts), 
        title: titleBuilder('Mouse Total Time', options) 
    };

    if(!graphData.data.values.length){
        res.send({
            invalidFetchMessage: "Invalid data to display"
        });
        return;
    }
    res.send(graphData)
}

// Route: /user-entries/clear-entries
// Functionality: Delete all documents in the UserEntry collection
// WARNING: THIS IS A DESTRUCTIVE CALL
exports.clearEntries = (req, res) => {
    UserEntry.deleteMany({})
    .then(() => {
        res.send("ALL USER ENTRIES DELETED");
        updateParticipantEntries();
    })
    .catch((err) => {
        console.error("Failed to delete all documents: ", err);
    });
}

