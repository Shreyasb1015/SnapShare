/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
import { FiPenTool } from 'react-icons/fi';
import { AiOutlineFileImage } from 'react-icons/ai';
import gallery from '../../assets/gallery.png';
import './CreatePost.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {

  const toastOptions= {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    }
  useEffect(()=>{
      
    toast.success('Authenticated Successfully',toastOptions)
  },[])
  return (
    <div className="createPostContainer">
      <div className="createPostHeader">
        <span className="createPostTitle">
          <FiPenTool className="penicon" />
          Create Post
        </span>
      </div>
      <div className="createPostContent">
        <textarea
          className="postInput"
          placeholder="Write your post caption..."
        ></textarea>
        <div className="fileInputContainer">
          <label htmlFor="fileInput" className="fileInputLabel">
            <AiOutlineFileImage className="icon" />
          </label>
          <input type="file" id="fileInput" className="fileInput" multiple />
          <img src={gallery} alt="gallery" className="gallery" />
        </div>
      </div>
      <ToastContainer/>
      <style>{`
        .Toastify__toast {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      `}</style>
      
    </div>
  );
};

export default CreatePost;
