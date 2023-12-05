import React, { Component, Suspense } from "react";
import "./App.css";
import "antd/dist/reset.css";
import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { Header } from "./components/Header/Header";
import Home from "./components/Home/Home";
import DialogItem from "./components/Dialogs/DialogItem/DialogItem";
import Friends from "./components/Friends/Friends";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { UsersPage } from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { LoginPage } from "./components/Login/Login";
import { ChatPage } from "./pages/Chat/ChatPage";
import { compose } from "redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import { AppStateType } from "./redux/redux-store";
import { withRouter } from "./components/Profile/ProfileContainer";
import { NavLink } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

// const DialogsContainer = React.lazy(
//   () => import("./components/Dialogs/DialogsContainer")
// );
// const ProfileContainer = React.lazy(
//   () => import("./components/Profile/ProfileContainer")
// );
// const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));

// function withRouter(Component: any) {
//   function ComponentWithRouterProp(props: any) {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let params = useParams();
//     return <Component {...props} router={{ location, navigate, params }} />;
//   }
//   return ComponentWithRouterProp;
// }

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <Layout>
        <Header />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{
              padding: "24px 0",
            }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                // defaultSelectedKeys={["1"]}
                // defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1">
                    <NavLink to="/profile">Profile</NavLink>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <NavLink to="/dialogs">Dialogs</NavLink>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="Developers"
                >
                  <Menu.Item key="3">
                    <NavLink to="/users">Users</NavLink>
                  </Menu.Item>
                  <Menu.Item key="4">option2</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="Chat"
                >
                  <Menu.Item key="5">
                    <NavLink to="/chat">Chat</NavLink>
                  </Menu.Item>
                  <Menu.Item key="6">option2</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/profile"
                  element={
                    <Suspense fallback={<Preloader />}>
                      <ProfileContainer />
                    </Suspense>
                  }
                >
                  <Route path=":userId" element={<ProfileContainer />} />
                </Route>
                {/* <Route path="/dialogs" element={<Dialogs />}/> */}
                <Route
                  path="/dialogs"
                  element={
                    <Suspense fallback={<Preloader />}>
                      <DialogsContainer />
                    </Suspense>
                  }
                >
                  <Route path=":id" element={<DialogItem />} />
                </Route>
                <Route path="/news" element={<News />} />
                <Route path="/music" element={<Music />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/friends" element={<Friends />} />
                <Route
                  path="/users"
                  element={<UsersPage pageTitle={"Самураи"} />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/chat"
                  element={
                    <Suspense fallback={<Preloader />}>
                      <ChatPage />
                    </Suspense>
                  }
                />
                <Route path="*" element={<Navigate to="/profile" />} />
              </Routes>
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design 2023 by Alex
        </Footer>
      </Layout>

      // <div className="app-wrapper">
      //   <HeaderContainer />
      //   <Navbar />
      //   <div className="app-wrapper-content">
      //     <Routes>
      //       <Route path="/" element={<Home />} />
      //       <Route
      //         path="/profile"
      //         element={
      //           <Suspense fallback={<Preloader />}>
      //             <ProfileContainer />
      //           </Suspense>
      //         }
      //       >
      //         <Route path=":userId" element={<ProfileContainer />} />
      //       </Route>
      //       {/* <Route path="/dialogs" element={<Dialogs />}/> */}
      //       <Route
      //         path="/dialogs"
      //         element={
      //           <Suspense fallback={<Preloader />}>
      //             <DialogsContainer />
      //           </Suspense>
      //         }
      //       >
      //         <Route path=":id" element={<DialogItem />} />
      //       </Route>
      //       <Route path="/news" element={<News />} />
      //       <Route path="/music" element={<Music />} />
      //       <Route path="/settings" element={<Settings />} />
      //       <Route path="/friends" element={<Friends />} />
      //       <Route
      //         path="/users"
      //         element={<UsersPage pageTitle={"Самураи"} />}
      //       />
      //       <Route path="/login" element={<LoginPage />} />
      //       <Route path="*" element={<Navigate to="/profile" />} />
      //     </Routes>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
