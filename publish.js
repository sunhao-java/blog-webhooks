var shell = require('./shell')
var mail = require('./mail')

function publish(req, res) {
    // 获取请求体
    let body = req.body;
    // 从请求体上获取需要的相关信息
    let sshUrl = body.repository.ssh_url;
    let name = body.repository.name;

    let blogNginxDest = name.replace(/-/g, "_") + "_nginx_dest";
    let nginxDest = process.env[blogNginxDest];

    if ("" == nginxDest) {
        res.send("发布失败，工程【" + name + "】Nginx目标地址为空！");
        return;
    }

    // 执行shell
    let result = shell.executeShellSync('./shell/publish.sh', [name, sshUrl, nginxDest]);
    if (!checkoutResult.result) {
        // 执行失败
        out = "============publish[./shell/publish.sh " + name + " " + sshUrl + " " + nginxDest + "]=============<br/>" + result.out + "<br/><br/>";
        error = "============publish[./shell/publish.sh " + name + " " + sshUrl + " " + nginxDest + "]=============<br/>" + result.error + "<br/><br/>";
        mail.sendMail(false, out, error);

        var errorMsg = "发布blog【" + name + "】失败！";
        res.send(errorMsg);
        return;
    }

    res.send('Blog【' + name + '】发布成功')
}

exports.publish = publish