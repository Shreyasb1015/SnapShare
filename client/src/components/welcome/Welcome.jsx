/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  
  const navigate=useNavigate();

  useEffect(()=>{
     
      setTimeout(()=>{

         navigate('/')
      },4000)
  },[])

  
  return (
    <div className="animated-page">
      <motion.div
        className="animation-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="icon-and-text">
          <motion.div
            className="icon"
            animate={{
              rotate: [0, 20, -20, 20, -20, 0],
              scale: [1, 1.2, 1], 
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <FaCamera size={100} className='camera' /> 
          </motion.div>
          <motion.h1
            className="title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            SnapShare
          </motion.h1>
        </div>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Share your memories...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Welcome;
