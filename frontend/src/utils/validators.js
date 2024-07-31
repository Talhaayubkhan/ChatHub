import { isValidUsername } from "6pp";

const combinedRegex =
  /^[a-zA-Z0-9_-]{3,16}$|^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/;

// Username validator
const userNameValidator = (input) => {
  if (!combinedRegex.test(input) && !isValidUsername(input)) {
    return {
      isValid: false,
      errorMessage:
        "Username must be between 3-16 characters, containing only letters, numbers, underscores, or hyphens",
    };
  }
  return { isValid: true, errorMessage: "" };
};

// Email validator
const emailValidator = (input) => {
  if (!combinedRegex.test(input)) {
    return {
      isValid: false,
      errorMessage: "Email must be a valid email address",
    };
  }
  return { isValid: true, errorMessage: "" };
};

// Combined validator for username or email
const usernameOrEmailValidator = (input) => {
  if (!combinedRegex.test(input)) {
    return {
      isValid: false,
      errorMessage: "Input must be a valid username or email",
    };
  }
  return { isValid: true, errorMessage: "" };
};

export { userNameValidator, emailValidator, usernameOrEmailValidator };
