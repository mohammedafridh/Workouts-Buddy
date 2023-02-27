import workoutModel from "../models/workoutModel.js";

//add a workout
export const addWorkout = async(req,res)=>{

    // const newWorkout = new workoutModel(req.body)

    const {title,load,reps} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }if(!load){
        emptyFields.push('load')
    }if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: '*Please fill all the fields', emptyFields})
    }

    try{
        const newWorkout = await workoutModel.create({title, load,reps})
        res.status(200).json(newWorkout)

    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//get all workouts

export const getAllWorkouts = async(req,res)=>{
    const workouts = await workoutModel.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get workouts

export const getWorkout = async(req,res)=>{
    const id = req.params.id
    const workout = await workoutModel.findById(id)
    try{
        if(workout){
            res.status(200).json(workout)
        }else{
            res.status(403).json('Workout not found')
        }
    }catch(error){
        res.status(500).json(error)
    }
}

//delete a workout

export const deleteWorkout = async(req,res)=>{
    const id = req.params.id

    try{
        await workoutModel.findByIdAndDelete(id)
        res.status(200).json('Deleted Successfully!')
    }catch(error){
        res.status(500).json(error)
    }
}

//update a workout
export const updateWorkout = async(req,res)=>{
    const id = req.params.id
    const {title,reps,load} = req.body

    try{
        const workout = await workoutModel.findById(id)
        const updatedWorkout = await workout.updateOne({$set:req.body})
        res.status(200).json("Updated Successfully")
    }catch(err){
        res.status(500).json(err)        
    }
}