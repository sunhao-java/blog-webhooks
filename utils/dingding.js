var request = require('request');
var token = process.env.DING_TOKEN;

function sendMessage(name, result, out, error, res) {
    if (!token) {
        res.send("钉钉群token未设置！请检查！")
        return;
    }

    var message = "## 最终执行结果: " + (result ? "执行成功" : "执行失败") + " \n ## 正常输出 \n > " + out + " \n ## 异常信息 \n > " + error;

    var options = {
        url: 'https://oapi.dingtalk.com/robot/send?access_token=' + token,
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: {
            "msgtype": "markdown",
            "text": {
                "title": "webhooks-【" + name + "】发布结果",
                "text": message
            },
            "at": {
                "isAtAll": true
            }
        }
    }

    // 向钉钉群推送
    request(options, function (error, response, body) {

    });
}

exports.sendMessage = sendMessage