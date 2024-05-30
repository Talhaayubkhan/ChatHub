import mongoose, { Schema } from "mongoose";
import validator from "validator";

// username validation
// Example regex: 3-30 characters, letters, numbers, underscores
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    //   TODO: IF WE ADD EMAIL LATER!!!
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => {
          return !value || validator.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => {
          return !value || usernameRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid username`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
