import { NavLink } from "react-router-dom";
import s from "./Friend.module.css";
const Friend = (props) => {
  return (
    <NavLink>
      <div className={s.friend}>
        <img
          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
          alt="avatar"
          className="avatar"
        />
        {props.name}
      </div>
    </NavLink>
  );
};
export default Friend;
