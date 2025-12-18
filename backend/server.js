require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./routes/api');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS Configuration
const corsOptions = {
    origin: NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || '*' // Allow all in production if FRONTEND_URL not set
        : 'http://localhost:5173', // Development
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// API Routes
app.use('/api', apiRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: NODE_ENV
    });
});

// Serve Frontend Static Files in Production
if (NODE_ENV === 'production') {
    const frontendBuildPath = path.join(__dirname, '../frontend/dist');

    // Serve static files
    app.use(express.static(frontendBuildPath));

    // Handle React Router - send all non-API requests to index.html
    // This MUST be the last GET route
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
} else {
    // Development - just show API status
    app.get('/', (req, res) => {
        res.json({
            message: 'Personal Habit Coach API is running.',
            environment: NODE_ENV,
            endpoints: {
                analyze: '/api/analyze',
                history: '/api/history',
                sample: '/api/sample'
            }
        });
    });
}

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`CORS enabled for: ${corsOptions.origin}`);
});
