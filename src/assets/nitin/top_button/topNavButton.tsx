import React, { useState } from 'react';
import Catagory from './catagory';


// A simple custom TabPanel-like component
const TabPanel = ({ children, activeTab, index }: { children: React.ReactNode, activeTab: number, index: number }) => {
  return (
    <div hidden={activeTab !== index}>
      {activeTab === index && <div>{children}</div>}
    </div>
  );
};

const TopNavButton = () => {
  const [activeTab, setActiveTab] = useState<number>(0);  // Managing active tab state

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => handleTabChange(0)}
          style={{
            borderBottom: activeTab === 1 ? 'none' : '2px solid rgba(15, 98, 61, 1)',
            fontWeight: '500',
            fontSize: '14px',
            padding: '9px',
            marginRight: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Price Plans
        </button>
        <button
          onClick={() => handleTabChange(1)}
          style={{
            borderBottom: activeTab === 1 ? '2px solid rgba(15, 98, 61, 1)' : 'none',
            fontWeight: '500',
            fontSize: '14px',
            padding: '9px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Solutions
        </button>
      </div>

      {/* Tab Panels */}
      <TabPanel activeTab={activeTab} index={0}>
        <div>
          <Catagory/>
        </div>
      </TabPanel>
      <TabPanel activeTab={activeTab} index={1}>
        <div>Solutions Content</div>
      </TabPanel>
    </div>
  );
};

export default TopNavButton;




