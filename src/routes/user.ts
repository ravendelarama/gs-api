import express, { Request, Response, Router } from "express";
import { createUser, getUsers, loginUser } from "../controllers/user";

const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/', getUsers);

export default router;