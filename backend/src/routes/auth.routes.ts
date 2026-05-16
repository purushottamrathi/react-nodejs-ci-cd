
import express from "express";
import passport from "passport";
import { loginSuccess, logout } from "../controllers/auth.controller";


const router = express.Router();
/**
 * Initial Google Auth Routes
 */
router.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.Success_Url,
        failureRedirect: process.env.Failure_Url,
    }),
);


router.get("/login/success", loginSuccess);
router.get("/logout", logout);


export default router;