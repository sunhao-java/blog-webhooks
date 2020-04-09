var express = require('express');
var bodyParser = require('body-parser');
var publish = require("./publish");

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// 所有路由
app.post('/publish', (req, res) => publish.publish(req, res));

// 在3000端口启动监听服务 
var server = app.listen(3000, function () {
  console.log('Listening on port %d', server.address().port);
});