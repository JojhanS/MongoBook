const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../controller/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/:userId
router.route('/:userId').put(updateUser);

// /api/users/:userId
router.route('/:userId').delete(deleteUser);

// /api/users/create
router.route('/createuser').post(createUser)


module.exports = router;
