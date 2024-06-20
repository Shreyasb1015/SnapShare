import {createSlice} from '@reduxjs/toolkit';

const initialState={
    likes:[]
}

const likeSlice=createSlice({
    name:'like',
    initialState,
    reducers:{
        addComment(state,action){
            state.likes.push(action.payload);
        },
        deleteComment(state,action){
            state.likes=state.likes.filter(like=>like.id!==action.payload)
        },
    },
})

export default likeSlice.reducer;
export const {addComment,deleteComment}=likeSlice.actions;