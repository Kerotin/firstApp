import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profile-reducer";
import {
  NavigateFunction,
  RouteProps,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateUserStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};
type withRouterProps = {
  match: {
    location: Location;
    navigate: NavigateFunction;
    params: Record<"userId", string>;
  };
};
type PropsType = MapPropsType &
  DispatchPropsType &
  RouteProps &
  withRouterProps;
class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) userId = this.props.authorizedUserId;
    if (!userId) {
      console.error(
        "ID should exist in IRI params or in state ('authorizedUserId')"
      );
    } else {
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
    }
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    // let userId = this.props.match.params.userId;
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  // componentDidUpdate(prevProps:PropsType) {
  //   let userId = this.props.match.params.userId;
  //   if (prevProps.match.params.userId !== userId) {
  //     let userId = this.props.authorizedUserId;
  //     this.props.getUserProfile(userId);
  //     this.props.getUserStatus(userId);
  //   }
  // }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export function withRouter<WCP extends object>(
  Component: React.ComponentType<WCP>
) {
  function ComponentWithRouterProp(props: WCP) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} match={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
