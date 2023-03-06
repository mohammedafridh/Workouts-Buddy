import React from 'react'
import {formatDistanceToNow} from 'date-fns'
import { toast } from 'react-hot-toast'
import { useWorkoutContext } from '../../../context/WorkoutContext'
import { useAuthContext } from '../../../context/AuthContext'

const AllWorkouts = ({workout}) => {

    const {workouts,dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    const handleClick = async()=>{

        if(!user){
            toast.error('You must be logged in to do this action')
            return
        }

       const response =  await fetch('/workout/' + workout._id, {
        method: 'DELETE',
        headers:{
            'Authorization':`Bearer ${user.token}`
        }
       })

       const json = await response.json()

       if(response.ok){
        dispatch({type:'deleteWorkout', payload:json})
        toast.success('Workout Deleted Successfully!')
       }
    }

  return (
    <div className="workoutDetails">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps : </strong>{workout.reps}</p>
        <p className='date'>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        <button onClick={handleClick}
        className = 'material-symbols-outlined'>
            Delete
        </button>
    </div>
  )
}

export default AllWorkouts