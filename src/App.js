import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import SplashScreen from './components/SplashScreen';
import Reg from './components/Reg';

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const url = 'https://api.jsonbin.io/v3/b/608566b1c7df3422f7fd4caf';
  let showSplashScreen = dataLoaded ? null : <SplashScreen />;
  let showReg = dataLoaded ? <Reg /> : null;

  useEffect(() => {
    sessionStorage.setItem('dataLoaded', false);
    getCustomers(url).then((value) => {
      setTimeout(() => {
        setDataLoaded(value);
      }, 10000);
    });
  }, [])

  return (
    <div className="App">
      <div className="left-side"></div>
      <Nav />
      {showSplashScreen}
      {showReg}
      <div className="right-side"></div>
    </div>
  );
}

// Main API comunication function
async function getCustomers(url) {
  try {
    let resp = await fetch(url, { headers: { "X-Master-Key": "$2b$10$IhrIs2ruVmYB9qDoesAcEOVzU7yA.6qvn/x0e7rjB1wZOzYESAW3C" } });
    let data = await resp.json();
    sessionStorage.setItem('org', JSON.stringify(data));
    data.record.sort((a, b) => {

      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    sessionStorage.setItem('data', JSON.stringify(data));
    sessionStorage.setItem('dataLoaded', true);

    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

export default App;
