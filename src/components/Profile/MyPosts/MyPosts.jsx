import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Posts/Post";
import { AddPostForm } from "./AddPostForm";

const MyPosts = React.memo((props) => {
  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likes={p.likesCount} />
  ));

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My Post</h3>
      <AddPostForm onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;
