const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var auth = require('./auth');
var cors = require('cors')

const app = express();


app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./server/routes')(app);
app.use('/auth', auth);


app.use(function(req,res,next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err,req,res,next) {

    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });

})



app.get('/', (req,res)=>
    res.status(200).send({message:'helloworld'})
);

module.exports = app;