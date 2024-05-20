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
const transformImage = (url = "", width = 100) => url;
const getLastSevenDays = () => {
  const currentDay = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    last7Days.unshift(currentDay.format("MMM D"));
    currentDay.subtract(1, "days");
  }
  return last7Days;
};

export { fileFormat, transformImage, getLastSevenDays };
