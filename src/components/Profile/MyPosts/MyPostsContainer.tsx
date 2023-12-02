import { connect } from "react-redux";
import { actions } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../types/types";

type MapPropsType = {
  posts: Array<PostType>;
};
type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    // newPostText: state.profilePage.newPostText,
  };
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: (newPostText) => {
//       dispatch(actions.addPostCreator(newPostText));
//     },
//   };
// };

const MyPostsContainer = connect<
  MapPropsType,
  DispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, { addPost: actions.addPostCreator })(MyPosts);

export default MyPostsContainer;
