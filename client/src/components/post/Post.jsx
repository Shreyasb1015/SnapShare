/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FaHeart, FaComment, FaEllipsisV, FaTrash,FaPen } from 'react-icons/fa';
import defaultProfilePic from '../../assets/default.png';
import './Post.css';
import axios from 'axios';
import { addLikeRoute, removeLikeRoute } from '../../utils/routes';
import CommentSection from '../commentsection/CommentSection';
import { useNavigate } from 'react-router-dom';


const Post = ({ post, onDelete,canEdit=false}) => {
  const { _id, user, content, images, createdAt, likes, comments } = post;
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(comments.length);
  const navigate = useNavigate();
  

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (likedPosts.includes(_id)) {
      setLiked(true);
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete(post?._id);
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(addLikeRoute.replace(':postId', _id), {}, { withCredentials: true });
      if (response.data.success) {
        setLiked(true);
        setLikeCount(likeCount + 1);
        updateLikedPostsInStorage(_id, true);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.delete(removeLikeRoute.replace(':postId', _id), { withCredentials: true });
      if (response.data.success) {
        setLiked(false);
        setLikeCount(likeCount - 1);
        updateLikedPostsInStorage(_id, false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateLikedPostsInStorage = (postId, isLiked) => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (isLiked) {
      likedPosts.push(postId);
    } else {
      const index = likedPosts.indexOf(postId);
      if (index !== -1) {
        likedPosts.splice(index, 1);
      }
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  };
  
  const handleToggleComments = () => {
    setShowComments(!showComments);
  };
  const addCommentNumber=()=>{

     setCommentCount(commentCount+1);
  }
  const removeCommentNumber=()=>{

    setCommentCount(commentCount-1);
  }
  const handleUpdate=()=>{
     setShowMenu(false);
     console.log('Navigating to update post:', _id);
    navigate(`/${_id}/update-post`);

  }

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={user.profilePicture ? user.profilePicture : defaultProfilePic}
          alt="User Profile"
          className="post-profile-picture"
        />
        <div className="post-user-info">
          <span className="post-username">{user.username}</span>
          <span className="post-timestamp">{new Date(createdAt).toLocaleString()}</span>
        </div>
        {canEdit &&
        <div className="post-options">
          <FaEllipsisV onClick={toggleMenu} className="post-options-icon" />
          {showMenu && (
            <div className="post-menu">
               <button className="post-menu-item"  onClick={handleUpdate}>
                  <FaPen className="post-menu-icon" /> Edit Post
               </button>
              <button className="post-menu-item" onClick={handleDelete}>
                <FaTrash className="post-menu-icon" /> Delete Post
              </button>
            </div>
          )}
        </div>}
      </div>
      <div className="post-content">
        {images.map((image, index) => (
          <img key={index} src={image} alt="Post" className="post-image" />
        ))}
        <p className="post-text">
          <span className="post-username">{user.username}</span> {content}
        </p>
      </div>
      <div className="post-actions">
        <button className={`post-action-button ${liked ? 'liked' : ''}`} onClick={liked ? handleUnlike : handleLike}>
          <FaHeart className="post-action-icon" /> {likeCount}
        </button>
        <button className="post-action-button" onClick={handleToggleComments}>
          <FaComment className="post-action-icon" /> {commentCount}
        </button>
      </div>
      {showComments && <CommentSection postId={_id} onComment={addCommentNumber} offComment={removeCommentNumber} />}
    </div>
  );
};

export default Post;
