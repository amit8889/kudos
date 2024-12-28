const express = require('express');
const { createBadge,getAllBadges } = require('../controllers/badgeContoller');

const router = express.Router();

router.post('/create', createBadge);
router.get('/getAllBadges',getAllBadges)

module.exports = router;
