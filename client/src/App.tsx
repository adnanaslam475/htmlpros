import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TableData from '../src/components/TableData'
import Details from "./components/Details";

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<TableData />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
