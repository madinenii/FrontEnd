import React, { useState } from 'react'
import { Box,styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
 
 
 
 
// import OTP from '../Components/OtpInput';
import OTPInput from '../Components/OtpInput';
 
const Judge = () => {
  const [otp,setOtp]=useState('');
  const [open,setOpen]=useState(true);
  const [ErrorMessage,setErrorMessage]=useState('');
 
  const handleverify =async()=>
  {
    try {
      if (otp.length !== 6 || isNaN(otp)) {
        setErrorMessage('OTP must be a 6-digit number.');
        return;
      }
 
      // Make a POST request to the backend server using Axios to verify the OTP
      const response = await axios.post('', { otp });
 
      if (response.status === 200) {
        // If OTP is valid, perform necessary actions
        console.log('OTP verified successfully!');
        setOpen(false) // Close the popup
      } else {
        throw new Error('Failed to verify OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      setErrorMessage('Failed to verify OTP. Please try again.');
    }
 
   
  }
 
  return (
    <div>
        {/* <OTP seperator={<span>-</span>} value={otp} onChange={setOtp} length={6}/> */}
     
        <Dialog
        open={open}
        onClose={()=>setOpen(false)}
      >
        <DialogContent>
        <input
        type='text'
        onChange={(e)=>setOtp(e.target.value)}
        required
        ></input>
        <button onClick={handleverify}>Submit</button>
        </DialogContent>
       
      </Dialog>
   
     
    </div>
  )
}
 
 
const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};
 
const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
const InputElement = styled('input')(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
 
  &:hover {
    border-color: ${blue[400]};
  }
 
  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }
 
  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
 
export default Judge
 