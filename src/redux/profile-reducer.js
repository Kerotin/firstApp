import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  posts: [
    { id: 1, message: "Hfdgfdgfdgj", likesCount: 12 },
    { id: 2, message: "HJHNGJNGKJGNJG", likesCount: 1 },
    { id: 3, message: "hdfghgfjhfg", likesCount: 101 },
    { id: 4, message: "iouojhkhkjhkhj", likesCount: 50 },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };

    default:
      return state;
  }
};

export const addPostCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});
export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersAPI.getUserProfile(userId);
  dispatch(setUserProfile(response.data));
};
export const getUserStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getUserStatus(userId);
  dispatch(setStatus(response.data));
};
export const updateUserStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateUserStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
