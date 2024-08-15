const usernameValidator = (input) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

  if (!input || !usernameRegex.test(input)) {
    return {
      isValid: false,
      errorMessage:
        "Invalid username. Must be 3-16 characters, using letters, numbers, underscores, or hyphens.",
    };
  }
  return { isValid: true, errorMessage: "" };
};

//
const emailValidator = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!input || !emailRegex.test(input)) {
    return {
      isValid: false,
      errorMessage: "Invalid email address.",
    };
  }
  return { isValid: true, errorMessage: "" };
};

const passwordValidator = (input) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;

  if (!input || !passwordRegex.test(input)) {
    return {
      isValid: false,
      errorMessage:
        "Invalid password. Must be 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    };
  }
  return { isValid: true, errorMessage: "" };
};

const usernameOrEmailValidator = (input) => {
  const isUsernameValid = usernameValidator(input).isValid;
  const isEmailValid = emailValidator(input).isValid;
  if (!input || (!isUsernameValid && !isEmailValid)) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid username or email.",
    };
  }
  return { isValid: true, errorMessage: "" };
};

export {
  usernameValidator,
  emailValidator,
  passwordValidator,
  usernameOrEmailValidator,
};
