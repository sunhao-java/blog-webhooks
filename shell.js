var process = require('child_process');

function executeShellSync(shell, params) {
    var result = process.spawnSync(shell, params);
    var status = result.status;

    // console.log("status===" + result.status + "\nstdout===" + result.stdout + "\nstderr===" + result.stderr);
    // console.log("result===" + ("0" == status));
    return {
        "result": "0" == status,
        "out": result.stdout,
        "error": result.stderr
    }
}

exports.executeShellSync = executeShellSync