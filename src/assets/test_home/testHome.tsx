import React, { useContext } from 'react';
import Bhadras_Bhooscore_Component from './bhadras/Bhadras_Bhooscore_Component';
import dataContext from '@/context/dataContext';
import Popup from './Popup/Popup';

const TestHome = () => {
  const { targetedArea, showPopup } = useContext(dataContext);

  return (
    <>
      {showPopup && (
        <div className="border-2 border-solid border-black h-[50vh] w-[50vw]">
          <Popup key={Math.random()} /> {/* Assign a unique key */}
        </div>
      )}

      <Bhadras_Bhooscore_Component />
     <p>{targetedArea ? targetedArea.properties.farm_id :'No Field Selected'}</p>
    </>
  );
};

export default TestHome;
