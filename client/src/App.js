
import React from 'react';// eslint-disable-next-line
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import useRoute from './routes';
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navigation } from './components/Navigation'
import { Loader } from './components/Loader';
import 'materialize-css'


function App() {
  const {login, logout, token, userId, ready} = useAuth()

  var isAuthenticated = true
  if(!!token){
    isAuthenticated = true
  }else{
    isAuthenticated = false
  }

//  const isAuthenticated = !!token
const inter = useRoute(isAuthenticated)

if(!ready){
  return <Loader />
}

  return (
    <div id='main'>
      <AuthContext.Provider value={{
            token, userId, login, logout, isAuthenticated
          }}>
            <BrowserRouter>
              { isAuthenticated && <Navigation />}
              {inter}
            </BrowserRouter>
          </AuthContext.Provider>
    </div>
  );
}

export default App;

