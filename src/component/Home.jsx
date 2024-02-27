import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Products from './Products'
import img1 from'../../src/images/str7803.jpg'
import img2 from'../../src/images/images.jfif'
import img3 from'../../src/images/grocery-banner-2.jpeg'
import img4 from'../../src/images/grocery-banner.png'
import Slider from "react-slick";
import Categoriesslider from './Categoriesslider'
import Product from './Product'

export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
   
  };
  const [products,setproducts]=useState([])
 async function getprouducts(){
    const {data} =await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setproducts(data.data)
  }
  useEffect(()=>{
    getprouducts()
  },[])
  return (
    <>
   
    <header>
      <div className="row">
        <div className="col-md-9 g-0">
        <Slider {...settings}>
             <div >
             <img src={img3} className='w-100' alt="" /> 
             </div> 
             <div >
             <img src={img4} className='w-100' alt="" /> 
             </div> 
              
    </Slider>


        </div>


        <div className="col-md-3">

<img src={img1} className='w-100' alt="" />
<img src={img2} className='w-100' alt="" />

        </div>
      </div>
    </header>
    
    <Categoriesslider/>
    
    <div className="row">
      {products.map((product)=>{
      return <div key={product.id} className="col-md-3">
<Product product={product}/>
      </div>
      })}
      </div>
      </>
  )
}
