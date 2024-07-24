// pages/login.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userType: 'individual',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        returnTo: '/',
      },
    });
  };

  return (
    <div className="flex h-screen">
      <div className="relative w-1/2">
        <Image
          src="/images/login_form.png"
          alt="Login form background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-4 relative h-20 w-86">
            <Image
              src="/images/logo_bhoomicam.png"
              alt="Login form background"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="text-xl font-semibold mb-6">Sign up for free account</h2>
          <p className="mb-4">Welcome to our platform! Please enter your details.</p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex space-x-4">
              <TextField fullWidth label="First Name" name="firstName" variant="outlined" value={formData.firstName} onChange={handleChange} />
              <TextField fullWidth label="Last Name" name="lastName" variant="outlined" value={formData.lastName} onChange={handleChange} />
            </div>
            <FormControl component="fieldset" className="w-full">
              <FormLabel component="legend" className="text-start text-black">Are you individual or organisation</FormLabel>
              <RadioGroup row aria-label="userType" name="userType" value={formData.userType} onChange={handleChange} className="flex space-x-4 w-full ml-3">
                <FormControlLabel value="individual" control={<Radio />} label="Individual" className="flex-1 border-2 border-solid border-black px-3 py-2" />
                <FormControlLabel value="organisation" control={<Radio />} label="Organisation" className="flex-1 border-2 border-solid border-black px-3 py-2" />
              </RadioGroup>
            </FormControl>
            <TextField fullWidth label="Email" name="email" variant="outlined" type="email" value={formData.email} onChange={handleChange} />
            <TextField fullWidth label="Password" name="password" variant="outlined" type="password" value={formData.password} onChange={handleChange} />
            <Button fullWidth variant="contained" color="primary" className="mt-4" style={{ backgroundColor: '#0F623D', color: '#FFFFFF' }} onClick={handleSignup}>Sign Up</Button>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} className="mt-4 text-black" onClick={() => loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })}>Continue with Google</Button>
            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} className="mt-2" style={{ borderColor: '#3b5998', color: '#3b5998' }} onClick={() => loginWithRedirect({ authorizationParams: { connection: 'facebook' } })}>Continue with Facebook</Button>
            <p className="mt-4 text-center">Already have an account? <a href="#" className="text-blue-500">Sign in</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
