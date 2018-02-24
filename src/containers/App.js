import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Routes from "./Routes";
import './App.css';
import Login from "./containers/Login";
import AddService from "./containers/AddService";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Project Homeless Connect Admin Platform</h1>
        </header>
//        <Login />
        <AddService />
      </div>
    );
  }
}

export default App;
