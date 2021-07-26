const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// process.env.PORT refers to the port number heroku assigns on deploy
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`------------------- EXPRESS SERVER LISTENING ON PORT ${PORT} --------------------`);
});

require('./database-setup');

// -------------------------- MIDDLEWARE SETUP -------------------------- //
const userEntryRouter = require('./routes/user-entry-routes');
app.get('/', (req, res) => {
    const instructions = 
        "<h1>SWEN422 Visual Telemetry Application Server</h1>" + 
        "<p>/user-entries/seed-user-entry - To generate a random set of attempts</p>" +
        "<p>/user-entries/clear-entries - To clear the DB of ALL user entries</p>"
    res.send(instructions);
});
app.use('/user-entries/', userEntryRouter);