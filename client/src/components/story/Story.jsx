/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './Story.css';

const Story = ({ story, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(story._id);
  };

  return (
    <div>
      <div className="story-container" onClick={openModal}>
        <div className="story-image-container">
          <img src={story.image} alt="Story" className="story-image" />
          <FaTrash className="delete-icon" onClick={handleDelete} />
        </div>
        <div className="story-content">
          <h3>{story.user.username}</h3>
          <p>{story.content}</p>
        </div>
      </div>

      {isOpen && (
        <div className="story-modal">
          <div className="story-modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img src={story.image} alt="Story" className="modal-story-image" />
            <p className="modal-story-username">{story.user.username}</p>
            <p className="modal-story-content">{story.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Story;
