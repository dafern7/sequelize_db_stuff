const Device = require('../models').Device
const Item = require('../models').item

module.exports = {
    create(req,res) {
        return Device
            .create({
                title:req.body.title,
                password:req.body.password
            })
            .then(device => res.status(200).send(device))
            .catch(error => res.status(400).send(error));
    },

    

    //generate list of all devices available
    list(req,res) {
        return Device
        .findAll({
            include: [{
                model: Item,
                as: 'Item',
            }],
        })
        .then(device => res.status(200).send(device))
        .catch(error => res.status(400).send(error));
    },

    retrieve(req,res) {
        return Device
        .findByPk(req.params.user_id, {
            include: [{
                model: Item,
                as: 'Item',
            }],
        })
        .then(device => {
            if (!device) {
                return res.status(404).send({message:'Device not found',});
            }
            return(res.status(200).send(device))
        })
        .catch(error=> res.status(400).send(error));
    },


    update(req,res) {
        return Device
        .findByPk(req.params.user_id, {
            include: [{
                model: Item,
                as: 'Items',
            }],
        })
        .then(device => {
            if(!device) {
                return res.status(404).send({ message: "Device Not Found", });
            }
            return device
                .update({
                    title: req.body.title || device.title,
                })
                .then (()=> res.status(200).send(device)) //send back updated device name
                .catch((error)=> res.status(400).send(error));
        })
        .catch((error)=> res.status(400).send(error));
    },

    remove(req,res) {
        return Device
            .findByPk(req.params.user_id)
            .then(device => {
                if(!device) {
                    return res.status(404).send({
                        message: 'Device Not Found',
                    });
                }
                return device
                    .destroy()
                    .then(()=> res.status(204).send({message: 'Deleted Successfully'}))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};