import { isValidUsername, isValidEmail } from "6pp";

// Simplified username validator
export const usernameValidator = (input) => {
  const regex = /^[a-zA-Z0-9_-]{3,16}$/;
  if (!regex.test(input) && !isValidUsername(input)) {
    return {
      isValid: false,
      errorMessage:
        "Username must be between 3-16 characters, and may include letters, numbers, underscores, or hyphens.",
    };
  }
  return { isValid: true, errorMessage: "" };
};

// Simplified email validator
export const emailValidator = (input) => {
  if (!isValidEmail(input)) {
    return {
      isValid: false,
      errorMessage: "Email must be a valid email address.",
    };
  }
  return { isValid: true, errorMessage: "" };
};

// Simplified combined validator for username or email
export const usernameOrEmailValidator = (input) => {
  if (!isValidUsername(input)) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid username or email address.",
    };
  }
  return { isValid: true, errorMessage: "" };
};
