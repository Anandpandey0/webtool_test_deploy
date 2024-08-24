import React, { ReactNode, useState } from "react";
import dataContext, { TargetedArea } from "./dataContext";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [targetedArea, setTargetedArea] = useState<TargetedArea| null>(null);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [selectedFarm, setSelectedFarm] = useState<any[]>([]);
  const [targetedSeason, setTargetedSeason] = useState("");
  const [targetedYear, setTargetedYear] = useState("");
  const [showPopup, setShowPopup] = useState<boolean>(false);  // Corrected type here

  return (
    <dataContext.Provider
      value={{
        targetedArea,
        setTargetedArea,
        userDetail,
        setUserDetail,
        selectedFarm,
        setSelectedFarm,
        targetedSeason,
        setTargetedSeason,
        targetedYear,
        setTargetedYear,
        showPopup,
        setShowPopup,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default ContextProvider;
