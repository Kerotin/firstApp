import {
  instance,
  APIResponseType,
  ResultCodeForCaptchaEnum,
  ResultCodesEnum,
} from "./api";

export type UserAuthResponseDataType = {
  id: number;
  email: string;
  login: string;
};
export type LoginResponseDataType = {
  userId: number;
};

export const authAPI = {
  userAuth() {
    return instance
      .get<APIResponseType<UserAuthResponseDataType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<
        APIResponseType<
          LoginResponseDataType,
          ResultCodesEnum | ResultCodeForCaptchaEnum
        >
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
