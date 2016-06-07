var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var servicesUrl = require('./servicesUrl');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// 解决跨域问题，*代表所有的都不限制
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 静态资源文件直接输出
app.use('/', express.static(path.join(__dirname, 'app')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// 简单测试接口helloworld
app.get('/helloworld', function(req, res){
    res.send(req.url);
});

var getReponseFun = function (req, res) {
    // console.log(req);
    path = 'app/fakeData' + req.path + '.json';
    console.log(path); 
    fs.readFile(path, function (error, data) {
        if (!error) {
            // console.log(JSON.parse(data));
            res.send(JSON.parse(data));
        } else {
            res.send('Error:' + req.url);
        }

    });
};

// console.log(servicesUrl);

for (var key in servicesUrl) {
    app.get(servicesUrl[key], getReponseFun);
}

var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
});
