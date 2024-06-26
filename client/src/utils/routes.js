const server= "https://snapshare-backend-miyb.onrender.com";

export const registerRoute=`${server}/api/v1/users/register`
export const loginRoute=`${server}/api/v1/users/login`
export const logOutRoute=`${server}/api/v1/users/logout`
export const myPostRoute=`${server}/api/v1/posts/myposts`
export const updateProfileRoute=`${server}/api/v1/users/updateProfile`
export const addPostRoute=`${server}/api/v1/posts/create-post`
export const addStoryRoute=`${server}/api/v1/stories/addstory`
export const myStoriesRoute=`${server}/api/v1/stories/mystories`
export const allStoriesRoute=`${server}/api/v1/stories/allstories`
export const deletePostRoute=`${server}/api/v1/posts/:postId/delete`
export const deleteStoryRoute=`${server}/api/v1/stories/:storyId/delete`
export const addLikeRoute=`${server}/api/v1/likes/:postId/addLike`
export const removeLikeRoute=`${server}/api/v1/likes/:postId/removeLike`
export const changePasswordRoute=`${server}/api/v1/users/changePassword`
export const fetchCommentsRoute=`${server}/api/v1/comments/:postId/getComments`
export const addCommentRoute=`${server}/api/v1/comments/:postId/addComment`
export const deleteCommentRoute=`${server}/api/v1/comments/:commentId/deleteComment`
export const updatePostContentRoute=`${server}/api/v1/posts/:postId/update`
export const updatePostPhotosRoute=`${server}/api/v1/posts/:postId/update-photos`
export const fetchPostsRoute=`${server}/api/v1/posts/getAllposts`