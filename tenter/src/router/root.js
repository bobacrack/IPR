import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
    return <p>Home</p>
}

function About() {
    return <p>About</p>
}

export default function RootRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}