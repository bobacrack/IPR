import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../home/home';
import Navbar from '../nav/nav';
import RegistrationPage from '../login/login';


function Homes() {
    return <p>Home</p>
}

function About() {
    return <p>About</p>
}

export default function RootRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path='/login' element={<RegistrationPage />} />
            </Routes>
        </BrowserRouter>
    )
}