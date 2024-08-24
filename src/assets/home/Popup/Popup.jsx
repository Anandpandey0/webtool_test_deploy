/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect,useState } from 'react'
import "./popup.css"



const Popup = (props) => {
   const {selectedFarm, setOpenPop}= useContext(dataContext)

console.log(selectedFarm)
const kharifproperty = '2023_Kharib';
const rabiproperty = '2023_Rabi';
  return (
    <div className="modal">
    <div className="overlay"  onClick={()=>{setOpenPop(false)}}></div>
    
    <div className="modal-inner">
      <div className="modal-left">
           <div className="header-popup">
        <h1>Header</h1>
           </div>
<div className="croprotation-data">
 <p> BhoomiScore Analysis</p>
 {
  season=='Kharif' ?
  <>{
    selectedFarm[kharifproperty] <4 ?
   <div className='laala'>Poor</div> :
  selectedFarm[kharifproperty] <7 ?
  <div  className='peela'>Average</div> :
  <div  className='Haara'>Excellent</div>
  }</>
  :
<>{
  selectedFarm[rabiproperty] <4 ?
 <div className='laala'>Poor</div> :
selectedFarm[rabiproperty] <7 ?
<div  className='peela'>Average</div> :
<div  className='Haara'>Excellent</div>
}</>
 }

</div>
<div className="satellite-imgs">
  <p>Your Farm Image</p>
  {
    season=='Kharif' ?
    <>{
      selectedFarm[kharifproperty] <4 ?
      <img src="https://1.bp.blogspot.com/-JtaQJC1jCQw/T-_RUuvOW7I/AAAAAAAAD6s/MhQjT_Sds-Y/s1600/2012-06-30_15-32-55_412.jpg" alt="" /> :
    selectedFarm[kharifproperty] <7 ?
    <img src="https://th.bing.com/th/id/OIP.eFv-TxWasm7ESqcyVESbfQHaEK?w=299&h=180&c=7&r=0&o=5&pid=1.7" alt="" /> :
    <img src={excellent} alt="" />
    }</>
    :
    <>{
      selectedFarm[rabiproperty] <4 ?
      <img src="https://1.bp.blogspot.com/-JtaQJC1jCQw/T-_RUuvOW7I/AAAAAAAAD6s/MhQjT_Sds-Y/s1600/2012-06-30_15-32-55_412.jpg" alt="" /> :
    selectedFarm[rabiproperty] <7 ?
    <img src="https://th.bing.com/th/id/OIP.eFv-TxWasm7ESqcyVESbfQHaEK?w=299&h=180&c=7&r=0&o=5&pid=1.7" alt="" /> :
    <img src={excellent} alt="" />
    }</>
  }

 
</div>
      </div>
      <div className="modal-right">
        <div className="farmer-img">
        <img src={selectedFarm?.Sex === "Male" ? boy : girl} alt="" style={{height:'15vh',width:'15vw' }} />
        </div>
<div className="data-fields">
  <h1>{selectedFarm?.Name}</h1>
  <p>{selectedFarm?.Age} {selectedFarm?.Sex}</p>
</div>
<div className="data-fieldss">
  <p>Village</p>
  <h1>{selectedFarm?.Village}</h1>
</div>
<div className="line-gap">

</div>
<div className="data-fieldss">
  <p>Farm Area [In Meter Square]</p>
  <h1>{selectedFarm?.Area}</h1>
</div>
<div className="line-gap">
  
</div>
<div className="data-fieldss">
  <p>Current Crop</p>
  {
    season=='Kharif'  ? <> <h1>{selectedFarm?.Current_Kharif}</h1></>
    :
    <h1>{selectedFarm?.Current_rabi}</h1>
  }
 
</div>

<button className='Back-btn' onClick={()=>{setOpenPop(false)}}>Go Back</button>
      </div>
             </div>
             </div>
             
  )
}

export default Popup
