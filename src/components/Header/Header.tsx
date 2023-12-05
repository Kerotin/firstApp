import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import React from "react";
import { Avatar, Button, Col, Layout, Menu, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUserLogin,
  selectIsAuth,
} from "../../redux/auth-selectors";
import { logout } from "../../redux/auth-reducer";
import { AppDispatch } from "../../redux/redux-store";
export type MapPropsType = {};

export const Header: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const dispatch: AppDispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  const { Header } = Layout;
  return (
    <Header className="header">
      <Row>
        <Col span={2}>
          <div className={s.headerImg}>
            <img
              src="https://upload.wikimedia.org/wikipedia/ru/c/cf/%D0%9B%D0%BE%D0%B1%D0%BE%D1%81_%D0%A3%D0%9F%D0%9D%D0%A4%D0%9C_%28%D0%BB%D0%BE%D0%B3%D0%BE%29.png"
              alt="logo"
            />
          </div>
        </Col>

        <Col span={13}>
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">
              <NavLink to="/users">Users</NavLink>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={9}>
          {isAuth ? (
            <div className={s.loginBlock}>
              <Avatar
                style={{ backgroundColor: "#87d068", marginRight: "10px" }}
                icon={<UserOutlined />}
              />
              {login} <Button onClick={logoutCallback}>Logut</Button>
            </div>
          ) : (
            <div className={s.loginBlock}>
              <NavLink to={"/login"}>Login</NavLink>
            </div>
          )}
        </Col>
      </Row>
    </Header>
  );
};
