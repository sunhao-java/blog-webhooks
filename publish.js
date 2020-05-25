var http = require('./utils/http')
var dingding = require('./utils/dingding')
var process = require('child_process');

function publish(req, res) {
    // 获取请求体
    let body = req.body;
    // 分支名
    let ref = body.ref;
    if (ref.indexOf("master") == -1) {
        http.sendSuccessWith200(res, "不需要发布！");
        return;
    }

    // 从请求体上获取需要的相关信息
    let cloneUrl = body.repository.clone_url;
    let name = body.repository.name;

    // 获取url上的参数，参数名为type
    let type = req.query.type;

    if (!type && "" == type) {
        type = "hexo";
    }

    if ("hexo" != type && "gitbook" != type) {
        http.sendError(res, "发布类型不匹配，只能是hexo或者gitbook！此时为【" + type + "】！")
        return;
    }

    let blogNginxDestKey = name.replace(/-/g, "_") + "_nginx_dest";

    if ("" == blogNginxDestKey) {
        http.sendError(res, "发布失败，工程【" + name + "】Nginx目标地址为空！")
        return;
    }

    let message = "name=【" + name + "】，cloneUrl=【" + cloneUrl + "】，nginxDest=【" + blogNginxDestKey + "】，type=【" + type + "】";
    console.log(message);
    try {
        process.execFile('./shell/publish.sh', [name, cloneUrl, blogNginxDestKey, type], function (error, stdout, stderr) {
            if (error) {
                console.log('执行失败！异常为：\r' + stderr + "\r参数为：" + message);
                dingding.sendMessage(name, false, stdout, stderr, res);
                return;
            }

            console.log('执行成功！控制台信息为：\r' + stdout + "\r参数为：" + message);
            dingding.sendMessage(name, true, stdout, stderr, res);
        });
    } catch (e) {
        console.log(e)
    }


    http.sendSuccess(res, 'Blog【' + name + '】正在发布，请稍后！')
}

exports.publish = publish