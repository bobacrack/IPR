import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../home/home';
import Navbar from '../nav/nav';
import RegistrationPage from '../login/login';


function Homes() {
    return <p>Home</p>
}

function About() {
    return <p>Welcome to Tenter - the dating platform for outdoor enthusiasts who want to connect over their love of camping and nature! Whether you're an experienced hiker, a weekend warrior, or simply enjoy spending time in nature, Campfire Connections is the perfect place to meet like-minded individuals and plan your next adventure together. Our platform allows you to browse through a variety of high-quality tents, select your favorites, and connect with others who share your camping interests. From cozy one-person tents to spacious family tents - we have everything you need. And with our user-friendly interface and messaging system, it has never been easier to find your camping partner. So what are you waiting for? Sign up now and connect with other outdoor enthusiasts on Tenter!</p>
}

export default function RootRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path='/login' element={<RegistrationPage />} />
            </Routes >
        </BrowserRouter >
    )
}