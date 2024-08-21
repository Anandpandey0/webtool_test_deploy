import React, { useState } from 'react';
import Plans from '../monthly/plans';
import Custom from '../yearly/custom';

// A simple custom TabPanel-like component
const TabPanel = ({ children, activeTab, index }) => {
    return (
        <div hidden={activeTab !== index}>
            {activeTab === index && <div>{children}</div>}
        </div>
    );
};

const Togglebutton = () => {
    const [isActive, setIsActive] = useState(true); // Managing active state

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Toggle buttons */}
            <div
                style={{
                    width: '220px',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(234, 236, 240, 1)',
                    fontSize: '10px',
                    alignItems: 'center'
                }}
            >
                {/* MONTHLY button */}
                <div
                    style={isActive ? activeStyle : deActiveStyle}
                    onClick={() => setIsActive(true)} // Switch state to true for MONTHLY
                >
                    MONTHLY
                </div>

                {/* YEARLY button */}
                <div
                    style={!isActive ? activeStyle : deActiveStyle}
                    onClick={() => setIsActive(false)} // Switch state to false for YEARLY
                >
                    YEARLY
                </div>
            </div>

            {/* Tab Panels */}
            <TabPanel activeTab={isActive ? 0 : 1} index={0}>
                <div>
                    <Plans />
                </div>
            </TabPanel>
            <TabPanel activeTab={isActive ? 0 : 1} index={1}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div style={{ position: 'relative', }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <Plans />
                        </div>
                        <div style={{ position: 'absolute', top: '55px', left: '610px', zIndex: 2 }}>
                            <Custom />
                        </div>
                    </div>
                </div>
            </TabPanel>
        </div>
    );
};

// Active style for the active button
const activeStyle = {
    width: '111px',
    backgroundColor: 'rgba(15, 98, 61, 1)',
    color: 'rgba(255, 255, 255, 1)',
    borderRadius: '20px',
    boxShadow: '0px 2px 4px rgba(82, 67, 194, 0.23)',
    padding: '10px 25px',
    cursor: 'pointer', // Adding cursor pointer for better UX
};

const deActiveStyle = {
    width: '111px',
    padding: '10px 25px',
    cursor: 'pointer', // Adding cursor pointer for better UX
};

export default Togglebutton;
// A simple custom TabPanel-like component
