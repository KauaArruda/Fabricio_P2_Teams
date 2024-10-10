const Room = require('../models/Room');

class RoomRepository {
    static instance;

    constructor() {
        if (RoomRepository.instance) {
            return RoomRepository.instance;
        }
        RoomRepository.instance = this;
    }

    async createRoom(roomData) {
        try {
            const room = new Room(roomData);
            return await room.save();
        } catch (error) {
            throw new Error('Error creating room');
        }
    }

    async getAllRooms() {
        try {
            return await Room.find();
        } catch (error) {
            throw new Error('Error fetching rooms');
        }
    }

    async findRoomById(roomId) {
        try {
            return await Room.findById(roomId);
        } catch (error) {
            throw new Error('Error finding room by id');
        }
    }
}

module.exports = new RoomRepository();
