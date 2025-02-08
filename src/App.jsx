import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { PokePage } from './pages/PokePage/PokePage'
import './App.css'

function App() {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 970);

    useEffect(() => {
        const handleResizeMobile = () => {
            window.innerWidth <= 970 ? setIsMobile(true) : setIsMobile(false)
        };
        window.addEventListener('resize', handleResizeMobile);
        return () => {
            window.removeEventListener('resize', handleResizeMobile);
        }
    }, [])

    return (
        <>
            <Routes basename='/pokedex-api/'>
                <Route path="/pokedex-api/" element={<MainPage/>}/>
                <Route path="/pokedex-api/pokemon/:id" element={<PokePage
                    isMobile={isMobile}
                />}/>
            </Routes>
        </>
    )
}

export default App

