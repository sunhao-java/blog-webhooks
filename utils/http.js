function sendError(res, message) {
    res.writeHead(400, {
        "content-type": "text/plain"
    });
    res.write(message);
    res.end();
}

function sendSuccess(res, message) {
    res.writeHead(202, {
        "content-type": "text/plain"
    });
    res.write(message);
    res.end();
}

function sendSuccessWith200(res, message) {
    res.writeHead(200, {
        "content-type": "text/plain"
    });
    res.write(message);
    res.end();
}

exports.sendError = sendError
exports.sendSuccess = sendSuccess
exports.sendSuccessWith200 = sendSuccessWith200