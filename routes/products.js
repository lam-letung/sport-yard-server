import express from "express";
import { createProduct, deleteProductByID, getProductByID, getProducts, updateProductByID } from "../controllers/products.js";



const router = express.Router()


router.get("/",getProducts)

router.get("/:id",getProductByID)

router.get("/:id/reviews")

router.post("/:id/reviews",)

router.post("/", createProduct)

router.put("/:id",updateProductByID)

router.delete("/:id",deleteProductByID)


export default router