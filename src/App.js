// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage'; // Import Navbar component
import HollowBricksPage from './pages/HollowBricksPage'; // Product-specific pages
import CementPage from './pages/CementPage';
import MsandPage from './pages/MsandPage';
import PsandPage from './pages/PsandPage';
import ChipsPage from './pages/ChipsPage';
import DetailsPage from './pages/DetailsPage';
import MsandDetailsPage from './pages/MsandDetailsPage';
import PsandDetailsPage from './pages/PsandDetailsPage';
import ChipsDetailsPage from './pages/ChipsDetailsPage';
import CementDetailsPage from './pages/CementDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar Component */}
        <Navbar />
        
        {/* React Router Routes to handle different routes */}
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/hollow-bricks" element={<HollowBricksPage />} />
          <Route path="/details/:size" element={<DetailsPage />} />
          <Route path="/msand-details" element={<MsandDetailsPage />} />
          <Route path="/psand-details" element={<PsandDetailsPage />} />
          <Route path="/chips-details" element={<ChipsDetailsPage />} />
          <Route path="/cement-details" element={<CementDetailsPage />} />

          <Route path="/cement" element={<CementPage />} />
          <Route path="/msand" element={<MsandPage />} />
          <Route path="/psand" element={<PsandPage />} />
          <Route path="/chips" element={<ChipsPage />} />
          {/* Default route */}
          <Route path="/" element={<h2>Select a product from the menu</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
