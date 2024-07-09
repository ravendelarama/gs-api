"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email } = req.body;
        try {
            const hasEmail = yield user_1.default.findByEmail(email);
            if (hasEmail) {
                return res.json({
                    message: "Invalid Credentials."
                }).status(400);
            }
            const result = yield user_1.default.create({
                name,
                email
            });
            const payload = {
                sub: result === null || result === void 0 ? void 0 : result.id,
                email: result === null || result === void 0 ? void 0 : result.email
            };
            const access_token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "5h"
            });
            const refresh_token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "7 days"
            });
            res.cookie('accessToken', access_token, { httpOnly: true, secure: true });
            res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: true });
            return res.json({
                access_token,
                refresh_token
            }).status(201);
        }
        catch (error) {
            res.json({ message: "Something went wrong." }).status(500);
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const hasEmail = yield user_1.default.findByEmail(email);
            const payload = {
                sub: hasEmail === null || hasEmail === void 0 ? void 0 : hasEmail.id,
                email: hasEmail === null || hasEmail === void 0 ? void 0 : hasEmail.name
            };
            const access_token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "5h"
            });
            const refresh_token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "7 days"
            });
            res.cookie('accessToken', access_token, { httpOnly: true, secure: true });
            res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: true });
            return res.json({
                access_token,
                refresh_token
            }).status(200);
        }
        catch (_a) {
            res.json({ message: "Something went wrong." }).status(500);
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;
            const verifyRT = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
            const verifyAT = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
            const data = yield user_1.default.findMany();
            return res.json({
                data,
                rt: verifyRT,
                at: verifyAT
            }).status(200);
        }
        catch (error) {
            res.json({
                message: "Something went wrong.",
                error
            }).status(500);
        }
    });
}
