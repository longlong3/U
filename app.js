
var util = require('util');
var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var routes = require('./routes');
var mongoose = require('mongoose');


// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  var dburi="mongodb://";
  if(process.env.MONGO_USERNAME){
    dburi+=process.env.MONGO_USERNAME;
    if(process.env.MONGO_PASSWORD){
      dburi+=":"+process.env.MONGO_PASSWORD;
    }
    dburi+="@";
  }
  if(process.env.MONGO_PORT_27017_TCP_ADDR){
    dburi+=process.env.MONGO_PORT_27017_TCP_ADDR;
  }else{
    dburi+="localhost";
  }
  if(process.env.MONGO_PORT_27017_TCP_PORT){
    dburi+=":"+process.env.MONGO_PORT_27017_TCP_PORT;
  }else{
    dburi+=":27017";
  }
  if(process.env.MONGO_INSTANCE_NAME){
    dburi+="/"+process.env.MONGO_INSTANCE_NAME;
  }else{
    dburi+="/url";
  }
  mongoose.connect(dburi, options, function (err, res) {
    if (err) { 
      console.log ('Mongodb connect error :' + err);
    } else {
      console.log ('Mongodb connect OK.');
    }
  });
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


app.set('port', process.env.PORT);
app.set('views', __dirname + '/views');
app.use(express.static('static'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
routes(app);
app.listen(process.env.PORT || '3000');
