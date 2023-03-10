import React,{useState} from 'react'
import { useAuthContext } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

const useSignup = () => {

    const[error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async(email,password)=>{
        setError(null)
        setIsLoading(true)

        const response = await fetch('/user/', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN', payload: json})

            toast.success('Registered Successfully!')

            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}

export default useSignup