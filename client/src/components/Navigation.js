
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navigation = () => {

    const auth = React.useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    return(
        <div >
            <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                <li className="divider"></li>
                <li><a href="#!">three</a></li>
            </ul>
            <nav>
                <div className="nav-wrapper pink accent-3">
                    <a href="#!" className="brand-logo" style={{marginLeft: '40px'}}>WeatherApp</a>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink to='/main'>Main</NavLink></li>
                        <li><NavLink to='/weather'>Weather</NavLink></li>
                        <li><a href='/' onClick={logoutHandler} style={{color: '#000', fontWeight: 'bold'}}>Log out</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

/*

<p id='navP'>
                <NavLink to='/main'>Main</NavLink> | <NavLink to='/weather'>Weather</NavLink> | <a href='/' onClick={logoutHandler}>Log out</a>
            </p>
            */