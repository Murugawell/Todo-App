import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ToDo from './components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
    <Header></Header>
    <ToDo></ToDo>
    </div>
  );
}

export default App;
