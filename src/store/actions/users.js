import { ADD_USER } from "./actionTypes";

export const addUser = (email, password, ip) => {
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
