import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from "cors";
// AUTH
import passport from "modules/auth/passport";
import cookieParser from 'cookie-parser';
//ROUTES
import authRouter from 'modules/auth/auth.routes';
//CUSTOM ERRORS
import { AppError } from 'shared/errors/errors';

export const app = express();

//Global middlewares
// ? Block: It’s OK for requests coming from http://localhost:5173 to talk to this Express server.
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true // ? allows cookies, auth headers and sessions
}));

//? Parse URL-encoded bodies (from HTML forms or POST requests with content-type application/x-www-form-urlencoded)
//? `extended: true` allows nested objects like user[name]=Alice → { user: { name: "Alice" } }
app.use(express.urlencoded({ extended: true }));
//? Parse incoming JSON payloads (application/json) so you can access data via req.body
app.use(express.json());

//* Passport
app.use(passport.initialize());
app.use(cookieParser());

//* Routes
app.use("/auth", authRouter);

if (process.env.NODE_ENV === "production") {
    // Serve React build
    //? for serving the built React app (index.html + static assets) after you run npm run build
    const clientPath = path.join(__dirname, "..", "client", "dist");
    app.use(express.static(clientPath));
    
    // SPA fallback
    //?“For any unknown route, always send index.html.” Then index.html loads main.tsx, and React Router handles the rest based on the URL.
    //? Only needed in prod since in dev, In dev, Vite and Express are two separate servers.
    //? Vite serves the frontend and already handles SPA routing.
    //? Express only serves the API.
    //? They just communicate over HTTP.

    app.get("*", (_req, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
    });
}

//Global Error middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    //console.error(err);
    if (err instanceof AppError) {
        console.log(Number(err.code) || 500)
        return res.status(Number(err.code) || 500).json({
            code: err.code,
            success: false,
            message: err.message,
            errors: err.details
        });
    }
    res.status(500).json({ message: "Internal Server Error" });
});

export default app;