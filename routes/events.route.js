const router = require('express').Router();
const Event = require('../models/event.model');
const Task = require('../models/task.model.js');
const isAuth = require('../middleware/isAuthenticated.middleware.js');
const isAdmin = require('../middleware/isAdmin.middleware.js');


router.get('/', isAuth, async (req, res) => {
    try {
        let events = await Event.find({});
        if(events && events.length > 0) {
            res.json({
                message: 'events found',
                events
            });
        }
        else {
            res.status(404).json({ message: 'no events found' });
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });
    }
});



router.post('/', isAuth, isAdmin, async(req, res) => {
    try {
        if( req.body
            && req.body.name
            && req.body.description ) {
            const { name, description } = req.body;
            let event = new Event({ name, description });
            event = await event.save();
            
            res.json({
                message: 'event added successfully',
                event
            });
        }
        else {
            res.status(400).json({ message: 'bad request' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });  
    }
});



router.get('/:eventId', isAuth, async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if(event) {
            res.json({
                message: 'event found',
                event
            });
        }
        else {
            res.status(404).json({ message: 'no event found' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });
    }
});



router.put('/:eventId', isAuth, isAdmin, async (req, res) => {
    try {
        if(req.body) {
            let event = await Event.findByIdAndUpdate(req.params.eventId, req.body)
            if(event) {
                res.json({
                    message: 'event updated successfully',
                    event
                });
            }
            else {
                res.status(404).json({ message: 'event not found' });
            }
        }
        else {
            res.status(400).json({ message: 'bad request' }); 
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });  
    }
});


router.delete('/:eventId', isAuth, isAdmin, async (req, res) => {
    try {
        let result = await Event.findByIdAndDelete(req.params.eventId);
        res.json({ message: 'event deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });  
    }
});


router.get('/:eventId/tasks', isAuth, async (req, res) => {
    try {
        let event = await (await Event.findById(req.params.eventId)).populated('tasks');
        if(event) {
            if(event.tasks.length > 0) {
                res.json({
                    message: 'tasks found',
                    tasks: event.tasks
                });
            }
            else {
                res.status(404).json({ message: 'no tasks found '});
            }
        }
        else {
            res.status(404).json({ message: 'no event found' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });
    }
});




module.exports = router;