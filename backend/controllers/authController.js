const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

class AuthController {
    static instance;

    constructor() {
        if (AuthController.instance) {
            return AuthController.instance;
        }
        AuthController.instance = this;
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserRepository.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send('Error list users');
        }
    }

    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = { name, email, password: hashedPassword };
            await UserRepository.createUser(userData);
            res.status(201).send('User registered');
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(400).send('Error registering user');
        }
    }
    

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserRepository.findUserByEmail(email);
            if (!user) return res.status(404).send('User not found');

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).send('Invalid credentials');

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(400).send('Error logging in');
        }
    }
}

module.exports = new AuthController();
