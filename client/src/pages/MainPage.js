
import React from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { CitysList } from '../components/CitysList'

function MainPage(){

    const [citys, setCitys] = React.useState([])
    const {request, loading} = useHttp()
    const {token} = React.useContext(AuthContext)

    const foundCitys = React.useCallback( async () => {
        try{
            const fetched = await request('/main', 'GET', null, {Auth: token})
            setCitys(fetched)
        }catch(err){}
    }, [token, request])

    React.useEffect(() => {
        foundCitys()
    }, [foundCitys])

    if(loading){
        return <Loader />
    }

    return(
        <>
            {!loading && <CitysList citys={citys} />}
        </>
    )
}

export default MainPage







