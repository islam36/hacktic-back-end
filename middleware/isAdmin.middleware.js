module.exports = (req, res, next) => {
    if(req.user && req.user.admin) {
        next();
    }
    else {
        res.status(401).json({ message: "you don't have permission to make this request"});
    }
}