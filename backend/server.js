require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');
const vjudgeRoutes = require('./routes/vjudge');
const scheduleDailyEmail = require('./cron/dailyMailer');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    environment: process.env.NODE_ENV
  });
});

// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB connection successful');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// API Routes
app.use('/api/email', emailRoutes);
app.use('/api/vjudge', vjudgeRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start Cron Job for daily emails
if (process.env.NODE_ENV === 'production') {
  scheduleDailyEmail();
}
