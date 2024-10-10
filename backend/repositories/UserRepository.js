const User = require('../models/User');

class UserRepository {
    static instance;

    constructor() {
        if (UserRepository.instance) {
            return UserRepository.instance;
        }
        UserRepository.instance = this;
    }

    async createUser(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            console.error('Error in createUser:', error.message); // Adicionando log do erro
            throw new Error('Error creating user');
        }
    }    

    async findUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error('Error finding user by email');
        }
    }

    async findUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw new Error('Error finding user by id');
        }
    }
}

module.exports = new UserRepository();
