const deviceController = require('../controllers').device;
const itemController = require('../controllers').item;

module.exports = (app) => {
    app.get('/api', (req,res) => res.status(200).send({
        message : 'device API reached'
    }));
    
    app.post('/api/devices', deviceController.create);
    app.get('/api/devices', deviceController.list);
    app.post('/api/devices/:user_id/items', itemController.create);
    app.get('/api/devices/:user_id',deviceController.retrieve);
    app.put('/api/devices/:user_id', deviceController.update);
    app.delete('/apip/devices/:user_id', deviceController.remove);
};