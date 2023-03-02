import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const useLogout = () => {
    
    const {dispatch} = useAuthContext()
    const logout = async()=>{
        //remove user from storage
        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
    }

    return {logout}
}

export default useLogout