import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './ChangePassword.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Add from '../add/Add';
import { changePasswordRoute } from '../../utils/routes';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate=useNavigate();
  const toastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleChangePassword = async(e) => {
    e.preventDefault();
    if(validateDetails())
    {
        const response=await axios.patch(changePasswordRoute,{oldPassword,newPassword},{withCredentials:true});
        if(!response.data.success)
        {
            toast.error(response.data.message,toastOptions);
        }
        toast.success(response.data.message,toastOptions);
        setOldPassword('');
        setNewPassword('');
        setTimeout(()=>{

            navigate('/my-profile');
        },2000)
        

    }    
    
  };

  const validateDetails=()=>{

    if(oldPassword==='' || newPassword===''){

        toast.error('Please fill all the fields',toastOptions);
        return false;
    }
    if(oldPassword.length <6 || newPassword.length<6)
    {
            toast.error('Password should be atleast 6 characters long',toastOptions);
            return false;
    }
    if(oldPassword===newPassword)
    {
        toast.error('Old password and new password cannot be same',toastOptions);
        return false;
    }
    return true;

  }
  

  return (
    <>
      <Navbar />
      <div className="change-password-container">
        <form onSubmit={handleChangePassword} className="change-password-form">
          <h2>Change Password</h2>
          <div className="form-group">
            <label>Old Password</label>
            <div className="password-input">
              <input
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <span onClick={handleToggleOldPassword} className="toggle-password">
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>New Password</label>
            <div className="password-input">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span onClick={handleToggleNewPassword} className="toggle-password">
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="submit-button">Change Password</button>
        </form>
        <Add />
        <ToastContainer/>
        <style>{`
          .Toastify__toast {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
};

export default ChangePassword;
