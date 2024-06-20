/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { allStoriesRoute } from '../../utils/routes';
import { toast, ToastContainer } from 'react-toastify';
import Story from '../story/Story';
import './AllStories.css';
import Add from '../add/Add';

const AllStories = () => {
  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllStories();
  }, []);

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

  const fetchAllStories = async () => {
    try {
      const response = await axios.get(allStoriesRoute, { withCredentials: true });
      if (!response.data.success) {
        toast.error(response.data.message, toastOptions);
      } else {
        setAllStories(response.data.data.stories);
        setLoading(false);
      }
    } catch (error) {
      toast.error('Error in fetching stories', toastOptions);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <h1>Loading...</h1>
      ) : allStories.length === 0 ? (
        <h1 className="no-stories">No stories to show</h1>
      ) : (
        <>
          <h1 className="stories-title">Top Trending Stories</h1>
          <div className="all-stories-wrapper">
            <div className="all-stories-container">
              {allStories.map(story => (
                <Story key={story._id} story={story} />
              ))}
            </div>
            <Add />
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default AllStories;
