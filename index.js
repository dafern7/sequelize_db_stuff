global.__require = function (file) {
    return require(__dirname + '/' + file)
  }

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var auth = require('./auth');
var cors = require('cors')
const http = require('http');
const fetch = require("node-fetch");
const app = express();


app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./server/routes')(app);
app.use('/auth', auth);




app.get('/', (req,res)=>
    res.status(200).send({message:'helloworld'})
);

app.post('/solar/api', (req,res) => {

    const api_key = req.body.api_key //"VTF48OxZfq7tlP4oriEDVK1qAnpOCPdzl0XGT2c0"
    const system_capacity = req.body.system_capacity//(100)
    const module_type = req.body.module_type//(1)
    const losses = req.body.losses//(14)
    const array_type = req.body.array_type//(0)
    const tilt = req.body.tilt//(1)
    const array_azimuth = req.body.array_azimuth//(180)
    const inv_eff = req.body.inv_eff//(90)
    const latitude = req.body.latitude//42.00
    const longitude = req.body.longitude//-71.00

    const url = "https://developer.nrel.gov/api/pvwatts/v6.json?api_key=" + api_key + "&system_capacity=" + system_capacity
    + "&module_type=" + module_type + "&losses=" + losses + "&array_type=" + array_type + "&tilt=" + tilt + "&azimuth=" + array_azimuth
    + "&dataset=nsrdb" + "&timeframe=hourly" + "&inv_eff=" + inv_eff + "&lat=" + latitude + "&lon=" + longitude;
    console.log(url)

    fetch(url)
    .then(response => response.json())
    .then(data => {
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
    })

})

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
const port = parseInt(process.env.PORT, 10) || 8080;
app.set('port',port);

const server = http.createServer(app);
server.listen(port);



console.log('running')
module.exports = app;