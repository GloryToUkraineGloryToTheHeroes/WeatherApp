
import React from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

function AuthPage(){

    const auth = React.useContext(AuthContext)

    const message = useMessage()
    const {loading, error, clearError, request} = useHttp()

    const [form, setForm] = React.useState({
        name: '',
        password: ''
    }) 

    React.useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data :', data)
            message(data.message)
        }catch(err){}
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch(err){}
    }

    return(
        <div>
                <h2 id='reg'>Registration</h2>
            <div>

                <label>
                    <label htmlFor='name'>Name</label><br /><br />
                    <input 
                    placeholder='Enter name'
                    name='name'
                    id='name'
                    type='text'
                    onChange={changeHandler}
                    />
                </label>

                <label>
                    <br /><label htmlFor='password'>Password</label><br /><br />
                    <input 
                    placeholder='Enter password'
                    name='password'
                    id='password'
                    type='password'
                    onChange={changeHandler}
                    />
                </label>

            </div>

            <div>
                <br /> 
                <button onClick={loginHandler} disabled={loading}>Log in</button>
                <button onClick={registerHandler} disabled={loading}>Sign up</button>
            </div>
        </div>
    )
}


export default AuthPage











