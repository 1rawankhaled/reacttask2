import React, { useEffect, useState } from 'react'
import {jwtDecode} from'jwt-decode';
import axios from 'axios';
export default function Orders() {
 
const [orders,setorders]=useState([])



async function getallorders(id){
  const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/"+id)
  console.log(data)
  setorders(data)
}
useEffect(()=>{
  const {id} = jwtDecode(localStorage.getItem('token'));
  console.log(id);
getallorders(id);
},[])
  return (
    <>
    <h1>Your Orders</h1>
    {orders.map((order)=>{
      return <div key={order.id} className="row">
<div className="order shadow rounded p-4 my-5">
  <div className="d-flex align-items-center">
    <h2 className='fw-bolder h1'>{order.id}</h2>
    <h3 className='fw-bold text-primary mx-4'>processing</h3>
  </div>
  <p>You have ordered {order.cartItems.length}items.</p>
  <div className="d-flex">
{order.cartItems.map((item)=>{
  return <img src={item.product.imageCover} style={{width:150}} className='img-thumbnail mx-1' key={item._id} alt="" />
})}


  </div>
  <hr />
  <p><strong>Total amount:</strong>{order.totalOrderPrice}Egp</p>
</div>



      </div>
    })}
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
