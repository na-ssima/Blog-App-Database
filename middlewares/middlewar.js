const logmiddlewar = (req, res, next) => {
    const logInfo = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
    console.log(logInfo);
    next();
};
module.exports = logmiddlewar;