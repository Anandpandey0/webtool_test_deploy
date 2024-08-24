
import React, { useContext } from 'react'
import Popup from '../test_home/Popup/Popup';
import dataContext from '@/context/dataContext';
const Container = () => {
    const { targetedArea, showPopup } = useContext(dataContext);
  return (
   <>
    {showPopup && (
        <div className="border-2 border-solid border-black h-[50vh] w-[50vw]">
          <Popup key={Math.random()} /> {/* Assign a unique key */}
        </div>
      )}
   
   </>
  )
}

export default Container