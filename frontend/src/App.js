import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './context/AuthContext';

function App() {

    const {user} = useAuthContext()

    return(
        <div className = 'app'>
            <Toaster />
            <BrowserRouter>
            <Navbar />
                <div className='pages'>
                    <Routes>
                        <Route path = '/' element = {user? <Home /> : <Navigate to = '/login'/>}/>
                    </Routes>
                    <Routes>
                        <Route path = '/login' element = {!user? <Login /> : <Navigate to = '/'/>}/>
                    </Routes>
                    <Routes>
                        <Route path = '/signup' element = {!user? <Signup /> : <Navigate to = '/'/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;
