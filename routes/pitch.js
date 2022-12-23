import express from "express";
import { createPitch, createReviewByPitch, deletePitchByID, getPitchByID, getPitches, getReviewsByPitch, updatePitchByID } from "../controllers/pitch.js";



const router = express.Router()

router.get("/:id/reviews", getReviewsByPitch)

router.post("/:id/reviews", createReviewByPitch)

router.delete("/:id",deletePitchByID)

router.put("/:id",updatePitchByID)

router.get("/:id",getPitchByID)

router.get("/",getPitches)

router.post("/", createPitch)



export default router