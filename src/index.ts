import express from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import apiRoutes from "./routes/index";

dotenv.config();

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use('/api', apiRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT;

server.listen(PORT ?? 3000, () => {
    console.log(`Server is running in port ${PORT ?? 3000}`);
});