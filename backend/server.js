require('dotenv').config();
const express = require('express');
const http = require('http');
const connectMongoDB = require('./config/dbMongo');
const { connectPostgresDB } = require('./config/dbPostgres');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/room');
const { authenticateToken } = require('./middleware/authMiddleware');
const { socketConnection } = require('./config/socket'); 

const app = express();
const server = http.createServer(app);  

app.use(express.json());

connectMongoDB();
connectPostgresDB();

app.get('/', (req, res) => res.send('API is running'));
app.use('/api/auth', authRoutes);
app.use('/api/rooms', authenticateToken, roomRoutes);

socketConnection(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for the Prova Lab Full project',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./backend/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

