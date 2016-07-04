var bodyParser = require("body-parser");//处理request体，的中间件
var cookieParser = require("cookie-parser");//处理cookie 的中间件
var express = require("express");// express网站框架
var flash = require("connect-flash");//跳转页面保存会话信息中间件
var mongoose = require("mongoose");//数据库ORM
var passport = require("passport");//用户登录认真中间件
var path = require("path");//NodeJS内置系统目录模块
var session = require("express-session");//简单会话信息中间件

var setUpPassport = require("./setuppassport");
var routes = require("./routes");

var app = express();
mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
});
