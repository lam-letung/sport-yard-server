import express from "express";
import { createOrder, deleteOrderByID, getOrderByID, getOrders, updateOrderByID } from "../controllers/orders.js";



const router = express.Router()




router.get("/",getOrders)


router.get("/:id",getOrderByID)


router.post("/", createOrder)


router.put("/:id",updateOrderByID)


router.delete("/:id",deleteOrderByID)


export default router