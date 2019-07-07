var createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cors = require("cors"),
  bodyParser = require("body-parser"),

  morgan = require("morgan"),
  mongoose = require("mongoose");

var indexRouter = require('./Routes/index');
var userRoutes = require("./Routes/userRoutes");
var productsRoutes = require("./Routes/productsRoutes");

const authenticate = require("./middleware/jwt");

var app = express();

//DB connection 
mongoose.connect(
  "mongodb://localhost:27017/in3",
  {   useCreateIndex: true,useNewUrlParser: true },
  error => {
      if (error) {
          console.log("DB Connection Error " + error);
          next(error);
      }
  }
);


app.use(morgan("short"));
app.use(express.static(path.join(__dirname, 'public')));

//core is used when i use to servers (anguler and node servers)
app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.use("/user", userRoutes);
// Authentication midleware
// app.use(authenticate);
app.use("/products", productsRoutes);

app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'ValidationError') {
      var valErrors = [];
      Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
      res.status(422).send(valErrors)
  }
  else
      res.status(422).send(err)
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = 
  req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
module.exports = app; 

module.exports = app;
