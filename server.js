const express = require('express');
const path = require('path');
const app = express();

// IMPORTANT: Use Railway's PORT environment variable
const PORT = process.env.PORT || 3000;

// Security middleware
app.use((req, res, next) => {
    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Log all requests with disclaimer
app.use((req, res, next) => {
    console.log(`[EDUCATIONAL PURPOSE] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Educational BITB Demo Server is running' });
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ========================================
    EDUCATIONAL BITB DEMO SERVER
    ========================================
    Server running on port ${PORT}
    
    ⚠️  IMPORTANT: This is for educational purposes only!
    ⚠️  Do not use for malicious activities!
    ⚠️  Learn about phishing prevention!
    ========================================
    `);
});