import React, {useState,useEffect} from 'react'
import { useWorkoutContext } from '../../../context/WorkoutContext'


const WorkoutDetails = () => {

    // const [workouts,setWorkouts] = useState([])
    const {workouts,dispatch} = useWorkoutContext()

    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await fetch("/workout/")
            const json = await response.json()

            if(response.ok){
                // setWorkouts(json)
                dispatch({type:'setWorkouts', payload:json})
            }
        }

        fetchWorkouts()
    },[workouts])

    const handleClick = async(id)=>{
       const response =  await fetch('/workout/' + id, {
        method: 'DELETE'
       })

       const json = await response.json()

       if(response.ok){
        dispatch({type:'deleteWorkout', payload:json})
       }
    console.log(id)
    }

  return (
        <div className="workouts">
            {workouts && workouts.map((workout)=>(
                <div className="workoutDetails" key = {workout._id}>
                    <h4>{workout.title}</h4>
                    <p><strong>Load (kg): </strong>{workout.load}</p>
                    <p><strong>Reps : </strong>{workout.reps}</p>
                    <p>{workout.createdAt}</p>
                    <span onClick={()=>handleClick(workout._id)}>
                        delete
                    </span>
                </div>
            ))}
        </div>
  )
}

export default WorkoutDetails