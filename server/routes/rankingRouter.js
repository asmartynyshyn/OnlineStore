const Router = require('express')
const router = new Router()
const rankingController = require('../controllers/rankingController')

router.post('/', rankingController.createRating)
router.put('/', rankingController.getUpdateRate)
router.get('/', rankingController.getRates)

module.exports = router