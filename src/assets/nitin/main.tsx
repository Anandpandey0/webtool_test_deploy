import React from 'react';
import TopNavButtom from './top_button/topNavButton';

const Main = () => {
  return (
    <div style={{justifyContent: 'center', display: 'flex', flexDirection:'column' }}>
      <TopNavButtom/>
      <div style={{ height: '130px' }}></div>
    </div>
  );
};

export default Main;