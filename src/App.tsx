import React, { Component, Suspense } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Home from "./components/Home/Home";
import DialogItem from "./components/Dialogs/DialogItem/DialogItem";
import Friends from "./components/Friends/Friends";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { UsersPage } from "./components/Users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { LoginPage } from "./components/Login/Login";
import { compose } from "redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import { AppStateType } from "./redux/redux-store";
import { withRouter } from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);

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
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
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
            <Route path="*" element={<Navigate to="/profile" />} />
          </Routes>
        </div>
      </div>
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