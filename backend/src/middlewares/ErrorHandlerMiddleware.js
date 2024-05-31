import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../errors";
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something Went Wrong, Please try Again...." });
};

export default errorHandlerMiddleware;
