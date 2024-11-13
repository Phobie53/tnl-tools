import React, { useState } from 'react';
import { GiSwordman } from 'react-icons/gi';
import { FaCalculator, FaChartBar, FaMap } from 'react-icons/fa';
import Calculator from './CriticalCalculator.jsx';

const ToolsContainer = () => {
  const [activeTab, setActiveTab] = useState('tools');

  return (
    <>
      <header className="header">
        <div className="logo">
          <GiSwordman />
          <span>TnL Tools</span>
        </div>
      </header>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          <FaCalculator />
          <span>Calculateurs</span>
        </div>
        <div className="tab">
          <FaChartBar />
          <span>Statistiques</span>
        </div>
        <div className="tab">
          <FaMap />
          <span>Cartes</span>
        </div>
      </div>

      <Calculator />
    </>
  );
};

export default ToolsContainer;
