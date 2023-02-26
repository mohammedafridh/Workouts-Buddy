import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './layouts/Navbar';
import Home from './pages/Home';

function App() {
    return(
        <div className = 'app'>
            <BrowserRouter>
            <Navbar />
                <div className='pages'>
                    <Routes>
                        <Route path = '/' element = {<Home />}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;
