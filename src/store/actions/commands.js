import { ADD_COMMAND, REMOVE_COMMAND } from "./actionTypes";

export const addCommand = (name, password, ip) => {
  // alert(`${email}, ${password}, ${ip}`);
  return {
    type: ADD_USER,
    user: {
      email: email,
      password: password,
      ip: ip
    }
  }
};
