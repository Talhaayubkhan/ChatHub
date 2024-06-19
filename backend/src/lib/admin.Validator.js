import { body, validationResult } from "express-validator";
import { BadRequest } from "../errors/index.js";

const adminLoginVerifyValidator = () => [
  body("secretKey").notEmpty().withMessage("Enter your secret key"),
];

const handleAdminValidationError = (req, res, next) => {
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
    next(new BadRequest(error.message));
  }
};

export { adminLoginVerifyValidator, handleAdminValidationError };
