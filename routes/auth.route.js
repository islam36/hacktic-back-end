const router = require('express').Router();
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AuthCode = require('../models/authCode.model.js'); 
const structures = require('../types/structures.js');
const { JWT_SECRET } = require('../config.json');

router.post('/register', async (req, res) => {
    if (req.body) {
        if( req.body.username
            && req.body.password
            && req.body.structure
            && structures[req.body.structure]
            && req.authCode ) {
            const { username, password, structure, authCode} = req.body;

            try {
                let oldUser = await User.findOne({ username });
                if(oldUser) {
                    res.status(400).json({ message: 'this username is already used, please use another one'});
                }
                else {
                    let code = await AuthCode.findOne({ code: authCode });
                    if(code && !code.used) {
                        code.used = true;
                        await code.save();

                        const hash = await bcrypt.hash(password, 10);
                        let user = new User({
                            username,
                            password: hash,
                            structure
                        });
        
                        user = await user.save();
                        res.json({ message: 'new user registered successfully' });
                    }
                    else {
                        res.status(400).json({ message: 'wrong authCode or already used' });
                    }
                }

            } catch(err) {
                console.log(err);
                res.status(500).json({ message: 'server error' });
            }
        }
        else {
            res.status(400).json({ message: 'bad request' });   
        }
    }
    else {
        res.status(400).json({ message: 'bad request' });
    }
});

router.post('/login', async (req, res) => {
    if(req.body) {
        if(req.body.username && req.body.password) {
            const { username, password } = req.body;
            try {
                let user = await User.findOne({username});
                if(user) {
                    if(await bcrypt.compare(password, user.password)) {
                        let token = jwt.sign({
                            id: user.id.toString()
                        }, JWT_SECRET);

                        res.json({
                            massage: 'user logged in successfully!',
                            token
                        });
                    }
                    else {
                        res.status(400).json({ message: 'wrong password'});
                    }
                }
                else {
                    res.status(404).json({ message: 'user not found' });
                }
            } catch(err) {
                console.log(err);
                res.status(500).json({ message: 'server error' });
            }
        }
        else {
            res.status(400).json({ message: 'bad request' });     
        }
    }
    else {
        res.status(400).json({ message: 'bad request' });
    }

    
});



module.exports = router;