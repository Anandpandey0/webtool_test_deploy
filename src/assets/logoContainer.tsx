import Image from 'next/image'
import React from 'react'

const LogoContainer = () => {
  return (
    <div className="flex justify-center mb-4 relative h-20 w-56 p-4">
            <Image
              src="/images/logo_bhoomicam.png"
              alt="Login form background"
              layout="fill"
              objectFit='contain'
            />
          </div>
  )
}

export default LogoContainer