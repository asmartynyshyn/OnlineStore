const uuid = require('uuid')
const path = require('path');
const {Rating} = require('../models/models')

class RankingController {

    async createRating(req, res) {
        const {rate, userId, deviceId} = req.body
        const rating = await Rating.create({rate, userId, deviceId});
        return res.json(rating)
    }

    async getUpdateRate (req, res) {
        const {rate, userId, deviceId} = req.body;
        await Rating.update({rate},{where: {userId, deviceId}});
        const updatedRank = await Rating.findOne({
            where: {userId, deviceId}
        });
        return res.json(updatedRank);
    }

    async getRates (req, res) {
        const rates = await Rating.findAll();
        return res.json(rates)
    }
}

module.exports = new RankingController()
