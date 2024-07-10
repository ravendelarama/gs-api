import express from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import v1Routes from "./v1/routes/index";
import { config } from "./config/config";

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// api versions
app.use('/api/v1', v1Routes);

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`Server is running in port ${config.port}`);
});