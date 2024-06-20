import { Unauthenticated, Unauthorized } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";
// import jwt from "jsonwebtoken";

export const isAuthenticatedUser = async (req, res, next) => {
  // console.log(req.headers.authorization);
  // console.log(req.cookies);
  let token;
  const authHeaderToken = req.headers.authorization;

  if (authHeaderToken && authHeaderToken.startsWith("Bearer ")) {
    // throw new Unauthorized("Invalid authorization, try again");
    token = authHeaderToken.split("")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new Unauthenticated("Inavlid Authentication Token!");
  }

  try {
    const decodedToken = await verifyJWT(token);
    // console.log(authPayloaddecodedToken);

    if (!decodedToken) {
      throw new Unauthorized("Inavlid Authentication Token!");
    }
    req.user = {
      name: decodedToken.name,
      userId: decodedToken?.userId,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    throw new Unauthenticated("Error While Authentication");
  }
};

export const authorizedPermission = (...roles) => {
  return (req, res, next) => {
    // const userRole =
    if (!roles.includes(req.user.role)) {
      throw new Unauthorized("You are not Access to this route!");
    }
    next();
  };
};
