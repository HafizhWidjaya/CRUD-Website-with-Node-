const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.dashboard);
router.get('/settings', userController.getSettings);
router.post('/settings', userController.updateName);
router.post('/delete', userController.deleteAccount);

module.exports = router;
