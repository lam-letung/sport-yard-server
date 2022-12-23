import express from "express";
import { createTransaction, deleteTransactionByID, getTransactionByID, getTransactions, updateTransactionByID } from "../controllers/transactions.js";



const router = express.Router()




router.get("/",getTransactions)


router.get("/:id",getTransactionByID)


router.post("/", createTransaction)


router.put("/:id",updateTransactionByID)


router.delete("/:id",deleteTransactionByID)


export default router