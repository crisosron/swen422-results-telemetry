const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// process.env.PORT refers to the port number heroku assigns on deploy
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`------------------- EXPRESS SERVER LISTENING ON PORT ${PORT} --------------------`);
});

require('./database-setup');

// -------------------------- MIDDLEWARE SETUP -------------------------- //
const userEntryRouter = require('./routes/user-entry-routes');
app.get('/', (req, res) => {
    res.send("Visual Telemetry Application Server");
});
app.use('/user-entries/', userEntryRouter);