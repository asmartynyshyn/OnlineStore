const {BasketDevice, Device} = require('../models/models');

class BasketController {
    async create(req, res) {
        const {unique_number, basketId, deviceId} = req.body;
        const basket = await BasketDevice.create({unique_number, basketId, deviceId})
        return res.json(basket);
    }

    async getAll(req, res) {
        const itemsInBasket = await BasketDevice.findAll({
            include: [{model: Device}]
        });
        return res.json(itemsInBasket);
    }

    async deleteRow (req, res) {
        const {unique_number} = req.body;
        const basketRow = await BasketDevice.findOne({where: unique_number});
        if (basketRow) {await basketRow.destroy().catch((error) => console.log(error))};
        const basket = await BasketDevice.findAll();
        return res.json(basket);
    }
}

module.exports = new BasketController()