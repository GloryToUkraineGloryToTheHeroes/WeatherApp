
import React from "react";

const api = {
    key: 'f913a895be5740cbd04d53adf0be97a7',
    base: 'https://api.openweathermap.org/data/2.5/'
  }

  

function WeatherPage(){

    const [weather, setWeather] = React.useState({})
    const [query, setQuery] = React.useState('')

    const search = evt => {
        if(evt.key === 'Enter'){
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            setWeather(result)
            setQuery('')
            console.log(result)
        })
        }
    }
  
    const onChange = (e) => {
        setQuery(e.target.value)
    }

    return(
        <div>
            <div>
                <div>
                    <input 
                    type='text' 
                    onChange={onChange}
                    value={query}
                    onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != 'undefined') ? (
                <div>
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <h3>Temperature: {Math.round(weather.main.temp)}°C</h3>
                    <h3>Weather: {weather.weather[0].main}</h3>
                    <h4>Date: {new Date().toLocaleString()}</h4>
                </div>
                ) : ('')}
            </div>
            <button>Add</button>
        </div>
    )
}


export default WeatherPage