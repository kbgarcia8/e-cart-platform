import express from "express";
import cors from "cors";

const app = express();

//Global middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

export default app;