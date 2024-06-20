/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { FaEnvelope, FaUserEdit,FaKey } from 'react-icons/fa';
import defaultProfilePic from '../../assets/default.png';
import './MyProfile.css';
import { myPostRoute, myStoriesRoute, deletePostRoute, deleteStoryRoute } from '../../utils/routes';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Post from '../post/Post';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Story from '../story/Story';
import Add from '../add/Add';
import { deletePost } from '../../store/slices/postslice';
import { useDispatch } from 'react-redux';
import { deleteStory } from '../../store/slices/storyslice';



const MyProfile = () => {
  const [selectedTab, setSelectedTab] = useState('My Posts');
  const [myposts, setMyposts] = useState([]);
  const [mystories, setMystories] = useState([]);
  const user = useSelector(state => state.user.currentUser);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const profilePic=user?.profilePicture ? user.profilePicture : defaultProfilePic;
  

  useEffect(() => {
    if(user){

      
      fetchMyposts();
      fetchMystories();
    }

    
  }, [user]);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

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

  const fetchMyposts = async () => {
    try {
      const response = await axios.get(myPostRoute, { withCredentials: true });
      if (!response.data.success) {
        toast.error(response.data.message, toastOptions);
      } else {
        setMyposts(response.data.data);
      }
    } catch (error) {
      toast.error("Error in fetching posts", toastOptions);
    }
  };

  const fetchMystories = async () => {
    try {
      const response = await axios.get(myStoriesRoute, { withCredentials: true });
      if (!response.data.success) {
        toast.error(response.data.message, toastOptions);
      } else {
        setMystories(response.data.data.stories);
      }
    } catch (error) {
      toast.error("Error in fetching stories", toastOptions);
    }
  };

  const handleDeletePost = async (postId) => {
    
    try {
      const response = await axios.delete(deletePostRoute.replace(':postId', postId), { withCredentials: true });
      if(!response.data.success)
        {
          toast.error(response.data.message, toastOptions);
        }
        toast.success("Post deleted successfully", toastOptions);
        setMyposts(myposts.filter(post => post._id !== postId));
        //dispatch(deletePost({ id: postId }));
        

    } catch (error) {
        console.log("Error",error)
        toast.error(error.message, toastOptions);
    }
  };

  const handleDeleteStory = async (storyId) => {
    try {
      const response = await axios.delete(deleteStoryRoute.replace(':storyId', storyId), { withCredentials: true });
      if(!response.data.success)
        {
          toast.error(response.data.message, toastOptions);
        }

        toast.success("Story deleted successfully", toastOptions);
        setMystories(mystories.filter(story => story._id !== storyId));
        dispatch(deleteStory(storyId));
      
    } catch (error) {
      toast.error("Error in deleting story", toastOptions);
    }
  };

  if (!user) {
    return <div style={{color:'orange', textAlign:'center', fontWeight:'bold'}}>Loading...</div>; 
  }



  return (
    <>
      <Navbar />
      {console.log(user)}
      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="profile-info">
            <img
              src={myposts[0]?.user?.profilePicture ? myposts[0].user.profilePicture : profilePic}
              alt="Profile"
              className="profile-picture"
            />
            <h2 className="username">{user?.username}</h2>
            <p className="user-email">
              <FaEnvelope className="email-icon" /> {user?.email}
            </p>
          </div>
          <div className="profile-actions">
            <button className="profile-action-button" onClick={() => { navigate('/update-profile') }}>
              <FaUserEdit className="button-icon" /> Update Profile
            </button>
            <button className="profile-action-button" onClick={() => { navigate('/change-password') }}>
              <FaKey className="button-icon" /> Change Password
            </button>
          </div>
        </div>
        <div className="toggle-container">
          <div
            className={`toggle-option left-option ${selectedTab === 'My Posts' ? 'active' : ''}`}
            onClick={() => handleTabClick('My Posts')}
          >
            My Posts
          </div>
          <div
            className={`toggle-option right-option ${selectedTab === 'My Stories' ? 'active' : ''}`}
            onClick={() => handleTabClick('My Stories')}
          >
            My Stories
          </div>
        </div>
        <div className="content-container">
          
          {selectedTab === 'My Posts' ? (
            <div className="posts-container">
              {myposts.length==0 && <h2 className="no-posts">No posts found</h2>}
              {myposts.map(post => (
                <Post key={post._id} post={post} onDelete={handleDeletePost} canEdit={true} />
              ))}
            </div>
          ) : (
            <div className="stories-container">
              {mystories.length==0 && <h2 className="no-stories-avail">No stories found</h2>}
              {mystories.map(story => (
                <Story key={story._id} story={story} onDelete={handleDeleteStory} />
              ))}
            </div>
          )}
        </div>
        <Add />
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

export default MyProfile;
