import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: ["Must provide Name", String],
      required: true,
      trim: true,
      unique: true,
    },
    //   TODO: IF WE ADD EMAIL LATER!!!
    username: {
      type: ["Must provide Username", String],
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: ["Must provide Password", String],
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
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
