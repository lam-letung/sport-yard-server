import express from "express";
import { Login } from '../controllers/login.js'


const router = express.Router()

router.post("/", Login)


export default router