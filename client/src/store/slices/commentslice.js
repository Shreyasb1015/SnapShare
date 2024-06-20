import {createSlice} from '@reduxjs/toolkit';

const initialState={

    comments:[]
}

const commentSlice=createSlice({
    name:'comment',
    initialState,
    reducers:{
        addComment(state,action)
        {
            state.comments.push(action.payload)
        },
        deleteComment(state,action)
        {
            state.comments=state.comments.filter(comment=>comment.id!==action.payload)
        },
    },
})

export default commentSlice.reducer;
export const {addComment,deleteComment}=commentSlice.actions;