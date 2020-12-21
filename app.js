var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

// Route list
var indexRouter = require('./routes/index');
var accountsRouter = require('./routes/accounts');
var paymentsRouter = require('./routes/payments');

// Make app
var app = express();
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to verify token, it will be called for all request
// app.use(authChecker);


// Routes
app.use('/', indexRouter);
app.use('/accounts', accountsRouter);
app.use('/payments', paymentsRouter);


// authentification  
/*
function authChecker(req, res, next) {
  console.log(req.get('sessionId')) // ok
  if (sessionIdList.includes(req.get('sessionId'))) {
      console.log("Good authentification")
      next();
  } else {
      console.log("wrong authentification")
     res.status(403).send('Authentification is missing');
  }
}
*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Resource was not find'));
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
