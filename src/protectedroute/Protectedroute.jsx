import React, { useContext } from 'react'
import { authcontext } from '../context/Authcontext'
import Login from '../component/Login'

export default function Protectedroute({children}) {
    const {setuisloggedin,uisloggedin  }=useContext(authcontext)

    console.log(children)
  return (
    <>{ uisloggedin? children : <Login/>}</>
  )
}
