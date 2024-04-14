import React from 'react'
import { Link } from 'react-router-dom';


import './all.css'
const All = () => {
 
  return (
    <>
    <div className="all-container">
    <header>
      <div className="navbar">
        <div className="navbar-links">
          <ul>
          <li>
        <Link to="/"  >Products</Link>
      
        </li>
      <li>
        <Link to="/" >About Us</Link>
        </li>
        <li>
        <Link to="/" >Service&Support</Link>
        </li>
          </ul>
        </div>
      </div>
     </header>
     <div className="section">
      <div className="sectionp">
        <h1>Powering Performance:</h1>
        <p>Your Trusted Source for Superior Gas and Lubricants.</p>
      </div>
     </div>

     <div className="main">
      <div className="main__container">
        <ul>
        <li>
        <Link to="/check" className='order' >Place Order</Link>
        </li>
        </ul>
      </div>
     </div>

    </div>
    
    </>

  )
}

export default All