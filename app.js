var bodyParser = require("body-parser");//处理request体，的中间件
var cookieParser = require("cookie-parser");//处理cookie 的中间件
var express = require("express");// express网站框架
var flash = require("connect-flash");//跳转页面保存会话信息中间件
var mongoose = require("mongoose");//数据库ORM
var passport = require("passport");//用户登录认真中间件
var path = require("path");//NodeJS内置系统目录模块
var session = require("express-session");//简单会话信息中间件

var setUpPassport = require("./setuppassport");
var routes = require("./routes");//【自定义】路由

var app = express();

//【自定义】连接数据库
mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

app.set("port", process.env.PORT || 3000);

//模板引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//静态文件
app.use(express.static(path.join(__dirname, "public")));
//解析请求 requestBody,cookie
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//会话
app.use(session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());//跳转页面保存会话信息中间件
//用户登录认真中间件
app.use(passport.initialize());
app.use(passport.session());
//自定义路由
app.use(routes);

app.listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
});
