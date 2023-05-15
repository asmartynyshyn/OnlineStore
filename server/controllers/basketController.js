const {BasketDevice, Device} = require('../models/models');

class BasketController {
    async create(req, res) {
        const {basketId, deviceId} = req.body;
        const basket = await BasketDevice.create({basketId, deviceId})
        return res.json(basket);
    }

    async getAll(req, res) {
        // const {basketId} = req.body;
        const itemsInBasket = await BasketDevice.findAll({
            include: [{model: Device}]
        });
        return res.json(itemsInBasket);
    }

}

module.exports = new BasketController()