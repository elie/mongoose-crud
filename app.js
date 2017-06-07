import express from 'express'
import methodOverride from 'method-override'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import eatersRoutes from './routes/eaters'
import tacosRoutes from './routes/tacos'

const app = express()

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method")); // ?_method=DELETE

app.use('/eaters', eatersRoutes)
app.use('/eaters/:eater_id/tacos', tacosRoutes)

app.get("/", function(req,res){
  res.redirect("/eaters");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
