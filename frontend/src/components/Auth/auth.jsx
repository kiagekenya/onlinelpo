import React, { useState } from 'react';
import axios from 'axios';
import LOGO from '../../assets/nock j.png';
import { Link } from 'react-router-dom';

const Auth = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  const handleRegistration = async () => {
    try {
      const response = await axios.post('/api/register', { name, email, password });
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Email already in use');
      } else {
        console.error(error);
        setErrorMessage('Internal server error');
      }
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar__container">
          <span className="nav-logo">
            <img src={LOGO} alt="logo" />
            <p>ENERGIZING KENYA</p>
          </span>
        </div>
      </nav>

      <div className="main">
        <div className="container">
          <div className="box">
            <h1 id="title">Sign Up</h1>
            <form>
              <div className="input-group">
                <div className="input-fields" id="nameField">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-fields">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="input-fields">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="btn-fields">
                <button type="button" onClick={handleRegistration}>
                  Sign up
                </button>
                <ul>
      <li>
        <Link to="/signin"  className="btn-fields">SignIn</Link>
        </li>
      
    </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
