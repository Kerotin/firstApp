import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hfdgfdgfdgj", likesCount: 12 },
        { id: 2, message: "HJHNGJNGKJGNJG", likesCount: 1 },
        { id: 3, message: "hdfghgfjhfg", likesCount: 101 },
        { id: 4, message: "iouojhkhkjhkhj", likesCount: 50 },
      ],
      newPostText: "fsdfsdf",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrey" },
        { id: 3, name: "Sasha" },
        { id: 4, name: "Sveta" },
        { id: 5, name: "Sergey" },
        { id: 6, name: "Valera" },
        { id: 7, name: "Ira" },
      ],
      messages: [
        { id: 1, message: "message-text1" },
        { id: 2, message: "message-text2" },
        { id: 3, message: "message-text3" },
        { id: 4, message: "message-text4" },
        { id: 5, message: "message-text5" },
        { id: 6, message: "message-text6" },
        { id: 7, message: "message-text7" },
      ],
      newMessageText: "",
    },
    sidebar: [{ name: "Andrew" }, { name: "Sasha" }, { name: "Sveta" }],
  },
  _callSubscriber() {
    console.log("gdfgdf");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
};

export default store;
