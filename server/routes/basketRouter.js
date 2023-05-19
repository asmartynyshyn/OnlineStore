const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.create);
router.get('/', basketController.getAll);
router.post('/delete', basketController.deleteRow);

module.exports = router