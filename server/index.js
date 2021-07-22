const express = require('express');
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`------------------- Express server listening on port ${SERVER_PORT} -------------------`);
});
