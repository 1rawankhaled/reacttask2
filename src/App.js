import React from 'react'

import Register from './component/Register'
import {Navigate, RouterProvider, createBrowserRouter, createHashRouter} from'react-router-dom'
import Layout from './component/Layout/Layout';
import Home from './component/Home'
import Products from './component/Products'
import Login from './component/Login'
import Cart from './component/Cart'
import Categories from './component/Categories'
import Brands from './component/Brands'
import Orders from './component/Orders'
import Address from './component/Address'
import Notfound from './component/Notfound'
import Authcontextprovider from './context/Authcontext';
import Protectedroute from './protectedroute/Protectedroute';
import Apr from './protectedroute/Apr';
import Prouductdetails from './component/Prouductdetails';
import { ToastContainer } from 'react-toastify';
import {QueryClient,QueryClientProvider} from"react-query";
import {ReactQueryDevtools} from"react-query/devtools";


export default function App() {
  const qeryClient=new QueryClient()
 const route = createHashRouter([{
  path:'',element:<Layout/>,children:[
    {path:'', element:<Navigate to={'home'}/>},
    {path:'Register',element:<Apr><Register/></Apr> },
    {path:'login',element:<Apr><Login/></Apr>},


    {path:'home',element:<Protectedroute> <Home/></Protectedroute>},
    {path:'prouduct',element:<Protectedroute> <Products/></Protectedroute>},
    {path:'cart',element:<Protectedroute> <Cart/></Protectedroute>},
    {path:'categories',element:<Protectedroute> <Categories/></Protectedroute>},
    {path:'brands',element:<Protectedroute><Brands/></Protectedroute>},
    {path:'allorders',element:<Protectedroute> <Orders/></Protectedroute>},
    {path:'address/:cartId',element:<Protectedroute> <Address/></Protectedroute>},
    {path:'Productdetails/:id',element:<Protectedroute> <Prouductdetails/></Protectedroute>},


    {path:'*',element:<Notfound/>},
  ]
 }])
  return (
    <QueryClientProvider client={qeryClient}>
<Authcontextprovider> 
    <RouterProvider router={route}></RouterProvider>
    <ToastContainer />
   </Authcontextprovider>
<ReactQueryDevtools/>

    </QueryClientProvider>
   
     
 
  )
}


