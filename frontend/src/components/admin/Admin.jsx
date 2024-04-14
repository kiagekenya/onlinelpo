import React, {useState, useEffect} from 'react'
import axios from 'axios';
import LOGO from '../../assets/nock j.png'
import HR from '../../assets/hr.jpg'
import { Link } from 'react-router-dom';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


const Admin = () => {
      
  const [selectedDate, setSelectedDate] = useState('');
  const [recentActivities, setRecentActivities] = useState([]);
  const [checkInCount, setCheckInCount] = useState(0);


  const [checkInPercentage, setCheckInPercentage] = useState(0);

  useEffect(() => {
    if (selectedDate) {
      
      axios
        .get(`/api/recent-activities?date=${selectedDate}`)
        .then((response) => {
          const recentActivities = response.data;

          
          const staffNumbers = [...new Set(recentActivities.map((activity) => activity.staffNumber))];

         
          setCheckInCount(staffNumbers.length);

          
          const percentage = (staffNumbers.length / 210) * 100;
          setCheckInPercentage(percentage);

          
          axios
            .get(`/api/get-names-departments?staffNumbers=${staffNumbers.join(',')}`)
            .then((dataResponse) => {
              const namesMap = {};
              const departmentsMap = {};

              dataResponse.data.forEach((data) => {
                namesMap[data.staffNumber] = data.name;
                departmentsMap[data.staffNumber] = data.department;
              });

              
              const recentActivitiesWithNamesAndDepartments = recentActivities.map((activity) => ({
                ...activity,
                name: namesMap[activity.staffNumber] || 'Name not found',
                department: departmentsMap[activity.staffNumber] || 'Department not found',
              }));

              setRecentActivities(recentActivitiesWithNamesAndDepartments);
            })
            .catch((error) => {
              console.error('Error fetching names and departments:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching recent activities:', error);
        });
    }
  }, [selectedDate]);

  const circleRadius = 36;
  const circumference = 2 * Math.PI * circleRadius;
  const dashOffset = circumference * (1 - checkInPercentage / 100);
  
    
      return (
        <div className="admin-container">
          <aside>
            <div className="top">
              <div className="admin-logo">
                <img src={LOGO} alt="logo" />
              </div>
            </div>
            <div className="sidebar">
              <a href="/" className="active">
              <FontAwesomeIcon icon={faTachometerAlt} />
                <h5>Dashboard</h5>
              </a>
             <ul>
      <li>
        <Link to="/report"  className="report"><FontAwesomeIcon icon={faFileAlt} />Report</Link>
        </li>  
    </ul>   
    <ul>
      <li>
        <Link to="/list"  className="report"><FontAwesomeIcon icon={faUserCircle} />Employees</Link>
        </li>  
    </ul>       
            </div>
          </aside>
          <main>
            <h1>Dashboard</h1>
    
            <div className="date">
  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
  />
</div>

            <div className="insights">
              <div className="ontime">
                <span className="time">
                  <ion-icon name="timer-outline"></ion-icon>
                </span>
                <div className="middle">
            <div className="left">
              <h3>Number of check-ins</h3>
              <h1>{checkInCount} employee(s)</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
               
                <p>{((checkInCount / 210) * 100).toFixed(2)}%</p>
              </div>
            </div>
          </div>
                <small className="text-muted">By 8:24 a.m</small>
              </div>
    
              
      <div className="dayperf">
        <span className="time">
          <ion-icon name="today-outline"></ion-icon>
        </span>
        <div className="middle">
          <div className="left">
            <h3>Total check-ins for {selectedDate}</h3>
            <h1>{checkInCount} employee(s)</h1>
          </div>
          <div className="progress">
            <svg>
              <circle cx="38" cy="38" r={circleRadius}></circle>
              <circle
                className="progress-circle"
                cx="38"
                cy="38"
                r={circleRadius}
                style={{ strokeDashoffset: dashOffset }}
              ></circle>
            </svg>
            <div className="number">
              <p>{checkInPercentage.toFixed(2)}%</p>
            </div>
          </div>
        </div>
        <small className="text-muted">Today</small>
      </div>
    
              <div className="weekperf">
                <span className="time">
                  <ion-icon name="calendar-outline"></ion-icon>
                </span>
                <div className="middle">
                  <div className="left">
                    <h3>Best attendance</h3>
                    <h1>Tuesday</h1>
                  </div>
                </div>
                <small className="text-muted">Last 7 days</small>
              </div>
            </div>
            <div className="recent">
  <h2>Recent activity</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Staff no</th>
        <th>Department</th>
        <th>Check-in</th>
        <th>Check-out</th>
      </tr>
    </thead>
    <tbody>
      {recentActivities.map((activity, index) => (
        <tr key={index}>
          <td>{activity.name}</td>
          <td>{activity.staffNumber}</td>
          <td>{activity.department}</td>
          <td>{new Date(activity.checkInDate).toLocaleTimeString()}</td>
        
          <td>{activity.checkOutDate ? new Date(activity.checkOutDate).toLocaleTimeString() : 'Pending'}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <a href="/">Show All</a>
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

export default Admin