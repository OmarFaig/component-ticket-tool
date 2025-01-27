import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveAppBar from './components/Navbar'
import Footer from './components/Footer'
import ExampleHandsontable from './pages/createTickets'
import HomePage from "./pages/HomePage";
import CreateComponentRequest from "./pages/createTickets";
//import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Router>
      <div className="app-container">
        <ResponsiveAppBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-component-request" element={<CreateComponentRequest />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
