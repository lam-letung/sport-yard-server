import express from "express";
import { createMessage, deleteMessageByID, getMessageByID, getMessages, updateMessageByID } from "../controllers/messages.js";



const router = express.Router()




router.get("/",getMessages)


router.get("/:id",getMessageByID)


router.post("/", createMessage)


router.put("/:id",updateMessageByID)


router.delete("/:id",deleteMessageByID)


export default router