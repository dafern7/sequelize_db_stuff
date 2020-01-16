const express = require('express');
const sequelize = require('sequelize');
const router = require('express-promise-router')();
const config = require('../server/config/config');
const jwt = require('jsonwebtoken');
const Device = require('../server/models').Device;
var bcrypt = require('bcrypt')
const deviceController = require('../server/controllers').device;

router.get('/', (req,res) => {
    res.json({
        message: 'lock'
    });
});

function requireAuth(req,res,next) {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ message: 'No authorization headers.'});
    }

    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2) {
        return res.status(401).send ({ message: 'Malformed token.' });
    }

    const token = token_bearer[1];

    return jwt.verify(token, config.development.jwt_secret, (err,decoded) => {
        if (err) {
            return res.status(500).send({ auth:false, message:'Failed to authenticate.'});
        }
        return next();
    });
}

async function encryptPassword(password) {
    const saltRounds = 10;
    salt = await bcrypt.genSalt(saltRounds);
    hash = await bcrypt.hash(password, salt);

    return hash
};
    
async function comparePassword(password, hash) {
    return await bcrypt.compare(password,hash);
};


function generateJWT(user) {
    return jwt.sign(user.toJSON(), config.development.jwt_secret)
}



router.post('/signup', async (req,res) => {
    const title = req.body.title
    const password = req.body.password
    
    if (!title || (title.length <= 4) ) {
        return res.status(400).send({auth: false, message: 'device name is required or too short'})
    }

    Device.count({where: {title : title}})
        .then(count => {
            if (count!=0) {
                
                return res.status(400).send({auth:false, message:'device name already exists'});
            }
        });

    if(!password) {
        res.status(400).send({auth: false, message: 'password is required'})
    }

    const password_hash = await encryptPassword(password);
    
    

    const newDevice = await Device.create({
        title:title,
        password: password_hash
    });
 
    //generate token

    const jwt = generateJWT(newDevice)

    res.status(201).send({token:jwt, user:newDevice});
    
    },  
);


router.post('/login', async (req,res) => {
    const title = req.body.title;
    const password = req.body.password;

    if (!title || (title.length <= 4)) {
        return res.status(400).send({ auth:false, message: 'Device Name is too short or nonexistent'})
    }

    if(!password) {
        return res.status(400).send({auth: false, message: 'Password required'})
    }
    
    const device = await Device.findByPk(title);

    if(!device) {
        return res.status(401).send({auth:false,message:'device not found'})
    }

    const authValid = await comparePassword(password,device.password)

    if(!authValid) {
        res.status(401).send({auth:false, message:'wrong password'})
    }

    const jwt = generateJWT(device);
    res.status(200).send({auth:true, token:jwt});
})


router.get('/verification', requireAuth, async(req,res) => {
    return res.status(200).send({auth:true, message:'Authenticated'});
});

module.exports = router;