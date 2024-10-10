const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const RoomController = require('../controllers/roomController');
const router = express.Router();

router.post('/create', authenticateToken, RoomController.createRoom);
router.get('/', authenticateToken, RoomController.getRooms);
router.post('/join/:roomId', authenticateToken, RoomController.joinRoom);

module.exports = router;

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Lista todas as salas
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Lista de salas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
router.get('/', authenticateToken, RoomController.getRooms);
