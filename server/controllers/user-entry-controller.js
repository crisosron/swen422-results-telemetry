const UserEntry = require('../models/UserEntry');

// Route: /user-entries/
// Functionality: Creates a user entry using the model UserEntry
exports.userEntryIndex = (req, res) => {
    console.log("Accessing user entry index");
    UserEntry.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.error('Error on fetching all user entries: ', err)
    });
}

// Route: /user-entries/create-user-entry
// Functionality: Creates a user entry using the model UserEntry
exports.createUserEntry = (req, res) => {
    console.log("Creating a user entry");

    const numSuccessfulAttempts = Math.floor(Math.random() * 10);
    let attempts = [];
    for(let i = 0; i < numSuccessfulAttempts; i++){
        attempts.push(Math.random() * 1);
    }
    const userEntry = new UserEntry({
        attempts,
    });

    userEntry.save()
    .then((result) => {

        // TODO: Don't send the result back to the client. This is just a sample.
        res.send(result);
    })
    .catch((err) => {
        console.log('Error on creating user entry: ', err);
    });
}