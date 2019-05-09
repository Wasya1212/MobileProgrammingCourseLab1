import { ADD_USER } from "../actions/actionTypes";

const initialState = {
  user: {
    email: '',
    password: '',
    ip: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
        return {
          ...state,
          user: {
            email: action.user.email,
            password: action.user.password,
            ip: action.user.ip
          }
        }
      break;
    default:
      return state;
  }
};

export default reducer;
