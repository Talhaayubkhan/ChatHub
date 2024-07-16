import { isValidUsername } from "6pp";

// this check everytime and for every user, if username is not correct, throw error
export const userNameValidator = (username) => {
  if (!isValidUsername(username)) {
    return { isValid: false, errorMessage: "Username is not a valid" };
  }

  return { isValid: true, errorMessage: "" };
};
