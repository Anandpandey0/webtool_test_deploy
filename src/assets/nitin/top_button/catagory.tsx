import React, { useState } from 'react';
import Togglebutton from './toggleButton';

const Catagory = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
    }}>
      <p style={{
        fontWeight: 800,
        fontSize: '40px',
        lineHeight: '54px',
        color: 'rgba(35, 29, 79, 1)',
        textAlign: 'center',
      }}>Choose the plan that’s right for you</p>
      <p style={{
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '27px',
        color: 'rgba(132, 129, 153, 1)',
        textAlign: 'center',
      }}>No contracts. No surprise fees.</p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
      }}>
        <Togglebutton />
      </div>
    </div>
  );
};

function ToggleSwitch() {
  const [isMonthly, setIsMonthly] = useState(true);

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <div className="toggle-switch">
      <button
        className={`toggle-button ${isMonthly ? 'active' : ''}`}
        onClick={handleToggle}
      >
        Monthly
      </button>
      <button
        className={`toggle-button ${!isMonthly ? 'active' : ''}`}
        onClick={handleToggle}
      >
        Yearly
      </button>
    </div>
  );
}

export default Catagory;
