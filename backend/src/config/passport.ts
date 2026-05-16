import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth2";
import userDb, {IUser} from "../models/user.model";
import { Request } from "express";

const clientIDs = process.env.Client_ID;
const clientSecrets = process.env.Client_Secret;

if (!clientIDs || !clientSecrets) {
  throw new Error("Missing Google OAuth credentials");
}

passport.use(new GoogleStrategy(
    {
        clientID: clientIDs as string,
        clientSecret: clientSecrets as string,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
        passReqToCallback: true
    },
        
    async (_request: Request, _accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) => {

        try {
            let user = await userDb.findOne({ googleId: profile.id });
            if (!user) {
                user = await userDb.create({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails && profile?.emails[0].value,
                    image: profile.photos && profile?.photos[0].value
                });
                await user.save();
            }

            return done(null, user as IUser);
        } catch (error) {
            console.error("Error in Google Strategy:", error);
            done(error as Error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user as IUser);
});

export default passport;