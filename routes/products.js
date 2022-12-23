import express from "express";
import { createProduct, createReviewByProduct, deleteProductByID, getProductByID, getProducts, getReviewsByProducts, updateProductByID } from "../controllers/products.js";



const router = express.Router()




router.get("/:id/reviews", getReviewsByProducts)

router.post("/:id/reviews", createReviewByProduct)

router.get("/:id",getProductByID)

router.put("/:id",updateProductByID)

router.delete("/:id",deleteProductByID)

router.get("/",getProducts)

router.post("/", createProduct)




export default router