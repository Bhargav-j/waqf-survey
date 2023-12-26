const initialUserState = {
  userlogin: false,
  userUID: null,
  userName: "User!",
};

export const loginReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "UserLoginPage":
      return {
        ...state,
        userlogin: true,
      };
    case "UserLoginPageClose":
      return {
        ...state,
        userlogin: false,
      };
    case "login":
      return {
        ...state,
        userlogin: false,
        userUID: action.userUID,
        userName: action.userName,
      };
    case "logout":
      return {
        ...state,
        userUID: null,
        userName: "User!",
      };
    default:
      return state;
  }
};

const initialPropertiesState = {
  addedProps: [],
};

export const UpdatePropsReducer = (state = initialPropertiesState, action) => {
  switch (action.type) {
    case "update":
        // console.log("Properties Updated")
      return {
        ...state,
        addedProps: action.payload,
      };
    default:
      return state;
  }
};
