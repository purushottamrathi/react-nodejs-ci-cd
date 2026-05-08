const express = require("express");
const app = express();
const cors = require("cors");
const clientID = process.env.Client_ID;
const clientSecret = process.env.Client_Secret;
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const userDb = require('./models/user.model')

app.use(cors({
    origin: `${process.env.FrontendOrigin}`,
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));

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

/**
 * Google OAuth2 Authentication Setup
 */
app.use(session({
    secret: process.env.SecretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }
}));

/**
 * Configure Passport with Google OAuth2 Strategy
*/
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {

        try {
            let user = await userDb.findOne({ googleId: profile.id });
            if (!user) {
                user = await userDb.create({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });
                await user.save();
            }

            return done(null, user);
        } catch (error) {
            console.error("Error in Google Strategy:", error);
            done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});


/**
 * Initial Google Auth Routes
 */
app.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.Success_Url,
        failureRedirect: process.env.Failure_Url,
    }),
);

app.get("/login/success", async (req, res) => {

    if (req.user) {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    }

    return res.status(200).json({
        authenticated: false,
        user: null
    });

});

app.get("/logout", (req, res, next) => {
    req.logOut(function (error) {
        if (error) {
            return next(error)
        }
        res.redirect(`${process.env.FrontendOrigin}`)
    });
})
module.exports = app;