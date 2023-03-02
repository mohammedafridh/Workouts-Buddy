import React,{useState} from 'react'
import useSignup from '../hooks/useSignup'

const Signup = () => {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

  const handleSubmit = async(e)=>{
    e.preventDefault()

    await signup(email,password)
  }

  return (
    <form onSubmit={handleSubmit} className="signup">
      <h2>Sign Up</h2>

      <label>Email:</label>
      <input 
      type='email'
      onChange={(e)=>setEmail(e.target.value)}
      value = {email}
      />

      <label>Password:</label>
      <input 
      type='password'
      onChange={(e)=>setPassword(e.target.value)}
      value = {password}
      />

      <button type='submit' disabled = {isLoading}>Sign Up</button>
      {error && <div className='errors'>{error}</div>}
    </form>
  )
}

export default Signup