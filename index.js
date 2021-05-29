const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger.middleware');
const authRouter = require('./routes/auth.route.js');
const usersRouter = require('./routes/users.route.js');
const tasksRouter = require('./routes/tasks.route.js');
const eventRouter = require('./routes/events.route.js');
const leaderboardRouter = require('./routes/leaderboard.route.js');
const { DB, PORT } = require('./config.json');

const app = express();

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((connection) => {
    console.log("connected to the database");
}).catch((err) => {
    console.log("error while connecting to database: ", err);
});

//middleware
app.use(express.json());
app.use(logger);

//routes
app.get('/', (req, res) => {
    res.end("hello world");
});

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/events', eventRouter);
app.use('/leaderboard', leaderboardRouter);

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});