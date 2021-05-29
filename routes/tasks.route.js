const router = require('express').Router();
const Task = require('../models/task.model.js');
const Event = require('../models/event.model.js');
const isAuth = require('../middleware/isAuthenticated.middleware.js');
const isAdmin = require('../middleware/isAdmin.middleware.js');


router.get('/', isAuth, async (req, res) => {
    try {
        let tasks = await Task.find({});
        if(tasks && tasks.length > 0) {
            res.json({
                message: 'tasks found',
                tasks
            });
        }
        else {
            res.status(404).json({ message: 'no tasks found' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error'});
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        if(req.body && req.body.eventId) {
            let event = await Event.findById(req.body.eventId);
            if(event) {
                let task = new Task(req.body.task);
                event.tasks.push(task._id);
                await event.save();
                await task.save();
                
                res.json({
                    message: 'task added successfully',
                    task
                });
            }
            else {
                res.status(404).json({ message: 'no event found' })
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error'});
    }
});

module.exports = router;