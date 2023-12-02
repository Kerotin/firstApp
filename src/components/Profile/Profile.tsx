import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../../types/types";

type PropsType = {
  profile: ProfileType | null;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  status: string;
  updateUserStatus: (status: string) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};
export default Profile;
