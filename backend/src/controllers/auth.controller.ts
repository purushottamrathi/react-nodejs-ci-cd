import { Request, Response, NextFunction } from "express";

export const loginSuccess = (req: Request, res: Response) => {

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
}



export const logout = (req: Request, res: Response, next: NextFunction) => {
    req.logOut(function (error) {
        if (error) {
            return next(error)
        }
        res.redirect(`${process.env.FrontendOrigin}`)
    });
}