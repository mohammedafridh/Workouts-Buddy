import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useWorkoutContext } from '../context/WorkoutContext'
import { toast } from 'react-hot-toast'

const useLogout = () => {
    
    const {dispatch} = useAuthContext()
    const {dispatch: workoutsDispatch} = useWorkoutContext()

    const logout = async()=>{
        //remove user from storage
        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
        workoutsDispatch({type:'setWorkouts', payload:null})
        toast.success('Logged out successfully!')
    }

    return {logout}
}

export default useLogout