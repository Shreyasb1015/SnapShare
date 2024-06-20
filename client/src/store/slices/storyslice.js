import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stories: []
}

const storySlice = createSlice({
    name:'story',
    initialState,
    reducers:{

        addStory(state,action){
            state.stories.push(action.payload)
        },
        deleteStory(state,action){
            state.stories=state.stories.filter(story=>story.id!==action.payload)
        }
    }
})

export default storySlice.reducer;
export const {addStory,deleteStory}=storySlice.actions;