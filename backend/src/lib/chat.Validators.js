import { body, check, param, validationResult } from "express-validator";
import { BadRequest } from "../errors/index.js";
import mongoose from "mongoose";

const newGroupChatValidator = () => [
  body("name")
    .notEmpty()
    .withMessage("Chat name is required.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Chat name must be at least 3 characters long.")
    .isLength({ max: 50 })
    .withMessage("Chat name must not exceed 50 characters."),

  body("members")
    .isArray()
    .withMessage("Members should be an array.")
    .notEmpty()
    .withMessage("At least one member is required.")
    .isLength({ min: 2 })
    .withMessage("At least two members are required.")
    .isLength({ max: 40 })
    .withMessage("No more than 40 members allowed.")
    .custom((members) => {
      // Check if all members are valid ObjectIds (if applicable)
      for (const member of members) {
        if (!mongoose.Types.ObjectId.isValid(member)) {
          throw new Error("Invalid member ID.");
        }
      }
      return true;
    }),
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

const multipleFilesUploadGroupValidator = () => [
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
  multipleFilesUploadGroupValidator,
  renameGroupValidator,
  handleGroupValidationErrors,
};
