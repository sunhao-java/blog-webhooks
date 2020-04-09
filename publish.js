var mail = require('./mail')
var process = require('child_process');

function publish(req, res) {
    // 获取请求体
    let body = req.body;
    // 从请求体上获取需要的相关信息
    let cloneUrl = body.repository.clone_url;
    let name = body.repository.name;

    let blogNginxDest = name.replace(/-/g, "_") + "_nginx_dest";
    let nginxDest = process.env[blogNginxDest];

    if ("" == nginxDest) {
        res.send("发布失败，工程【" + name + "】Nginx目标地址为空！");
        return;
    }

    let message = "name=【" + name + "】，cloneUrl=【" + cloneUrl + "】，nginxDest=【" + nginxDest + "】";
    console.log(message);
    process.execFile('./shell/publish.sh', [name, cloneUrl, nginxDest], function (error, stdout, stderr) {
        if (error) {
            console.log('执行失败！异常为：\r' + stderr + "\r参数为：" + message);
            mail.sendMail(false, stdout, stderr);
            return;
        }

        console.log('执行成功！控制台信息为：\r' + stdout+ "\r参数为：" + message);
        mail.sendMail(true, stdout, stderr);
    });

    res.send('Blog【' + name + '】正在发布，请稍后！')
}

exports.publish = publish