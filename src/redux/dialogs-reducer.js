const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let text = action.newMessageText;
      let newMessage = {
        id: 9,
        message: text,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };

    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageText) => ({
  type: SEND_MESSAGE,
  newMessageText,
});

export default dialogsReducer;
