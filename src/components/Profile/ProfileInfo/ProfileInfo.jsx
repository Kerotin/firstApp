import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
// import ProfileStatus from "./ProfileStatus";
import ProfileStatusWhithHooks from "./ProfileStatusWithHooks";

function ProfileInfo({ profile, status, updateUserStatus }) {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      {/* <div className={s.header_image}>
        <img
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          alt="head"
        />
      </div> */}
      <div className={s.user}>
        <div className={s.userAvatar}>
          <img
            src={profile.photos.large}
            // src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
            alt="avatar"
          />
        </div>
        <div className={s.userData}>
          <div className="user-name">Имя: {profile.fullName}</div>
          <ProfileStatusWhithHooks
            status={status}
            updateUserStatus={updateUserStatus}
          />
          <div className="contacts">
            <div>
              <div>Контакты:</div>
              <div>
                <a href="#ss">{profile.contacts.facebook}</a>
              </div>
              <div>
                <a href="#sss">{profile.contacts.instagram}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileInfo;
