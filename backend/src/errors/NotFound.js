import { StatusCodes } from "http-status-codes";

const notFound = (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: "What are you looking for, Not Found here" });
};
export default notFound;
