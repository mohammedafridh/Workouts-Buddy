import React, {useEffect} from 'react'
import { useWorkoutContext } from '../../../context/WorkoutContext'
import {formatDistanceToNow} from 'date-fns'
import { toast } from 'react-hot-toast'

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
    },[dispatch, workouts])

    const handleClick = async(id)=>{
       const response =  await fetch('/workout/' + id, {
        method: 'DELETE'
       })

       const json = await response.json()

       if(response.ok){
        dispatch({type:'deleteWorkout', payload:json})
        toast.success('Workout Deleted Successfully!')
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
                    <p className='date'>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                    <button onClick={()=>handleClick(workout._id)}
                    className = 'material-symbols-outlined'>
                        Delete
                    </button>
                </div>
            ))}
        </div>
  )
}

export default WorkoutDetails