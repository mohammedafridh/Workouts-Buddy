import React, {useState} from 'react'
import { useWorkoutContext } from '../../../context/WorkoutContext'
import { toast } from 'react-hot-toast'

const AddWorkout = () => {

    const [title,setTitle] = useState('')
    const [reps,setReps] = useState('')
    const [load,setLoad] = useState('')
    const [error,setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    // const [success,setSuccess] = useState('')
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
            setEmptyFields(json.emptyFields)
        }if(response.ok){
            setError(null)
            setTitle('')
            setReps('')
            setLoad('')
            setEmptyFields([])
            toast.success('Workout Added Successfully!')
            dispatch({type:'createWorkouts', payload:json})
        }
    }

  return (
    <form onSubmit = {submitHandler}>
        <h2>Add New Workout</h2>

        {/* {success ? <p style = {{color:'green'}}>{success}</p> : ''} */}

        <label>Excercise Title:</label>
        <input 
            type='text'
            onChange={(e)=>setTitle(e.target.value)}
            value = {title}
            className={emptyFields.includes('title')? 'error' : ''}
        />

        <label>Load (in kg):</label>
        <input 
            type='number'
            onChange={(e)=>setLoad(e.target.value)}
            value = {load}
            className={emptyFields.includes('load')? 'error' : ''}
        />

        <label>Reps :</label>
        <input 
            type='text'
            onChange={(e)=>setReps(e.target.value)}
            value = {reps}
            className={emptyFields.includes('reps')? 'error' : ''}
        />

        <button type = 'submit'>Add Workout</button>

        {error && <p className='errors'>{error}</p>}

    </form>
  )
}

export default AddWorkout