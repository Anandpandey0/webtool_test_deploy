/* eslint-disable no-unused-vars */
import React from "react";

import fields from "../../assets/Images/fields.svg";

import { useContext } from "react";
import Image from "next/image";
const Fields = () => {
  
//   const { searchValue, setSearchValue } = useContext(dataContext);
//   function getRecordsByVillage(recordCollection, villageQuery) {
//     const filteredRecords = recordCollection.filter(
//       (record) => record.Village.toLowerCase() === villageQuery.toLowerCase()
//     );
//     return filteredRecords;
//   }
  return (
    <div className="fields_wrapper">
      <div className="header_fields">
        <Image src={fields} alt="" />
        <h1>Fields in Selected Village</h1>
      </div>
      <div className="fields_sqft">Number Of Fields</div>
      <div className="fields_number">
        Fields Number
        {/* <CountIncrementer targetNumber={getRecordsByVillage(bhoomiscore,searchValue).length} /> */}
      </div>
    </div>
  );
};

export default Fields;
