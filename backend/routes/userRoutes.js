const express = require('express');
const { createUser, getUser,getAllUsers,getDashBoardDetails } = require('../controllers/userController');
const{verifyUser} = require('../middlewares/auth')
const router = express.Router();

router.post('/create', createUser);
router.get('/login',getUser);
router.get("/getAllUsers",verifyUser,getAllUsers)
router.get("/getDashBoardDetails",verifyUser,getDashBoardDetails)

module.exports = router;
