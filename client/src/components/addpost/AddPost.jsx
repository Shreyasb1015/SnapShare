import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import {  FaSave } from 'react-icons/fa';
import './AddPost.css';
import axios from 'axios'; 
import { toast,ToastContainer } from 'react-toastify';
import { addPostRoute } from '../../utils/routes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addPost} from '../../store/slices/postslice'
import Add from '../add/Add';

const AddPost = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
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
  const navigate = useNavigate();


  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(content.trim() === '' || images.length === 0)
    {
        toast.error("Please provide content and images",toastOptions);
        return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);
      images.forEach((image) => formData.append('images', image));

      const response = await axios.post(addPostRoute, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(!response.data.success)
        {
            toast.error(response.data.message,toastOptions);
        }
        //dispatch(addPost(response.data.data.post));
        setContent('');
        setImages([]);
       
       toast.success('Post added successfully', toastOptions);
       setTimeout(()=>{navigate('/my-profile')},2000);
       
     
     
    } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to add post', toastOptions);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-post-container">
        <form onSubmit={handleSubmit}>
          <h2>Add Post</h2>
          <div className="form-group">
            <textarea
              placeholder="Write your post..."
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
      <Add/>
      </div>
    </>
  );
}

export default AddPost;
