import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import React from "react";

export type MapPropsType = {
  isAuth: boolean;
  login: string | null;
};
export type DispatchPropsType = {
  logout: () => void;
};

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={s.header}>
      <NavLink to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/ru/c/cf/%D0%9B%D0%BE%D0%B1%D0%BE%D1%81_%D0%A3%D0%9F%D0%9D%D0%A4%D0%9C_%28%D0%BB%D0%BE%D0%B3%D0%BE%29.png"
          alt="logo"
        />
      </NavLink>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Logut</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
