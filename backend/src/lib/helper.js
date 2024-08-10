import { BadRequest } from "../errors/index.js";

const getOtherMembers = (members, userId) => {
  return members.find((member) => member._id.toString() !== userId.toString());
};
const fileFormatBase64ForCloudinary = (file) => {
  console.log("File object passed to fileFormatBase64ForCloudinary:", file);

  if (!file || !file.buffer) {
    throw new BadRequest("File buffer is missing or undefined.");
  }
  const fileBuffer = file.buffer.toString("base64");
  return `data:${file.mimetype};base64,${fileBuffer}`;
};

export { getOtherMembers, fileFormatBase64ForCloudinary };
