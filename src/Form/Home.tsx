import React, { useState } from 'react';
import '../styles/home.css';

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDoor = () => {
    setIsOpen(true);
  };

  return (
    <div className="home">
      <div className={`door ${isOpen ? 'open' : ''}`}></div>
      <button onClick={openDoor} className="enter-btn">Enter</button>
    </div>
  );
};

export default Home;
