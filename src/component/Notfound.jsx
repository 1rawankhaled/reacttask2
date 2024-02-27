import React from 'react'
import img1 from '../images/error.svg'
export default function Notfound() {
  return (
    <div>
      <img src={img1} alt="error" />
      <h1>Error 404 not found</h1>
    </div>
  )
}
