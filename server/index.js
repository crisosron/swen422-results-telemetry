const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`------------------- EXPRESS SERVER LISTENING ON PORT ${PORT} --------------------`);
});

require('./database-setup');

app.get('/', (req, res) => {
    res.send("Visual Telemetry Application Server");
});