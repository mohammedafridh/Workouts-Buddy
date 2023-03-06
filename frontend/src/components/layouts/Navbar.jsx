import React from 'react'
import {Link} from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import useLogout from '../../hooks/useLogout'

const Navbar = () => {

  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = ()=>{
    logout()
  }

  return (
    <header>
        <div className="container">
            <h1>Workouts Noter</h1>

          <nav>
            {user && (
            <div>
              <span>{user.user.email}</span>
              <button onClick={handleClick}>Log Out</button>
            </div>
            )}

            {!user && (
              <div>
                <Link to = '/login'>Login</Link>
                <Link to = '/signup'>Signup</Link>
              </div>
            )}
          </nav>
        </div>
    </header>
  )
}

export default Navbar