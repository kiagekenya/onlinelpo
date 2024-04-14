import React, { useState } from 'react';
import LOGO from '../../assets/nock j.png'
import HR from '../../assets/hr.jpg'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Report = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [employeeData, setEmployeeData] = useState([]);
    const [reportText, setReportText] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);


    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };


    const handleFilter = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/employee/${employeeNumber}?startDate=${startDate}&endDate=${endDate}`
        );
        const data = await response.json();
        console.log('Response data:', data);
    
        if (response.ok) {
          if (Array.isArray(data)) {
            setEmployeeData(data);
          } else if (data.staffNumber) {
            // If data is an object, convert it to an array with a single element
            setEmployeeData([data]);
          } else {
            setEmployeeData([]);
            console.error('Invalid response format: expected an array or object with staffNumber.');
          }
        } else {
          setEmployeeData([]);
          console.error(data.message);
        }
      } catch (error) {
        setEmployeeData([]);
        console.error('Error:', error);
      }
    };
    

      const getDatesInRange = (startDate, endDate) => {
        const dates = [];
        const currentDate = new Date(startDate);
    
        while (currentDate <= endDate) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return dates;
      };
    
      const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const dateRange = getDatesInRange(startDateObj, endDateObj);
  const totalWorkingDays = dateRange.length;
  const absentDates = dateRange.filter(
    (date) =>
      !employeeData.some(
        (employee) =>
          new Date(employee.checkInDate).toDateString() === date.toDateString()
          
      )
  );
  
  const daysAbsent = absentDates.length;


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const daysAbsent1 = absentDates.map((date) => daysOfWeek[date.getDay()]);

  
const calculateDuration = (checkInDate, checkOutDate) => {
  if (!checkOutDate) {
    return 'Pending';
  }

  const diff = Math.abs(new Date(checkOutDate) - new Date(checkInDate));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return `${hours}h:${minutes}m`;
};

  

  
  const handlePDFExport = () => {
    const doc = new jsPDF();

   
  const pageHeight = doc.internal.pageSize.getHeight();

  
  const marginColor = [148, 213, 0]; 
  doc.setFillColor(marginColor[0], marginColor[1], marginColor[2]);

  
  const marginX = 0; 
  const marginY = 0;
  const marginWidth = 15; 
  const marginHeight = pageHeight; 

  
  doc.rect(marginX, marginY, marginWidth, marginHeight, 'F');
  
    
    const logoImage = LOGO; 
    doc.addImage(logoImage, 'PNG', 16, 12, 30, 30);

    const headingText = 'Weekly Attendance Report';
const headingX = doc.internal.pageSize.getWidth() / 2;
const headingY = 20;


const headingTextColor = [148, 213, 0];
doc.setTextColor(headingTextColor[0], headingTextColor[1], headingTextColor[2]);

doc.setFontSize(20);
doc.setFont('Helvetica', 'bold');
doc.text(headingText, headingX, headingY, { align: 'center' });

const underlineY = headingY + 2; 
const textWidth = doc.getStringUnitWidth(headingText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
const underlineX = headingX - (textWidth / 2); 

doc.setDrawColor(148, 213, 0);
doc.line(underlineX, underlineY, underlineX + textWidth, underlineY);


doc.setTextColor(0, 0, 0);
  
const tableData = employeeData.map((employee) => {
  const checkInTime = new Date(employee.checkInDate).getHours();
  const isPastCheckIn = checkInTime >= 8;
  const rowClassName = isPastCheckIn ? 'past-check-in' : '';
  const duration = calculateDuration(employee.checkInDate, employee.checkOutDate);

  return [
    { content: employee.name, styles: { className: rowClassName } },
    { content: new Date(employee.checkInDate).toLocaleDateString(), styles: { className: rowClassName } },
    { content: new Date(employee.checkInDate).toLocaleTimeString(), styles: { className: rowClassName } },
    { content: employee.checkOutDate ? new Date(employee.checkOutDate).toLocaleDateString() : "Pending", styles: { className: rowClassName } },
    { content: employee.checkOutDate ? new Date(employee.checkOutDate).toLocaleTimeString() : "Pending", styles: { className: rowClassName } },
    { content: duration, styles: { className: rowClassName } },
  ];
});

const tableStartY = 50; 
const tableMarginX = 16; 

doc.autoTable({
  head: [
    ['Employee', 'Check-In Date', 'Check-In Time', 'Check-Out Date', 'Check-Out Time', 'Duration'],
  ],
  body: tableData,
  startY: tableStartY,
  margin: { left: tableMarginX },
  didDrawCell: (data) => {
    if (data.cell.styles.className === 'past-check-in') {
      doc.setTextColor(255, 0, 255);
    } else {
      doc.setTextColor(0, 0, 0);
    }
  },
});
  
    doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);

    doc.text('Summary Data', 16, 110);
    doc.text(`Total Working Days: ${totalWorkingDays}`, 16, 120);
    doc.text(`Days Absent: ${daysAbsent}, : ${daysAbsent1}`, 16, 125);
    doc.text(`Days Present: ${totalWorkingDays - daysAbsent}`, 16, 130);

    const reportTextLines = doc.splitTextToSize(reportText, 180);

  
  doc.text(reportTextLines, 16, 150, { align: 'left', maxWidth: 170 });

  
    
    



    
    const footerTextLine1 = 'KAWI Complex, Popo lane, Off Red Cross Road, South C, Nairobi Kenya. P.O Box 58567,00100, Nairobi Kenya.';
    const footerTextLine2 = 'Telephone: +254-20-6952000, Fax: +254-20-6952200, Email: hr@nockenya.co.ke, Website: www.nockenya.co.ke';
    
    const footerX = doc.internal.pageSize.getWidth() / 2;
    const footerY = pageHeight - 10; 
    const footerLineSpacing = 5;
  
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(footerTextLine1, footerX, footerY - footerLineSpacing, { align: 'center' });
    doc.text(footerTextLine2, footerX, footerY, { align: 'center' });

    
  
    const staffNumber = employeeData.length > 0 ? employeeData[0].staffNumber : 'unknown';
    
    doc.save(`Report for_${staffNumber}.pdf`);
  };
  
  
      
  return (
    <div className={`admin-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    <aside>
      <div className="top">
        <div className="admin-logo">
        <img src={LOGO} alt="logo" />
        </div>
      </div>
      <div className="sidebar">
      <ul>
      <li>
        <Link to="/admin"  className="report"> <FontAwesomeIcon icon={faTachometerAlt} />Dashboard</Link>
        </li>  
    </ul>     
        
        
        <a href="/" className="active">
          <span className="dicons"></span>
          <FontAwesomeIcon icon={faFileAlt} />
          <h5>Reports</h5>
        </a>
        <ul>
      <li>
        <Link to="/list"  className="report"> <FontAwesomeIcon icon={faUserCircle} />Employees</Link>
        </li>  
    </ul>  
        
        
      </div>
    </aside>
    <main>
      <h1>Reports</h1>
      <div id="active-time" />
      <div className="reporting-tool">
        <h2>Employee Attendance Reporting Tool</h2>
        <div className="filters">
          <label htmlFor="start-date">Start Date:</label>
          <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
          <label htmlFor="end-date">End Date:</label>
          <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
          <label htmlFor="employees">Employee:</label>
          <div className="input-container">
          <input
            className="input"
            name="text"
            type="text"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
          />
            <label className="label" htmlFor="input">Number</label>
            <div className="topline" />
            <div className="underline" />
          </div>
          <button id="filter-button" onClick={handleFilter}>
          Filter
        </button>
        </div>
        <div className="downloadables">
        <div className="summary-data">
          <h3>Summary Data</h3>
          <p>Total Working Days: <span id="total-working-days">{totalWorkingDays}</span></p>
          <p>Days Absent: <span id="days-absent">{daysAbsent}, :{daysAbsent1}</span></p>
          <p>Days Present: <span id="days-present">{totalWorkingDays - daysAbsent}</span></p>
        </div>
        {employeeData && (
  <div className="detailed-data">
    <h3>Detailed Data</h3>
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Check-In Date</th>
          <th>Check-In Time</th>
          <th>Check-Out Date</th>
          <th>Check-Out Time</th>
          <th>Duration</th>
        
        </tr>
      </thead>
      <tbody id="attendance-table-body">
  {employeeData.map((employee) => {
    const checkInTime = new Date(employee.checkInDate).getHours();
    const isPastCheckIn = checkInTime >= 8;
    const rowClassName = isPastCheckIn ? 'past-check-in' : '';
    const duration = calculateDuration(employee.checkInDate, employee.checkOutDate);

    return (
      <tr key={employee._id} className={rowClassName}>
        <td>{employee.name}</td>
        <td>{new Date(employee.checkInDate).toLocaleDateString()}</td>
        <td>{new Date(employee.checkInDate).toLocaleTimeString()}</td>
        <td>{employee.checkOutDate ? new Date(employee.checkOutDate).toLocaleDateString() : 'Pending'}</td>
        <td>{employee.checkOutDate ? new Date(employee.checkOutDate).toLocaleTimeString() : 'Pending'}</td>
        <td>{duration}</td>
      </tr>
    );
  })}
</tbody>


    </table>
  </div>
)}
        <div className="report-section">
          <h3>Report Section</h3>
          <textarea id="report-textarea" placeholder="Write here" value={reportText} onChange={(e) => setReportText(e.target.value)} />
          
          
        </div>
        <div className="visualizations">
          <h3>Visualizations</h3>
          <canvas id="attendance-chart" />
        </div>
        <div className="visualization-segment">
          <div className="reference-points">
            {/* <div className="absent">
  <i className="fas fa-times"></i>
  <span>Days Absent</span>
</div> */}

           
            <div className="insufficient-hours">
            <FontAwesomeIcon icon={faExclamationTriangle} />
              <span>Insufficient Hours</span>
            </div>
            <div className="past-check-in">
              <i className="fas fa-check"></i>
              <span>Days Checked In (Past)</span>
            </div>
          </div>
        </div>
        <div className="export-options">
          <h3>Export Options</h3>
          <button id="pdf-export" onClick={handlePDFExport}>Export to PDF</button>
          
        </div>
        </div>
      </div>
    </main>
    <div className="right">
      <div className="top">
        <button id="menu-btn"></button>
        <div className="theme-toggler">
          <span className={isDarkMode ? '' : 'light-active'} onClick={toggleDarkMode}></span>
          <span className="moon" onClick={toggleDarkMode}
          
          ></span>
        </div>
        <div className="profile">
          <div className="info">
            <p> Hey <b>Willis</b></p>
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
        <a href="/">Sales&Marketing</a>
        <a href="/">Human resource</a>
        <a href="/">Corporate</a>
        <a href="/">Legal</a>
      </div>
    </div>
  </div>
  );
}

export default Report