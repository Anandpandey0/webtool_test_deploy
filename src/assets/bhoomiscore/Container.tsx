
import React, { useContext } from 'react'

import dataContext from '@/context/dataContext';
import FarmDetailsModal from '@/components/ui/Popup/Popup';
const Container = () => {
    const { targetedArea, showPopup } = useContext(dataContext);
  return (
   <>
    {showPopup && (
        <div className="border-2 border-solid border-black h-[50vh] w-[50vw]">
          <FarmDetailsModal key={Math.random()} /> {/* Assign a unique key */}
        </div>
      )}
   
   </>
  )
}

export default Container