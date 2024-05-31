import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 15,
  secure: tru,
  sameSite: "none",
};

export const generateToken = (res, user, statusCode, message) => {
  const createToken = "hello233jasdasd";
  return res
    .status(statusCode)
    .cookie("ChatHub-Token", token, cookieOptions)
    .json({
      message: "cookie token generated successfully!",
      success: true,
    });
};
