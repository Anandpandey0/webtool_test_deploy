import React from "react";
import Basic from "./basic";
import Professional from "./professional";

const Plans = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'relative', marginTop: '100px' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Basic />
        </div>
        <div style={{ position: 'absolute', top: '-15px', left: '30%', zIndex: 2 }}>
          <Professional />
        </div>
      </div>
    </div>
  );
};

export default Plans;