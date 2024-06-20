import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userslice';
import postReducer from './slices/postslice';
import commentReducer from './slices/commentslice';
import likeReducer from './slices/likeslice';
import storyReducer from './slices/storyslice';



const store=configureStore({

    reducer:{
        user:userReducer,
        post:postReducer,
        comment:commentReducer,
        like:likeReducer,
        story:storyReducer
    }
})

export default store;