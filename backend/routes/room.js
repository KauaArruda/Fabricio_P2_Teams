const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const RoomController = require('../controllers/roomController');
const router = express.Router();

router.post('/create', authenticateToken, RoomController.createRoom);
router.get('/', authenticateToken, RoomController.getRooms);
router.post('/join/:roomId', authenticateToken, RoomController.joinRoom);

module.exports = router;
