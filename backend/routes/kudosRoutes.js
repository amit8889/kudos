const express = require('express');
const { addKudos, getAnalytics,getAllKudos,kudosLikeAddOrRemove } = require('../controllers/kudosController');
const{verifyUser} = require('../middlewares/auth')
const router = express.Router();

router.post('/addKudos', verifyUser,addKudos);
router.get('/getAllKudos',verifyUser, getAllKudos);
router.put('/kudosLikeAddOrRemove',verifyUser, kudosLikeAddOrRemove);
router.get('/analytics', getAnalytics);

module.exports = router;
