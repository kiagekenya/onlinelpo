import React, { useState } from 'react';
import axios from 'axios';
import LOGO from '../../assets/nock j.png';

const CheckOut = () => {

    const [staffNumberOut, setStaffNumberOut] = useState('');
    const [confirmStaffNumberOut, setConfirmStaffNumberOut] = useState('');


    const axiosPostData = async () => {
        const postData = {
          staffNumberOut: staffNumberOut,
        }
        
        await axios.post('http://localhost:4000/employee/checkout', postData);
      }


      const handleSubmitOut = (e) => {
        e.preventDefault();
    
        if (staffNumberOut === confirmStaffNumberOut) {
         axiosPostData();
          alert(`Hey, checkOut for staff number ${staffNumberOut} recorded! Good day \u{1F600}.`);
          console.log('Staff number submitted:', staffNumberOut);
          setStaffNumberOut('');
          setConfirmStaffNumberOut('');
        } else {
          
          alert('Sorry, the staff number does not match. Please try again.')
          
        }
      };


      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmitOut(e);
        }
      };


    return (
        <>
           <nav className="navbar">
            <div className="navbar__container">
              <span className="nav-logo">
                <img src={LOGO} alt="logo" />
                <p>ENERGIZING KENYA</p>
              </span>
              <div className="navbar-links">
              
                
              <a href="/">Home</a>
              <a href="/">About</a>
              <a href="/admin">Admin</a>
              <a href="/" className="black">Contacts</a>
              </div>
            </div>
          </nav>
    
          <div className="details">
            <div className="details-page">
              <div className="form-box">
                <h4>CheckOut Details</h4>
                <form className="form" id="myform"   onKeyDown={handleKeyDown}>
                  <div className="input-box">
                    <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                    <input
                      type="text"
                      required
                      id="staff-number-input-out"
                      name="staff-number-out"
                      value={staffNumberOut} 
                      onChange={(e) => setStaffNumberOut(e.target.value)}
                    />
                    <label>STAFF NUMBER</label>
                  </div>
                  <div className="input-box">
                    <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                    <input
                      type="text"
                      required
                      id="confirm-staff-number-input-out"
                      name="confirm-out"
                      value={confirmStaffNumberOut}
                      onChange={(e) => setConfirmStaffNumberOut(e.target.value)}
                    />
                    <label>CONFIRM STAFF NO</label>
                  </div>
                  <button type="submit" onClick={handleSubmitOut} className="btn">OK</button>
                </form>
                <div id="message" style={{ display: 'none' }}>Staff number does not match</div>
              </div>
            </div>
          </div>
    
          <div className="footer__container">
            <div className="social__media">
              <div className="social__media--wrap">
                <div className="footer__logo">
                  <a href="/" id="footer__logo" className="fas faa gem">National Oil Corporation</a>
                </div>
                <p className="website__rights">© National Oil Corporation 2023. All rights reserved</p>
                <div className="social__icons">
                  <a href="https://www.facebook.com/NationalOilKE/" className="social__icon--link" >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://www.instagram.com/nationaloilke/?hl=en" className="social__icon--link" >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://twitter.com/NationalOilKE?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="social__icon--link" >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/national-oil-corporation-of-kenya/?originalSubdomain=ke" className="social__icon--link" >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };

export default CheckOut