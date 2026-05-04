const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Health check – used in production monitoring
 */
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        nodeVersion: process.version,
        env: process.env.NODE_ENV
    });
});

/**
 * Test endpoint – frontend will display this
 */
app.get("/api/message", (req, res) => {
    res.json({
        message: "Frontend and Backend are CONNECTED finally!!!",
        timestamp: new Date().toISOString()
    });
});

module.exports = app;