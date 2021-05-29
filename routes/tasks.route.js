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
        if(req.body && req.body.eventId && req.body.task) {
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


router.get('/:taskId', isAuth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.taskId);
        if(task) {
            res.json({
                message: 'task found',
                task
            });
        }
        else {
            res.status(404).json({ message: 'no task found' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error'});
    }
});


router.put('/:taskId', isAuth, isAdmin, async (req, res) => {
    try {
        let task = await Task.findById(req.params.taskId);
        if(task) {
            if(req.body) {
                await task.update(req.body);
                await task.save();
                res.json({
                    message: 'task updated successfully',
                    task
                });
            }
            else {
                res.status(400).json({ message: 'bad request' });
            }
        }
        else {
            res.status(404).json({ message: 'no task found' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error'});
    }
});


router.delete('/:taskId', isAuth, isAdmin, async (req, res) => {
    try {
        let result = await Task.findByIdAndDelete(req.params.taskId);
        res.json({
            message: "task deleted successfully"
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error'});
    } 
});

module.exports = router;