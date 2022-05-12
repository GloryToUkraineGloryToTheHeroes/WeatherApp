
import React from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const api = {
    key: 'd51d4784cd342e55ea315cfc0d163f92',
    base: 'https://api.openweathermap.org/data/2.5/'
}

export const CityCard = (city) => {

    const { request } = useHttp()
    const auth = React.useContext(AuthContext)

    const navigate = useNavigate()


    const [weather, setWeather] = React.useState({})
    const [found, setFound] = React.useState(false)

    const search = () => {
        fetch(`${api.base}weather?q=${city.city.city}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            setWeather(result)
            console.log(result)
            setFound(true)
        })
    }

    React.useEffect(() => {
        if(!found){
            search()
        }
    })

    const deleteCity = async () => {
        try{
          const data = await request('/city/delete', 'POST', {id: city.city._id}, {Auth: `${auth.token}`})
          console.log(data)
          navigate(`/main`)
        }catch(err){
          console.log(err)
        }
      }
    

    return(
        <div style={{margin: '70px 120px 0px'}}>
            {(typeof weather.main != 'undefined') ? (
                <div>
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <h3>Temperature: {weather.main.temp}°C</h3>
                    <h3>Weather: {weather.weather[0].main}</h3>
                    <h4>Date: {new Date().toLocaleString()}</h4>
                    <button className="waves-effect waves-light btn pink accent-3" style={{margin: '20px 0 0 0', width: '100px'}} onClick={deleteCity}>Delete</button>
                </div>
                ) : ('')}
        </div>
    )
}

