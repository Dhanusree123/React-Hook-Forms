import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyForm from './Form/Form';
import Home from './Form/Home';
import './styles/form.css';  
import './styles/home.css';  

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<MyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
