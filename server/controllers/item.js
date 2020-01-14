const Item = require('../models').item 

module.exports = {
    create(req,res) {
        return Item
        .create({
            powerIn : req.body.powerIn,
            powerOut :req.body.powerOut,
            voltage :req.body.voltage,
            current :req.body.current,
            marketPrice :req.body.marketPrice,
            SOC :req.body.SOC,
            user_id :req.params.user_id,
        })
        .then(item => res.status(201).send(item))
        .catch(error => res.status(400).send(error));
    },
};