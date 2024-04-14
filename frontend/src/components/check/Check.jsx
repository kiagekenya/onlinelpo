import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/nock j.png';
import './check.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Check = () => {
  const [collectionType, setCollectionType] = useState(null);
  const [tableEntries, setTableEntries] = useState([
    { id: 1, product: '', units: 0, totalPrice: 0 },
  ]);
  const [selectedRegion, setSelectedRegion] = useState('Nairobi');
  useEffect(() => {
    setTableEntries([{ id: 1, product: '', units: 0, totalPrice: 0 }]);
  }, [selectedRegion]);
  

  const handleCollectionTypeChange = (label) => {
    setCollectionType(label);
  };
  

  

  const productPrices = {
    Nairobi: {
      '(3KGS CATEGORY)': 0,
      'Cylinder Deposit 3kg': 1300,
      'Supa Gas Refill 3kg': 496,
      'Supa Gas 3kg Burner Set': 540,
      '3KG PACK(GAS+CYLINDER+BURNER&GRILL)': 2336,
      '(6KGS CATEGORY)':0,
      'Cylinder Deposit 6kg': 1800,
      'Supa Gas Refill 6kg': 992,
      'Supa Gas  Burner ': 380,
      'Supa Gas Grill':250,
      '6KG PACK(GAS+CYLINDER+BURNER&GRILL)': 3422,
      '(13KGS CATEGORY)':0,
      'Cylinder Deposit 13kg': 2800,
      'Supa Gas Refill 13kg': 2149,
      'Supa Gas Hose Pipe ': 150,
      'Supa Gas Regulator for 20mm Compact Valve':650,
      '13KG PACK(GAS+CYLINDER+PIPE+REGULATOR)': 5749,
      '(50KGS CATEGORY)':0,
      'Cylinder Deposit 50kg': 10000,
      'Supa Gas Refill 50kg': 8265,
      '50KGS PACK(CYLINDER+GAS)':18265,
      '(ACCESSORIES FOR 3KG AND 6KG LIGHTING PACK)':0,
      'Supa Gas Lantern':760,
      'Supa Gas Lantern Glass-Clear':180,
      'Supa Gas Lantern Glass-Frosted':200,
      'Supa Gas Lantern Pole':590,
      'Supa Gas Lantern Mantle':40,
      'Cooking Burner':3200,

    },
    Nakuru: {
      '(3KGS CATEGORY)': 0,
      'Cylinder Deposit 3kg': 1300,
      'Supa Gas Refill 3kg': 496,
      'Supa Gas 3kg Burner Set': 540,
      '3KG PACK(GAS+CYLINDER+BURNER&GRILL)': 2336,
      '(6KGS CATEGORY)':0,
      'Cylinder Deposit 6kg': 1800,
      'Supa Gas Refill 6kg': 992,
      'Supa Gas  Burner ': 380,
      'Supa Gas Grill':250,
      '6KG PACK(GAS+CYLINDER+BURNER&GRILL)': 3422,
      '(13KGS CATEGORY)':0,
      'Cylinder Deposit 13kg': 2800,
      'Supa Gas Refill 13kg': 2149,
      'Supa Gas Hose Pipe ': 150,
      'Supa Gas Regulator for 20mm Compact Valve':650,
      '13KG PACK(GAS+CYLINDER+PIPE+REGULATOR)': 5749,
      '(50KGS CATEGORY)':0,
      'Cylinder Deposit 50kg': 10000,
      'Supa Gas Refill 50kg': 8265,
      '50KGS PACK(CYLINDER+GAS)':18265,
      '(ACCESSORIES FOR 3KG AND 6KG LIGHTING PACK)':0,
      'Supa Gas Lantern':760,
      'Supa Gas Lantern Glass-Clear':180,
      'Supa Gas Lantern Glass-Frosted':200,
      'Supa Gas Lantern Pole':590,
      'Supa Gas Lantern Mantle':40,
      'Cooking Burner':3200,

    },
    MT_Kenya: {
      '(3KGS CATEGORY)': 0,
      'Cylinder Deposit 3kg': 1300,
      'Supa Gas Refill 3kg': 496,
      'Supa Gas 3kg Burner Set': 540,
      '3KG PACK(GAS+CYLINDER+BURNER&GRILL)': 2336,
      '(6KGS CATEGORY)':0,
      'Cylinder Deposit 6kg': 1800,
      'Supa Gas Refill 6kg': 992,
      'Supa Gas  Burner ': 380,
      'Supa Gas Grill':250,
      '6KG PACK(GAS+CYLINDER+BURNER&GRILL)': 3422,
      '(13KGS CATEGORY)':0,
      'Cylinder Deposit 13kg': 2800,
      'Supa Gas Refill 13kg': 2149,
      'Supa Gas Hose Pipe ': 150,
      'Supa Gas Regulator for 20mm Compact Valve':650,
      '13KG PACK(GAS+CYLINDER+PIPE+REGULATOR)': 5749,
      '(50KGS CATEGORY)':0,
      'Cylinder Deposit 50kg': 10000,
      'Supa Gas Refill 50kg': 8265,
      '50KGS PACK(CYLINDER+GAS)':18265,
      '(ACCESSORIES FOR 3KG AND 6KG LIGHTING PACK)':0,
      'Supa Gas Lantern':760,
      'Supa Gas Lantern Glass-Clear':180,
      'Supa Gas Lantern Glass-Frosted':200,
      'Supa Gas Lantern Pole':590,
      'Supa Gas Lantern Mantle':40,
      'Cooking Burner':3200,


     

    },
    Western: {
      '(3KGS CATEGORY)': 0,
      'Cylinder Deposit 3kg': 967,
      'Supa Gas Refill 3kg': 549,
      'Supa Gas 3kg Burner Set': 540,
      '3KG PACK(GAS+CYLINDER+BURNER&GRILL)': 2056,
      '(6KGS CATEGORY)':0,
      'Cylinder Deposit 6kg': 1256,
      'Supa Gas Refill 6kg': 1028,
      'Supa Gas  Burner ': 380,
      'Supa Gas Grill':250,
      '6KG PACK(GAS+CYLINDER+BURNER&GRILL)': 2984,
      '(13KGS CATEGORY)':0,
      'Cylinder Deposit 13kg': 2028,
      'Supa Gas Refill 13kg': 2379,
      'Supa Gas Hose Pipe ': 150,
      'Supa Gas Regulator for 20mm Compact Valve':650,
      '13KG PACK(GAS+CYLINDER+PIPE+REGULATOR)': 5207,
      '(50KGS CATEGORY)':0,
      'Cylinder Deposit 50kg': 10000,
      'Supa Gas Refill 50kg': 9150,
      '50KGS PACK(CYLINDER+GAS)':19150,
      '(ACCESSORIES FOR 3KG AND 6KG LIGHTING PACK)':0,
      'Supa Gas Lantern':760,
      'Supa Gas Lantern Glass-Clear':180,
      'Supa Gas Lantern Glass-Frosted':200,
      'Supa Gas Lantern Pole':590,
      'Supa Gas Lantern Mantle':40,
      'Cooking Burner':3200,
    },
    Kisumu: {
      '(3KGS CATEGORY)': 0,
      'Cylinder Deposit 3kg': 967,
      'Supa Gas Refill 3kg': 549,
      'Supa Gas 3kg Burner Set': 540,
      '3KG PACK(GAS+CYLINDER+BURNER&GRILL)': 2056,
      '(6KGS CATEGORY)':0,
      'Cylinder Deposit 6kg': 1256,
      'Supa Gas Refill 6kg': 1028,
      'Supa Gas  Burner ': 380,
      'Supa Gas Grill':250,
      '6KG PACK(GAS+CYLINDER+BURNER&GRILL)': 2984,
      '(13KGS CATEGORY)':0,
      'Cylinder Deposit 13kg': 2028,
      'Supa Gas Refill 13kg': 2379,
      'Supa Gas Hose Pipe ': 150,
      'Supa Gas Regulator for 20mm Compact Valve':650,
      '13KG PACK(GAS+CYLINDER+PIPE+REGULATOR)': 5207,
      '(50KGS CATEGORY)':0,
      'Cylinder Deposit 50kg': 10000,
      'Supa Gas Refill 50kg': 9150,
      '50KGS PACK(CYLINDER+GAS)':19150,
      '(ACCESSORIES FOR 3KG AND 6KG LIGHTING PACK)':0,
      'Supa Gas Lantern':760,
      'Supa Gas Lantern Glass-Clear':180,
      'Supa Gas Lantern Glass-Frosted':200,
      'Supa Gas Lantern Pole':590,
      'Supa Gas Lantern Mantle':40,
      'Cooking Burner':3200,
    },
    Eldoret: {
      '(3KGS CATEGORY)': 0,
      'Cylinder Deposit 3kg': 967,
      'Supa Gas Refill 3kg': 549,
      'Supa Gas 3kg Burner Set': 540,
      '3KG PACK(GAS+CYLINDER+BURNER&GRILL)': 2056,
      '(6KGS CATEGORY)':0,
      'Cylinder Deposit 6kg': 1256,
      'Supa Gas Refill 6kg': 1028,
      'Supa Gas  Burner ': 380,
      'Supa Gas Grill':250,
      '6KG PACK(GAS+CYLINDER+BURNER&GRILL)': 2984,
      '(13KGS CATEGORY)':0,
      'Cylinder Deposit 13kg': 2028,
      'Supa Gas Refill 13kg': 2379,
      'Supa Gas Hose Pipe ': 150,
      'Supa Gas Regulator for 20mm Compact Valve':650,
      '13KG PACK(GAS+CYLINDER+PIPE+REGULATOR)': 5207,
      '(50KGS CATEGORY)':0,
      'Cylinder Deposit 50kg': 10000,
      'Supa Gas Refill 50kg': 9150,
      '50KGS PACK(CYLINDER+GAS)':19150,
      '(ACCESSORIES FOR 3KG AND 6KG LIGHTING PACK)':0,
      'Supa Gas Lantern':760,
      'Supa Gas Lantern Glass-Clear':180,
      'Supa Gas Lantern Glass-Frosted':200,
      'Supa Gas Lantern Pole':590,
      'Supa Gas Lantern Mantle':40,
      'Cooking Burner':3200,
    },
  };

  const addRow = () => {
    const newRow = {
      id: tableEntries.length + 1,
      product: '',
      units: 0,
      totalPrice: 0,
    };

    setTableEntries([...tableEntries, newRow]);
  };

  const handleProductChange = (id, value) => {
    const updatedEntries = tableEntries.map((entry) =>
      entry.id === id ? { ...entry, product: value, units: 0, totalPrice: 0 } : entry
    );
    setTableEntries(updatedEntries);
  };



  const handleUnitsChange = (id, value) => {
    const updatedEntries = tableEntries.map((entry) => {
      const totalPrice = value * productPrices[selectedRegion][entry.product];
      return entry.id === id ? { ...entry, units: value, totalPrice } : entry;
    });
    setTableEntries(updatedEntries);
  };


  const calculateTotal = () => {
    return tableEntries.reduce((sum, entry) => sum + entry.totalPrice, 0);
  };


  const [invoiceFile, setInvoiceFile] = useState(null);

  function handleFile(event) {
    setInvoiceFile(event.target.files[0]); // Update the invoiceFile state with the selected file
  }


  const generateLpoNumber = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let lpoNumber = '';
    for (let i = 0; i < 7; i++) {
      lpoNumber += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return lpoNumber;
  };

const handlePDFExport = async () => {

  if (!invoiceFile) {
    alert("Payment receipt is required. Please upload the payment receipt.");
    return;
  }
  

  const name = document.getElementById('name').value;
  const email = document.getElementById('gmail').value;
  const date = document.getElementById('date').value;
  const deliveryAddress = document.getElementById('deliveryAddress').value;
  //const collectionType = document.querySelector('input[name="collectionType"]:checked').value;


  if (!name) {
    alert('Please fill in your Name.');
    return;
  }

  if (!email) {
    alert('Please fill in your Email.');
    return;
  }

  if (!date) {
    alert('Please fill in the Date.');
    return;
  }
  if (!invoiceFile) {
    alert("Payment receipt is required. Please upload the payment receipt.");
    return;
  }


  
  const lpoNumber = generateLpoNumber();

  const doc = new jsPDF();

  const emailData = {
    name: name,
    email: email,
    date: date,
    deliveryAddress: deliveryAddress,
    collectionType: collectionType, 
    lpoNumber: lpoNumber,
  };

  const pageHeight = doc.internal.pageSize.getHeight();

  const marginColor = [148, 213, 0];
  doc.setFillColor(marginColor[0], marginColor[1], marginColor[2]);

  const marginX = 0;
const marginY = 0;
const  marginWidth = 15;
const marginHeight = pageHeight;

doc.rect(marginX, marginY, marginWidth, marginHeight, 'F');

const logoImage = LOGO;
doc.addImage(logoImage, 'PNG', 16, 12, 30, 30);

const headingText = 'Local Purchase Order';
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
doc.setFontSize(12); 
doc.text(20, 60, `Name: ${name}`);
doc.text(20, 70, `Email: ${email}`);
doc.text(160, 60, `Date: ${date}`);

  doc.text(`LPO Number: ${lpoNumber}`, 160, 80);
  doc.text(20, 80, `Delivery Address: ${deliveryAddress}`);
  //doc.text(20, 110, `Collection Type: ${collectionType}`);

  const totalSumRow = ['Total', '', '', `KSH ${calculateTotal().toLocaleString()}`];
  const tableMarginX = 22; 

  
  const tableData = tableEntries.map((entry) => [entry.id, entry.product, entry.units, `KSH ${entry.totalPrice.toLocaleString()}`]);
  tableData.push(totalSumRow); // Add the total sum row to the table data array

  doc.autoTable({
    head: [['Number', 'Product Selection', 'Number of Units', 'Total Price']],
    body: tableData,
    startY: 120, 
    margin: { left: tableMarginX }, 
  });




doc.setTextColor(0, 0, 0); 
doc.setFontSize(10); 




doc.setTextColor(0, 0, 0);

const footerTextLine1 = 'KAWI Complex, Popo lane, Off Red Cross Road, South C, Nairobi Kenya. P.O Box 58567,00100, Nairobi Kenya.';
const footerTextLine2 = 'Telephone: +254-20-6952000, Fax: +254-20-6952200,Email:customerservice@nockenya.co.ke, Website: www.nockenya.co.ke';

const footerX = doc.internal.pageSize.getWidth() / 2;
const footerY = pageHeight - 10; 
const footerLineSpacing = 5;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(0, 0, 0);
doc.text(footerTextLine1, footerX, footerY - footerLineSpacing, { align: 'center' });
doc.text(footerTextLine2, footerX, footerY, { align: 'center' });

doc.save(`onlinelpo.pdf`);






const pdfBlob = doc.output('blob');






  // Create a FormData object and append the PDF Blob
  const formData = new FormData();
  formData.append('pdf', pdfBlob, 'onlinelpo.pdf');
  if (invoiceFile) {
    formData.append('invoice', invoiceFile); // Append the selected invoice file to FormData
  }

  try {
    // Send the PDF Blob to the server
    const response = await fetch('http://localhost:4000/upload-pdf', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('PDF uploaded successfully');
      // Now, you can trigger the email sending from the server
    } else {
      console.error('Error uploading PDF');
    }
  } catch (error) {
    console.error('Error:', error);
  }

  


  try {
    const response = await fetch('http://localhost:4000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData), // Send form data to the server
    });

    if (response.ok) {
      console.log('Email sent successfully');
    } else {
      console.error('Failed to send email');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};







  return (
    <>
      <nav>
      <div className="navbar1">
            <div className="navbar__container">
              <span className="nav-logo">
                <img src={LOGO} alt="logo" />
                <p>ENERGIZING KENYA</p>
              </span>
            </div>

            <div className="navbar-links">
              <ul>
                <li>
                  <Link to="/">Products</Link>
                </li>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">Service&Support</Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
      
     

      <div className="maintop">
        <div className="top">
          <h2>National Oil <br /> Corporation of Kenya</h2>
        </div>
        <div className="name">
          <h3>Local Purchase Order</h3>
        </div>
        <div className="date">
          <label htmlFor="date">Date: </label><input type="date" id='date' /><br />
          
        </div>

        <div className="lower">
          <label htmlFor="Name"> Name: <input type="text" id='name' /></label>
        </div>
        <div className="lower2">
          <label htmlFor="email">Email: <input type="email" name="email" id="gmail" /></label>
        </div>

        <div className="address">
          <label htmlFor="deliveryAddress">Delivery Address:</label> <br /> <br />
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            placeholder="Enter delivery address"
          />
        </div>
        
        <div className="collection">
          <h3>Type of Collection</h3> <br />
          <label>
  <input
    type="radio"
    name="collectionType"
    id="ownCollection"
    checked={collectionType === "Own collection"}
    onChange={() => handleCollectionTypeChange("Own collection")}
  />
  Own collection
</label>
        <br />
        <label>
          <input
            type="radio"
            name="collectionType"
            id="transportDelivery"
            checked={collectionType === "transportDelivery"}
            onChange={() => handleCollectionTypeChange("transportDelivery")}
          />
          Transport delivery
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="collectionType"
            id="superDistributor"
            checked={collectionType === "superDistributor"}
            onChange={() => handleCollectionTypeChange("superDistributor")}
          />
          Super distributor
        </label>
        </div>

        <div className="region-selection">
        <h3>Region</h3>
        <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
          <option value="Nairobi">Nairobi</option>
          <option value="Nakuru">Nakuru</option>
          <option value="MT_Kenya">MT Kenya</option>
          <option value="Western">Western</option>
          <option value="Kisumu">Kisumu</option>
          <option value="Eldoret">Eldoret</option>
          {/* Add options for other regions as needed */}
        </select>
      </div>
      
      </div>


      <div className="table-section">    
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Product Selection</th>
              <th>Number of Units</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {tableEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>
                  <select
                    value={entry.product}
                    onChange={(e) => handleProductChange(entry.id, e.target.value)}
                  >
                     <option value="">Select Product</option>
      <option className="category" value="">-3KGS CATEGORY-</option>
      <option  value="Cylinder Deposit 3kg">Cylinder Deposit 3kg</option>
      <option value="Supa Gas Refill 3kg">13kg Gas refill</option>
      <option value="Supa Gas 3kg Burner Set">Supa Gas 3kg Burner Set</option>
      <option className="category" value="">-6KGS CATEGORY-</option>
      <option value="Cylinder Deposit 6kg">Cylinder Deposit 6kg</option>
      <option value="Supa Gas Refill 6kg">Supa Gas Refill 6kg</option>
      <option value="Supa Gas  Burner ">Supa Gas  Burner </option>
      <option value="Supa Gas Grill">Supa Gas Grill</option>
      <option value="6KG PACK(GAS+CYLINDER+BURNER&GRILL)">6KG PACK=GAS+CYLINDER+BURNER&GRILL..</option>
      <option className="category" value="">-13KGS CATEGORY-</option>
      <option value="Cylinder Deposit 13kg">Cylinder Deposit 13kg</option>
      <option value="Supa Gas Refill 13kg">Supa Gas Refill 13kg</option>
      <option value="Supa Gas Hose Pipe ">Supa Gas Hose Pipe </option>
      <option value="Supa Gas Regulator for 20mm Compact Valve">Supa Gas Regulator for 20mm Compact Valve</option>
      <option value="13KG PACK(GAS+CYLINDER+PIPE+REGULATOR)">13KG PACK=GAS+CYLINDER+PIPE+REGULATOR..</option>
      <option className="category" value="">-50KGS CATEGORY-</option>
      <option value="Cylinder Deposit 50kg">Cylinder Deposit 50kg</option>
      <option value="Supa Gas Refill 50kg">Supa Gas Refill 50kg</option>
      <option value="50KGS PACK(CYLINDER+GAS)">50KGS PACK=CYLINDER+GAS..</option>
      <option className="category" value="">-ACCESSORIES FOR 3KG AND 6KG LIGHTING PACK-</option>
      <option value="Supa Gas Lantern">Supa Gas Lantern</option>
      <option value="Supa Gas Lantern Glass-Clear">Supa Gas Lantern Glass-Clear</option>
      <option value="Supa Gas Lantern Glass-Frosted">Supa Gas Lantern Glass-Frosted</option>
      <option value="Supa Gas Lantern Pole">Supa Gas Lantern Pole</option>
      <option value="Supa Gas Lantern Mantle">Supa Gas Lantern Mantle</option>
      <option value="Cooking Burner">Cooking Burner</option>
                    {/* Add other product options as needed */}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.units}
                    onChange={(e) => handleUnitsChange(entry.id, e.target.value)}
                  />
                </td>
                <td>KSH {entry.totalPrice.toLocaleString()}</td>
              </tr>
            ))}
             {/* Totals row */}
             <tr>
              <td colSpan="3">Total</td>
              <td>KSH {calculateTotal().toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={addRow} className='btn' >Add Product</button>
      </div>


      <form >
        <div className="invoice">
          <h3>UPLOAD PAYMENT RECEIPT</h3>
          <input type="file" name='file' placeholder="Upload Invoice" id="invoice-upload" onChange={handleFile} /><br/>
        </div>
      </form>
      

      <div className="lpobutton">
        <button className='btnend'>Cancel</button>
        <button className='btnend' type="submit" onClick={handlePDFExport}>Place Order</button>
      </div>
    </>
  );
};

export default Check;
