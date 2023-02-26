import { createContext, useReducer,useContext } from "react";

const WorkoutContext = createContext()

export const WorkoutContextProvider = ({children})=>{

    const workoutsReducer = (state,action)=>{
        switch(action.type){
            case 'setWorkouts':
                return {
                    workouts: action.payload
                }
            case 'createWorkouts':
                return {
                    workouts: [action.payload, ...state.workouts]
                }
            case 'deleteWorkout':
                return {
                    workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
                }
            default:
                return state
        }
    }

    const[state,dispatch] = useReducer(workoutsReducer, {
        workouts:null
    })

    return(
        <WorkoutContext.Provider value = {{...state,dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}

export function useWorkoutContext(){
    return useContext(WorkoutContext)
}