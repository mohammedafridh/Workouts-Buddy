import React, {useEffect, useState} from 'react'
import { useWorkoutContext } from '../../../context/WorkoutContext'
import {formatDistanceToNow} from 'date-fns'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../../../context/AuthContext'

const WorkoutDetails = () => {

    const {workouts,dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await fetch("/workout/", {
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                // setWorkouts(json)
                dispatch({type:'setWorkouts', payload:json})
                
            }
        }

        if(user){
        fetchWorkouts()
        }
    },[workouts,user])

    const handleClick = async(id)=>{

        if(!user){
            toast.error('You must be logged in to do this action')
            return
        }

       const response =  await fetch('/workout/' + id, {
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