module.exports = (req, res, next) => {
    console.log(`[${new Date().toLocaleString("en-GB")}]: ${req.method} ${req.path} from ${req.ip}`);
    next();
};