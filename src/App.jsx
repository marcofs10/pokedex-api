import { Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import './App.css'

function App() {

    return (
        <>
            <Routes>
                <Route path="/pokedex/" element={<MainPage/>}/>
            </Routes>
        </>
    )
}

export default App

