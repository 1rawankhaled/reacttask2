import React, { useState } from 'react'
import{useFormik} from'formik'
import * as yup from'yup'
import axios from'axios'
import {useNavigate}from'react-router-dom'

export default function Register() {
  const [errormsg,seterrormsg]=useState('')
  const [isloading,setisloading]=useState(false)
  const navigation=useNavigate()
  const validation2=yup.object({
    name:yup.string().required("name is required").min(3,'min length must be more than 3 characters').max(20,'max lenght must be less than 20 characters'),
    email:yup.string().required("email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'enter a valid email'),
    password:yup.string().required("password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-za-z0-9!@#$%^&*]{6,16}$/,"password should contain spatial character ,number more than 8 character and less than 16 character"),
    rePassword:yup.string().required("rePassword is required").oneOf([yup.ref('password'),'rePassword dosent match password']),
    phone:yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,'enter a valid egyption number'),
  })
//   function validation(values){
// const errors={};
// if(values.name==''){
//   errors.name="name is required"
// }else if(values.name.length <3){
//   errors.name='min length must be more than 3 characters'
// }else if (values.name.length >20){
//   errors.name='max lenght must be less than 20 characters'
// }


// if(values.email==''){
//   errors.email="email is required"
// }else if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(values.email)){

//   errors.email='enter a valid email'
// }

// if(values.Password==''){
//   errors.Password="password is required"
// }else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-za-z0-9!@#$%^&*]{6,16}$/).test(values.Password)){

//   errors.Password='password should contain spatial character ,number more than 8 character and less than 16 character'
// }

// if(values.rePassword==''){
//   errors.rePassword="repassword is required"
// }else if(values.Password!=values.rePassword){

//   errors.rePassword='password and repassword dose not math'
// }

// if(values.Phone==''){
//   errors.rePassword="phone is required"
// }else if(!(/^01[0125][0-9]{8}$/).test(values.Phone)){

//   errors.Phone='enter a valid egyption number'
// }
// console.log(errors);
// return errors;
//   }
  // function Register(e){
  //   e.preventDefault()
  // }
 const {values ,handleSubmit, handleChange,errors,touched,handleBlur,isValid}= useFormik({
    initialValues:{
name:'',
email:'',
password:'',
rePassword:'',
phone:'',
    },
   onSubmit:async ()=>{
    seterrormsg(''); 
try {
  setisloading(true)
  let {data} =await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
    console.log(data)
    if(data.message==='success'){
      navigation("/Login")
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
    <h1>Register Now :</h1>
    <form onSubmit={handleSubmit}>

    <div className="bookbody w-100 p-3 py-4 mt-5 d-flex flex-column justify-content-center align-items-center gap-4">

<div className="bookinput w-100 d-flex flex-column justify-content-center">
    

        <label htmlFor='name ' className='my-1 d-flex '>Name:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.name} type='text' className='form-controle mb-3 d-flex rounded' id='name' name='name'/>
    {errors.name&&   touched.name  &&   <div className="alert alert-danger">{errors.name}</div>}
        <label htmlFor='email ' className='my-1 d-flex'>E-mail:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type='email' className='form-controle mb-3 rounded  d-flex' id='email' name='email'/>
        {errors.email&&   touched.email  &&   <div className="alert alert-danger">{errors.email}</div>}

        <label htmlFor='password ' className='my-1 d-flex'>password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type='password' className='form-controle mb-3 d-flex  rounded' id='password' name='password'/>
        {errors.password&&   touched.password  &&   <div className="alert alert-danger">{errors.password}</div>}

        <label htmlFor='rePassword ' className='my-1 d-flex'>re-password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.rePassword} type='Password' className='form-controle mb-3  d-flex rounded' id='rePassword' name='rePassword'/>
        {errors.rePassword&&   touched.rePassword  &&   <div className="alert alert-danger">{errors.rePassword}</div>}

        <label htmlFor='phone ' className='my-1 d-flex'>phone:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type='tel' className='form-controle mb-3  d-flex rounded' id='phone' name='phone'/>
        {errors.phone&&   touched.phone  &&   <div className="alert alert-danger">{errors.phone}</div>}
{errormsg&&<div className="alert alert-danger">{errormsg}</div>}  
{isloading?
  <button disabled type='button' className='btn bg-success px-4 text-white ms-auto d-block'><i className="fa-solid fa-spinner fa-spin px-3"></i></button>
:
<button  type='submit' disabled={!isValid || isloading} className='btn btn-success px-3 text-white ms-auto d-block'>Register</button>

}   
       </div>
       </div>
    </form>
   
</div>
</>  )

  }