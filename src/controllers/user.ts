import { Request, Response } from "express";
import db from "../lib/db";
import user from "../models/user";
import jwt from "jsonwebtoken";

export async function createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    try {
        const hasEmail = await user.findByEmail(email);

        if (hasEmail) {
            return res.json({
                message: "Invalid Credentials."
            }).status(400);
        }

        const result = await user.create({
            name,
            email
        });

        const payload = {
            sub: result?.id,
            email: result?.email
        }

        const access_token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "5h"
        });
        const refresh_token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "7 days"
        });

        res.cookie('accessToken', access_token, { httpOnly: true, secure: true });
        res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: true });
        
        return res.json({
            access_token,
            refresh_token
        }).status(201);
    } catch (error) {
        res.json({message: "Something went wrong."}).status(500);
    }
}

export async function loginUser(req: Request, res: Response) {
    const { email } = req.body;

    try {
        const hasEmail = await user.findByEmail(email);

        const payload = {
            sub: hasEmail?.id,
            email: hasEmail?.name
        }

        const access_token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "5h"
        });
        const refresh_token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "7 days"
        });

        
        res.cookie('accessToken', access_token, { httpOnly: true, secure: true });
        res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: true });

        return res.json({
            access_token,
            refresh_token
        }).status(200);
    } catch {
        res.json({ message: "Something went wrong." }).status(500);
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        const verifyRT = jwt.verify(refreshToken, process.env.JWT_SECRET!);
        const verifyAT = jwt.verify(accessToken, process.env.JWT_SECRET!);

        const data = await user.findMany();

        return res.json({
            data,
            rt: verifyRT,
            at: verifyAT
        }).status(200);
    } catch(error) {
        res.json({
            message: "Something went wrong.",
            error
        }).status(500);
    }
}