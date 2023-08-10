import "dotenv/config";
import mongoose from "mongoose";
import express from 'express';
import session from "express-session";
import cors from 'cors'
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
import HelloController from "./controllers/hello-controller.js";
const app = express()


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
    if (process.env.NODE_ENV !== "development") {
        sessionOptions.proxy = true;
        sessionOptions.cookie = {
            sameSite: "none",
            secure: true,
        };
}
    app.use(
        session(sessionOptions)
);

app.use(express.json());
AuthController(app)
TuitsController(app);
HelloController(app)
UserController(app)
// app.listen(4000)
app.listen(process.env.PORT || 4000);