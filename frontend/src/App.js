import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
    return(
        <div className = 'app'>
            <Toaster />
            <BrowserRouter>
            <Navbar />
                <div className='pages'>
                    <Routes>
                        <Route path = '/' element = {<Home />}/>
                    </Routes>
                    <Routes>
                        <Route path = '/login' element = {<Login />}/>
                    </Routes>
                    <Routes>
                        <Route path = '/signup' element = {<Signup />}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;
