import React, { useState } from 'react';
import { FaHome, FaUser, FaSignOutAlt, FaBars, FaTimes,FaBolt,FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/userslice';
import { useDispatch } from 'react-redux';
import { logOutRoute } from '../../utils/routes';
import axios from 'axios';
import './Navbar.css';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastOptions= {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    }


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut=async()=>{
       
    try {
      const response=await axios.get(logOutRoute,{withCredentials:true});
      if(!response.data.success)
        {
          toast.error(response.data.message,toastOptions);
        }
      localStorage.removeItem('likedPosts');
      dispatch(logout());
      navigate('/login');

    } catch (error) {
      
      console.log(error.message)
      toast.error(error.message,toastOptions);
    }
    
      
  }

  return (
    <nav className={`navbarContainer ${isOpen ? 'menuOpen' : ''}`}>
      <div className="navbarLogo">
        <img src={logo} alt="logo" width={120} />
      </div>
      <div className="navbarSearch">
        <input type="text" placeholder="What's happening" />
        <FaSearch className="searchIcon" />
      </div>
      <div className="navbarHamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`navbarLinks ${isOpen ? 'showMenu' : ''}`}>
        <Link to="/" className="navLink">
          <button>
            <FaHome className='navbtns' />
          </button>
        </Link>
        <Link to="/all-stories" className="navLink">
          <button>
             <FaBolt className='navbtns'/>
          </button>
        </Link>
        <Link to="/my-profile" className="navLink">
          <button>
            <FaUser className='navbtns' />
          </button>
        </Link>
        <button onClick={handleLogOut}>
          <FaSignOutAlt className='navbtns' />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
