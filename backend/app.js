import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config({path: './.env'});

const app = express();

app.use(cookieParser());
app.use(express.static("public"));

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        Credential: true,
        optionsSuccessStatus: 200,
    }
));

app.use(express.json(
    {
        limit: "16kb"
    }
));

app.use(express.urlencoded(  
    {
        extended: true,
        limit: "16kb"
    }
));

// import router
import router from "./src/routers/auth.router.js";



app.use("/api/v1/auth", router);








export default app;
