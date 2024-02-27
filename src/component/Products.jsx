import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'
import { useQueries, useQuery } from 'react-query'


export default function Products({product}) {
    // const [products,setproducts]=useState([])
     function getprouducts(){
      return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    //    setproducts(data.data)
     }
    //  useEffect(()=>{
    //    getprouducts()
    //  },[])
    const {data}=useQuery('products2',getprouducts)
    console.log(data)
 return(
  < > 
  
  <div className="row">
    {data?.data.data.map((product)=>{
    return <div key={product.id} className="col-md-3">
<Product product={product}/>
    </div>
    })}
    </div>
    </>
 )
}