const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

router.route('/users')
    .get(userCtrl.getUsers)
    .post(userCtrl.create)

router.route('/users/:id')
    .get(userCtrl.getUser)
    .patch(userCtrl.update)


module.exports = router;