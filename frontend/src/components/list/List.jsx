import React, {useState, useEffect} from 'react'
import axios from 'axios';
import LOGO from '../../assets/nock j.png'
import HR from '../../assets/hr.jpg'
import { Link } from 'react-router-dom';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';




const List = () => {

    const [employeeData, setEmployeeData] = useState([]);


    useEffect(() => {
        
        axios
          .get('/api/employees') 
          .then((response) => {
            setEmployeeData(response.data); 
          })
          .catch((error) => {
            console.error('Error fetching employee data:', error);
          });
      }, []);

  return (

    <div className="admin-container">
          <aside>
            <div className="top">
              <div className="admin-logo">
                <img src={LOGO} alt="logo" />
              </div>
            </div>
            <div className="sidebar">
            <ul>
      <li>
        <Link to="/admin"  className="report"><FontAwesomeIcon icon={faTachometerAlt}/>Dashboard</Link>
        </li>  
    </ul>   
             <ul>
      <li>
        <Link to="/report"  className="report"><FontAwesomeIcon icon={faFileAlt} />Report</Link>
        </li>  
    </ul>   
    <a href="/" className="active">
          <span className="dicons"></span>
          <FontAwesomeIcon icon={faUserCircle} />
          <h5>Employees</h5>
        </a>
            </div>
          </aside>
          <main>
          <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Staff Number</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr key={employee.staffNumber}>
              <td>{employee.name}</td>
              <td>{employee.staffNumber}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

          </main>
    
          <div className="right">
            <div className="top">
              <button id="menu-btn">
                <ion-icon name="menu-outline"></ion-icon>
              </button>
              <div className="theme-toggler">
                <span className="light-active">
                  <ion-icon name="sunny-outline"></ion-icon>
                </span>
                <span className="moon">
                  <ion-icon name="moon-outline"></ion-icon>
                </span>
              </div>
              <div className="profile">
                <div className="info">
                  <p>
                    {" "}
                    Hey <b>Willis</b>
                  </p>
                  <small className="text-muted">Admin</small>
                </div>
                <div className="profile-photo">
                  <img src={HR} alt="hr" />
                </div>
              </div>
            </div>
    
            <div className="departments">
              <h2>Departments</h2>
              <a href="/">Finance</a>
              <a href="/">Upstream</a>
              <a href="/">ICT</a>
              <a href="/">Engineering</a>
              <a href="/">Procurement</a>
              <a href="/">Sales&amp;Marketing</a>
              <a href="/">Human resource</a>
              <a href="/">Corprate</a>
              <a href="/">Legal</a>
            </div>
          </div>
        </div>
    
  )
}

export default List