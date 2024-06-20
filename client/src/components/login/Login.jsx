import React,{useState} from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import loginpic from '../../assets/loginpic.png';
import './Login.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/userslice';
import axios from 'axios';
import { loginRoute } from '../../utils/routes';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [loginData,setLoginData]=useState({
    email:'',
    password:'',
  })

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


  const handleChange=(e)=>{
     setLoginData({...loginData,[e.target.name]:e.target.value})

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(validateDetails())
      {
        const{email,password}=loginData;
        try {

          const response= await axios.post(loginRoute,{email,password},{withCredentials:true});
          console.log(response);
          if(!response.data.success)
            {
              toast.error('Login Failed',toastOptions);
            }
          dispatch(login(response.data.data.loggedInUser));
          console.log(response.data.data.loggedInUser);
          navigate('/welcome');
          
          
        } catch (error) {
          
          toast.error(error.message,toastOptions );

        }
      }
  }

  const validateDetails=()=>{

    if(loginData.email==='' || loginData.password===''){
      toast.error('All fields are required',toastOptions)
      return false
    }
    if(loginData.password.length <8)
      {
         toast.error('Password must be atleast 8 characters long',toastOptions);
         return false;
      }

    return true;
  }
  return (
    <>
        <section className="login-wrapper">
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-header">
                <motion.h2  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}>
                             Login
                </motion.h2>

          </div>
          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
              <input type="email" id="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input type="password" id="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange}/>
            </div>
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
            <span className='redirectRegister'>Don&apos;t have an account? <a href="/register"> Register</a></span>
          </div>
        </form>
        <div className="image-container">
          <img src={loginpic} alt="Login" className="login-image" />
        </div>
      </div>
    </section>
    <ToastContainer/>
    <style>{`
        .Toastify__toast {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      `}</style>

    </>
    
  );
};

export default Login;
