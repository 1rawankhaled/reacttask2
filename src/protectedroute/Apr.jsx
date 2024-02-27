import React, { useContext } from 'react'
import { authcontext } from '../context/Authcontext'
import { Navigate } from 'react-router-dom'

export default function Apr({children}) {
    const {setuisloggedin,uisloggedin  }=useContext(authcontext)

    return (
      <>
      
  {uisloggedin ? <Navigate to={'/home'}/>: children}
  
      </>
    )
}
