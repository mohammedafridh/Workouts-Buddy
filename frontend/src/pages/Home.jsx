import React from 'react'
import AddWorkout from '../components/pageComponents/homepage/AddWorkout'
import WorkoutDetails from '../components/pageComponents/homepage/WorkoutDetails'

const Home = () => {
  return (
    <div className="home">
        <WorkoutDetails />
        <AddWorkout />
    </div>
  )
}

export default Home