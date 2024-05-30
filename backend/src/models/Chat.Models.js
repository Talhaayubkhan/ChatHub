import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    name: {
      type: ["Must provide Name", String],
      required: true,
      trim: true,
      unique: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
      // required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    memebers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", ChatSchema);
