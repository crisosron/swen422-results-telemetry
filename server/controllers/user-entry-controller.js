const UserEntry = require('../models/UserEntry');

// Route: /user-entries/
// Functionality: Creates a user entry using the model UserEntry
exports.userEntryIndex = (req, res) => {
    console.log("Accessing user entry index");
    res.send("User entry index");
}

// Route: /user-entries/create-user-entry
// Functionality: Creates a user entry using the model UserEntry
exports.createUserEntry = (req, res) => {
    console.log("Creating a user entry");

    const userEntry = new UserEntry({
        attempts: [12.5, 13.5, 14.5, 15.5]
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