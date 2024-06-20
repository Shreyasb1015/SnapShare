/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { addCommentRoute, fetchCommentsRoute, deleteCommentRoute } from '../../utils/routes';
import './CommentSection.css';
import defaultlogo from '../../assets/default.png'

const CommentSection = ({ postId, onComment, offComment }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(fetchCommentsRoute.replace(':postId', postId), { withCredentials: true });
      if (response.data.success) {
        setComments(response.data.data || []);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await axios.post(addCommentRoute.replace(':postId', postId), { content: newComment }, { withCredentials: true });
      if (response.data.success) {
        setComments([...comments, response.data.data]);
        setNewComment('');
        onComment();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(deleteCommentRoute.replace(':commentId', commentId), { withCredentials: true });
      if (response.data.success) {
        setComments(comments.filter(comment => comment._id !== commentId));
        offComment();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  return (
    <div className="comment-section">
      <div className="comments">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <img src={comment.user.profilePicture!=='' ? comment.user.profilePicture:defaultlogo} alt="profilepic" width={30} style={{ borderRadius: '50%' }} />
              <div className="comment-content">
                <span className="comment-username">{comment.user.username}</span>
                <span className="comment-text">{comment.content}</span>
              </div>
              <div className="comment-meta">
                <span className="comment-time">{new Date(comment.createdAt).toLocaleString()}</span>
                <FaTrash className="delete-comment-icon" onClick={() => handleDeleteComment(comment._id)} />
              </div>
            </div>
          ))
        ) : (
          <div>No comments yet.</div>
        )}
      </div>
      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
