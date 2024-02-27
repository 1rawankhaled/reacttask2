import React from 'react'

export default function Footer() {
  return (
    <><div className="card">
    <div className="card-body">
      <h5 className="card-title">Get the fresh cart app</h5>
      <p className="card-text">we will sent you a link, loan it in your phone to download the app</p>
      <div className="d-flex">
        <div className="col-sm-9"> 
        <input type='email ' className='form-control py-2' placeholder='email...'/>
        </div>
        <div className="col-sm-2 ps-3"> 
      <a href="#" className="btn btn-success">Share app link</a>
              </div>
      </div>
      
      
    </div>
  </div></>
  )
}
