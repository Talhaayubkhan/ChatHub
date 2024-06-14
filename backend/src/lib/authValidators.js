import { body, validationResult, check } from "express-validator";
import { BadRequest } from "../errors/index.js";

export const registerValidator = () => [
  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.username) {
      throw new BadRequest("Please Provide either email or username");
    }
    return true;
  }),

  body("name").notEmpty().withMessage("Please enter your username.").trim(),
  body("username")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Please enter your username."),
  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Please enter your email.")
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Please enter your password.")
    .isStrongPassword()
    .withMessage("Password must be at least 8 characters..")
    .trim(),
  // check("avatar").notEmpty().withMessage("Please Provide Avatar Also..."),
];

export const loginValidator = () => [
  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.username) {
      throw new BadRequest("Please Provide either email or username");
    }
    return true;
  }),
  body("username")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please enter your username."),

  body("email")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please enter your email address"),
  body("password").notEmpty().withMessage("Please enter your password.").trim(),
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
