const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

router.route('/users')
    .get(userCtrl.getUsers)
    .post(userCtrl.create)

router.route('/users/:id')
    .patch(userCtrl.update)


module.exports = router;