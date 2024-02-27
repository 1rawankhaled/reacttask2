import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from './Product'
import Cartproduct from './Cartproduct'
import { Swal } from 'sweetalert2/dist/sweetalert2'
import { Link } from 'react-router-dom'

export default function Cart() {
  const[isloading,setisloading]=useState(false)
const [timeOutId,settimeOutId]=useState()
 const [cartId,setcartId]=useState()
  const [cart,setcart]=useState({})
  async function getproducttocart(){
try {
  setisloading(true)
  const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
    headers:{
      token:localStorage.getItem('token')
    }
  })
 

console.log(data)
setcartId(data.data._id)
setisloading(false)
setcart(data)
} catch (error) {
  console.log(error)
}
setisloading(false)
}

    useEffect(()=>{
    getproducttocart()
},[])
async function removeproductfromcart(productId){











  


  const {data}=await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
        headers:{
          token:localStorage.getItem("token")
        }
      }
      )
      setcart(data);





 
}
async function clearcart(){
    const {data}=await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/',{
      headers:{
        token:localStorage.getItem("token")
      }
    }
    )
    setcart(data)
}

 function updatecartprouductcount(productId,count){
  clearTimeout(timeOutId)
 
settimeOutId(setTimeout(async() => {
  if(count==0){
    removeproductfromcart(productId)
      }else{
        const {data}=await axios.put("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
        count  },{
        headers:{
          token:localStorage.getItem('token')
        }
      })
      console.log(data)
      setcart(data)
      
 } }, 500))
}
  return (
   <>
   {isloading?
   <>
   <div className='d-flex align-items-center justify-content-center my-5 py-5'>
       <i className='fas fa-spin fa-spinner fa-2x'></i>
   </div>
</>
:
<>
{cart.data?.products.length>0?
    <div className='my-5'>
    <button onClick={clearcart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>

   {cart.data?.products.map((cartproduct,index)=>{
return  <Cartproduct updatecartprouductcount={updatecartprouductcount} removeproductfromcart={removeproductfromcart} key={index} cartproduct={cartproduct}/>
   })}

    <div className='d-flex justify-content-between'>
      <Link to={'/address/'+cartId} className='btn bg-main text-white'>CheckOut</Link>
      <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
    </div>

  </div> 
  :
<h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>
   
   }
    
    
      







</>
  
  
  
  
  }
   
     </>
)}
   
