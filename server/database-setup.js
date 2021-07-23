console.log("Setting up database...");
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("---------------- CONNECTED TO MONGODB DATABASE SUCCESSFULLY ----------------");
}).catch((err) => {
    console.log('FAILED TO CONNECT TO MONGODB DATABASE: ', err);
});;
const db = mongoose.connection;