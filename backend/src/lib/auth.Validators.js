import { body, validationResult, check } from "express-validator";
import { BadRequest } from "../errors/index.js";

export const registerValidator = () => [
  body("name").notEmpty().withMessage("Please enter your name.").trim(),
  body("username").notEmpty().withMessage("Please enter a username.").trim(),
  body("email")
    .notEmpty()
    .withMessage("Please enter your email address.")
    .isEmail()
    .withMessage("Please enter a valid email address."),
  body("password")
    .notEmpty()
    .withMessage("Please enter your password.")
    .isStrongPassword()
    .withMessage("Password must be at least 8 characters long."),
];

export const loginValidator = () => [
  body().custom((value, { req }) => {
    if (!req.body.usernameOrEmail) {
      throw new BadRequest("Please Provide either email or username");
    }
    return true;
  }),
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
