import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import All from './components/all/All';
import Check from './components/check/Check'



export default function App() {

    const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3100); 
  }, []);



    return (
      <BrowserRouter>
        <Routes>

        
            <Route exact path='/' element={< All />}></Route>
            <Route exact path='/check' element={< Check />}></Route>
       
        </Routes>
      </BrowserRouter>
    );
  }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/> );