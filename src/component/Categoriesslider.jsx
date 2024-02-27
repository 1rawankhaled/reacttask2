import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function Categoriesslider() {
    const [categories,setcategories]=useState([])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 5,
       
      };

     async function getallcategories(){
        const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setcategories(data.data)
      }
      useEffect(()=>{
        getallcategories()
    },[])
  return (
<Slider {...settings}>
     {categories.map((category,index)=>{
return <div key={index}>
    <img style={{height:200}}  src={category.image} className='w-100' alt="" />
<h3>{category.name}</h3>
</div>
     })}     
              
    </Slider>  )
}
