import React from "react";
import { NavLink } from "react-router-dom";
// import Friend from "./Friend/Friend";
import s from "./Navbar.module.css";

const setActive = ({ isActive }: any) => (isActive ? s.activeLink : "");
const Navbar = () => {
  // let state = props.store.getState();
  // let friendsElements = props.sidebar.map((f) => <Friend name={f.name} />);
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/" className={setActive}>
          Home
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/profile" className={setActive}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" className={setActive}>
          Dialogs
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" className={setActive}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" className={setActive}>
          Music
        </NavLink>
      </div>
      <div className={`${s.item} ${s.settingsBlock}`}>
        <NavLink to="/settings" className={setActive}>
          Settings
        </NavLink>
      </div>
      <div className={`${s.item} ${s.friendsBlock}`}>
        <NavLink to="/friends" className={setActive}>
          Friends
        </NavLink>
        {/* <div className={s.friends}>{friendsElements}</div> */}
      </div>
      <div className={s.item}>
        <NavLink to="/users" className={setActive}>
          Users
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
