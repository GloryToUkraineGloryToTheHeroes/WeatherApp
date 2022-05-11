

import { Link } from 'react-router-dom'


import React from 'react'
const api = {
  key: 'd51d4784cd342e55ea315cfc0d163f92',
  base: 'https://api.openweathermap.org/data/2.5/'
}

export const CitysList = ({citys}) => {



  const tempArr = []

  // eslint-disable-next-line
  const [tempA, setTempA] = React.useState([])

  // eslint-disable-next-line
  const [temperature, setTemperature] = React.useState('')
  const [found, setFound] = React.useState(false)

  if(!citys.length){
    return <p>Not found</p>
  }


  // eslint-disable-next-line
  citys.map( (city, index)  => {
    const search = async () => {
        try{
          await fetch(`${api.base}weather?q=${city.city}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then( result => {
            setTemperature(result.main.temp)
            setFound(true)
            if(result.main.temp !== ''){
              tempA.push({
                temper: result.main.temp,
                city: city.city,
                index: index
              })
            }
          })
        }catch(err){}
      }
      if(!found){
      search()
      }
  })

  for(var i = 0; i < tempA.length; i++ ){
    tempArr.splice(tempA[i].index, 0, tempA[i].temper)
  }

  return(
    <table>
      <thead>
        <tr>
        <th>№</th> 
        <th>City</th> 
        <th>Temperature</th>
        <th>Watch full</th>
        </tr>
      </thead>

      <tbody>
      { citys.map( (city, index) => {

        return(
          <tr key={city._id}>
            <td>{index + 1}</td>
            <td>{city.city}</td>
            <td>{Math.round(tempArr[index])}°C</td>
            <td>
              <Link to={`/city/${city._id}`}>Open</Link>
            </td>
          </tr>
        )
      } ) }

      </tbody>
    </table>
  )
}

