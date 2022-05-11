
import React from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'

function WeatherPage(){

    const message = useMessage()// eslint-disable-next-line
    const {loading, error, clearError, request} = useHttp()
    const [city, setCity] = React.useState('')

    const addCity = async() => {
        try{
            const data = await request('/weather', 'POST', {city})
            console.log('Data :', data)
            message(data.message)
        }catch(err){}
    }

    return(
        <div>
            <h2>Weather</h2>
            <input 
                type='text' 
                name='city' 
                id="city"
                onChange={event => setCity(event.target.value)} 
                defaultValue={city} 
            />
            <button onClick={addCity}>Add</button>
        </div>
    )
}


export default WeatherPage



