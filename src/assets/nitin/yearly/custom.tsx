import React from 'react';
import Image from 'next/image';

const Custom = () => {
    return <div style={{
        width: '292px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        textAlign: 'start',
        padding: '52px',
        borderRadius: '24px',
        border: '1px solid rgba(225, 225, 225, 1)',
        backgroundColor: 'rgba(15, 98, 61, 1)',
        boxShadow: '0px 30px 40px rgba(15, 98, 61, 0.2)',
      }}>
        <div style={{
          fontWeight: 800,
          fontSize: '36px',
          lineHeight: '46px',
          color: 'rgba(255, 255, 255, 1)',
        }}>$0.25<span style={{fontSize: 17}}>/month</span></div>
    
    
        <p style={{
          fontWeight: 800,
          fontSize: '28px',
          lineHeight: '38px',
          color: 'rgba(255, 255, 255, 1)',
          marginTop: '20px',
        }}>Professional</p>
        <p style={{
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          color: 'rgba(255, 255, 255, 1)',
          marginBottom: '19px',
          marginTop: '10px',
        }}>Advanced tools for precision<br/>farming</p>
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
          backgroundColor: 'rgba(255, 255, 255, 1)',
          marginTop: '24px',
        }}>Choose plan</button>
      </div>;
    };
    
    const PlanFeature = ({ feature }: { feature: string }) => {
      return <div style={{display: 'flex', justifyContent: 'start', marginBottom: '10px', alignItems: 'center',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          color: 'rgba(255, 255, 255, 1)',
      }}>
        <Image src="/svg_icon/check-circle-1 (1).svg" alt="image-alt" width={20} height={20} />
        <div style={{width: '10px'}}></div>
        <p>{feature}</p>
      </div>;
    
    };

export default Custom