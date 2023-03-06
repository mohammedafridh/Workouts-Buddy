import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    }, 
    reps:{
        type: String,
        required: true
    },
    load:{
        type: Number,
        required: true
    },
    user_id:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
)

const workoutModel = mongoose.model('workouts', workoutSchema)
export default workoutModel