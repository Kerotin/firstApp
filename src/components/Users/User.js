import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/userAvatar.jpg";
import { NavLink } from "react-router-dom";

let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div className={s.usersContainer}>
      <div className={s.leftContainer}>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt="avatar"
              className={s.userAvatar}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className={s.rightContainer}>
        <div className={s.contentLeft}>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </div>
        <div className={s.contentRight}>
          {/* <div>{u.location.country}</div> */}
          {/* <div>{u.location.city}</div> */}
        </div>
      </div>
    </div>
  );
};

export default User;
