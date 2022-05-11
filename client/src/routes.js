
import React from 'react'// eslint-disable-next-line
import {Route, Routes, Navigate} from 'react-router-dom'
import WeatherPage from './pages/WeatherPage'
import MainPage from './pages/MainPage'
import AuthPage from './pages/AuthPage'
import CityPage from './pages/CityPage'


const useRoute = isRegister => {
    if(isRegister){
        return(
            <Routes>
                <Route path='/main' element={<MainPage />} />
                <Route path='/weather' element={<WeatherPage />} />
                <Route path='/city/:id' element={<CityPage />} />
                <Route path='*' element={<Navigate to='/main' />} />
            </Routes>
        )
    }

    return(
        <div id='container'>
            <div id='board'>
                <div>
                <Routes>
                    <Route exact path='/api/auth' element={<AuthPage />} />
                    <Route path='*' element={<Navigate to='/api/auth' />} />
                </Routes>
                </div>
            </div>
        </div>
    )
}

//<Route path='*' element={<Navigate to='/register' />} />

export default useRoute







