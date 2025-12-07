const express = require('express');
const router = express.Router();
const controller = require('../controllers/analysisController');

router.post('/analyze', controller.analyzeDay);
router.get('/history', controller.getHistory);
router.get('/sample', controller.getSample);

module.exports = router;
