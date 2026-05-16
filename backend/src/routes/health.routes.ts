
import express, {Request, Response} from "express";

const router = express.Router();

/**
 * Health check – used in production monitoring
 */
router.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        nodeVersion: process.version,
        env: process.env.NODE_ENV
    });
});

/**
 * Test endpoint – frontend will display this
 */
router.get("/message", (req: Request, res: Response) => {
    res.json({
        message: "Frontend and Backend are CONNECTED finally!!!",
        timestamp: new Date().toISOString()
    });
});

export default router;