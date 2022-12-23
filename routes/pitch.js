import express from "express";
import { createPitch, deletePitchByID, getPitchByID, getPitches, updatePitchByID } from "../controllers/pitch.js";



const router = express.Router()


router.get("/",getPitches)

router.get("/:id",getPitchByID)

router.get("/:id/reviews")

router.post("/", createPitch)

router.post("/:id/reviews",)

router.put("/:id",updatePitchByID)

router.delete("/:id",deletePitchByID)


export default router