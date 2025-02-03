import { Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { PokePage } from './pages/PokePage/PokePage'
import './App.css'

function App() {

    return (
        <>
            <Routes>
                <Route path="/pokedex/" element={<MainPage/>}/>
                <Route path="/pokedex/pokemon/:id" element={<PokePage/>}/>
            </Routes>
        </>
    )
}

export default App

