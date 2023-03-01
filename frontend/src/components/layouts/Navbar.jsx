import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
        <div className="container">
            <h1>Workouts Noter</h1>

          <nav>
              <div>
                <Link to = '/login'>Login</Link>
                <Link to = '/signup'>Signup</Link>
              </div>
          </nav>
        </div>
    </header>
  )
}

export default Navbar