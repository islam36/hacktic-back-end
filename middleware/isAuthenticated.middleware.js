const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const { JWT_SECRET } = require('../config.json');

module.exports = async (req, res, next) => {
    if(req.headers && req.headers.authorization) {
        const { authorization: authHeader } = req.headers;
        const [bearer, token] = authHeader.split(' ');
        if(bearer === 'Bearer') {
            let { id } = jwt.verify(token, JWT_SECRET);
            if(id) {
                try {
                    let user = await User.findById(id);
                    if(user) {
                        req.user = user;
                        next();
                    }
                    else {
                        res.status(401).json({ message: 'unauthorized request'});    
                    }
                } catch(err) {
                    console.log(err);
                    res.status(500).json({ message: 'server error'});      
                }
            }
            else {
                res.status(401).json({ message: 'unauthorized request'});    
            }
        }
        else {
            res.status(401).json({ message: 'unauthorized request'});
        }
    }
    else {
        res.status(401).json({ message: 'unauthorized request'});
    }
}