import { createContext, useEffect, useState } from "react";






export const authcontext =createContext()



 export default function ({children}) {
  const[uisloggedin,setuisloggedin]=useState(!!localStorage.getItem('token'))
  // ده نفس الخطوه اللي هعملها فوق عشان منساش  const [uisloggedin,setuisloggedin]=useState(false)
  //  useEffect(()=>{ if(localStorage.getItem('token')!=null){
  //   setuisloggedin(true)
  // }},[])
  return (
    <authcontext.Provider value={{uisloggedin,setuisloggedin}}>
{children}
    </authcontext.Provider>
  )
}
