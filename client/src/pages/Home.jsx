/* eslint-disable react-hooks/exhaustive-deps */
import { Navbar, Add, Post } from '../components/index';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchPostsRoute } from '../utils/routes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const user=useSelector(state=>state.user.currentUser);
  const navigate=useNavigate();

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

  useEffect(() => {
    if(!user)
      {
        console.log(user);
        navigate('/login');
      }
    else{
      fetchPosts();
    }
    
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(fetchPostsRoute,{ withCredentials: true });
      console.log("response", response.data.data);
      if (!response.data.success) {
        toast.error(response.data.message, toastOptions);
      }
      setPosts(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch posts', toastOptions);
    }
  };

 

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="posts-container">
          {posts.length === 0 && <h2 className="no-posts">No posts found</h2>}
          {posts.map(post => (
            <Post key={post._id} post={post} canEdit={false} />
          ))}
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
      <style>{`
        .home-container {
          padding-top: 130px;
          overflow-y: auto;
          display: flex;
          justify-content: center;
        }

        .posts-container {
          width: 100%;
          max-width: 1200px;
          padding: 20px;
        }

        .no-posts {
          text-align: center;
          color: #666;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .home-container {
            padding-top: 120px;
            padding-left: 10px;
            padding-right: 10px;
          }

          .posts-container {
            padding: 10px;
          }
        }
      `}</style>
    </>
  );
}

export default Home;
