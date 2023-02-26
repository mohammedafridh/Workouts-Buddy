import React, {useState} from 'react'
import { useWorkoutContext } from '../../../context/WorkoutContext'


const AddWorkout = () => {

    const [title,setTitle] = useState('')
    const [reps,setReps] = useState('')
    const [load,setLoad] = useState('')
    const [error,setError] = useState(null)
    const [success,setSuccess] = useState('')
    const {dispatch} = useWorkoutContext()

    const submitHandler = async(e)=>{
        e.preventDefault()

        const workout = {title,reps,load}

        const response = await fetch('/workout/add/', {
            method:'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }if(response.ok){
            setError(null)
            setTitle('')
            setReps('')
            setLoad('')
            setSuccess('Workout Added Successfully!')
            console.log('added details', json)
            dispatch({type:'createWorkouts', payload:json})
        }
    }

  return (
    <form onSubmit = {submitHandler}>
        <h3>Add New Workout</h3>

        {success ? <p style = {{color:'green'}}>{success}</p> : ''}

        <label>Excercise Title:</label>
        <input 
            type='text'
            onChange={(e)=>setTitle(e.target.value)}
            value = {title}
            required
        />

        <label>Load (in kg):</label>
        <input 
            type='number'
            onChange={(e)=>setLoad(e.target.value)}
            value = {load}
            required
        />

        <label>Reps :</label>
        <input 
            type='number'
            onChange={(e)=>setReps(e.target.value)}
            value = {reps}
            required
        />

        <button type = 'submit'>Add Workout</button>

        {error && <p style = {{color:'red'}}>{error}</p>}

    </form>
  )
}

export default AddWorkout