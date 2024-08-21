import React from 'react';
import Image from 'next/image'


const Basic = () => {
 


  return <div style={{
    width: '80vw',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // border:'solid 2px black',
    justifyContent: 'center',
    alignItems: 'start',
    textAlign: 'start',
    padding: '40px',
    borderRadius: '24px',
    border: '1px solid rgba(225, 225, 225, 1)',
    backgroundColor: 'rgba(245, 245, 247, 1)',
  }}>
    <div style={{
      fontWeight: 800,
      fontSize: '36px',
      lineHeight: '46px',
      // border:'solid 2px black',
      color: 'rgba(33, 43, 54, 1)',
    }}>Free</div>
    <h4 style={{
      fontWeight: 800,
      fontSize: '28px',
      lineHeight: '38px',
      color: 'rgba(33, 43, 54, 1)',
      marginTop: '20px',
    }}>Basic</h4>
    <p style={{
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      color: 'rgba(99, 115, 129, 1)',
      marginBottom: '19px',
      marginTop: '10px',
    }}>For most businesses that want to<br />otpimize web queries</p>
    <div>
      <PlanFeature feature="All limited links" />
      <PlanFeature feature="Own analytics platform" />
      <PlanFeature feature="Chat support" />
      <PlanFeature feature="Optimize hashtags" />
      <PlanFeature feature="Unlimited users" />
    </div>
    <button style={{
      width: '207px',
      height: '45px',
      fontWeight: 800,
      fontSize: '15px',
      lineHeight: '20.49px',
      textAlign: 'center',
      color: 'rgba(15, 98, 61, 1)',
      borderRadius: '24px',
      backgroundColor: 'rgba(15, 98, 61, 0.1)',
      marginTop: '24px',
    }}>Try Now</button>
  </div>;
};

const PlanFeature = ({ feature }: { feature: string }) => {
  return <div style={{display: 'flex', justifyContent: 'start', marginBottom: '10px', alignItems: 'center',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      color: 'rgba(99, 115, 129, 1)',
  }}>
    <Image src="/svg_icon/check-circle-1.svg" alt="image-alt" width={20} height={20} />
    <div style={{width: '10px'}}></div>
    <p>{feature}</p>
  </div>;
};

export default Basic;


