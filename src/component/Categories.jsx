import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Categoriesdetails from './Categoriesdetails'

export default function Categories() {
  const [categories,setcategories]=useState([])
  async function getallcategories(){
    const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setcategories(data.data)
  }
  useEffect(()=>{
    getallcategories()
},[])
  return (
    <>
    
    <div className="row">
    {categories.map((category,index)=>{
return <div className='col-md-3' key={index}>
    <img style={{height:200}}  src={category.image} className='w-100' alt="" />
<h3>{category.name}</h3>
</div>
     })} 
    </div>
    
    
    





  
    
    </>
  )
}
