var common = require('./common')
var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var http = require('http');
var fs = require('fs');
var mongoStore = require('connect-mongo')(express);
var auth = require('../../conf/authorization.js');
var config = require('../../conf/config').development
var connect = common.connect
var models_path = __dirname + '/model'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
});
var routes = require('./routes/routes');
var app = express();
var session = require('express-session')
var RedisStore = require('connect-redis')(session);
var redis = require("redis"),
    client = redis.createClient();

app.configure(function () {
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/../../site/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.set('views', __dirname + '/../../site/public');
  app.engine('html', require('ejs').renderFile);
  app.use(express.cookieParser("thissecretrocks"))

  // app.use(express.session({
  //   secret: "thissecretrocks",
  //   store: new mongoStore({
  //     url: config.db,
  //     collection : 'sessions'
  //   })
  // }))
  app.use(express.session({
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        db: "sessions",
    }),
    // secret: 'thissecretrocks',
    // cookie: { secure: true, maxAge:86400000 },
}))
 });
    


app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

app.configure('development', function () {
  app.use(express.errorHandler());
});


require('./passport')(passport, config)

routes.init(app, auth, passport);

var port = process.env.VCAP_APP_PORT || 8180;
if(process.env.VCAP_SERVICES){
  var services = JSON.parse(process.env.VCAP_SERVICES);
  var dbcreds = services['mongodb'][0].credentials;
}
if(dbcreds){
  
  mongoose.connect(dbcreds.host, dbcreds.db, dbcreds.port, {user: dbcreds.username, pass: dbcreds.password});
}else{
  mongoose.connect("127.0.0.1", config.db.split("mongodb://localhost/")[1], 27017);
}

http.createServer(app).listen(port);
console.log("Server listening on port " + port);
