import s from "./Post.module.css";
function Post(props) {
  return (
    <div className={s.item}>
      <img
        src="https://cdn.dribbble.com/users/388052/screenshots/15969217/media/541d0e931dc044f08db966abeb598aec.jpg?compress=1&resize=400x300&vertical=top"
        alt="avatar"
      />
      {props.message}
      <div>
        <span>like {props.likes}</span>
      </div>
    </div>
  );
}
export default Post;
