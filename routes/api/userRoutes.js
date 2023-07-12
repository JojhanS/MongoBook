const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
} = require('../../controller/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/create
router.route('/createuser').post(createUser)

module.exports = router;
