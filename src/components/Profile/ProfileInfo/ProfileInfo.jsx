import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWhithHooks from "./ProfileStatusWithHooks";
import userAvatar from "./../../../assets/images/userAvatar.jpg";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  isOwner,
  savePhoto,
  status,
  updateUserStatus,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      // setEditMode(false);
    });
  };
  const onSubmitClose = () => {
    setEditMode(false);
  };

  return (
    <div>
      <div className={s.user}>
        <div className={s.userAvatar}>
          <img
            src={profile.photos.large || userAvatar}
            className={s.mainPhoto}
            alt="avatar"
          />
          {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        </div>
        <div className={s.userData}>
          {editMode ? (
            <ProfileDataForm
              initialValues={profile}
              profile={profile}
              status={status}
              updateUserStatus={updateUserStatus}
              onSubmit={onSubmit}
              onSubmitClose={onSubmitClose}
            />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditMode={() => {
                setEditMode(true);
              }}
              status={status}
              updateUserStatus={updateUserStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileData = ({
  profile,
  isOwner,
  goToEditMode,
  status,
  updateUserStatus,
}) => {
  return (
    <div>
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <ProfileStatusWhithHooks
        status={status}
        updateUserStatus={updateUserStatus}
        isOwner={isOwner}
      />
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>Edit</button>
        </div>
      )}
    </div>
  );
};

export const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contacts}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
