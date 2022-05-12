
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'


const api = {
    key: 'd51d4784cd342e55ea315cfc0d163f92',
    base: 'https://api.openweathermap.org/data/2.5/'
}



function WeatherPage(){

    

    const navigate = useNavigate()

    const auth = React.useContext(AuthContext)

    const{request} = useHttp()

    const [city, setCity] = React.useState('')

    const addClick = async () => {
        try{
            const data = await request('/weather', 'POST', {city: city}, {Auth: `${auth.token}`})
            console.log(data)
            navigate(`/city/${data._id}`)
            setCity('')
        }catch(err){
            console.log(err)
        }
    }

    const [weather, setWeather] = React.useState({})

    const search = evt => {
        if(evt.key === 'Enter'){
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            setWeather(result)
            console.log(result)
        })
        }
    }

    return(
        <div style={{margin: '70px 120px 0 120px'}}>
            <h2>Weather</h2>
            <input 
                placeholder='Enter city'
                type='text' 
                name='city' 
                id="city"
                onKeyPress={search}
                onChange={e => setCity(e.target.value)} 
            />
            {(typeof weather.main != 'undefined') ? (
                <div>
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <h3>Temperature: {Math.round(weather.main.temp)}°C</h3>
                    <h3>Weather: {weather.weather[0].main}</h3>
                    <h4>Date: {new Date().toLocaleString()}</h4>
                    <button className="waves-effect waves-light btn pink accent-3" style={{margin: '20px 0 0 0', width: '100px'}} onClick={addClick}>Add</button>
                </div>
                ) : ('')}
            
        </div>
    )
}


export default WeatherPage









