import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { ResultCodesEnum } from "../api/api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  posts: [
    { id: 1, message: "Hfdgfdgfdgj", likesCount: 12 },
    { id: 2, message: "HJHNGJNGKJGNJG", likesCount: 1 },
    { id: 3, message: "hdfghgfjhfg", likesCount: 101 },
    { id: 4, message: "iouojhkhkjhkhj", likesCount: 50 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD-POST":
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };

    case "SN/PROFILE/SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "SN/PROFILE/SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "SN/PROFILE/DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId);
    dispatch(actions.setUserProfile(data));
  };
export const getUserStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.getUserStatus(userId);
    dispatch(actions.setStatus(data));
  };
export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.updateUserStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status));
    } else {
      alert(data.messages);
    }
  };
export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };
export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.id;
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResultCodesEnum.Success) {
      if (userId != null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }

      alert("Saved, you can close");
    } else {
      dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
      // return Promise.reject(response.data.messages[0]);
    }
  };

export default profileReducer;

export const actions = {
  addPostCreator: (newPostText: string) =>
    ({
      type: "SN/PROFILE/ADD-POST",
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: "SN/PROFILE/SET_USER_PROFILE",
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: "SN/PROFILE/SET_STATUS",
      status,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: "SN/PROFILE/DELETE_POST",
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: "SN/PROFILE/SAVE_PHOTO_SUCCESS",
      photos,
    } as const),
};
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
