import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { FaSave } from 'react-icons/fa';
import './AddStory.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { addStoryRoute } from '../../utils/routes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addStory } from '../../store/slices/storyslice';
import Add from '../add/Add';

const AddStory = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toastOptions = {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === '' || images.length === 0) {
      toast.error('Please provide content and images', toastOptions);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);
      images.forEach((image) => formData.append('image', image));

      
      const response = await axios.post(addStoryRoute, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data.success) {
        toast.error(response.data.message, toastOptions);
        return;
      }

      dispatch(addStory(response.data.data.story));
      console.log(response.data)
      toast.success('Story added successfully', toastOptions);
      setContent('');
      setImages([]);
      setTimeout(() => {
        navigate('/my-profile');
      }, 3000);

     
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add story', toastOptions);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-story-container">
        <form onSubmit={handleSubmit}>
            <h2>Add a Story</h2>
          <div className="form-group">
            <textarea
              placeholder="Write your story..."
              value={content}
              onChange={handleContentChange}
              rows={5}
            />
          </div>
          <div className="form-group">
            <input type="file" onChange={handleImageChange} multiple />
          </div>
          <button type="submit" className="submit-button">
            <FaSave className="button-icon" /> Post
          </button>
        </form>
        <ToastContainer />
        <style>{`
          .Toastify__toast {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        `}</style>
        <Add />
      </div>
    </>
  );
};

export default AddStory;
