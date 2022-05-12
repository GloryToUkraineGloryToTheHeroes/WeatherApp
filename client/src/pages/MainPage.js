
import React from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { CitysList } from '../components/CitysList'
import { useNavigate } from 'react-router-dom'

function MainPage(){

    const [citys, setCitys] = React.useState([])
    const {request, loading} = useHttp()
    const {token} = React.useContext(AuthContext)
    const navigate = useNavigate()

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

    const reset = async () => {
        try{

            const data = await request('/city/reset', 'POST', null, {Auth: `${token}`})
            console.log(data)

            foundCitys()

            navigate(`/main`)

        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <>
                {!loading && <CitysList citys={citys} />}
            </>
            {(citys.length > 0)?(
                <div style={{width: '100%', height: '80px'}}>
                    <button className="waves-effect waves-light btn pink accent-3" style={{margin: '40px auto 10px 1350px', width: '100px'}} onClick={reset} >Reset</button>
                </div>
            ):('')}
        </div>
    )
}

export default MainPage







