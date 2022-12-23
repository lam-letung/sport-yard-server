import express from "express";
import { createUser, deleteUserByID, getUserByID, getUsers, updateUserByID } from "../controllers/users.js";



const router = express.Router()




router.get("/",getUsers)


router.get("/:id",getUserByID)


router.post("/", createUser)


router.put("/:id",updateUserByID)


router.delete("/:id",deleteUserByID)


export default router