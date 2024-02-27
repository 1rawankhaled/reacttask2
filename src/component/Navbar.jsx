import React, { useContext } from 'react'
import logo from'../../src/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { authcontext } from '../context/Authcontext'

export default function Navbar() {
  const {setuisloggedin,uisloggedin  }=useContext(authcontext)
  const navigate =useNavigate()
function LogOut(){
  setuisloggedin(false)
  localStorage.removeItem('token')
  navigate('/login')
}
  return <><nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link to={'home'} className="navbar-brand" ><img src={logo} alt="fresh cart logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {uisloggedin&& <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to={'home'} className="nav-link active" aria-current="page" >Home</Link>
        </li>
        <li className="nav-item">
          <Link to={'cart'} className="nav-link" >cart</Link>
        </li>
        <li className="nav-item">
          <Link to={'prouduct'} className="nav-link" >products</Link>
        </li>
        <li className="nav-item">
          <Link  to={'categories'} className="nav-link" >categories</Link>
        </li>
        <li className="nav-item">
          <Link to={'brands'} className="nav-link" >Brands</Link>
        </li>
        <li className="nav-item">
          <Link to={'allorders'} className="nav-link" >orders</Link>
        </li>
      
        
      </ul>}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center">
        <i className="fa-brands fa-facebook mx-2 "></i>
        <i className="fa-brands fa-twitter mx-2"></i>
        <i className="fa-brands fa-instagram mx-2"></i>
        <i className="fa-brands fa-youtube mx-2"></i>
        <i className="fa-brands fa-tiktok mx-2"></i>
        </li>
        {uisloggedin ?
          <li className="nav-item">
          <Link  onClick={LogOut} className="nav-link" >Log out</Link>
        </li>
        :<>
          <li className="nav-item">
          <Link to={'login'}className="nav-link" >Log in</Link>
        </li>
        <li className="nav-item">
          <Link to={'Register'}className="nav-link" >Register</Link>
        </li></>
      }
      
      
        
      </ul>
      
    </div>
  </div>
</nav></>
  
}
