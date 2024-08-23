import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    name: {
      type: String, // Correcting the type to just String
      required: [true, "Must provide Name"], // Custom error message for required validation
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true, // Ensures that every chat must have at least one member
      },
    ],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", ChatSchema);
