import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { FaUser, FaEnvelope, FaSave, FaFileUpload } from 'react-icons/fa';
import './UpdateProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfileRoute } from '../../utils/routes';
import { login } from '../../store/slices/userslice';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState(null);

  const toastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.patch(updateProfileRoute, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Profile updated successfully', toastOptions);
        console.log('response', response.data.data.user);
        dispatch(login(response.data.data.user));
        setTimeout(()=>{
          navigate('/my-profile');
        
        },2000);
        
        
      } else {
        toast.error(response.data.message, toastOptions);
      }
    } catch (error) {
      toast.error('Error updating profile', toastOptions);
    }
  };

  return (
    <>
      <Navbar />
      <div className="update-profile-wrapper">
        <div className="update-profile-box">
          <h2>Update Profile</h2>
          <div className="update-form-group">
            <FaUser className="update-form-icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="update-form-group">
            <FaEnvelope className="update-form-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="update-form-group">
            <FaFileUpload className="update-form-icon" />
            <input
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <button className="update-button" onClick={handleUpdate}>
            <FaSave className="button-icon" /> Update
          </button>
        </div>
        <ToastContainer />
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
}

export default UpdateProfile;
