import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop();

  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  )
    return "video";

  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";

  if (
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "gif"
  )
    return "image";

  return "file";
};
//res.cloudinary.com/talha-ayub/image/upload/dpr_auto/w_200/v1726827382/eeaaf4ab-9e1d-405f-aa19-c45757949430.png

const transformImage = (url = "", width = 100) => {
  if (typeof url !== "string") {
    console.error("Invalid URL:", url); // Optional: Log the issue to catch where this is happening
    return ""; // Return a fallback empty string or a default image URL
  }
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return newUrl;
};
const getLastSevenDays = () => {
  const currentDay = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    last7Days.unshift(currentDay.format("MMM D"));
    currentDay.subtract(1, "days");
  }
  return last7Days;
};

const getMessagesCountInLocalStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};

export {
  fileFormat,
  transformImage,
  getLastSevenDays,
  getMessagesCountInLocalStorage,
};
