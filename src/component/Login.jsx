import React, { useContext, useState } from 'react'
import{useFormik} from'formik'
import * as yup from'yup'
import axios from'axios'
import {Link, Navigate, useNavigate}from'react-router-dom'
import { authcontext } from '../context/Authcontext'

export default function Login() {
  const {setuisloggedin,uisloggedin  }=useContext(authcontext)
  const [errormsg,seterrormsg]=useState('')
  const [isloading,setisloading]=useState(false)
  const navigation=useNavigate()
  const validation2=yup.object({
    email:yup.string().required("email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'enter a valid email'),
    password:yup.string().required("password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-za-z0-9!@#$%^&*]{6,16}$/,"password should contain spatial character ,number more than 8 character and less than 16 character"),
  })

 const {values ,handleSubmit, handleChange,errors,touched,handleBlur,isValid}= useFormik({
    initialValues:{
email:'',
password:'',


    },
   onSubmit:async ()=>{
    seterrormsg(''); 
try {
  setisloading(true)
  let {data} =await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
    console.log(data)
    if(data.message==='success'){
      setuisloggedin(true)
      localStorage.setItem('token',data.token)
      if(window.location.pathname =='/Login'){
      navigation("/home")
    }else{
      Navigate(window.location.pathname)
    }
    }
} catch (error) {
  seterrormsg(error.response.data.message)
}
setisloading(false)
   },
validationSchema:validation2
  })
  return (<>
<div className="w-75 m-auto my-5 ">
    <h1>Log in Now :</h1>
    <form onSubmit={handleSubmit}>

    <div className="bookbody w-100 p-3 py-4 mt-5 d-flex flex-column justify-content-center align-items-center gap-4">

<div className="bookinput w-100 d-flex flex-column justify-content-center">
    

        
        <label htmlFor='email ' className='my-1 d-flex'>E-mail:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type='email' className='form-controle mb-3 rounded  d-flex' id='email' name='email'/>
        {errors.email&&   touched.email  &&   <div className="alert alert-danger">{errors.email}</div>}

        <label htmlFor='password ' className='my-1 d-flex'>password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type='password' className='form-controle mb-3 d-flex  rounded' id='password' name='password'/>
        {errors.password&&   touched.password  &&   <div className="alert alert-danger">{errors.password}</div>}

       
{errormsg&&<div className="alert alert-danger">{errormsg}</div>}  
{isloading?
  <button disabled type='button' className='btn bg-success px-4 text-white ms-auto d-block'><i className="fa-solid fa-spinner fa-spin px-3"></i></button>
:
<button  type='submit' disabled={!isValid || isloading} className='btn btn-success px-3 text-white ms-auto d-block'>Login</button>

}   

       </div>
       </div>
    </form>
   
</div>
</>  )

  }