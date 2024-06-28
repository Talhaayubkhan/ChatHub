import { body, check, param, validationResult } from "express-validator";
import { BadRequest } from "../errors/index.js";

const newGroupChatValidator = () => [
  body("name").notEmpty().withMessage("Please enter your Name").trim(),
  body("members")
    .notEmpty()
    .withMessage("Please enter Members")
    .isArray({ min: 2, max: 40 })
    .withMessage("Members must be between 2-40"),
];

const addGroupMemberValidator = () => [
  body("chatId").notEmpty().withMessage("Please enter your chat ID").trim(),
  body("members")
    .notEmpty()
    .withMessage("Please enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be between 1-97"),
];

const removeGroupValidator = () => [
  body("chatId").notEmpty().withMessage("Please enter your chat ID").trim(),
  body("userId").notEmpty().withMessage("Please enter your user ID ").trim(),
];

const chatIdGroupValidator = () => [
  param("chatId").notEmpty().withMessage("Please enter your Correct chat ID"),
];

const fileAttachmentGroupValidator = () => [
  body("chatId").notEmpty().withMessage("Please enter your chat ID").trim(),
  // check("files")
  //   .notEmpty()
  //   .withMessage("Please enter your attachments")
  //   .isArray({ min: 1, max: 10 })
  //   .withMessage("Attachments Must be between 1-10"),
];

const renameGroupValidator = () => [
  param("chatId").notEmpty().withMessage("Please enter your Correct chat ID"),
  body("name").notEmpty().withMessage("Please enter your Name").trim(),
];

const handleGroupValidationErrors = (req, res, next) => {
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

export {
  newGroupChatValidator,
  addGroupMemberValidator,
  removeGroupValidator,
  chatIdGroupValidator,
  fileAttachmentGroupValidator,
  renameGroupValidator,
  handleGroupValidationErrors,
};
