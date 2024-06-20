import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { FaSave } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Add from '../add/Add';
import './UpdatePost.css';
import { updatePostContentRoute, updatePostPhotosRoute } from '../../utils/routes';

const UpdatePost = () => {
  const { postId } = useParams();
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
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
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;

    if (content) {
      try {
        const response = await axios.put(
          updatePostContentRoute.replace(':postId', postId),
          { content },
          { withCredentials: true }
        );
        if (response.data.success) {
           success=true;
        } else {
          toast.error(response.data.message, toastOptions);
        }
      } catch (error) {
        toast.error(error.message, toastOptions);
      }
    }

    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      try {
        const response = await axios.put(
          updatePostPhotosRoute.replace(':postId', postId),
          formData,
          { withCredentials: true }
        );
        if (response.data.success) {
          success = true;
        } else {
          toast.error(response.data.message, toastOptions);
        }
      } catch (error) {
        toast.error(error.message, toastOptions);
      }
    }

    if (success) {
      toast.success("Post updated successfully!", toastOptions);
      setTimeout(() => navigate('/my-profile'), 2000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="update-post-container">
        <form onSubmit={handleSubmit}>
          <h2>Update Post</h2>
          <div className="form-group">
            <textarea
              placeholder="Update your post..."
              value={content}
              onChange={handleContentChange}
              rows={5}
            />
          </div>
          <div className="form-group">
            <input type="file" multiple onChange={handleImageChange} />
          </div>
          <button type="submit" className="submit-button">
            <FaSave className="button-icon" /> Update Post
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
}

export default UpdatePost;
