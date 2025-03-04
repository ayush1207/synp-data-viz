import React from "react";
import './App.scss';
import Header from './components/header/Header';
import { DataViz } from "./components/DataViz/DataViz";

function App() {
  return (
    <div className="App w-100 h-100">
      <div className="App">
        <Header />
        <DataViz></DataViz>
      </div>
    </div>
  );
}

export default App;
