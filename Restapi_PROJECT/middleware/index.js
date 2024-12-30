const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\n ${Date.now()}: ${req.ip}: ${req.methdod}: ${req.path}`,
            (err, data) => {
                next();
            }
        
        )
    }
}

module.exports = {
    logReqRes,
}
