import React, { useState } from 'react'
import{useFormik} from'formik'
import * as yup from'yup'
import axios from'axios'
import Cart from './Cart'
import { useParams } from 'react-router-dom'
export default function Address() {

  const [errormsg,seterrormsg]=useState('')
  const [isloading,setisloading]=useState(false)
  let {cartId}=useParams()
 
  const validation2=yup.object({
    details:yup.string().required("details is required"),
    city:yup.string().required("city is required"),
    phone:yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,'enter a valid egyption number'),

  })
  async function onSubmit(){
    setisloading(true)
    seterrormsg('');
    try {
      console.log(values)
      let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
        shippingAddress:values
      },{
        headers:{
          token :localStorage.getItem('token')        },
          params:{
            URL:'http://localhost:3000/'
          }
      })

      console.log(data.session.url)
      window.open(data.session.url,'_self')
    } catch (error) {
      seterrormsg(error.response.data.message)
    }
    setisloading(false)
  }
  const {values ,handleSubmit, handleChange,errors,touched,handleBlur,isValid}= useFormik({
    initialValues:{
details:'',
city:'',

phone:'',
    },
    onSubmit,
    validationSchema:validation2

})
  return (
    <div className="w-75 m-auto my-5 ">
      <h1>Address :</h1>
      <form onSubmit={handleSubmit} className='w-75 m-auto' >
    <label  htmlFor="details" className='my-1'>Details:</label>
    <input value={values.details} onChange={handleChange} onBlur={handleBlur} type="text" className='form-control mb-3' id='details' name='details' />
    {errors.details&&   touched.details  &&   <div className="alert alert-danger">{errors.details}</div>}

    <label htmlFor="phone" className='my-1'>Phone:</label>
    <input value={values.phone} onChange={handleChange} onBlur={handleBlur} type="tel" className='form-control mb-3' id='phone' name='phone' />
    {errors.phone&&   touched.phone  &&   <div className="alert alert-danger">{errors.phone}</div>}

    <label htmlFor="city" className='my-1'>City:</label>
    <input value={values.city} onChange={handleChange} onBlur={handleBlur} type="text" className='form-control mb-3' id='city' name='city' />
    {errors.city&&   touched.city  &&   <div className="alert alert-danger">{errors.city}</div>}

    {errormsg&&<div className="alert alert-danger">{errormsg}</div>}  
{isloading?
  <button disabled type='button' className='btn bg-success px-4 text-white ms-auto d-block'><i className="fa-solid fa-spinner fa-spin px-3"></i></button>
:
<button  type='submit' disabled={!isValid || isloading} className='btn btn-success px-3 text-white ms-auto d-block'>Order</button>

}     </form>
    </div>
    
    
  )
}
