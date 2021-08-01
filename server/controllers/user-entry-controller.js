const ss = require('simple-statistics');
const UserEntry = require('../models/UserEntry');

// Assume queryResult is an array
const buildData = (queryResult) => {
    let data = [];
    queryResult.forEach((entry) => {
        // if(entry.attempts.length === 0) return;
        // data.push({
        //     attempts: entry.attempts,
        //     min: ss.min(entry.attempts),
        //     max: ss.max(entry.attempts),
        //     mean: ss.mean(entry.attempts),
        //     median: ss.median(entry.attempts),
        //     sd: ss.standardDeviation(entry.attempts)
        // });
    });
    return data;
}

// Route: /user-entries/
// Functionality: Creates a user entry using the model UserEntry
exports.userEntryIndex = (req, res) => {
    // UserEntry.find().limit(15)
    // .then((result) => {
    //     res.send(buildData(result));
    // })
    // .catch((err) => {
    //     console.error('Error on fetching all user entries: ', err)
    // });
    res.send("This endpoint is deprecated");
    res.status(500);
}

// Route: /user-entries/create
// Functionality: Creates a user entry using the model UserEntry
exports.createUserEntry = (req, res) => {
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
    .then(() => {
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
exports.seedUserEntry = async (req, res) => {

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
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log("Error on seeding user entry: ", err);
    });
}

// Route: /user-entries/latest-entry
// Functionality: Get the most recent set of attempts
exports.latestEntry = (req, res) => {
    UserEntry.find().sort({ _id: -1 }).limit(1)
    .then((result) => {
        res.send(buildData(result));
    })
    .catch((err) => {
        console.error('Error on fetching latest entry: ', err);
    });
}

// Route: /user-entries/latest-entry-with-training
// Functionality: Get the 2 most recent set of attempts, with the former being the 'training' set
exports.latestEntryWithTraining = async (req, res) => {
    const numDocs = await UserEntry.count({});
    if (numDocs < 2) {
        res.send({
            invalidFetchMessage: 'Insufficient data to display' 
        });
        return;
    }

    // If not even, get the 2 entries before the most recent entry, else get the most recent
    // entries
    UserEntry.find().sort({ _id: -1 }).limit(3)
    .then((result) => {
        // Note that the most recent entry is closer to index 0
        if(numDocs % 2 === 0) {
            res.send(buildData([result[result.length - 1], result[result.length - 2]]));
            return;
        }
        res.send(buildData([result[2], result[1]]));
    })
    .catch((err) => {
        console.error('Error on getting latest pair of entries', err);
    });
}

// TODO: This method, and the one after can follow DRY better by adding a param to req that
// specifies if we are looking for training or actual attempts
// Route: /user-entries/training-entries
// Functionality: Get all attempts that correspond to a 'training entries'
exports.trainingEntries = (req, res) => {
    UserEntry.find({})
    .then((results) => {
        // Training sets are the even indexed attempt arrays
        const filteredResults = results.filter((attempts, i) => i % 2 === 0 )
        res.send(buildData(filteredResults));
    })
    .catch((err) => {
        console.error("Failed to fetch training sets: ", err)
    });
}

// Route: /user-entries/actual-entries
// Functionality: Get all attempts that correspond to an 'actual entries'
exports.actualEntries = (req, res) => {
    UserEntry.find({})
    .then((results) => {
        // Training sets are the odd indexed attempt arrays
        const filteredResults = results.filter((attempts, i) => i % 2 !== 0 )
        res.send(buildData(filteredResults));
    })
    .catch((err) => {
        console.error("Failed to fetch actual sets: ", err)
    });
}

// Route: /user-entries/success-fail-ratio
// Functionality: Gets the total number of success and failures
exports.successToFailRatio = async (req, res) => {
    const numAttemptsSet = await UserEntry.count({});
    if (numAttemptsSet === 0) {
        res.send({
            invalidFetchMessage: 'Insufficient data to display' 
        });
        return;
    }
    const maxNumAttempts = await UserEntry.count({}) * 10;
    UserEntry.find({})
    .then((results) => {
        // Successful attempts correspond to the length of each attempts array (since these
        // contain only the succesful responses)
        let numSuccessfulAttempts = 0;
        results.forEach((result) => numSuccessfulAttempts += result.attempts.length);
        const numFailedAttempts = maxNumAttempts - numSuccessfulAttempts;
        res.send({
            values: [numSuccessfulAttempts, numFailedAttempts],
            labels: ["Success", "Fail"]
        });
    })
    .catch((err) => {
        console.error("Failed to get success to failure ratio: ", err);
    });
}

exports.getAllMouseStillTime = async (req, res) => {
    console.log("----------- GETTING ALL MOUSE STILL TIME -----------");
    const options = req.query;
    console.log('options: ', options);

}

exports.getAllMouseTravelTime = async (req, res) => {
    console.log("----------- GETTING ALL MOUSE TRAVEL TIME -----------");
    const options = req.query;
    console.log('options: ', options);
    res.send("Here's a response");
}

exports.getAllMouseClickTime = async (req, res) => {
    console.log("----------- GETTING ALL MOUSE CLICK TIME -----------");
    const options = req.query;
    console.log('options: ', options);
    res.send("Here's a response");
}

exports.getAllMouseTotalTime = async (req, res) => {
    console.log("----------- GETTING ALL MOUSE TOTAL TIME -----------");
    const options = req.query;
    console.log('options: ', options);
    res.send("Here's a response");

}

// Route: /user-entries/clear-entries
// Functionality: Delete all documents in the UserEntry collection
// WARNING: THIS IS A DESTRUCTIVE CALL
exports.clearEntries = (req, res) => {
    UserEntry.deleteMany({})
    .then(() => {
        res.send("ALL USER ENTRIES DELETED");
    })
    .catch((err) => {
        console.error("Failed to delete all documents: ", err);
    });
}