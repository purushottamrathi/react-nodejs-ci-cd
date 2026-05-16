import session from "express-session";

const sessionMiddleware =  session({
    secret: process.env.SecretKey as string || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
});

export default sessionMiddleware;