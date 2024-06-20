import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { Unauthenticated } from "../errors/index.js";

// username validation
// Example regex: 3-30 characters, letters, numbers, underscores
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
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
      // validate: {
      //   validator: (value) => {
      //     return !value || usernameRegex.test(value);
      //   },
      //   message: (props) => `${props.value} is not a valid username`,
      // },
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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// hash the password
UserSchema.pre("save", async function (next) {
  // Check if the password field has been modified, then Avoid Double Hashing
  if (!this.isModified()) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// providedPassword is the password, that input provided by the user during the login attempt
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // console.log("comparePassword", candidatePassword);

  const isMatchPassword = await bcrypt.compare(
    candidatePassword,
    this.password
  );
  if (!isMatchPassword) {
    throw new Unauthenticated("Password Mismatch, please try again");
  }
  return isMatchPassword;
};

export const User = mongoose.model("User", UserSchema);
