import React, {useState} from 'react'
import { useAuthContext } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

const useLogin = () => {
    const[error,setError]= useState(null)
    const[isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async(email,password)=>{
        setError(null)
        setIsLoading(true)

        const response = await fetch('/user/login', {
        method:'POST',
        body:JSON.stringify({email,password}),
        headers: {'Content-Type':'application/json'}
    })

    const json = await response.json()

    if(!response.ok){
        setError(json.error)
        setIsLoading(false)
    }if(response.ok){
        localStorage.setItem('user', JSON.stringify(json))

        dispatch({type:"LOGIN", payload:json})

        toast.success('Login Successful!')

        setIsLoading(false)
    }
    }

    return {login, error, isLoading}
}

export default useLogin