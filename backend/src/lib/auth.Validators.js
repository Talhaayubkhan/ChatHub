import { body, validationResult, check } from "express-validator";
import { BadRequest } from "../errors/index.js";

export const registerValidator = () => [
  body("name")
    .notEmpty()
    .withMessage("Please enter your name.")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters."),
  body("username")
    .notEmpty()
    .withMessage("Please enter a username.")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters."),
  body("email")
    .notEmpty()
    .withMessage("Please enter your email address.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("Please enter your password.")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and contain a mix of characters."
    ),
];

export const loginValidator = () => [
  body("usernameOrEmail")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username or email must be between 3 and 30 characters."),
  body("password")
    .notEmpty()
    .withMessage("Please enter your password.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

export const sendFriendRequestValidation = () => [
  body("userId").notEmpty().withMessage("Please enter your User ID"),
];
export const acceptFriendRequestValidation = () => [
  body("requestId").notEmpty().withMessage("Please enter your Request ID"),
  body("accept")
    .notEmpty()
    .withMessage("Please Add To Accept")
    .isBoolean()
    .withMessage("Accept Must Be Boolean"),
];

export const handleValidationErrors = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        new BadRequest(
          errors
            .array()
            .map((err) => err.msg)
            .join(", ")
        )
      );
    }
    next();
  } catch (error) {
    next(new error.message());
  }
};

// export { registerValidator, loginValidator, handleValidationErrors };
