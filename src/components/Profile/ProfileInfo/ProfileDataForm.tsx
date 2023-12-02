import { InjectedFormProps, reduxForm } from "redux-form";
import {
  Input,
  Textarea,
  createField,
} from "../../common/FormsControls/FormsControls";
import ProfileStatusWhithHooks from "./ProfileStatusWithHooks";
import s from "./ProfileInfo.module.css";
import { ProfileType } from "../../../types/types";
import React from "react";
import { compose } from "redux";

type PropsType = {
  profile: ProfileType;
  status: string;
  updateUserStatus: (status: string) => void;
  onSubmitClose: () => void;
  isOwner: boolean;
};

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({
  handleSubmit,
  status,
  updateUserStatus,
  profile,
  error,
  onSubmitClose,
  isOwner,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <b>Full name</b>: {createField("Full name", "fullName", Input, [])}
      </div>
      <ProfileStatusWhithHooks
        status={status}
        updateUserStatus={updateUserStatus}
        isOwner={isOwner}
      />
      <div>
        <b>Looking for a job</b>:{" "}
        {createField("", "lookingForAJob", Input, [], {
          type: "checkbox",
        })}
      </div>
      <div>
        <b>My professional skills</b>:
        {createField(
          "My professional skills",
          "lookingForAJobDescription",
          Textarea,
          []
        )}
      </div>
      <div>
        <b>About me</b>: {createField("About me", "aboutMe", Textarea, [])}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contacts}>
              <b>
                {key}: {createField(key, "contacts." + key, Input, [])}
              </b>
            </div>
          );
        })}
      </div>
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Save</button>
        <button onClick={onSubmitClose}>Close</button>
      </div>
    </form>
  );
};

// const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
//   form: "edit-profile",
// })(ProfileDataForm);
const ProfileDataFormReduxForm = compose<React.ComponentType>(
  reduxForm<ProfileType, PropsType>({
    form: "edit-profile",
  })
)(ProfileDataForm);

export default ProfileDataFormReduxForm;
