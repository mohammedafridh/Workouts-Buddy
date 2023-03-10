import express from "express";
import { addWorkout, deleteWorkout, getAllWorkouts, getWorkout, updateWorkout } from "../controllers/workoutController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router()

router.use(requireAuth)

router.post('/add',addWorkout )
router.get('/',getAllWorkouts)
router.get('/:id',getWorkout)
router.delete('/:id', deleteWorkout)
router.put('/:id', updateWorkout)

export default router

