const express = require('express');
const mongoose = require('mongoose');
//change the next line, make use of .env
const { DB, PORT } = require('./config.json');

const app = express();

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((connection) => {
    console.log("connected to the database");
}).catch((err) => {
    console.log("error while connecting to database: ", err);
})

//middleware
app.use(express.json());

//routes

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});