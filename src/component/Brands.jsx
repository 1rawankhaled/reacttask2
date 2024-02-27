import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function Brands() {
 

  const [brands,setbrands]=useState([])
  async function getallbrands(){
    const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    setbrands(data.data)
  }
  useEffect(()=>{
    getallbrands()
},[])
  return (
    <>
    
    <div className="row">
    {brands.map((brand,index)=>{
return <div className='col-md-3' key={index}>
    <img style={{height:200}}  src={brand.image} className='w-100' alt="" />
<h3>{brand.name}</h3>
</div>
     })} 
    </div>
    
    
    





  
    
    </>
  )
}
