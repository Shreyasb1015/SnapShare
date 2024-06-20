import React, { useState } from 'react';
import './Add.css';
import add from '../../assets/add.jpg';
import camera from '../../assets/cameraicon.jpeg';
import story from '../../assets/story.png';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAddPost = () => {
    setIsAddPostOpen(true);
    setIsMenuOpen(false);
    navigate('/add-post');
  };

  const openAddStory = () => {
    setIsAddStoryOpen(true);
    setIsMenuOpen(false);
    navigate('/add-story');
  };

  return (
    <div className="add-container">
      <div className={`add-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="add-button" onClick={toggleMenu}>
          <img src={add} alt="icon" className="icon-size" />
        </button>
        <div className={`popup ${isMenuOpen ? 'open' : ''}`}>
          <button className="add-post" onClick={openAddPost}>
            <img src={camera} alt="camera" className="icon-size" />
          </button>
          <button className="add-story" onClick={openAddStory}>
            <img src={story} alt="story" className="icon-size" />
          </button>
        </div>
      </div>
      {isAddPostOpen && <div className="add-post-popup">Add Post Popup</div>}
      {isAddStoryOpen && <div className="add-story-popup">Add Story Popup</div>}
    </div>
  );
};

export default Add;
