import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveAppBar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from "./pages/HomePage";
import CreateComponentRequest from "./pages/CreateTickets";
import DataBaseInput from './pages/DatabaseInput'
//import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Router>
        <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-component-request" element={<CreateComponentRequest />} />
            <Route path="/database-input" element={<DataBaseInput />} />
          </Routes>
        <Footer />
    </Router>
  );
}

export default App
