const router = require('express').Router();
const User = require('../models/user.model.js');
const isAuth = require('../middleware/isAuthenticated.middleware.js');
const isAdmin = require('../middleware/isAdmin.middleware.js');

router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        let users = await User.find({});
        if(users && users.length > 0) {
            res.json({
                message: 'users found',
                users,
            });
        }
        else {
            res.status(404).json({ message: 'no users found!' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });
    }
});

router.get('/profile', isAuth, async (req, res) => {
    if(req.user) {
        res.json({
            message: 'profile found',
            user: req.user
        });
    }
    else {
        res.status(401).json({ message: 'unauthorized request' })
    }
});


router.get('/:userId', isAuth, isAdmin, async (req, res) => {
    try {
        let user = await User.findById(req.params.userId);
        if(user) {
            res.json({
                message: 'user found',
                user
            });
        }
        else {
            res.status(404).json({ message: 'no user found!' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });
    }
});



router.put('/:userId', isAuth, async (req, res) => {
    try {
        if(req.user._id.toString() === req.params.userId) {
            let user = await User.findById(req.params.userId);
            if(user) {
                if(req.body) {
                    let result = await user.updateOne(req.body);
        
                    res.json({
                        message: 'updated successfully',
                        user
                    });
                }
                else {
                    res.status(400).json({ message: 'bad request' });
                }
            }
            else {
                res.status(404).json({ message: 'no user found' }); 
            }
        }
        else {
            res.status(401).json({ message: 'unauthorized request' });  
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' }); 
    }
});


router.delete('/:userId', isAuth, isAdmin, async (req, res) => {
    try {
        let result = await User.findByIdAndDelete(req.params.userId);
        res.json({
            message: 'user deleted successfully',
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' }); 
    }
});

module.exports = router;