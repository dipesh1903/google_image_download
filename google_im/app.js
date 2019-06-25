var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {spawn} = require('child_process');
const fs = require('fs');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/images',(req,res,next) => {
	const key = req.query.keyword;
	const limit = req.query.limit;
	var ress = [];
	console.log(key,limit);
	const child = spawn('googleimagesdownload',['-k', key, '-l', limit, '-p']);
child.on('exit', function (code, signal) {
  console.log('child process exited with ' +
              `code ${code} and signal ${signal}`);
});
child.on('error', function(a,b) {
console.log('error');
});

child.stdout.on('data', (data) => {
 var array = data.toString().split("\n");
    var i = 4;
	var c = 0;


	while(c!= parseInt(limit)){
	c++;
var a = array[i].split(" ");
ress.push(a[2]);
i+=2;
}
console.log(ress);
console.log(array);
res.json({arrays:ress});
});


})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
