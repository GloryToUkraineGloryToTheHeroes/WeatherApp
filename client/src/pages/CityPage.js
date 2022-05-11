
import React from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { CityCard } from '../components/CityCard'

const CityPage = () => {

    const {token} = React.useContext(AuthContext)
    const {request, loading} = useHttp()
    const [city, setCity] = React.useState(null)
    const cityId = useParams().id

    const getCity = React.useCallback( async () => {
        try{
            const data = await request(`/city/${cityId}`, 'GET', null, {Auth: token})
            setCity(data)
        }catch(err){}
    }, [token, cityId, request])


    React.useEffect( () => {
        getCity()
    }, [getCity])

    if(loading){
        return <Loader />
    }

    return(
        <>
            { !loading && city && <CityCard city={city} />}
        </>
    )
}

export default CityPage


//city={city}





