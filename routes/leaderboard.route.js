const router = require('express').Router();
const User = require('../models/user.model.js');
const isAuth = require('../middleware/isAuthenticated.middleware.js');

router.get('/', isAuth, async (req, res) => {
    try {
        let users = await User.find({}).sort({ score: -1 });
        if(users && users.length > 0) {
            res.json({
                message: 'leader board users found',
                users
            });
        }
        else {
            res.json({
                message: 'no user found'
            })
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });
    }
});


module.exports = router;