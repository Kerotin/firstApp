import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import s from "../common/FormsControls/FormsControls.module.css";
import { compose } from "redux";
import { LoginFormValuesType } from "./Login";

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  // const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", Input, [required, maxLengthCreator(30)])}
      {createField(
        "Password",
        "password",
        Input,
        [required, maxLengthCreator(20)],
        { type: "password" }
      )}
      {createField(
        null,
        "rememberMe",
        Input,
        [],
        { type: "checkbox" },
        "remember me"
      )}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl &&
        createField("Symbols from image", "captcha", Input, [required])}
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};
export const LoginReduxForm = compose<React.ElementType>(
  reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: "login",
  })
)(LoginForm);
