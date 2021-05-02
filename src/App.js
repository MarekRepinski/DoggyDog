import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import NavShort from './components/NavShort';
import SplashScreen from './components/SplashScreen';
import Reg from './components/Reg';
import About from './components/About';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [reload, setReload] = useState(false);
  const url = 'https://api.jsonbin.io/v3/b/608566b1c7df3422f7fd4caf';

  useEffect(() => {
    sessionStorage.setItem('dataLoaded', false);
    getCustomers(url);
  }, [])

  return (
    <div className="App">
      <div className="left-side"></div>
      <Router>
        <Switch>
          <Route exact path="/">
            <NavShort />
            <SplashScreen />
          </Route>
          <Route path="/reg">
            <Nav searchDogs={(e) => { createList(e); setReload(!reload); }} />
            <Reg key={reload} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
      <div className="right-side"></div>
    </div>
  );
}

// Main API comunication function
async function getCustomers(url) {
  try {
    let resp = await fetch(url, { headers: { "X-Master-Key": "$2b$10$IhrIs2ruVmYB9qDoesAcEOVzU7yA.6qvn/x0e7rjB1wZOzYESAW3C" } });
    let data = await resp.json();
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
    sessionStorage.setItem('org', JSON.stringify(data));
    sessionStorage.setItem('data', JSON.stringify(data));
    sessionStorage.setItem('dataLoaded', true);

    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

function createList(searchString) {
  let obj = JSON.parse(sessionStorage.org);
  console.log(obj);
  let data = { record: [] };
  for (let i = 0; i < obj.record.length; i++) {
    let temp = obj.record[i].name.toUpperCase();
    if (temp.indexOf(searchString.toUpperCase()) > -1) {
      data.record.push(obj.record[i]);
    }
  }
  if (data.record.length === 0) {
    data = { record: [{ name: searchString, "img": "", chipNumber: "AIK1891AIK" }] };
  }
  console.log(data);
  sessionStorage.setItem('data', JSON.stringify(data));
}

export default App;
